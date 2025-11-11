/**
 * PASAT Translations
 *
 * Paced Auditory Serial Addition Test translations for Hungarian and English
 */

import type { Translation, TranslationArray } from './types';

export interface PASATTranslations {
	// Page metadata
	pageTitle: Translation;
	pageDescription: Translation;

	// Main title
	testTitle: Translation;
	testSubtitle: Translation;

	// Test versions
	versions: {
		pasat3: Translation;
		pasat2: Translation;
	};

	// Test purpose and description
	purposeTitle: Translation;
	purposeText: Translation;
	whatIsPASAT: Translation;
	whatIsPASATText: Translation;

	// Instructions
	instructionsTitle: Translation;
	instructionsList: TranslationArray;
	practiceInstructions: Translation;
	mainTestInstructions: Translation;

	// Configuration
	configurationTitle: Translation;
	selectVersion: Translation;
	age: Translation;
	yearsOfEducation: Translation;
	audioSettings: Translation;
	muteAudio: Translation;
	unmuteAudio: Translation;

	// Practice mode
	practiceTitle: Translation;
	practiceDescription: Translation;
	startPractice: Translation;
	skipPractice: Translation;
	practiceTrials: Translation;
	showFeedback: Translation;

	// Test controls
	startTest: Translation;
	endTest: Translation;
	pauseTest: Translation;
	resumeTest: Translation;
	resetTest: Translation;

	// Test status
	testInProgress: Translation;
	waitingForAnswer: Translation;
	currentDigit: Translation;
	previousDigit: Translation;
	expectedAnswer: Translation;
	yourAnswer: Translation;

	// Progress
	progressTitle: Translation;
	trialsCompleted: Translation;
	currentScore: Translation;
	correctAnswers: Translation;
	incorrectAnswers: Translation;
	omissions: Translation;
	percentCorrect: Translation;

	// Answer input
	answerInputTitle: Translation;
	enterYourAnswer: Translation;
	submitAnswer: Translation;
	skipTrial: Translation;
	answerPlaceholder: Translation;

	// Feedback (practice mode)
	correctFeedback: Translation;
	incorrectFeedback: Translation;
	correctAnswerWas: Translation;
	noAnswerGiven: Translation;

	// Results
	resultsTitle: Translation;
	testComplete: Translation;
	rawScores: Translation;
	totalTrials: Translation;
	correctResponses: Translation;
	incorrectResponses: Translation;
	omissionsCount: Translation;
	rawScore: Translation;
	percentageCorrect: Translation;

	// Z-scores
	zScoresTitle: Translation;
	standardZScore: Translation;
	ageAdjustedZScore: Translation;
	educationAdjustedZScore: Translation;

	// Performance interpretation
	interpretationTitle: Translation;
	performanceLevel: Translation;
	performanceLevels: {
		normal: { label: Translation; description: Translation };
		borderline: { label: Translation; description: Translation };
		impaired: { label: Translation; description: Translation };
		severelyImpaired: { label: Translation; description: Translation };
	};

	// Timing statistics
	timingStatsTitle: Translation;
	averageResponseTime: Translation;
	medianResponseTime: Translation;
	minResponseTime: Translation;
	maxResponseTime: Translation;
	testDuration: Translation;

	// Reference information
	referenceTitle: Translation;
	referenceText: Translation;
	bicamsReference: Translation;
	clinicalUse: Translation;
	clinicalUseText: Translation;

	// Warnings and errors
	testNotStarted: Translation;
	testAlreadyActive: Translation;
	invalidAnswer: Translation;
	audioNotSupported: Translation;
	browserCompatibility: Translation;

	// MSFC integration
	exportToMSFC: Translation;
	useInMSFC: Translation;

	// About PASAT
	aboutTitle: Translation;
	aboutText: Translation;
	cognitiveDomainsTitle: Translation;
	cognitiveDomains: TranslationArray;
	administrationTitle: Translation;
	administrationText: Translation;
	scoringTitle: Translation;
	scoringText: Translation;
}

export const pasat: PASATTranslations = {
	pageTitle: {
		hu: 'PASAT - Paced Auditory Serial Addition Test - Neuratos MS',
		en: 'PASAT - Paced Auditory Serial Addition Test - Neuratos MS'
	},
	pageDescription: {
		hu: 'PASAT - Hallási munkamemória és információfeldolgozási sebesség mérése',
		en: 'PASAT - Assessment of auditory working memory and information processing speed'
	},

	testTitle: {
		hu: 'PASAT Teszt',
		en: 'PASAT Test'
	},
	testSubtitle: {
		hu: 'Paced Auditory Serial Addition Test',
		en: 'Paced Auditory Serial Addition Test'
	},

	versions: {
		pasat3: {
			hu: 'PASAT-3 (3 másodperces)',
			en: 'PASAT-3 (3 seconds)'
		},
		pasat2: {
			hu: 'PASAT-2 (2 másodperces)',
			en: 'PASAT-2 (2 seconds)'
		}
	},

	purposeTitle: {
		hu: 'A teszt célja',
		en: 'Test Purpose'
	},
	purposeText: {
		hu: 'A PASAT a hallási információfeldolgozási sebességet, munkamemóriát és koncentrációs képességet méri. A teszt során egyjegyű számokat hall 3 (vagy 2) másodpercenként, és minden új számot az előző számmal kell összeadnia.',
		en: 'The PASAT measures auditory information processing speed, working memory, and sustained attention. During the test, you will hear single digits every 3 (or 2) seconds, and must add each new digit to the immediately preceding digit.'
	},

	whatIsPASAT: {
		hu: 'Mi a PASAT?',
		en: 'What is PASAT?'
	},
	whatIsPASATText: {
		hu: 'A PASAT egy standardizált neuropszichiátriai teszt, amely az információfeldolgozási sebességet és a munkamemóriát értékeli. Széles körben használják sclerosis multiplexben szenvedő betegeknél a kognitív funkció monitorozására.',
		en: 'PASAT is a standardized neuropsychiatric test that assesses information processing speed and working memory. It is widely used in multiple sclerosis patients to monitor cognitive function.'
	},

	instructionsTitle: {
		hu: 'Utasítások',
		en: 'Instructions'
	},
	instructionsList: {
		hu: [
			'Egyjegyű számokat fog hallani (1-9) 3 másodpercenként',
			'Minden új számot az ELŐZŐ számmal kell összeadnia',
			'Az ELSŐ számot NEM kell összeadni semmivel (nincs előző szám)',
			'A válaszokat 2-18 között adhatja meg',
			'Ha nem tudja a választ, hagyja ki azt a kört',
			'Összesen 60 szám lesz bemutatva',
			'A teszt körülbelül 3 percig tart'
		],
		en: [
			'You will hear single digits (1-9) every 3 seconds',
			'Add each new digit to the PREVIOUS digit',
			'Do NOT add anything to the FIRST digit (no previous digit)',
			'Answers range from 2-18',
			'If you don\'t know the answer, skip that trial',
			'A total of 60 digits will be presented',
			'The test takes approximately 3 minutes'
		]
	},

	practiceInstructions: {
		hu: 'Gyakorlás: 10 próbaszám visszajelzéssel. Használja a gyakorlást a teszt megértésére.',
		en: 'Practice: 10 practice digits with feedback. Use practice to understand the test.'
	},
	mainTestInstructions: {
		hu: 'Fő teszt: 60 szám visszajelzés nélkül. Koncentráljon és dolgozzon a lehető leggyorsabban és legpontosabban.',
		en: 'Main test: 60 digits without feedback. Concentrate and work as quickly and accurately as possible.'
	},

	configurationTitle: {
		hu: 'Beállítások',
		en: 'Configuration'
	},
	selectVersion: {
		hu: 'Válasszon verziót:',
		en: 'Select version:'
	},
	age: {
		hu: 'Életkor (opcionális):',
		en: 'Age (optional):'
	},
	yearsOfEducation: {
		hu: 'Iskolai végzettség (évek):',
		en: 'Years of education:'
	},
	audioSettings: {
		hu: 'Hang beállítások',
		en: 'Audio settings'
	},
	muteAudio: {
		hu: 'Hang némítása',
		en: 'Mute audio'
	},
	unmuteAudio: {
		hu: 'Hang bekapcsolása',
		en: 'Unmute audio'
	},

	practiceTitle: {
		hu: 'Gyakorlás',
		en: 'Practice'
	},
	practiceDescription: {
		hu: 'Kezdje gyakorlással, hogy megismerje a tesztet. Visszajelzést kap minden válaszról.',
		en: 'Start with practice to familiarize yourself with the test. You will receive feedback on each answer.'
	},
	startPractice: {
		hu: 'Gyakorlás indítása',
		en: 'Start Practice'
	},
	skipPractice: {
		hu: 'Gyakorlás kihagyása',
		en: 'Skip Practice'
	},
	practiceTrials: {
		hu: 'Gyakorló próbák száma:',
		en: 'Practice trials:'
	},
	showFeedback: {
		hu: 'Visszajelzés megjelenítése',
		en: 'Show feedback'
	},

	startTest: {
		hu: 'Teszt indítása',
		en: 'Start Test'
	},
	endTest: {
		hu: 'Teszt befejezése',
		en: 'End Test'
	},
	pauseTest: {
		hu: 'Szünet',
		en: 'Pause'
	},
	resumeTest: {
		hu: 'Folytatás',
		en: 'Resume'
	},
	resetTest: {
		hu: 'Újrakezdés',
		en: 'Reset'
	},

	testInProgress: {
		hu: 'Teszt folyamatban...',
		en: 'Test in progress...'
	},
	waitingForAnswer: {
		hu: 'Válaszra vár...',
		en: 'Waiting for answer...'
	},
	currentDigit: {
		hu: 'Jelenlegi szám:',
		en: 'Current digit:'
	},
	previousDigit: {
		hu: 'Előző szám:',
		en: 'Previous digit:'
	},
	expectedAnswer: {
		hu: 'Várt válasz:',
		en: 'Expected answer:'
	},
	yourAnswer: {
		hu: 'Az Ön válasza:',
		en: 'Your answer:'
	},

	progressTitle: {
		hu: 'Haladás',
		en: 'Progress'
	},
	trialsCompleted: {
		hu: 'Befejezett próbák:',
		en: 'Trials completed:'
	},
	currentScore: {
		hu: 'Aktuális pontszám:',
		en: 'Current score:'
	},
	correctAnswers: {
		hu: 'Helyes válaszok:',
		en: 'Correct answers:'
	},
	incorrectAnswers: {
		hu: 'Helytelen válaszok:',
		en: 'Incorrect answers:'
	},
	omissions: {
		hu: 'Kihagyások:',
		en: 'Omissions:'
	},
	percentCorrect: {
		hu: 'Helyes százalék:',
		en: 'Percent correct:'
	},

	answerInputTitle: {
		hu: 'Válasz megadása',
		en: 'Answer Input'
	},
	enterYourAnswer: {
		hu: 'Írja be a választ (2-18):',
		en: 'Enter your answer (2-18):'
	},
	submitAnswer: {
		hu: 'Válasz beküldése',
		en: 'Submit Answer'
	},
	skipTrial: {
		hu: 'Kihagyás',
		en: 'Skip Trial'
	},
	answerPlaceholder: {
		hu: '2-18',
		en: '2-18'
	},

	correctFeedback: {
		hu: 'Helyes! ✓',
		en: 'Correct! ✓'
	},
	incorrectFeedback: {
		hu: 'Helytelen ✗',
		en: 'Incorrect ✗'
	},
	correctAnswerWas: {
		hu: 'A helyes válasz:',
		en: 'The correct answer was:'
	},
	noAnswerGiven: {
		hu: 'Nem adott választ',
		en: 'No answer given'
	},

	resultsTitle: {
		hu: 'Eredmények',
		en: 'Results'
	},
	testComplete: {
		hu: 'Teszt befejezve!',
		en: 'Test Complete!'
	},
	rawScores: {
		hu: 'Nyers pontszámok',
		en: 'Raw Scores'
	},
	totalTrials: {
		hu: 'Összes próba:',
		en: 'Total trials:'
	},
	correctResponses: {
		hu: 'Helyes válaszok:',
		en: 'Correct responses:'
	},
	incorrectResponses: {
		hu: 'Helytelen válaszok:',
		en: 'Incorrect responses:'
	},
	omissionsCount: {
		hu: 'Kihagyások:',
		en: 'Omissions:'
	},
	rawScore: {
		hu: 'Nyers pontszám:',
		en: 'Raw score:'
	},
	percentageCorrect: {
		hu: 'Helyes százalék:',
		en: 'Percentage correct:'
	},

	zScoresTitle: {
		hu: 'Z-score eredmények',
		en: 'Z-Score Results'
	},
	standardZScore: {
		hu: 'Standard Z-score (BICAMS):',
		en: 'Standard Z-score (BICAMS):'
	},
	ageAdjustedZScore: {
		hu: 'Életkor-korrigált Z-score:',
		en: 'Age-adjusted Z-score:'
	},
	educationAdjustedZScore: {
		hu: 'Végzettség-korrigált Z-score:',
		en: 'Education-adjusted Z-score:'
	},

	interpretationTitle: {
		hu: 'Értelmezés',
		en: 'Interpretation'
	},
	performanceLevel: {
		hu: 'Teljesítmény szint:',
		en: 'Performance level:'
	},
	performanceLevels: {
		normal: {
			label: { hu: 'Normál', en: 'Normal' },
			description: {
				hu: 'A teljesítmény a normál tartományban van (z ≥ -1.0)',
				en: 'Performance is within normal range (z ≥ -1.0)'
			}
		},
		borderline: {
			label: { hu: 'Határérték', en: 'Borderline' },
			description: {
				hu: 'Enyhe deficit mutatható ki (-2.0 ≤ z < -1.0)',
				en: 'Mild deficit detected (-2.0 ≤ z < -1.0)'
			}
		},
		impaired: {
			label: { hu: 'Károsodott', en: 'Impaired' },
			description: {
				hu: 'Mérsékelt kognitív deficit (-3.0 ≤ z < -2.0)',
				en: 'Moderate cognitive deficit (-3.0 ≤ z < -2.0)'
			}
		},
		severelyImpaired: {
			label: { hu: 'Súlyosan károsodott', en: 'Severely Impaired' },
			description: {
				hu: 'Súlyos kognitív deficit (z < -3.0)',
				en: 'Severe cognitive deficit (z < -3.0)'
			}
		}
	},

	timingStatsTitle: {
		hu: 'Időzítési statisztikák',
		en: 'Timing Statistics'
	},
	averageResponseTime: {
		hu: 'Átlagos válaszidő:',
		en: 'Average response time:'
	},
	medianResponseTime: {
		hu: 'Medián válaszidő:',
		en: 'Median response time:'
	},
	minResponseTime: {
		hu: 'Leggyorsabb válasz:',
		en: 'Fastest response:'
	},
	maxResponseTime: {
		hu: 'Leglassabb válasz:',
		en: 'Slowest response:'
	},
	testDuration: {
		hu: 'Teszt időtartam:',
		en: 'Test duration:'
	},

	referenceTitle: {
		hu: 'Referenciák',
		en: 'References'
	},
	referenceText: {
		hu: 'Gronwall DMA. Paced auditory serial-addition task: a measure of recovery from concussion. Perceptual and Motor Skills. 1977;44(2):367-373.',
		en: 'Gronwall DMA. Paced auditory serial-addition task: a measure of recovery from concussion. Perceptual and Motor Skills. 1977;44(2):367-373.'
	},
	bicamsReference: {
		hu: 'BICAMS normák: Benedict RHB, et al. Mult Scler. 2017;23(5):721-733. PMID: 27270498',
		en: 'BICAMS norms: Benedict RHB, et al. Mult Scler. 2017;23(5):721-733. PMID: 27270498'
	},

	clinicalUse: {
		hu: 'Klinikai használat',
		en: 'Clinical Use'
	},
	clinicalUseText: {
		hu: 'A PASAT-3 a BICAMS (Brief International Cognitive Assessment for MS) kognitív tesztcsomag része. Különösen érzékeny a sclerosis multiplexben gyakori információfeldolgozási sebesség lassulására.',
		en: 'PASAT-3 is part of the BICAMS (Brief International Cognitive Assessment for MS) cognitive test battery. It is particularly sensitive to slowed information processing speed common in multiple sclerosis.'
	},

	testNotStarted: {
		hu: 'A teszt még nem kezdődött el',
		en: 'Test has not started yet'
	},
	testAlreadyActive: {
		hu: 'A teszt már folyamatban van',
		en: 'Test is already active'
	},
	invalidAnswer: {
		hu: 'Érvénytelen válasz. Kérjük, adjon meg egy számot 2 és 18 között.',
		en: 'Invalid answer. Please enter a number between 2 and 18.'
	},
	audioNotSupported: {
		hu: 'A hanglejátszás nem támogatott ebben a böngészőben',
		en: 'Audio playback is not supported in this browser'
	},
	browserCompatibility: {
		hu: 'Legjobb élmény érdekében használjon Chrome, Firefox vagy Safari böngészőt',
		en: 'For best experience, use Chrome, Firefox, or Safari browser'
	},

	exportToMSFC: {
		hu: 'Exportálás MSFC-be',
		en: 'Export to MSFC'
	},
	useInMSFC: {
		hu: 'Használat MSFC-ben',
		en: 'Use in MSFC'
	},

	aboutTitle: {
		hu: 'A PASAT-ról',
		en: 'About PASAT'
	},
	aboutText: {
		hu: 'A Paced Auditory Serial Addition Test (PASAT) egy neuropszichiátriai teszt, amelyet kognitív funkció értékelésére fejlesztettek ki, különös tekintettel az információfeldolgozási sebességre és munkamemóriára.',
		en: 'The Paced Auditory Serial Addition Test (PASAT) is a neuropsychiatric test designed to assess cognitive function, particularly information processing speed and working memory.'
	},

	cognitiveDomainsTitle: {
		hu: 'Mért kognitív területek:',
		en: 'Cognitive domains assessed:'
	},
	cognitiveDomains: {
		hu: [
			'Információfeldolgozási sebesség',
			'Hallási munkamemória',
			'Megosztott figyelem',
			'Aritmetikai képesség',
			'Koncentráció és kitartás'
		],
		en: [
			'Information processing speed',
			'Auditory working memory',
			'Divided attention',
			'Arithmetic ability',
			'Sustained attention and concentration'
		]
	},

	administrationTitle: {
		hu: 'Alkalmazás',
		en: 'Administration'
	},
	administrationText: {
		hu: 'A PASAT-3 az MSFC (Multiple Sclerosis Functional Composite) kognitív komponense. Tipikusan a 9-Hole Peg Test és a Timed 25-Foot Walk tesztekkel együtt alkalmazzák.',
		en: 'PASAT-3 is the cognitive component of the MSFC (Multiple Sclerosis Functional Composite). It is typically administered along with the 9-Hole Peg Test and Timed 25-Foot Walk.'
	},

	scoringTitle: {
		hu: 'Pontozás',
		en: 'Scoring'
	},
	scoringText: {
		hu: 'A nyers pontszám a helyes válaszok száma (0-60). A Z-score az életkor és végzettség szerint korrigálható. A -1.0-nál alacsonyabb Z-score kognitív károsodásra utal.',
		en: 'Raw score is the number of correct responses (0-60). Z-score can be adjusted for age and education. Z-scores below -1.0 suggest cognitive impairment.'
	}
};
