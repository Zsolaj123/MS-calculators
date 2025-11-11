/**
 * MSFC Reference Data - Multiple Sclerosis Functional Composite scoring references
 * Based on NMSS Database and European reference populations
 *
 * References:
 * - Fischer JS, Rudick RA, Cutter GR, Reingold SC. The Multiple Sclerosis Functional Composite
 *   Measure (MSFC): an integrated approach to MS clinical outcome assessment.
 *   Mult Scler. 1999;5(4):244-250. PMC6278631
 * - Nieuwenhuis MM, et al. The six spot step test: a new measurement for walking ability in
 *   multiple sclerosis. Mult Scler. 2006;12(4):495-500. PMC5405844
 */

// NMSS Reference Data for Z-score calculations
export const MSFC_REFERENCE_DATA = {
	t25fw: { mean: 9.5353, sd: 11.4058 },
	hpt_reciprocal: { mean: 0.0439, sd: 0.0101 },
	pasat3: { mean: 45.0311, sd: 12.0771 }
};

// European Reference Data for Age-Adjusted T25FW Scoring
export const EUROPEAN_T25FW_CUTPOINTS = [
	{ ageMin: 20, ageMax: 29, cutPoint: 5.1, gaitSpeed: 1.47 },
	{ ageMin: 30, ageMax: 39, cutPoint: 5.3, gaitSpeed: 1.41 },
	{ ageMin: 40, ageMax: 49, cutPoint: 5.7, gaitSpeed: 1.31 },
	{ ageMin: 50, ageMax: 59, cutPoint: 6.2, gaitSpeed: 1.21 },
	{ ageMin: 60, ageMax: 69, cutPoint: 7.0, gaitSpeed: 1.07 },
	{ ageMin: 70, ageMax: 79, cutPoint: 8.1, gaitSpeed: 0.93 }
];

// European 9-Hole Peg Test Reference Ranges
export const EUROPEAN_9HPT_RANGES = [
	{
		ageMin: 18,
		ageMax: 30,
		dominant: { mean: 18.2, sd: 2.1 },
		nonDominant: { mean: 19.5, sd: 2.4 }
	},
	{
		ageMin: 31,
		ageMax: 50,
		dominant: { mean: 19.8, sd: 2.7 },
		nonDominant: { mean: 21.3, sd: 3.1 }
	},
	{
		ageMin: 51,
		ageMax: 65,
		dominant: { mean: 22.4, sd: 3.5 },
		nonDominant: { mean: 24.1, sd: 3.9 }
	}
];

export interface MSFCResults {
	// Raw scores
	hpt_dominant?: number; // 9-Hole Peg Test dominant hand (seconds)
	hpt_non_dominant?: number; // 9-Hole Peg Test non-dominant hand (seconds)
	t25fw?: number; // Timed 25-Foot Walk (seconds)
	pasat3?: number; // PASAT-3 (correct responses)

	// Calculated scores
	hpt_average?: number; // Average of both hands
	hpt_reciprocal?: number; // 1/average for Z-score calculation
	t25fw_reciprocal?: number; // 1/T25FW for Z-score calculation

	// Z-scores
	z_arm?: number; // 9HPT Z-score
	z_leg?: number; // T25FW Z-score
	z_cognitive?: number; // PASAT-3 Z-score
	composite_z_score?: number; // Average of all three Z-scores

	// Metadata
	reference_type?: 'nmss' | 'european';
	age?: number;
	completion_date?: string;
}

export interface MSFCTimerState {
	isRunning: boolean;
	startTime: number | null;
	currentTime: number;
	elapsedTime: number;
}

export interface MSFCState {
	currentTest: 'hpt_dominant' | 'hpt_non_dominant' | 't25fw' | 'pasat3' | null;
	timers: Record<string, MSFCTimerState>;
	testResults: MSFCResults;
	isActive: boolean;
	isManualMode: boolean;
	completedTests: Set<string>;
	age?: number;
}

export type MSFCTestType = 'hpt_dominant' | 'hpt_non_dominant' | 't25fw' | 'pasat3';
