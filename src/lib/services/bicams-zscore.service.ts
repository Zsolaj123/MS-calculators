/**
 * BICAMS Z-Score Normalization Service
 *
 * Based on Costers et al. 2017 Belgian validation study:
 * "Does including the full CVLT-II and BVMT-R improve BICAMS?"
 * Multiple Sclerosis and Related Disorders 18 (2017): 33-40
 *
 * Provides age, gender, and education-adjusted z-scores for:
 * - SDMT (Symbol Digit Modalities Test)
 * - BVMT-R (Brief Visuospatial Memory Test Revised)
 * - CVLT-II (California Verbal Learning Test Second Edition)
 */

import type {
	BICAMSDemographics,
	BICAMSResult,
	BICAMSTestType,
	ConversionTableRow
} from '../types/index';

// Import conversion tables
import sdmtConversionTable from '../data/conversion-tables/sdmt-conversion.json';
import bvmtConversionTable from '../data/conversion-tables/bvmt-conversion.json';
import cvltConversionTable from '../data/conversion-tables/cvlt-conversion.json';

export class BICAMSZScoreService {
	/**
	 * Regression weights for expected score calculation
	 * Format: [bias, age_weight, age²_weight, sex_weight, education_weight]
	 */
	private readonly REGRESSION_WEIGHTS: Record<BICAMSTestType, number[]> = {
		sdmt: [10.648, -0.289, 0.002, -0.05, 0.479],
		cvlt: [9.052, -0.230, 0.002, 2.182, 0.323],
		bvmt: [16.902, -0.473, 0.005, -1.427, 0.341]
	};

	/**
	 * Standard deviation denominators for z-score calculation
	 */
	private readonly Z_SCORE_DENOMINATORS: Record<BICAMSTestType, number> = {
		sdmt: 2.79,
		cvlt: 2.801,
		bvmt: 2.793
	};

	/**
	 * Complete normalization pipeline
	 *
	 * @param demographics - Patient demographics (age, sex, education)
	 * @param rawScore - Raw test score
	 * @param test - Test type (sdmt, bvmt, cvlt)
	 * @param zCutoff - Z-score cutoff for impairment classification (default: -1.5)
	 * @returns Normalized result with z-score and interpretation
	 *
	 * @example
	 * const service = new BICAMSZScoreService();
	 * const result = service.normalizationPipeline(
	 *   { age: 30, sex: 2, education: 15 },
	 *   45,
	 *   'sdmt',
	 *   -1.5
	 * );
	 * console.log(result.zScore); // e.g., -0.52
	 * console.log(result.isImpaired); // false
	 */
	normalizationPipeline(
		demographics: BICAMSDemographics,
		rawScore: number,
		test: BICAMSTestType,
		zCutoff: number = -1.5
	): BICAMSResult {
		// Step 1: Calculate expected score based on demographics
		const expectedScore = this.getExpectedScore(demographics, test);

		// Step 2: Convert raw score to scaled score using lookup tables
		const scaledScore = this.rawToScaled(rawScore, test);

		// Step 3: Calculate z-score
		const zScore = this.toZScore(scaledScore, expectedScore, test);

		// Step 4: Determine if impaired
		const isImpaired = zScore < zCutoff;

		// Step 5: Classify performance level
		const performanceLevel = this.getPerformanceLevel(zScore);

		return {
			zScore,
			scaledScore,
			expectedScore,
			isImpaired,
			performanceLevel
		};
	}

	/**
	 * Calculate expected score using regression-based norms
	 *
	 * Formula: bias + (age × w1) + (age² × w2) + (sex × w3) + (education × w4)
	 *
	 * @param demographics - Patient demographics
	 * @param test - Test type
	 * @returns Expected scaled score for this demographic profile
	 */
	private getExpectedScore(demographics: BICAMSDemographics, test: BICAMSTestType): number {
		const { age, sex, education } = demographics;
		const [bias, w_age, w_age2, w_sex, w_edu] = this.REGRESSION_WEIGHTS[test];

		// Linear regression with age, age², sex, and education
		const expectedScore =
			bias + age * w_age + age * age * w_age2 + sex * w_sex + education * w_edu;

		return expectedScore;
	}

	/**
	 * Convert raw score to scaled score using lookup tables
	 *
	 * @param rawScore - Raw test score
	 * @param test - Test type
	 * @returns Scaled score (typically 2-19 range)
	 */
	private rawToScaled(rawScore: number, test: BICAMSTestType): number {
		const table = this.getConversionTable(test);

		// Find the row where raw score falls within [lower, upper] range
		for (const row of table) {
			if (rawScore >= row.lower && rawScore <= row.upper) {
				return row.scaledScore;
			}
		}

		// Handle out-of-range scores
		if (rawScore < table[0].lower) {
			return table[0].scaledScore; // Return minimum scaled score
		}

		return table[table.length - 1].scaledScore; // Return maximum scaled score
	}

	/**
	 * Calculate z-score: (scaled - expected) / denominator
	 *
	 * @param scaledScore - Scaled score from conversion table
	 * @param expectedScore - Expected score from regression
	 * @param test - Test type
	 * @returns Z-score (standardized deviation from expected)
	 */
	private toZScore(scaledScore: number, expectedScore: number, test: BICAMSTestType): number {
		const denominator = this.Z_SCORE_DENOMINATORS[test];
		return (scaledScore - expectedScore) / denominator;
	}

	/**
	 * Classify performance level based on z-score
	 *
	 * Cutoffs:
	 * - z ≥ -0.5: Normal
	 * - -1.0 ≤ z < -0.5: Borderline
	 * - -1.5 ≤ z < -1.0: Impaired
	 * - z < -1.5: Severely impaired
	 *
	 * @param zScore - Calculated z-score
	 * @returns Performance level classification
	 */
	private getPerformanceLevel(
		zScore: number
	): 'normal' | 'borderline' | 'impaired' | 'severely-impaired' {
		if (zScore >= -0.5) return 'normal';
		if (zScore >= -1.0) return 'borderline';
		if (zScore >= -1.5) return 'impaired';
		return 'severely-impaired';
	}

	/**
	 * Get conversion table for specified test
	 *
	 * @param test - Test type
	 * @returns Conversion table mapping raw scores to scaled scores
	 */
	private getConversionTable(test: BICAMSTestType): ConversionTableRow[] {
		switch (test) {
			case 'sdmt':
				return sdmtConversionTable as ConversionTableRow[];
			case 'bvmt':
				return bvmtConversionTable as ConversionTableRow[];
			case 'cvlt':
				return cvltConversionTable as ConversionTableRow[];
			default:
				throw new Error(`Unknown test type: ${test}`);
		}
	}

	/**
	 * Get Hungarian label for performance level
	 *
	 * @param level - Performance level classification
	 * @returns Hungarian label
	 */
	public getHungarianPerformanceLabel(
		level: 'normal' | 'borderline' | 'impaired' | 'severely-impaired'
	): string {
		const labels = {
			normal: 'Normál',
			borderline: 'Határérték',
			impaired: 'Károsodott',
			'severely-impaired': 'Súlyosan károsodott'
		};

		return labels[level];
	}

	/**
	 * Get color code for performance level (for UI styling)
	 *
	 * @param level - Performance level classification
	 * @returns Tailwind color class
	 */
	public getPerformanceLevelColor(
		level: 'normal' | 'borderline' | 'impaired' | 'severely-impaired'
	): string {
		const colors = {
			normal: 'text-green-600',
			borderline: 'text-yellow-600',
			impaired: 'text-orange-600',
			'severely-impaired': 'text-red-600'
		};

		return colors[level];
	}
}
