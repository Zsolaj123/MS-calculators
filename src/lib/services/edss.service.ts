/**
 * EDSS Calculation Service
 * Based on Kurtzke Expanded Disability Status Scale
 * Converted from JavaScript to TypeScript with enhanced validation
 */

import type { EDSSFunctionalSystems } from '../types';
import { EDSS_INTERPRETATIONS } from '../data/edss/functional-systems';

export class EDSSService {
	/**
	 * Find max value in array and number of times it appears
	 */
	private findMaxValueAndRepetitions(arr: number[]): [number, number] {
		const max = Math.max(...arr);
		const numberOfRepetitions = arr.filter((value) => value >= max).length;
		return [max, numberOfRepetitions];
	}

	/**
	 * Find second largest value in array and number of times it appears
	 */
	private findSecondLargestAndRepetitions(arr: number[], max: number): [number, number] {
		const arrayWithoutMax = arr.filter((value) => value < max);
		if (arrayWithoutMax.length === 0) return [0, 0];

		const secondLargest = Math.max(...arrayWithoutMax);
		const numberOfRepetitions = arrayWithoutMax.filter((value) => value >= secondLargest).length;
		return [secondLargest, numberOfRepetitions];
	}

	/**
	 * Convert visual score according to EDSS rules
	 */
	private convertVisualScore(visualScore: number): number {
		if (visualScore === 6) return 4;
		if (visualScore === 5 || visualScore === 4) return 3;
		if (visualScore === 3 || visualScore === 2) return 2;
		return visualScore;
	}

	/**
	 * Convert bowel and bladder score according to EDSS rules
	 */
	private convertBowelAndBladderScore(bowelAndBladderScore: number): number {
		if (bowelAndBladderScore === 6) return 5;
		if (bowelAndBladderScore === 5) return 4;
		if (bowelAndBladderScore === 4 || bowelAndBladderScore === 3) return 3;
		return bowelAndBladderScore;
	}

	/**
	 * Validate functional system scores
	 */
	private validateInputs(
		functionalSystems: EDSSFunctionalSystems,
		ambulationScore: number
	): void {
		// Check visual functions (0-6)
		if (functionalSystems.visual < 0 || functionalSystems.visual > 6) {
			throw new Error(`Visual score out of bounds: ${functionalSystems.visual}`);
		}

		// Check brainstem functions (0-5)
		if (functionalSystems.brainstem < 0 || functionalSystems.brainstem > 5) {
			throw new Error(`Brainstem score out of bounds: ${functionalSystems.brainstem}`);
		}

		// Check pyramidal functions (0-6)
		if (functionalSystems.pyramidal < 0 || functionalSystems.pyramidal > 6) {
			throw new Error(`Pyramidal score out of bounds: ${functionalSystems.pyramidal}`);
		}

		// Check cerebellar functions (0-5)
		if (functionalSystems.cerebellar < 0 || functionalSystems.cerebellar > 5) {
			throw new Error(`Cerebellar score out of bounds: ${functionalSystems.cerebellar}`);
		}

		// Check sensory functions (0-6)
		if (functionalSystems.sensory < 0 || functionalSystems.sensory > 6) {
			throw new Error(`Sensory score out of bounds: ${functionalSystems.sensory}`);
		}

		// Check bowel and bladder functions (0-6)
		if (functionalSystems.bowelBladder < 0 || functionalSystems.bowelBladder > 6) {
			throw new Error(`Bowel/Bladder score out of bounds: ${functionalSystems.bowelBladder}`);
		}

		// Check cerebral functions (0-5)
		if (functionalSystems.cerebral < 0 || functionalSystems.cerebral > 5) {
			throw new Error(`Cerebral score out of bounds: ${functionalSystems.cerebral}`);
		}

		// Check ambulation score (0-16)
		if (ambulationScore < 0 || ambulationScore > 16) {
			throw new Error(`Ambulation score out of bounds: ${ambulationScore}`);
		}
	}

	/**
	 * Calculate EDSS score from functional systems and ambulation
	 */
	calculateEDSS(functionalSystems: EDSSFunctionalSystems, ambulationScore: number): number {
		// Validate inputs
		this.validateInputs(functionalSystems, ambulationScore);

		// Convert special scores
		const visual = this.convertVisualScore(functionalSystems.visual);
		const bowelBladder = this.convertBowelAndBladderScore(functionalSystems.bowelBladder);

		// Handle death and severe disability cases (ambulation-based)
		if (ambulationScore === 16) return 10.0; // Death due to MS
		if (ambulationScore === 15) return 9.5; // Totally helpless bed patient
		if (ambulationScore === 14) return 9.0; // Helpless bed patient
		if (ambulationScore === 13) return 8.5; // Restricted to bed much of the day
		if (ambulationScore === 12) return 8.0; // Restricted to bed or chair
		if (ambulationScore === 11) return 7.5; // Wheelchair with help
		if (ambulationScore === 10) return 7.0; // Wheelchair without help
		if (ambulationScore === 9 || ambulationScore === 8) return 6.5; // Bilateral/unilateral assistance
		if (ambulationScore === 7 || ambulationScore === 6 || ambulationScore === 5) return 6.0;
		if (ambulationScore === 4) return 5.5; // 100-200m without help
		if (ambulationScore === 3) return 5.0; // 200-300m without help

		// Array of functional system scores (after conversion)
		const fsScores = [
			visual,
			functionalSystems.brainstem,
			functionalSystems.pyramidal,
			functionalSystems.cerebellar,
			functionalSystems.sensory,
			bowelBladder,
			functionalSystems.cerebral
		];

		const [maxValue, numberOfRepetitions] = this.findMaxValueAndRepetitions(fsScores);

		// EDSS 5.0 rules
		if (maxValue >= 5) return 5.0;
		if (maxValue === 4 && numberOfRepetitions >= 2) return 5.0;

		// EDSS 4.5-5.0 rules
		if (maxValue === 4 && numberOfRepetitions === 1) {
			const [secondLargest, numberOfRepetitionsSecondLargest] =
				this.findSecondLargestAndRepetitions(fsScores, maxValue);

			if (secondLargest === 3 && numberOfRepetitionsSecondLargest > 2) return 5.0;
			if (secondLargest === 3 || secondLargest === 2) return 4.5;
			if (ambulationScore < 2 && secondLargest < 2) return 4.0;
		}

		// Check ambulation for special case
		if (maxValue === 3 && numberOfRepetitions >= 6) return 5.0;
		if (ambulationScore === 2) return 4.5;

		// EDSS 3.0-4.5 rules (maxValue === 3)
		if (maxValue === 3) {
			if (numberOfRepetitions === 5) return 4.5;
			if (numberOfRepetitions >= 2) {
				if (numberOfRepetitions === 2) {
					const [secondLargest] = this.findSecondLargestAndRepetitions(fsScores, maxValue);
					if (secondLargest <= 1) return 3.5;
				}
				return 4.0;
			}

			// numberOfRepetitions is 1
			const [secondLargest, numberOfRepetitionsSecondLargest] =
				this.findSecondLargestAndRepetitions(fsScores, maxValue);

			if (secondLargest === 2) {
				if (numberOfRepetitionsSecondLargest >= 3) return 4.0;
				return 3.5;
			}

			return 3.0;
		}

		// EDSS 2.0-4.0 rules (maxValue === 2)
		if (maxValue === 2) {
			if (numberOfRepetitions >= 6) return 4.0;
			if (numberOfRepetitions === 5) return 3.5;
			if (numberOfRepetitions === 3 || numberOfRepetitions === 4) return 3.0;
			if (numberOfRepetitions === 2) return 2.5;
			return 2.0;
		}

		// Ambulation affects lower scores
		if (ambulationScore === 1) return 2.0;

		// EDSS 1.0-1.5 rules (maxValue === 1)
		if (maxValue === 1) {
			if (numberOfRepetitions >= 2) return 1.5;
			return 1.0;
		}

		// All zeros
		return 0.0;
	}

	/**
	 * Get interpretation text for EDSS score
	 */
	getInterpretation(score: number): string {
		return EDSS_INTERPRETATIONS[score] || 'Ismeretlen EDSS érték';
	}

	/**
	 * Get severity category for EDSS score
	 */
	getSeverityCategory(score: number): {
		label: string;
		color: string;
		description: string;
	} {
		if (score <= 1.5) {
			return {
				label: 'Minimális vagy nincs fogyatékosság',
				color: 'green',
				description: 'A beteg tünetmentes vagy minimális neurológiai jelekkel rendelkezik'
			};
		}
		if (score <= 3.5) {
			return {
				label: 'Enyhe fogyatékosság',
				color: 'blue',
				description: 'Enyhe fogyatékosság, de teljesen járóképes'
			};
		}
		if (score <= 5.5) {
			return {
				label: 'Közepes fogyatékosság',
				color: 'yellow',
				description: 'Jelentős fogyatékosság, de még önellátó'
			};
		}
		if (score <= 6.5) {
			return {
				label: 'Súlyos fogyatékosság',
				color: 'orange',
				description: 'Segítségre szorul a járás során'
			};
		}
		if (score < 10.0) {
			return {
				label: 'Nagyon súlyos fogyatékosság',
				color: 'red',
				description: 'Kerekesszékhez vagy ágyhoz kötött'
			};
		}
		return {
			label: 'Halál SM miatt',
			color: 'gray',
			description: 'SM okozta halál'
		};
	}
}
