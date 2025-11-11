/**
 * PASAT Reference Data - Paced Auditory Serial Addition Test
 *
 * PASAT measures auditory information processing speed and working memory.
 * The test presents single digits every 3 seconds (PASAT-3) or 2 seconds (PASAT-2).
 * The patient must add each new digit to the immediately preceding digit.
 *
 * References:
 * - Gronwall DMA. Paced auditory serial-addition task: a measure of recovery from concussion.
 *   Perceptual and Motor Skills. 1977;44(2):367-373. DOI: 10.2466/pms.1977.44.2.367
 * - Rao SM, Leo GJ, Bernardin L, Unverzagt F. Cognitive dysfunction in multiple sclerosis.
 *   I. Frequency, patterns, and prediction. Neurology. 1991;41(5):685-691. PMID: 2027484
 * - Benedict RHB, et al. Validity of the Symbol Digit Modalities Test as a cognition
 *   performance outcome measure for multiple sclerosis. Mult Scler. 2017;23(5):721-733.
 *   PMID: 27270498 (BICAMS validation)
 */

// BICAMS Reference Data for PASAT-3
export const PASAT_REFERENCE_DATA = {
	pasat3: {
		mean: 45.0311,
		sd: 12.0771,
		maxScore: 60
	},
	pasat2: {
		mean: 38.5,
		sd: 14.2,
		maxScore: 60
	}
};

// Age-adjusted normative data for PASAT-3 (European reference)
export const PASAT_AGE_NORMS = [
	{ ageMin: 18, ageMax: 29, mean: 48.2, sd: 10.5 },
	{ ageMin: 30, ageMax: 39, mean: 46.8, sd: 11.2 },
	{ ageMin: 40, ageMax: 49, mean: 44.5, sd: 12.1 },
	{ ageMin: 50, ageMax: 59, mean: 42.1, sd: 13.0 },
	{ ageMin: 60, ageMax: 69, mean: 39.3, sd: 13.8 }
];

// Education-adjusted normative data for PASAT-3
export const PASAT_EDUCATION_NORMS = [
	{ yearsMin: 0, yearsMax: 12, mean: 41.2, sd: 13.5 },
	{ yearsMin: 13, yearsMax: 16, mean: 46.8, sd: 11.2 },
	{ yearsMin: 17, yearsMax: 99, mean: 49.5, sd: 9.8 }
];

// Performance interpretation thresholds (z-scores)
export const PASAT_INTERPRETATION = {
	normal: { min: -1.0, label: 'Normal' },
	borderline: { min: -2.0, max: -1.0, label: 'Borderline' },
	impaired: { min: -3.0, max: -2.0, label: 'Impaired' },
	severelyImpaired: { max: -3.0, label: 'Severely Impaired' }
};

export type PASATVersion = 'pasat3' | 'pasat2';

export interface PASATTrialData {
	digit1: number; // First digit presented
	digit2: number; // Second digit presented
	correctAnswer: number; // Correct sum
	userAnswer: number | null; // User's response (null if no response)
	isCorrect: boolean; // Whether the answer was correct
	responseTime: number; // Time taken to respond in milliseconds
	timestamp: number; // When the trial occurred
}

export interface PASATResults {
	// Test configuration
	version: PASATVersion;
	intervalSeconds: number; // 3 for PASAT-3, 2 for PASAT-2

	// Raw scores
	totalTrials: number; // Total number of trials (usually 60)
	correctResponses: number; // Number of correct responses
	incorrectResponses: number; // Number of incorrect responses
	omissions: number; // Number of trials with no response

	// Calculated scores
	rawScore: number; // Same as correctResponses
	percentCorrect: number; // (correctResponses / totalTrials) * 100

	// Detailed trial data
	trials: PASATTrialData[];

	// Z-scores
	zScore?: number; // Based on BICAMS norms
	zScoreAge?: number; // Age-adjusted z-score
	zScoreEducation?: number; // Education-adjusted z-score

	// Metadata
	age?: number;
	yearsOfEducation?: number;
	completionDate?: string;
	testDuration?: number; // Total test duration in seconds
}

export interface PASATState {
	// Test configuration
	version: PASATVersion;
	intervalSeconds: number;

	// Test state
	isActive: boolean;
	isPractice: boolean;
	currentTrial: number; // Current trial number (0-59 for main test, 0-9 for practice)
	totalTrials: number; // Total trials (10 for practice, 60 for main)

	// Current trial
	currentDigit: number | null;
	previousDigit: number | null;
	correctAnswer: number | null;

	// Trial history
	trials: PASATTrialData[];

	// Timing
	startTime: number | null;
	lastDigitTime: number | null;

	// Demographics
	age?: number;
	yearsOfEducation?: number;

	// Audio
	isMuted: boolean;
}

export interface PASATPracticeConfig {
	trialCount: number; // Default: 10
	showFeedback: boolean; // Show correct/incorrect feedback during practice
	allowSkip: boolean; // Allow skipping practice
}

// Default practice configuration
export const DEFAULT_PRACTICE_CONFIG: PASATPracticeConfig = {
	trialCount: 10,
	showFeedback: true,
	allowSkip: true
};

// Digit generation constraints
export const PASAT_DIGIT_CONSTRAINTS = {
	minDigit: 1,
	maxDigit: 9,
	maxSum: 17, // Maximum allowed sum (to keep within single response digit range)
	avoidConsecutiveSame: true // Avoid same digit appearing twice in a row
};

/**
 * Generate a random digit for PASAT test
 * @param previousDigit - The previous digit (to avoid consecutive same digits)
 * @returns A random digit from 1-9
 */
export function generatePASATDigit(previousDigit?: number): number {
	const { minDigit, maxDigit, avoidConsecutiveSame } = PASAT_DIGIT_CONSTRAINTS;

	let digit: number;
	do {
		digit = Math.floor(Math.random() * (maxDigit - minDigit + 1)) + minDigit;
	} while (avoidConsecutiveSame && digit === previousDigit);

	return digit;
}

/**
 * Generate a sequence of PASAT digits
 * @param count - Number of digits to generate
 * @returns Array of digits
 */
export function generatePASATSequence(count: number): number[] {
	const sequence: number[] = [];

	for (let i = 0; i < count; i++) {
		const previousDigit = i > 0 ? sequence[i - 1] : undefined;
		sequence.push(generatePASATDigit(previousDigit));
	}

	return sequence;
}

/**
 * Calculate z-score for PASAT performance
 * @param rawScore - Number of correct responses
 * @param version - PASAT version (pasat3 or pasat2)
 * @returns Z-score
 */
export function calculatePASATZScore(rawScore: number, version: PASATVersion = 'pasat3'): number {
	const refData = PASAT_REFERENCE_DATA[version];
	return (rawScore - refData.mean) / refData.sd;
}

/**
 * Calculate age-adjusted z-score for PASAT-3
 * @param rawScore - Number of correct responses
 * @param age - Patient age
 * @returns Age-adjusted z-score
 */
export function calculateAgeAdjustedZScore(rawScore: number, age: number): number {
	const ageNorm = PASAT_AGE_NORMS.find(
		(norm) => age >= norm.ageMin && age <= norm.ageMax
	);

	if (!ageNorm) {
		// Default to overall norms if age out of range
		return calculatePASATZScore(rawScore, 'pasat3');
	}

	return (rawScore - ageNorm.mean) / ageNorm.sd;
}

/**
 * Calculate education-adjusted z-score for PASAT-3
 * @param rawScore - Number of correct responses
 * @param yearsOfEducation - Years of education
 * @returns Education-adjusted z-score
 */
export function calculateEducationAdjustedZScore(
	rawScore: number,
	yearsOfEducation: number
): number {
	const eduNorm = PASAT_EDUCATION_NORMS.find(
		(norm) => yearsOfEducation >= norm.yearsMin && yearsOfEducation <= norm.yearsMax
	);

	if (!eduNorm) {
		// Default to overall norms if education level not found
		return calculatePASATZScore(rawScore, 'pasat3');
	}

	return (rawScore - eduNorm.mean) / eduNorm.sd;
}

/**
 * Get performance interpretation based on z-score
 * @param zScore - Z-score
 * @returns Performance level label
 */
export function interpretPASATPerformance(zScore: number): string {
	if (zScore >= PASAT_INTERPRETATION.normal.min) {
		return PASAT_INTERPRETATION.normal.label;
	} else if (zScore >= PASAT_INTERPRETATION.borderline.min) {
		return PASAT_INTERPRETATION.borderline.label;
	} else if (zScore >= PASAT_INTERPRETATION.impaired.min) {
		return PASAT_INTERPRETATION.impaired.label;
	} else {
		return PASAT_INTERPRETATION.severelyImpaired.label;
	}
}
