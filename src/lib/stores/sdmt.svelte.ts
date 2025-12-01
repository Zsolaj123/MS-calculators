/**
 * SDMT Store - Svelte 5 state management for Symbol Digit Modalities Test
 * Enhanced with BICAMS Z-Score normalization
 */

import {
	SDMT_SYMBOLS,
	type SDMTSymbolSet,
	type SymbolSelectionMode,
	getSymbolSet,
	getRandomSymbolsFromPool,
	SYMBOL_SET_NAMES,
	SYMBOL_SELECTION_MODE_NAMES,
	SYMBOL_SELECTION_MODE_NAMES_EN
} from '../data/symbols/sdmt-symbols';
import { BICAMSZScoreService } from '../services/bicams-zscore.service';
import type { BICAMSDemographics, BICAMSResult, SDMTResponse } from '../types/index';

// Symbol size type for adjustable display
export type SymbolSize = 'small' | 'medium' | 'large';

// Test mode type
export type SDMTTestMode = 'classic' | 'mobile' | 'random';

// Theme type
export type SDMTTheme = 'light' | 'dark';

// Color scheme type - now supports custom color
export type SDMTColorScheme = 'blue' | 'green' | 'purple' | 'teal' | 'custom';

// Input mode type for voice support
export type SDMTInputMode = 'keyboard' | 'voice';

// Voice language type
export type SDMTVoiceLanguage = 'hu-HU' | 'en-US';

// Re-export symbol set type
export type { SDMTSymbolSet, SymbolSelectionMode };
export { SYMBOL_SET_NAMES, SYMBOL_SELECTION_MODE_NAMES, SYMBOL_SELECTION_MODE_NAMES_EN };

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
	symbolSelectionMode: SymbolSelectionMode;
	testMode: SDMTTestMode;
	theme: SDMTTheme;
	colorScheme: SDMTColorScheme;
	customAccentColor: string;
	inputMode: SDMTInputMode;
	voiceLanguage: SDMTVoiceLanguage;
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
		symbolSelectionMode: 'original',
		testMode: 'classic',
		theme: 'light',
		colorScheme: 'blue',
		customAccentColor: '#3b82f6',
		inputMode: 'keyboard',
		voiceLanguage: 'hu-HU',
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
		if (savedSet && ['classic', 'geometric', 'lines', 'arrows', 'unicode', 'unicode-extended', 'random'].includes(savedSet)) {
			state.symbolSet = savedSet;
		}

		const savedTestMode = localStorage.getItem('sdmt-test-mode') as SDMTTestMode;
		if (savedTestMode && ['classic', 'mobile', 'random'].includes(savedTestMode)) {
			state.testMode = savedTestMode;
		}

		const savedTheme = localStorage.getItem('sdmt-theme') as SDMTTheme;
		if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
			state.theme = savedTheme;
		}

		const savedColorScheme = localStorage.getItem('sdmt-color-scheme') as SDMTColorScheme;
		if (savedColorScheme && ['blue', 'green', 'purple', 'teal', 'custom'].includes(savedColorScheme)) {
			state.colorScheme = savedColorScheme;
		}

		const savedCustomColor = localStorage.getItem('sdmt-custom-color');
		if (savedCustomColor && /^#[0-9A-Fa-f]{6}$/.test(savedCustomColor)) {
			state.customAccentColor = savedCustomColor;
		}

		const savedSymbolSelectionMode = localStorage.getItem('sdmt-symbol-selection-mode') as SymbolSelectionMode;
		if (savedSymbolSelectionMode && ['original', 'random-from-pool'].includes(savedSymbolSelectionMode)) {
			state.symbolSelectionMode = savedSymbolSelectionMode;
		}

		const savedInputMode = localStorage.getItem('sdmt-input-mode') as SDMTInputMode;
		if (savedInputMode && ['keyboard', 'voice'].includes(savedInputMode)) {
			state.inputMode = savedInputMode;
		}

		const savedVoiceLanguage = localStorage.getItem('sdmt-voice-language') as SDMTVoiceLanguage;
		if (savedVoiceLanguage && ['hu-HU', 'en-US'].includes(savedVoiceLanguage)) {
			state.voiceLanguage = savedVoiceLanguage;
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
		get testMode() {
			return state.testMode;
		},
		get theme() {
			return state.theme;
		},
		get colorScheme() {
			return state.colorScheme;
		},
		get customAccentColor() {
			return state.customAccentColor;
		},
		get symbolSelectionMode() {
			return state.symbolSelectionMode;
		},
		get inputMode() {
			return state.inputMode;
		},
		get voiceLanguage() {
			return state.voiceLanguage;
		},

		// Actions
		initialize() {
			// Preserve preferences across resets
			const currentSymbolSize = state.symbolSize;
			const currentSymbolSet = state.symbolSet;
			const currentSymbolSelectionMode = state.symbolSelectionMode;
			const currentTestMode = state.testMode;
			const currentTheme = state.theme;
			const currentColorScheme = state.colorScheme;
			const currentCustomAccentColor = state.customAccentColor;
			const currentInputMode = state.inputMode;
			const currentVoiceLanguage = state.voiceLanguage;

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
				symbolSelectionMode: currentSymbolSelectionMode,
				testMode: currentTestMode,
				theme: currentTheme,
				colorScheme: currentColorScheme,
				customAccentColor: currentCustomAccentColor,
				inputMode: currentInputMode,
				voiceLanguage: currentVoiceLanguage,
				lastAnswerCorrect: null,
				lastAnswerTimestamp: null,
				bicamsResult: null
			};

			this.generateKey();
		},

		generateKey() {
			// Determine symbol count based on test mode
			const symbolCount = this.getSymbolCount();

			// Get symbols based on selection mode
			let selectedSymbols: string[];

			if (state.symbolSelectionMode === 'random-from-pool') {
				// Pick random symbols from all 54 available
				selectedSymbols = getRandomSymbolsFromPool(symbolCount);
			} else {
				// Use original classic symbols
				const fullSet = getSymbolSet('classic');
				selectedSymbols = fullSet.slice(0, symbolCount);
			}

			// Create array of digits (1-6 or 1-9)
			const digits = Array.from({ length: symbolCount }, (_, i) => i + 1);

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
			// Generate 10 practice items
			const symbolCount = this.getSymbolCount();
			const practiceSymbolCount = Math.min(6, symbolCount); // Use up to 6 symbols for practice

			const items = [];
			for (let i = 0; i < 10; i++) {
				items.push(Math.floor(Math.random() * practiceSymbolCount));
			}
			state.practiceItems = items;
			state.currentItemIndex = 0;
		},

		generateTestItems() {
			const symbolCount = this.getSymbolCount();
			const items = [];

			if (symbolCount === 6) {
				// Mobile mode: All items use all 6 symbols
				for (let i = 0; i < 150; i++) {
					items.push(Math.floor(Math.random() * 6));
				}
			} else {
				// Classic mode: Progressive difficulty
				// First 26 items: only symbols 0-5 (first 6 symbols)
				for (let i = 0; i < 26; i++) {
					items.push(Math.floor(Math.random() * 6));
				}

				// Remaining 124 items: all symbols 0-8
				for (let i = 0; i < 124; i++) {
					items.push(Math.floor(Math.random() * 9));
				}
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
		},

		// Set test mode preference
		setTestMode(testMode: SDMTTestMode) {
			state.testMode = testMode;
			if (typeof window !== 'undefined') {
				localStorage.setItem('sdmt-test-mode', testMode);
			}
			// Regenerate key based on new mode
			this.generateKey();
		},

		// Set theme preference
		setTheme(theme: SDMTTheme) {
			state.theme = theme;
			if (typeof window !== 'undefined') {
				localStorage.setItem('sdmt-theme', theme);
				// Apply theme to document
				if (theme === 'dark') {
					document.documentElement.classList.add('dark');
				} else {
					document.documentElement.classList.remove('dark');
				}
			}
		},

		// Set color scheme preference
		setColorScheme(colorScheme: SDMTColorScheme, customColor?: string) {
			state.colorScheme = colorScheme;
			if (typeof window !== 'undefined') {
				localStorage.setItem('sdmt-color-scheme', colorScheme);
			}
			if (colorScheme === 'custom' && customColor) {
				this.setCustomAccentColor(customColor);
			}
		},

		// Set custom accent color
		setCustomAccentColor(color: string) {
			state.customAccentColor = color;
			if (typeof window !== 'undefined') {
				localStorage.setItem('sdmt-custom-color', color);
				// Apply to CSS custom property
				document.documentElement.style.setProperty('--accent-color', color);
			}
		},

		// Set symbol selection mode
		setSymbolSelectionMode(mode: SymbolSelectionMode) {
			state.symbolSelectionMode = mode;
			if (typeof window !== 'undefined') {
				localStorage.setItem('sdmt-symbol-selection-mode', mode);
			}
			// Regenerate key with new mode
			this.generateKey();
		},

		// Set input mode
		setInputMode(mode: SDMTInputMode) {
			state.inputMode = mode;
			if (typeof window !== 'undefined') {
				localStorage.setItem('sdmt-input-mode', mode);
			}
		},

		// Set voice language
		setVoiceLanguage(language: SDMTVoiceLanguage) {
			state.voiceLanguage = language;
			if (typeof window !== 'undefined') {
				localStorage.setItem('sdmt-voice-language', language);
			}
		},

		// Check if mobile mode
		isMobileMode(): boolean {
			return state.testMode === 'mobile';
		},

		// Get number of symbols based on mode
		getSymbolCount(): number {
			return state.testMode === 'mobile' ? 6 : 9;
		}
	};
}

export const sdmtStore = createSDMTStore();
