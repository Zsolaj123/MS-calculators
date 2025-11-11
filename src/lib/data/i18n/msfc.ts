/**
 * MSFC Translations
 *
 * Multiple Sclerosis Functional Composite translations for Hungarian and English
 */

import type { Translation } from './types';

export interface MSFCTranslations {
	// Page metadata
	pageTitle: Translation;
	pageDescription: Translation;

	// Main title
	testTitle: Translation;
	testSubtitle: Translation;

	// Test names
	testNames: {
		hpt_dominant: Translation;
		hpt_non_dominant: Translation;
		t25fw: Translation;
		pasat3: Translation;
	};

	// Test instructions
	instructions: {
		hpt_dominant: Translation;
		hpt_non_dominant: Translation;
		t25fw: Translation;
		pasat3: Translation;
	};

	// Component labels
	selectTest: Translation;
	currentTest: Translation;
	elapsedTime: Translation;
	testMode: Translation;
	timerMode: Translation;
	manualEntryMode: Translation;

	// Buttons
	startTimer: Translation;
	stopTimer: Translation;
	resetTimer: Translation;
	submitManual: Translation;
	toggleMode: Translation;
	calculateResults: Translation;

	// Manual entry
	manualEntry: Translation;
	enterTime: Translation;
	enterTimeSeconds: Translation;
	enterScore: Translation;
	seconds: Translation;
	correctAnswers: Translation;

	// Results
	results: Translation;
	rawScores: Translation;
	dominantHand: Translation;
	nonDominantHand: Translation;
	averageHand: Translation;
	walkTime: Translation;
	cognitiveScore: Translation;

	// Z-scores
	zScores: Translation;
	armFunction: Translation;
	legFunction: Translation;
	cognitiveFunction: Translation;
	compositeScore: Translation;

	// Interpretation
	interpretation: Translation;
	referenceType: Translation;
	nmssReference: Translation;
	europeanReference: Translation;
	ageAdjusted: Translation;

	// Messages
	completeAllTests: Translation;
	testComplete: Translation;
	noDataYet: Translation;
	invalidInput: Translation;

	// Info sections
	aboutMSFC: Translation;
	aboutText: Translation;
	componentsTitle: Translation;
	components: { hu: string[]; en: string[] };
	interpretationTitle: Translation;
	interpretationText: Translation;
}

export const msfc: MSFCTranslations = {
	pageTitle: {
		hu: 'MSFC - Multiple Sclerosis Functional Composite - Neuratos MS',
		en: 'MSFC - Multiple Sclerosis Functional Composite - Neuratos MS'
	},
	pageDescription: {
		hu: 'MSFC - Komplex funkcionális értékelés MS betegeknek',
		en: 'MSFC - Comprehensive functional assessment for MS patients'
	},

	testTitle: {
		hu: 'MSFC Teszt',
		en: 'MSFC Test'
	},
	testSubtitle: {
		hu: 'Multiple Sclerosis Functional Composite',
		en: 'Multiple Sclerosis Functional Composite'
	},

	testNames: {
		hpt_dominant: {
			hu: '9HPT - Domináns kéz',
			en: '9HPT - Dominant Hand'
		},
		hpt_non_dominant: {
			hu: '9HPT - Nem domináns kéz',
			en: '9HPT - Non-dominant Hand'
		},
		t25fw: {
			hu: 'T25FW - Járás teszt',
			en: 'T25FW - Walking Test'
		},
		pasat3: {
			hu: 'PASAT-3 - Kognitív teszt',
			en: 'PASAT-3 - Cognitive Test'
		}
	},

	instructions: {
		hpt_dominant: {
			hu: '9-lyukas pálca teszt - domináns kéz. Helyezze a 9 pálcát a lyukakba a lehető leggyorsabban, majd vegye ki őket.',
			en: '9-Hole Peg Test - dominant hand. Place 9 pegs in holes as quickly as possible, then remove them.'
		},
		hpt_non_dominant: {
			hu: '9-lyukas pálca teszt - nem domináns kéz. Helyezze a 9 pálcát a lyukakba a lehető leggyorsabban, majd vegye ki őket.',
			en: '9-Hole Peg Test - non-dominant hand. Place 9 pegs in holes as quickly as possible, then remove them.'
		},
		t25fw: {
			hu: 'Időzített 25 láb járás. Menjen végig a 25 láb (7.62 méter) távon a lehető leggyorsabban, de biztonságosan.',
			en: 'Timed 25-Foot Walk. Walk 25 feet (7.62 meters) as quickly as possible but safely.'
		},
		pasat3: {
			hu: 'PASAT-3 teszt. Adja össze az egymást követő számokat. Minden új számot az előző számmal adjon össze.',
			en: 'PASAT-3 test. Add consecutive numbers. Add each new number to the immediately preceding number.'
		}
	},

	selectTest: {
		hu: 'Válasszon tesztet:',
		en: 'Select test:'
	},
	currentTest: {
		hu: 'Aktuális teszt:',
		en: 'Current test:'
	},
	elapsedTime: {
		hu: 'Eltelt idő:',
		en: 'Elapsed time:'
	},
	testMode: {
		hu: 'Teszt mód:',
		en: 'Test mode:'
	},
	timerMode: {
		hu: 'Időmérő mód',
		en: 'Timer mode'
	},
	manualEntryMode: {
		hu: 'Kézi bevitel',
		en: 'Manual entry'
	},

	startTimer: {
		hu: 'Időmérő indítása',
		en: 'Start timer'
	},
	stopTimer: {
		hu: 'Időmérő leállítása',
		en: 'Stop timer'
	},
	resetTimer: {
		hu: 'Visszaállítás',
		en: 'Reset'
	},
	submitManual: {
		hu: 'Eredmény rögzítése',
		en: 'Submit result'
	},
	toggleMode: {
		hu: 'Váltás kézi bevitelre / időmérőre',
		en: 'Toggle manual / timer mode'
	},
	calculateResults: {
		hu: 'Eredmények számítása',
		en: 'Calculate results'
	},

	manualEntry: {
		hu: 'Kézi eredmény bevitel',
		en: 'Manual result entry'
	},
	enterTime: {
		hu: 'Idő megadása:',
		en: 'Enter time:'
	},
	enterTimeSeconds: {
		hu: 'Idő megadása (másodperc):',
		en: 'Enter time (seconds):'
	},
	enterScore: {
		hu: 'Pontszám megadása:',
		en: 'Enter score:'
	},
	seconds: {
		hu: 'másodperc',
		en: 'seconds'
	},
	correctAnswers: {
		hu: 'helyes válasz (0-60)',
		en: 'correct answers (0-60)'
	},

	results: {
		hu: 'Eredmények',
		en: 'Results'
	},
	rawScores: {
		hu: 'Nyers pontszámok',
		en: 'Raw scores'
	},
	dominantHand: {
		hu: 'Domináns kéz:',
		en: 'Dominant hand:'
	},
	nonDominantHand: {
		hu: 'Nem domináns kéz:',
		en: 'Non-dominant hand:'
	},
	averageHand: {
		hu: 'Átlag (két kéz):',
		en: 'Average (both hands):'
	},
	walkTime: {
		hu: 'Járási idő:',
		en: 'Walk time:'
	},
	cognitiveScore: {
		hu: 'PASAT-3 pontszám:',
		en: 'PASAT-3 score:'
	},

	zScores: {
		hu: 'Z-score eredmények',
		en: 'Z-score results'
	},
	armFunction: {
		hu: 'Kar funkció (9HPT):',
		en: 'Arm function (9HPT):'
	},
	legFunction: {
		hu: 'Láb funkció (T25FW):',
		en: 'Leg function (T25FW):'
	},
	cognitiveFunction: {
		hu: 'Kognitív funkció (PASAT-3):',
		en: 'Cognitive function (PASAT-3):'
	},
	compositeScore: {
		hu: 'Összetett pontszám:',
		en: 'Composite score:'
	},

	interpretation: {
		hu: 'Értelmezés',
		en: 'Interpretation'
	},
	referenceType: {
		hu: 'Referencia adatok:',
		en: 'Reference data:'
	},
	nmssReference: {
		hu: 'NMSS adatbázis',
		en: 'NMSS database'
	},
	europeanReference: {
		hu: 'Európai normák',
		en: 'European norms'
	},
	ageAdjusted: {
		hu: 'Életkor-korrigált',
		en: 'Age-adjusted'
	},

	completeAllTests: {
		hu: 'Kérjük, végezze el mindhárom tesztet a kompozit pontszám kiszámításához.',
		en: 'Please complete all three tests to calculate the composite score.'
	},
	testComplete: {
		hu: 'Teszt befejezve',
		en: 'Test complete'
	},
	noDataYet: {
		hu: 'Még nincsenek adatok',
		en: 'No data yet'
	},
	invalidInput: {
		hu: 'Érvénytelen bemenet',
		en: 'Invalid input'
	},

	aboutMSFC: {
		hu: 'Az MSFC-ről',
		en: 'About MSFC'
	},
	aboutText: {
		hu: 'Az MSFC (Multiple Sclerosis Functional Composite) egy standardizált teszt csomag, amely három fő funkcionális területet mér: kar funkció (9HPT), láb funkció (T25FW), és kognitív funkció (PASAT-3).',
		en: 'The MSFC (Multiple Sclerosis Functional Composite) is a standardized test battery that measures three main functional areas: arm function (9HPT), leg function (T25FW), and cognitive function (PASAT-3).'
	},
	componentsTitle: {
		hu: 'MSFC komponensek:',
		en: 'MSFC components:'
	},
	components: {
		hu: [
			'9-Hole Peg Test (9HPT): Felső végtag finommotoros funkció mérése',
			'Timed 25-Foot Walk (T25FW): Alsó végtag funkció és mobilitás mérése',
			'PASAT-3: Kognitív feldolgozási sebesség és munkamemória mérése'
		],
		en: [
			'9-Hole Peg Test (9HPT): Measures upper extremity fine motor function',
			'Timed 25-Foot Walk (T25FW): Measures lower extremity function and mobility',
			'PASAT-3: Measures cognitive processing speed and working memory'
		]
	},
	interpretationTitle: {
		hu: 'Z-score értelmezés:',
		en: 'Z-score interpretation:'
	},
	interpretationText: {
		hu: 'A Z-score azt mutatja meg, hogy a teljesítmény mennyivel tér el a referencia populáció átlagától. Pozitív értékek átlag feletti, negatív értékek átlag alatti teljesítményt jelentenek.',
		en: 'The Z-score shows how much the performance differs from the reference population average. Positive values indicate above-average, negative values indicate below-average performance.'
	}
};
