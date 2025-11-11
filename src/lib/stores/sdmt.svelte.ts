/**
 * SDMT Store - Svelte 5 state management for Symbol Digit Modalities Test
 * Enhanced with BICAMS Z-Score normalization
 */

import {
	SDMT_SYMBOLS,
	type SDMTSymbolSet,
	getSymbolSet,
	SYMBOL_SET_NAMES
} from '../data/symbols/sdmt-symbols';
import { BICAMSZScoreService } from '../services/bicams-zscore.service';
import type { BICAMSDemographics, BICAMSResult, SDMTResponse } from '../types/index';

// Symbol size type for adjustable display
export type SymbolSize = 'small' | 'medium' | 'large';

// Test mode type
export type SDMTTestMode = 'classic' | 'mobile' | 'random';

// Theme type
export type SDMTTheme = 'light' | 'dark';

// Color scheme type
export type SDMTColorScheme = 'blue' | 'green' | 'purple' | 'teal';

// Re-export symbol set type
export type { SDMTSymbolSet };
export { SYMBOL_SET_NAMES };

// Symbol-digit mapping
export interface SymbolDigitMapping {
	symbolIndex: number;
	digit: number;
	svgHtml: string;
}

// Test mode
export type SDMTMode = 'demographics' | 'practice' | 'test' | 'results';

// SDMT State
interface SDMTState {
	symbolDigitKey: SymbolDigitMapping[];
	currentMode: SDMTMode;
	practiceItems: number[];
	testItems: number[];
	currentItemIndex: number;
	score: number;
	practiceScore: number;
	isTestRunning: boolean;
	isPracticeRunning: boolean;
	isPaused: boolean;
	timeLeft: number;
	pausedTimeRemaining: number | null;
	startTime: number | null;
	responses: SDMTResponse[];
	demographics: BICAMSDemographics | null;
	symbolSize: SymbolSize;
	symbolSet: SDMTSymbolSet;
	testMode: SDMTTestMode;
	theme: SDMTTheme;
	colorScheme: SDMTColorScheme;
	lastAnswerCorrect: boolean | null;
	lastAnswerTimestamp: number | null;
	bicamsResult: BICAMSResult | null;
}

// Create reactive SDMT state using Svelte 5 runes
function createSDMTStore() {
	let state = $state<SDMTState>({
		symbolDigitKey: [],
		currentMode: 'demographics',
		practiceItems: [],
		testItems: [],
		currentItemIndex: 0,
		score: 0,
		practiceScore: 0,
		isTestRunning: false,
		isPracticeRunning: false,
		isPaused: false,
		timeLeft: 90,
		pausedTimeRemaining: null,
		startTime: null,
		responses: [],
		demographics: null,
		symbolSize: 'medium',
		symbolSet: 'classic',
		lastAnswerCorrect: null,
		lastAnswerTimestamp: null,
		bicamsResult: null
	});

	let timer: number | null = null;
	const bicamsService = new BICAMSZScoreService();

	// Load preferences from localStorage
	if (typeof window !== 'undefined') {
		const savedSize = localStorage.getItem('sdmt-symbol-size') as SymbolSize;
		if (savedSize && ['small', 'medium', 'large'].includes(savedSize)) {
			state.symbolSize = savedSize;
		}

		const savedSet = localStorage.getItem('sdmt-symbol-set') as SDMTSymbolSet;
		if (savedSet && ['classic', 'geometric', 'lines', 'random'].includes(savedSet)) {
			state.symbolSet = savedSet;
		}
	}

	return {
		// Reactive getters
		get state() {
			return state;
		},
		get currentMode() {
			return state.currentMode;
		},
		get isTestRunning() {
			return state.isTestRunning;
		},
		get isPracticeRunning() {
			return state.isPracticeRunning;
		},
		get isPaused() {
			return state.isPaused;
		},
		get timeLeft() {
			return state.timeLeft;
		},
		get score() {
			return state.score;
		},
		get symbolDigitKey() {
			return state.symbolDigitKey;
		},
		get currentItemIndex() {
			return state.currentItemIndex;
		},
		get responses() {
			return state.responses;
		},
		get symbolSize() {
			return state.symbolSize;
		},
		get lastAnswerCorrect() {
			return state.lastAnswerCorrect;
		},
		get symbolSet() {
			return state.symbolSet;
		},
		get demographics() {
			return state.demographics;
		},
		get bicamsResult() {
			return state.bicamsResult;
		},

		// Actions
		initialize() {
			// Preserve preferences across resets
			const currentSymbolSize = state.symbolSize;
			const currentSymbolSet = state.symbolSet;

			// Reset state
			state = {
				symbolDigitKey: [],
				currentMode: 'demographics',
				practiceItems: [],
				testItems: [],
				currentItemIndex: 0,
				score: 0,
				practiceScore: 0,
				isTestRunning: false,
				isPracticeRunning: false,
				isPaused: false,
				timeLeft: 90,
				pausedTimeRemaining: null,
				startTime: null,
				responses: [],
				demographics: null,
				symbolSize: currentSymbolSize,
				symbolSet: currentSymbolSet,
				lastAnswerCorrect: null,
				lastAnswerTimestamp: null,
				bicamsResult: null
			};

			this.generateKey();
		},

		generateKey() {
			// Get the selected symbol set
			const selectedSymbols = getSymbolSet(state.symbolSet);

			// Create array of digits 1-9
			const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

			// Shuffle digits randomly
			for (let i = digits.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[digits[i], digits[j]] = [digits[j], digits[i]];
			}

			// Create symbol-digit mapping using selected symbol set
			state.symbolDigitKey = selectedSymbols.map((svgHtml, index) => ({
				symbolIndex: index,
				digit: digits[index],
				svgHtml: svgHtml
			}));
		},

		setMode(mode: SDMTMode) {
			state.currentMode = mode;
		},

		setDemographics(demographics: BICAMSDemographics) {
			state.demographics = demographics;
		},

		generatePracticeItems() {
			// Generate 10 practice items using first 6 symbols
			const items = [];
			for (let i = 0; i < 10; i++) {
				items.push(Math.floor(Math.random() * 6));
			}
			state.practiceItems = items;
			state.currentItemIndex = 0;
		},

		generateTestItems() {
			const items = [];

			// First 26 items: only symbols 0-5 (first 6 symbols)
			for (let i = 0; i < 26; i++) {
				items.push(Math.floor(Math.random() * 6));
			}

			// Remaining 124 items: all symbols 0-8
			for (let i = 0; i < 124; i++) {
				items.push(Math.floor(Math.random() * 9));
			}

			state.testItems = items;
			state.currentItemIndex = 0;
		},

		startPractice() {
			// Regenerate key with random shuffling for each practice session
			this.generateKey();
			this.generatePracticeItems();
			state.currentMode = 'practice';
			state.isPracticeRunning = true;
			state.practiceScore = 0;
			state.currentItemIndex = 0;
		},

		startTest() {
			// Regenerate key with random shuffling for each test
			this.generateKey();
			this.generateTestItems();
			state.currentMode = 'test';
			state.isTestRunning = true;
			state.isPaused = false;
			state.score = 0;
			state.currentItemIndex = 0;
			state.startTime = Date.now();
			state.timeLeft = 90;
			state.responses = [];

			// Start timer
			this.startTimer();
		},

		startTimer() {
			if (timer) clearInterval(timer);

			timer = setInterval(() => {
				if (!state.isPaused) {
					if (state.timeLeft > 0) {
						state.timeLeft--;
					} else {
						this.endTest();
					}
				}
			}, 1000) as unknown as number;
		},

		submitAnswer(userAnswer: number) {
			const currentItems = state.currentMode === 'practice' ? state.practiceItems : state.testItems;
			const symbolIndex = currentItems[state.currentItemIndex];
			const correctAnswer = state.symbolDigitKey[symbolIndex].digit;
			const isCorrect = userAnswer === correctAnswer;

			const response: SDMTResponse = {
				itemIndex: state.currentItemIndex,
				symbolId: symbolIndex,
				userAnswer,
				correctAnswer,
				isCorrect,
				timestamp: Date.now() - (state.startTime || 0)
			};

			// Set visual feedback
			state.lastAnswerCorrect = isCorrect;
			state.lastAnswerTimestamp = Date.now();

			// Clear visual feedback after 400ms
			setTimeout(() => {
				if (state.lastAnswerTimestamp && Date.now() - state.lastAnswerTimestamp >= 400) {
					state.lastAnswerCorrect = null;
					state.lastAnswerTimestamp = null;
				}
			}, 400);

			if (state.currentMode === 'practice') {
				if (isCorrect) state.practiceScore++;
			} else {
				state.responses.push(response);
				if (isCorrect) state.score++;
			}

			state.currentItemIndex++;

			// Check if we've completed all items
			if (state.currentItemIndex >= currentItems.length) {
				if (state.currentMode === 'practice') {
					this.endPractice();
				} else {
					// In test mode, generate more items if needed
					this.generateMoreTestItems();
				}
			}
		},

		generateMoreTestItems() {
			// Generate 50 more random items
			const moreItems = [];
			for (let i = 0; i < 50; i++) {
				moreItems.push(Math.floor(Math.random() * 9));
			}
			state.testItems.push(...moreItems);
		},

		endPractice() {
			state.isPracticeRunning = false;
			// After practice, go directly to test
			this.startTest();
		},

		endTest() {
			state.isTestRunning = false;
			state.isPaused = false;
			state.currentMode = 'results';
			if (timer) {
				clearInterval(timer);
				timer = null;
			}

			// Calculate BICAMS z-score if demographics are available
			if (state.demographics) {
				state.bicamsResult = bicamsService.normalizationPipeline(
					state.demographics,
					state.score,
					'sdmt',
					-1.5 // Default cutoff
				);
			}
		},

		cleanup() {
			if (timer) {
				clearInterval(timer);
				timer = null;
			}
		},

		// Get current symbol for display
		getCurrentSymbol() {
			const currentItems = state.currentMode === 'practice' ? state.practiceItems : state.testItems;
			if (state.currentItemIndex >= currentItems.length) return null;

			const symbolIndex = currentItems[state.currentItemIndex];
			return state.symbolDigitKey[symbolIndex];
		},

		// Set symbol size preference
		setSymbolSize(size: SymbolSize) {
			state.symbolSize = size;
			if (typeof window !== 'undefined') {
				localStorage.setItem('sdmt-symbol-size', size);
			}
		},

		// Set symbol set preference
		setSymbolSet(symbolSet: SDMTSymbolSet) {
			state.symbolSet = symbolSet;
			if (typeof window !== 'undefined') {
				localStorage.setItem('sdmt-symbol-set', symbolSet);
			}
			// Regenerate key with new symbol set
			this.generateKey();
		},

		// Pause test (emergency pause functionality)
		pauseTest() {
			if (!state.isTestRunning || state.isPaused) return;
			state.isPaused = true;
			state.pausedTimeRemaining = state.timeLeft;
		},

		// Resume paused test
		resumeTest() {
			if (!state.isPaused || state.pausedTimeRemaining === null) return;
			state.isPaused = false;
			state.timeLeft = state.pausedTimeRemaining;
			state.pausedTimeRemaining = null;
		},

		// Get symbol size in pixels
		getSymbolSizePixels(): number {
			const sizes = {
				small: 48,
				medium: 64,
				large: 80
			};
			return sizes[state.symbolSize];
		}
	};
}

export const sdmtStore = createSDMTStore();
