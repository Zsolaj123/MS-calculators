import { describe, it, expect, beforeEach } from 'vitest';
import { EDSSService } from './edss.service';
import type { EDSSFunctionalSystems } from '../types';

describe('EDSSService', () => {
	let service: EDSSService;

	beforeEach(() => {
		service = new EDSSService();
	});

	describe('calculateEDSS', () => {
		it('should return 0.0 for all zeros', () => {
			const fs: EDSSFunctionalSystems = {
				visual: 0,
				brainstem: 0,
				pyramidal: 0,
				cerebellar: 0,
				sensory: 0,
				bowelBladder: 0,
				cerebral: 0
			};
			expect(service.calculateEDSS(fs, 0)).toBe(0.0);
		});

		it('should return 1.0 for one FS with score 1', () => {
			const fs: EDSSFunctionalSystems = {
				visual: 1,
				brainstem: 0,
				pyramidal: 0,
				cerebellar: 0,
				sensory: 0,
				bowelBladder: 0,
				cerebral: 0
			};
			expect(service.calculateEDSS(fs, 0)).toBe(1.0);
		});

		it('should return 1.5 for two or more FS with score 1', () => {
			const fs: EDSSFunctionalSystems = {
				visual: 1,
				brainstem: 1,
				pyramidal: 0,
				cerebellar: 0,
				sensory: 0,
				bowelBladder: 0,
				cerebral: 0
			};
			expect(service.calculateEDSS(fs, 0)).toBe(1.5);
		});

		it('should return 2.0 for one FS with score 2', () => {
			const fs: EDSSFunctionalSystems = {
				visual: 2,
				brainstem: 0,
				pyramidal: 0,
				cerebellar: 0,
				sensory: 0,
				bowelBladder: 0,
				cerebral: 0
			};
			expect(service.calculateEDSS(fs, 0)).toBe(2.0);
		});

		it('should return 2.0 for ambulation score 1', () => {
			const fs: EDSSFunctionalSystems = {
				visual: 0,
				brainstem: 0,
				pyramidal: 0,
				cerebellar: 0,
				sensory: 0,
				bowelBladder: 0,
				cerebral: 0
			};
			expect(service.calculateEDSS(fs, 1)).toBe(2.0);
		});

		it('should return 2.5 for two FS with score 2', () => {
			const fs: EDSSFunctionalSystems = {
				visual: 2,
				brainstem: 2,
				pyramidal: 0,
				cerebellar: 0,
				sensory: 0,
				bowelBladder: 0,
				cerebral: 0
			};
			expect(service.calculateEDSS(fs, 0)).toBe(2.5);
		});

		it('should return 3.0 for one non-visual FS with score 3', () => {
			const fs: EDSSFunctionalSystems = {
				visual: 0,
				brainstem: 3,
				pyramidal: 0,
				cerebellar: 0,
				sensory: 0,
				bowelBladder: 0,
				cerebral: 0
			};
			expect(service.calculateEDSS(fs, 0)).toBe(3.0);
		});

		it('should return 3.5 for one non-visual FS with score 3 and one FS with score 2', () => {
			const fs: EDSSFunctionalSystems = {
				visual: 0,
				brainstem: 3,
				pyramidal: 2,
				cerebellar: 0,
				sensory: 0,
				bowelBladder: 0,
				cerebral: 0
			};
			expect(service.calculateEDSS(fs, 0)).toBe(3.5);
		});

		it('should return 4.0 for one non-visual FS with score 4 and low secondary scores', () => {
			const fs: EDSSFunctionalSystems = {
				visual: 0,
				brainstem: 4,
				pyramidal: 0,
				cerebellar: 0,
				sensory: 0,
				bowelBladder: 0,
				cerebral: 0
			};
			expect(service.calculateEDSS(fs, 0)).toBe(4.0);
		});

		it('should return 4.5 for ambulation score 2', () => {
			const fs: EDSSFunctionalSystems = {
				visual: 0,
				brainstem: 0,
				pyramidal: 0,
				cerebellar: 0,
				sensory: 0,
				bowelBladder: 0,
				cerebral: 0
			};
			expect(service.calculateEDSS(fs, 2)).toBe(4.5);
		});

		it('should return 5.0 for one FS with score 5', () => {
			const fs: EDSSFunctionalSystems = {
				visual: 0,
				brainstem: 5,
				pyramidal: 0,
				cerebellar: 0,
				sensory: 0,
				bowelBladder: 0,
				cerebral: 0
			};
			expect(service.calculateEDSS(fs, 0)).toBe(5.0);
		});

		it('should return 5.0 for ambulation score 3', () => {
			const fs: EDSSFunctionalSystems = {
				visual: 0,
				brainstem: 0,
				pyramidal: 0,
				cerebellar: 0,
				sensory: 0,
				bowelBladder: 0,
				cerebral: 0
			};
			expect(service.calculateEDSS(fs, 3)).toBe(5.0);
		});

		it('should return 5.5 for ambulation score 4', () => {
			const fs: EDSSFunctionalSystems = {
				visual: 0,
				brainstem: 0,
				pyramidal: 0,
				cerebellar: 0,
				sensory: 0,
				bowelBladder: 0,
				cerebral: 0
			};
			expect(service.calculateEDSS(fs, 4)).toBe(5.5);
		});

		it('should return 6.0 for ambulation score 5-7', () => {
			const fs: EDSSFunctionalSystems = {
				visual: 0,
				brainstem: 0,
				pyramidal: 0,
				cerebellar: 0,
				sensory: 0,
				bowelBladder: 0,
				cerebral: 0
			};
			expect(service.calculateEDSS(fs, 5)).toBe(6.0);
			expect(service.calculateEDSS(fs, 6)).toBe(6.0);
			expect(service.calculateEDSS(fs, 7)).toBe(6.0);
		});

		it('should return 6.5 for ambulation score 8-9', () => {
			const fs: EDSSFunctionalSystems = {
				visual: 0,
				brainstem: 0,
				pyramidal: 0,
				cerebellar: 0,
				sensory: 0,
				bowelBladder: 0,
				cerebral: 0
			};
			expect(service.calculateEDSS(fs, 8)).toBe(6.5);
			expect(service.calculateEDSS(fs, 9)).toBe(6.5);
		});

		it('should return 7.0 for ambulation score 10', () => {
			const fs: EDSSFunctionalSystems = {
				visual: 0,
				brainstem: 0,
				pyramidal: 0,
				cerebellar: 0,
				sensory: 0,
				bowelBladder: 0,
				cerebral: 0
			};
			expect(service.calculateEDSS(fs, 10)).toBe(7.0);
		});

		it('should return 7.5 for ambulation score 11', () => {
			const fs: EDSSFunctionalSystems = {
				visual: 0,
				brainstem: 0,
				pyramidal: 0,
				cerebellar: 0,
				sensory: 0,
				bowelBladder: 0,
				cerebral: 0
			};
			expect(service.calculateEDSS(fs, 11)).toBe(7.5);
		});

		it('should return 8.0 for ambulation score 12', () => {
			const fs: EDSSFunctionalSystems = {
				visual: 0,
				brainstem: 0,
				pyramidal: 0,
				cerebellar: 0,
				sensory: 0,
				bowelBladder: 0,
				cerebral: 0
			};
			expect(service.calculateEDSS(fs, 12)).toBe(8.0);
		});

		it('should return 8.5 for ambulation score 13', () => {
			const fs: EDSSFunctionalSystems = {
				visual: 0,
				brainstem: 0,
				pyramidal: 0,
				cerebellar: 0,
				sensory: 0,
				bowelBladder: 0,
				cerebral: 0
			};
			expect(service.calculateEDSS(fs, 13)).toBe(8.5);
		});

		it('should return 9.0 for ambulation score 14', () => {
			const fs: EDSSFunctionalSystems = {
				visual: 0,
				brainstem: 0,
				pyramidal: 0,
				cerebellar: 0,
				sensory: 0,
				bowelBladder: 0,
				cerebral: 0
			};
			expect(service.calculateEDSS(fs, 14)).toBe(9.0);
		});

		it('should return 9.5 for ambulation score 15', () => {
			const fs: EDSSFunctionalSystems = {
				visual: 0,
				brainstem: 0,
				pyramidal: 0,
				cerebellar: 0,
				sensory: 0,
				bowelBladder: 0,
				cerebral: 0
			};
			expect(service.calculateEDSS(fs, 15)).toBe(9.5);
		});

		it('should return 10.0 for ambulation score 16 (death)', () => {
			const fs: EDSSFunctionalSystems = {
				visual: 0,
				brainstem: 0,
				pyramidal: 0,
				cerebellar: 0,
				sensory: 0,
				bowelBladder: 0,
				cerebral: 0
			};
			expect(service.calculateEDSS(fs, 16)).toBe(10.0);
		});

		it('should throw error for invalid visual score', () => {
			const fs: EDSSFunctionalSystems = {
				visual: 7,
				brainstem: 0,
				pyramidal: 0,
				cerebellar: 0,
				sensory: 0,
				bowelBladder: 0,
				cerebral: 0
			};
			expect(() => service.calculateEDSS(fs, 0)).toThrow('Visual score out of bounds');
		});

		it('should throw error for invalid ambulation score', () => {
			const fs: EDSSFunctionalSystems = {
				visual: 0,
				brainstem: 0,
				pyramidal: 0,
				cerebellar: 0,
				sensory: 0,
				bowelBladder: 0,
				cerebral: 0
			};
			expect(() => service.calculateEDSS(fs, 17)).toThrow('Ambulation score out of bounds');
		});
	});

	describe('getInterpretation', () => {
		it('should return correct interpretation for EDSS 0.0', () => {
			const interpretation = service.getInterpretation(0.0);
			expect(interpretation).toBe('Normál neurológiai vizsgálat.');
		});

		it('should return correct interpretation for EDSS 5.0', () => {
			const interpretation = service.getInterpretation(5.0);
			expect(interpretation).toContain('200 métert képes megtenni');
		});

		it('should return correct interpretation for EDSS 10.0', () => {
			const interpretation = service.getInterpretation(10.0);
			expect(interpretation).toBe('SM okozta halál.');
		});
	});

	describe('getSeverityCategory', () => {
		it('should return minimal disability for EDSS <= 1.5', () => {
			const category = service.getSeverityCategory(1.0);
			expect(category.label).toBe('Minimális vagy nincs fogyatékosság');
			expect(category.color).toBe('green');
		});

		it('should return mild disability for EDSS 2.0-3.5', () => {
			const category = service.getSeverityCategory(3.0);
			expect(category.label).toBe('Enyhe fogyatékosság');
			expect(category.color).toBe('blue');
		});

		it('should return moderate disability for EDSS 4.0-5.5', () => {
			const category = service.getSeverityCategory(5.0);
			expect(category.label).toBe('Közepes fogyatékosság');
			expect(category.color).toBe('yellow');
		});

		it('should return severe disability for EDSS 6.0-6.5', () => {
			const category = service.getSeverityCategory(6.5);
			expect(category.label).toBe('Súlyos fogyatékosság');
			expect(category.color).toBe('orange');
		});

		it('should return very severe disability for EDSS 7.0-9.5', () => {
			const category = service.getSeverityCategory(8.0);
			expect(category.label).toBe('Nagyon súlyos fogyatékosság');
			expect(category.color).toBe('red');
		});

		it('should return death for EDSS 10.0', () => {
			const category = service.getSeverityCategory(10.0);
			expect(category.label).toBe('Halál SM miatt');
			expect(category.color).toBe('gray');
		});
	});
});
