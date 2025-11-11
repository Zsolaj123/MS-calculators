/**
 * PASAT Store - Paced Auditory Serial Addition Test state management
 * Uses Svelte 5 runes for reactive state management
 * Includes audio synthesis, trial management, and z-score calculations
 */

import {
	type PASATState,
	type PASATResults,
	type PASATTrialData,
	type PASATVersion,
	type PASATPracticeConfig,
	DEFAULT_PRACTICE_CONFIG,
	generatePASATDigit,
	generatePASATSequence,
	calculatePASATZScore,
	calculateAgeAdjustedZScore,
	calculateEducationAdjustedZScore,
	PASAT_REFERENCE_DATA
} from '$lib/data/pasat-reference';

function createPASATStore() {
	let state = $state<PASATState>({
		version: 'pasat3',
		intervalSeconds: 3,
		isActive: false,
		isPractice: false,
		currentTrial: 0,
		totalTrials: 60,
		currentDigit: null,
		previousDigit: null,
		correctAnswer: null,
		trials: [],
		startTime: null,
		lastDigitTime: null,
		age: undefined,
		yearsOfEducation: undefined,
		isMuted: false
	});

	// Pre-generated digit sequence for consistency
	let digitSequence: number[] = [];

	// Timer interval
	let trialInterval: number | null = null;

	// Audio synthesis
	let audioContext: AudioContext | null = null;
	let speechSynthesis: SpeechSynthesis | null = null;

	// Initialize audio on client side only
	if (typeof window !== 'undefined') {
		audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
		speechSynthesis = window.speechSynthesis;
	}

	/**
	 * Speak a digit using Web Speech API
	 */
	function speakDigit(digit: number) {
		if (state.isMuted || !speechSynthesis) return;

		// Cancel any ongoing speech
		speechSynthesis.cancel();

		const utterance = new SpeechSynthesisUtterance(digit.toString());
		utterance.rate = 1.0;
		utterance.pitch = 1.0;
		utterance.volume = 1.0;
		utterance.lang = 'en-US';

		speechSynthesis.speak(utterance);
	}

	/**
	 * Play a beep sound (fallback if speech synthesis unavailable)
	 */
	function playBeep() {
		if (state.isMuted || !audioContext) return;

		const oscillator = audioContext.createOscillator();
		const gainNode = audioContext.createGain();

		oscillator.connect(gainNode);
		gainNode.connect(audioContext.destination);

		oscillator.frequency.value = 440; // A4 note
		oscillator.type = 'sine';

		gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
		gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

		oscillator.start(audioContext.currentTime);
		oscillator.stop(audioContext.currentTime + 0.1);
	}

	/**
	 * Present the next digit
	 */
	function presentNextDigit() {
		if (!state.isActive || state.currentTrial >= state.totalTrials) {
			return;
		}

		// Get the next digit from pre-generated sequence
		const digit = digitSequence[state.currentTrial];

		// Update state
		state.previousDigit = state.currentDigit;
		state.currentDigit = digit;
		state.lastDigitTime = Date.now();

		// Calculate correct answer (add current digit to previous digit)
		if (state.previousDigit !== null) {
			state.correctAnswer = state.previousDigit + state.currentDigit;
		} else {
			state.correctAnswer = null; // First digit has no previous digit
		}

		// Speak the digit
		speakDigit(digit);

		// Increment trial counter
		state.currentTrial++;
	}

	/**
	 * Record a user's answer for the current trial
	 */
	function recordAnswer(answer: number | null) {
		if (state.previousDigit === null || state.currentDigit === null) {
			// Can't answer the first digit
			return;
		}

		const now = Date.now();
		const responseTime = state.lastDigitTime ? now - state.lastDigitTime : 0;

		const trial: PASATTrialData = {
			digit1: state.previousDigit,
			digit2: state.currentDigit,
			correctAnswer: state.correctAnswer!,
			userAnswer: answer,
			isCorrect: answer === state.correctAnswer,
			responseTime,
			timestamp: now
		};

		state.trials.push(trial);
	}

	return {
		// Reactive getters
		get state() {
			return state;
		},
		get version() {
			return state.version;
		},
		get isActive() {
			return state.isActive;
		},
		get isPractice() {
			return state.isPractice;
		},
		get currentTrial() {
			return state.currentTrial;
		},
		get totalTrials() {
			return state.totalTrials;
		},
		get currentDigit() {
			return state.currentDigit;
		},
		get previousDigit() {
			return state.previousDigit;
		},
		get correctAnswer() {
			return state.correctAnswer;
		},
		get trials() {
			return state.trials;
		},
		get isMuted() {
			return state.isMuted;
		},
		get progress() {
			return state.totalTrials > 0 ? (state.currentTrial / state.totalTrials) * 100 : 0;
		},

		// Actions
		initialize() {
			state = {
				version: 'pasat3',
				intervalSeconds: 3,
				isActive: false,
				isPractice: false,
				currentTrial: 0,
				totalTrials: 60,
				currentDigit: null,
				previousDigit: null,
				correctAnswer: null,
				trials: [],
				startTime: null,
				lastDigitTime: null,
				age: undefined,
				yearsOfEducation: undefined,
				isMuted: false
			};

			digitSequence = [];

			if (trialInterval !== null) {
				clearInterval(trialInterval);
				trialInterval = null;
			}

			if (speechSynthesis) {
				speechSynthesis.cancel();
			}
		},

		setVersion(version: PASATVersion) {
			state.version = version;
			state.intervalSeconds = version === 'pasat3' ? 3 : 2;
		},

		setAge(age: number) {
			state.age = age;
		},

		setEducation(years: number) {
			state.yearsOfEducation = years;
		},

		toggleMute() {
			state.isMuted = !state.isMuted;
		},

		setMuted(muted: boolean) {
			state.isMuted = muted;
		},

		/**
		 * Start practice session
		 */
		startPractice(config: Partial<PASATPracticeConfig> = {}) {
			const practiceConfig = { ...DEFAULT_PRACTICE_CONFIG, ...config };

			// Reset state
			this.initialize();

			// Configure for practice
			state.isPractice = true;
			state.totalTrials = practiceConfig.trialCount;

			// Generate digit sequence
			digitSequence = generatePASATSequence(state.totalTrials);

			// Start the test
			this.startTest();
		},

		/**
		 * Start main test
		 */
		startMainTest() {
			// Reset state
			this.initialize();

			// Configure for main test
			state.isPractice = false;
			state.totalTrials = 60;

			// Generate digit sequence
			digitSequence = generatePASATSequence(state.totalTrials);

			// Start the test
			this.startTest();
		},

		/**
		 * Internal: Start test timer
		 */
		startTest() {
			state.isActive = true;
			state.startTime = Date.now();
			state.currentTrial = 0;

			// Present first digit immediately
			presentNextDigit();

			// Set up interval for subsequent digits
			trialInterval = setInterval(() => {
				if (state.currentTrial >= state.totalTrials) {
					this.endTest();
					return;
				}

				presentNextDigit();
			}, state.intervalSeconds * 1000) as unknown as number;
		},

		/**
		 * Submit an answer for the current trial
		 */
		submitAnswer(answer: number) {
			if (!state.isActive) return;

			// Validate answer range
			if (answer < 2 || answer > 18) {
				// Invalid answer - record as null
				recordAnswer(null);
				return;
			}

			recordAnswer(answer);
		},

		/**
		 * Skip the current trial (no answer)
		 */
		skipTrial() {
			if (!state.isActive) return;
			recordAnswer(null);
		},

		/**
		 * End the test
		 */
		endTest() {
			state.isActive = false;

			if (trialInterval !== null) {
				clearInterval(trialInterval);
				trialInterval = null;
			}

			if (speechSynthesis) {
				speechSynthesis.cancel();
			}
		},

		/**
		 * Calculate final results
		 */
		calculateResults(): PASATResults {
			const correctResponses = state.trials.filter((t) => t.isCorrect).length;
			const incorrectResponses = state.trials.filter(
				(t) => !t.isCorrect && t.userAnswer !== null
			).length;
			const omissions = state.trials.filter((t) => t.userAnswer === null).length;

			const results: PASATResults = {
				version: state.version,
				intervalSeconds: state.intervalSeconds,
				totalTrials: state.totalTrials,
				correctResponses,
				incorrectResponses,
				omissions,
				rawScore: correctResponses,
				percentCorrect: (correctResponses / state.totalTrials) * 100,
				trials: [...state.trials],
				completionDate: new Date().toISOString(),
				testDuration: state.startTime ? (Date.now() - state.startTime) / 1000 : 0
			};

			// Calculate z-scores
			results.zScore = calculatePASATZScore(correctResponses, state.version);

			if (state.age) {
				results.age = state.age;
				results.zScoreAge = calculateAgeAdjustedZScore(correctResponses, state.age);
			}

			if (state.yearsOfEducation) {
				results.yearsOfEducation = state.yearsOfEducation;
				results.zScoreEducation = calculateEducationAdjustedZScore(
					correctResponses,
					state.yearsOfEducation
				);
			}

			return results;
		},

		/**
		 * Get current score summary
		 */
		getCurrentScore(): {
			correct: number;
			incorrect: number;
			omissions: number;
			percentCorrect: number;
		} {
			const correct = state.trials.filter((t) => t.isCorrect).length;
			const incorrect = state.trials.filter((t) => !t.isCorrect && t.userAnswer !== null).length;
			const omissions = state.trials.filter((t) => t.userAnswer === null).length;

			return {
				correct,
				incorrect,
				omissions,
				percentCorrect: state.trials.length > 0 ? (correct / state.trials.length) * 100 : 0
			};
		},

		/**
		 * Get the expected answer for practice mode feedback
		 */
		getExpectedAnswer(): number | null {
			return state.correctAnswer;
		},

		/**
		 * Check if answer was correct (for practice feedback)
		 */
		wasLastAnswerCorrect(): boolean | null {
			if (state.trials.length === 0) return null;
			const lastTrial = state.trials[state.trials.length - 1];
			return lastTrial.isCorrect;
		},

		/**
		 * Get timing statistics
		 */
		getTimingStats(): {
			avgResponseTime: number;
			medianResponseTime: number;
			minResponseTime: number;
			maxResponseTime: number;
		} {
			const responseTimes = state.trials
				.filter((t) => t.userAnswer !== null)
				.map((t) => t.responseTime);

			if (responseTimes.length === 0) {
				return {
					avgResponseTime: 0,
					medianResponseTime: 0,
					minResponseTime: 0,
					maxResponseTime: 0
				};
			}

			const sorted = [...responseTimes].sort((a, b) => a - b);
			const avg = responseTimes.reduce((sum, t) => sum + t, 0) / responseTimes.length;
			const median = sorted[Math.floor(sorted.length / 2)];

			return {
				avgResponseTime: avg,
				medianResponseTime: median,
				minResponseTime: sorted[0],
				maxResponseTime: sorted[sorted.length - 1]
			};
		},

		/**
		 * Export results for MSFC integration
		 */
		exportForMSFC(): { score: number; zScore: number } {
			const score = state.trials.filter((t) => t.isCorrect).length;
			const zScore = calculatePASATZScore(score, state.version);

			return { score, zScore };
		}
	};
}

export const pasatStore = createPASATStore();
