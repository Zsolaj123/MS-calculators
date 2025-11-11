/**
 * EDSS Store - Svelte 5 state management for EDSS Calculator
 * Manages functional system scores, ambulation, and EDSS calculation
 */

import type { EDSSFunctionalSystems } from '../types';
import { EDSSService } from '../services/edss.service';

// EDSS mode type
export type EDSSMode = 'assessment' | 'results';

// EDSS state
interface EDSSState {
	functionalSystems: EDSSFunctionalSystems;
	ambulation: number;
	currentMode: EDSSMode;
	score: number | null;
	interpretation: string | null;
	severityCategory: {
		label: string;
		color: string;
		description: string;
	} | null;
}

// Create reactive EDSS state using Svelte 5 runes
function createEDSSStore() {
	let state = $state<EDSSState>({
		functionalSystems: {
			visual: 0,
			brainstem: 0,
			pyramidal: 0,
			cerebellar: 0,
			sensory: 0,
			bowelBladder: 0,
			cerebral: 0
		},
		ambulation: 0,
		currentMode: 'assessment',
		score: null,
		interpretation: null,
		severityCategory: null
	});

	const edssService = new EDSSService();

	return {
		// Reactive getters
		get state() {
			return state;
		},
		get functionalSystems() {
			return state.functionalSystems;
		},
		get ambulation() {
			return state.ambulation;
		},
		get currentMode() {
			return state.currentMode;
		},
		get score() {
			return state.score;
		},
		get interpretation() {
			return state.interpretation;
		},
		get severityCategory() {
			return state.severityCategory;
		},

		// Actions
		initialize() {
			state = {
				functionalSystems: {
					visual: 0,
					brainstem: 0,
					pyramidal: 0,
					cerebellar: 0,
					sensory: 0,
					bowelBladder: 0,
					cerebral: 0
				},
				ambulation: 0,
				currentMode: 'assessment',
				score: null,
				interpretation: null,
				severityCategory: null
			};
		},

		// Set individual functional system score
		setFunctionalSystemScore(system: keyof EDSSFunctionalSystems, score: number) {
			state.functionalSystems[system] = score;
		},

		// Set ambulation score
		setAmbulation(score: number) {
			state.ambulation = score;
		},

		// Set all functional systems at once
		setAllFunctionalSystems(systems: EDSSFunctionalSystems) {
			state.functionalSystems = { ...systems };
		},

		// Calculate EDSS score
		calculateScore() {
			try {
				const score = edssService.calculateEDSS(state.functionalSystems, state.ambulation);
				const interpretation = edssService.getInterpretation(score);
				const severityCategory = edssService.getSeverityCategory(score);

				state.score = score;
				state.interpretation = interpretation;
				state.severityCategory = severityCategory;
				state.currentMode = 'results';

				return score;
			} catch (error) {
				console.error('EDSS calculation error:', error);
				throw error;
			}
		},

		// Go to assessment mode
		goToAssessment() {
			state.currentMode = 'assessment';
		},

		// Reset all scores
		reset() {
			this.initialize();
		},

		// Get current EDSS data for export
		exportData() {
			return {
				functionalSystems: state.functionalSystems,
				ambulation: state.ambulation,
				score: state.score,
				interpretation: state.interpretation,
				severityCategory: state.severityCategory,
				timestamp: new Date().toISOString()
			};
		}
	};
}

export const edssStore = createEDSSStore();
