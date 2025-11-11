/**
 * MSFC Store - Multiple Sclerosis Functional Composite state management
 * Uses Svelte 5 runes for reactive state management
 * Includes z-score calculations based on NMSS reference data
 */

import {
	MSFC_REFERENCE_DATA,
	type MSFCState,
	type MSFCResults,
	type MSFCTestType,
	type MSFCTimerState
} from '$lib/data/msfc-reference';

function createMSFCStore() {
	let state = $state<MSFCState>({
		currentTest: null,
		timers: {},
		testResults: {},
		isActive: false,
		isManualMode: false,
		completedTests: new Set(),
		age: undefined
	});

	// Timer intervals
	let timerIntervals: Record<string, number> = {};

	return {
		// Reactive getters
		get state() {
			return state;
		},
		get currentTest() {
			return state.currentTest;
		},
		get testResults() {
			return state.testResults;
		},
		get isActive() {
			return state.isActive;
		},
		get isManualMode() {
			return state.isManualMode;
		},
		get completedTests() {
			return state.completedTests;
		},
		get timers() {
			return state.timers;
		},
		get age() {
			return state.age;
		},

		// Actions
		initialize() {
			// Reset state
			state = {
				currentTest: null,
				timers: {},
				testResults: {},
				isActive: false,
				isManualMode: false,
				completedTests: new Set(),
				age: undefined
			};

			// Clear any running timers
			Object.values(timerIntervals).forEach((interval) => clearInterval(interval));
			timerIntervals = {};
		},

		setAge(age: number) {
			state.age = age;
			if (state.testResults.age !== age) {
				state.testResults.age = age;
				// Recalculate z-scores with new age
				this.calculateZScores();
			}
		},

		setManualMode(enabled: boolean) {
			state.isManualMode = enabled;

			// If switching to manual mode, stop any running timers
			if (enabled) {
				this.stopAllTimers();
			}
		},

		// Timer management
		startTimer(testType: MSFCTestType) {
			// Stop any existing timer for this test
			this.stopTimer(testType);

			const now = Date.now();

			// Initialize timer state
			state.timers[testType] = {
				isRunning: true,
				startTime: now,
				currentTime: now,
				elapsedTime: 0
			};

			// Start interval
			timerIntervals[testType] = setInterval(() => {
				if (state.timers[testType] && state.timers[testType].isRunning) {
					const current = Date.now();
					state.timers[testType].currentTime = current;
					state.timers[testType].elapsedTime = current - state.timers[testType].startTime!;
				}
			}, 10) as unknown as number; // Update every 10ms for smooth display

			state.currentTest = testType;
			state.isActive = true;
		},

		stopTimer(testType: MSFCTestType): number | null {
			const timer = state.timers[testType];
			if (!timer || !timer.isRunning) return null;

			// Stop the timer
			timer.isRunning = false;
			const finalTime = timer.elapsedTime / 1000; // Convert to seconds

			// Clear interval
			if (timerIntervals[testType]) {
				clearInterval(timerIntervals[testType]);
				delete timerIntervals[testType];
			}

			// Record the result
			this.setTestResult(testType, finalTime);
			state.completedTests.add(testType);

			if (state.currentTest === testType) {
				state.currentTest = null;
			}

			return finalTime;
		},

		stopAllTimers() {
			Object.keys(state.timers).forEach((testType) => {
				this.stopTimer(testType as MSFCTestType);
			});
			state.isActive = false;
		},

		getElapsedTime(testType: MSFCTestType): number {
			const timer = state.timers[testType];
			if (!timer) return 0;

			if (timer.isRunning) {
				return (Date.now() - timer.startTime!) / 1000;
			} else {
				return timer.elapsedTime / 1000;
			}
		},

		formatTime(seconds: number): string {
			const mins = Math.floor(seconds / 60);
			const secs = (seconds % 60).toFixed(1);
			return mins > 0 ? `${mins}:${secs.padStart(4, '0')}` : `${secs}s`;
		},

		// Test result management
		setTestResult(testType: MSFCTestType, value: number) {
			state.testResults[testType] = value;

			// Auto-calculate derived values and Z-scores
			this.calculateDerivedScores();
		},

		setManualResult(testType: MSFCTestType, value: string) {
			const numValue = parseFloat(value);
			if (!isNaN(numValue) && numValue > 0) {
				this.setTestResult(testType, numValue);
				state.completedTests.add(testType);
			}
		},

		calculateDerivedScores() {
			const results = state.testResults;

			// Calculate 9HPT average and reciprocal
			if (results.hpt_dominant && results.hpt_non_dominant) {
				results.hpt_average = (results.hpt_dominant + results.hpt_non_dominant) / 2;
				results.hpt_reciprocal = 1 / results.hpt_average;
			}

			// Calculate T25FW reciprocal
			if (results.t25fw) {
				results.t25fw_reciprocal = 1 / results.t25fw;
			}

			// Calculate Z-scores
			this.calculateZScores();
		},

		calculateZScores() {
			const results = state.testResults;
			const refData = MSFC_REFERENCE_DATA;

			// 9HPT Z-score (arm function)
			if (results.hpt_reciprocal) {
				results.z_arm =
					(results.hpt_reciprocal - refData.hpt_reciprocal.mean) / refData.hpt_reciprocal.sd;
			}

			// T25FW Z-score (leg function)
			if (results.t25fw_reciprocal) {
				results.z_leg =
					(results.t25fw_reciprocal - 1 / refData.t25fw.mean) /
					(refData.t25fw.sd / Math.pow(refData.t25fw.mean, 2));
			}

			// PASAT-3 Z-score (cognitive function)
			if (results.pasat3) {
				results.z_cognitive = (results.pasat3 - refData.pasat3.mean) / refData.pasat3.sd;
			}

			// Composite Z-score (average of all three)
			if (results.z_arm !== undefined && results.z_leg !== undefined && results.z_cognitive !== undefined) {
				results.composite_z_score = (results.z_arm + results.z_leg + results.z_cognitive) / 3;
			}

			// Set reference type
			results.reference_type = 'nmss';
		},

		// Check if all tests are completed
		isComplete(): boolean {
			return (
				state.completedTests.has('hpt_dominant') &&
				state.completedTests.has('hpt_non_dominant') &&
				state.completedTests.has('t25fw') &&
				state.completedTests.has('pasat3')
			);
		},

		// Check if minimum tests for composite score are completed
		hasMinimumForComposite(): boolean {
			// Need at least two of the three components
			const hasArm = state.completedTests.has('hpt_dominant') && state.completedTests.has('hpt_non_dominant');
			const hasLeg = state.completedTests.has('t25fw');
			const hasCognitive = state.completedTests.has('pasat3');

			const completedComponents = [hasArm, hasLeg, hasCognitive].filter(Boolean).length;
			return completedComponents >= 2;
		},

		// Reset a specific test
		resetTest(testType: MSFCTestType) {
			// Stop timer if running
			if (state.timers[testType]?.isRunning) {
				this.stopTimer(testType);
			}

			// Clear timer
			delete state.timers[testType];

			// Clear result
			delete state.testResults[testType];

			// Remove from completed tests
			state.completedTests.delete(testType);

			// Recalculate derived scores
			this.calculateDerivedScores();
		},

		// Export results
		exportResults(): MSFCResults {
			return {
				...state.testResults,
				completion_date: new Date().toISOString()
			};
		}
	};
}

export const msfcStore = createMSFCStore();
