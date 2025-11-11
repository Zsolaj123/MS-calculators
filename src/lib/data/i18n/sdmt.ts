/**
 * SDMT Translations
 *
 * Symbol Digit Modalities Test translations for Hungarian and English
 */

import type { Translation } from './types';

export interface SDMTTranslations {
	// Page metadata
	pageTitle: Translation;
	pageDescription: Translation;

	// Main titles
	testTitle: Translation;
	testSubtitle: Translation;

	// Instruction sections
	purposeTitle: Translation;
	purposeText: Translation;
	instructionsTitle: Translation;
	instructionsList: { hu: string[]; en: string[] };

	// Demographics
	demographicsTitle: Translation;
	demographicsOptional: Translation;
	ageLabel: Translation;
	agePlaceholder: Translation;
	educationLabel: Translation;
	educationPlaceholder: Translation;
	genderLabel: Translation;
	genderMale: Translation;
	genderFemale: Translation;

	// Settings
	settingsTitle: Translation;
	colorSchemeLabel: Translation;
	colorSchemes: {
		blue: Translation;
		green: Translation;
		purple: Translation;
		teal: Translation;
	};
	symbolSetLabel: Translation;
	symbolSets: {
		classic: Translation;
		geometric: Translation;
		lines: Translation;
		arrows: Translation;
		unicode: Translation;
		unicodeExtended: Translation;
	};
	randomizeButton: Translation;

	// Practice section
	practiceTitle: Translation;
	practiceText: Translation;
	startPracticeButton: Translation;

	// Test section
	testSectionTitle: Translation;
	testSectionText: Translation;
	testDuration: Translation;
	startTestButton: Translation;

	// Test mode labels
	testModes: {
		classic: Translation;
		mobile: Translation;
		random: Translation;
	};

	// During test
	practiceProgress: Translation; // "Practice {current}/{total}"
	testMode: Translation; // "Test" or "Practice"
	correctAnswers: Translation;
	timeRemaining: Translation;
	testPaused: Translation;
	whichNumber: Translation;

	// Results
	testComplete: Translation;
	yourResults: Translation;
	rawScore: Translation;
	accuracy: Translation;
	totalResponses: Translation;
	testModeUsed: Translation;

	// BICAMS results
	bicamsZScore: Translation;
	percentile: Translation;
	performanceLevel: Translation;

	performanceLevels: {
		normal: { label: Translation; description: Translation };
		borderline: { label: Translation; description: Translation };
		impaired: { label: Translation; description: Translation };
		severelyImpaired: { label: Translation; description: Translation };
	};

	// Buttons
	backToMenu: Translation;
	restart: Translation;
	exportResults: Translation;

	// Messages
	noZScoreMessage: Translation;
}

export const sdmt: SDMTTranslations = {
	pageTitle: {
		hu: 'SDMT - Symbol Digit Modalities Test - Neuratos MS',
		en: 'SDMT - Symbol Digit Modalities Test - Neuratos MS'
	},
	pageDescription: {
		hu: 'Symbol Digit Modalities Test - Kognitív feldolgozási sebesség értékelése',
		en: 'Symbol Digit Modalities Test - Cognitive processing speed assessment'
	},

	testTitle: {
		hu: 'SDMT Teszt',
		en: 'SDMT Test'
	},
	testSubtitle: {
		hu: 'Symbol Digit Modalities Test',
		en: 'Symbol Digit Modalities Test'
	},

	purposeTitle: {
		hu: '🎯 A teszt célja',
		en: '🎯 Test Purpose'
	},
	purposeText: {
		hu: 'Az SDMT a feldolgozási sebességet és a vizuális munkamemóriát méri. A képernyő tetején 9 szimbólum látható számokkal. A középen megjelenő szimbólumhoz kell kiválasztani a megfelelő számot az alsó billentyűzeten.',
		en: 'The SDMT measures processing speed and visual working memory. The top of the screen shows 9 symbols with numbers. You need to select the correct number on the bottom keypad for the symbol displayed in the center.'
	},

	instructionsTitle: {
		hu: '📋 Utasítások',
		en: '📋 Instructions'
	},
	instructionsList: {
		hu: [
			'Nézd meg a felső kulcsot - minden szimbólumhoz tartozik egy szám (1-9)',
			'A középen megjelenik egy nagyméretű szimbólum',
			'Válaszd ki a megfelelő számot az alsó billentyűzeten',
			'Dolgozz gyorsan, de pontosan!'
		],
		en: [
			'Look at the key at the top - each symbol has a number (1-9)',
			'A large symbol will appear in the center',
			'Select the correct number on the bottom keypad',
			'Work quickly but accurately!'
		]
	},

	demographicsTitle: {
		hu: '👤 Demográfiai adatok (Z-score számításhoz)',
		en: '👤 Demographics (for Z-score calculation)'
	},
	demographicsOptional: {
		hu: 'Opcionális: Add meg az adatokat a BICAMS z-score számításához',
		en: 'Optional: Provide data for BICAMS z-score calculation'
	},
	ageLabel: {
		hu: 'Életkor:',
		en: 'Age:'
	},
	agePlaceholder: {
		hu: 'pl. 35',
		en: 'e.g. 35'
	},
	educationLabel: {
		hu: 'Iskolai végzettség (évek):',
		en: 'Education (years):'
	},
	educationPlaceholder: {
		hu: 'pl. 16',
		en: 'e.g. 16'
	},
	genderLabel: {
		hu: 'Nem:',
		en: 'Gender:'
	},
	genderMale: {
		hu: 'Férfi',
		en: 'Male'
	},
	genderFemale: {
		hu: 'Nő',
		en: 'Female'
	},

	settingsTitle: {
		hu: '⚙️ Beállítások',
		en: '⚙️ Settings'
	},
	colorSchemeLabel: {
		hu: 'Színséma:',
		en: 'Color scheme:'
	},
	colorSchemes: {
		blue: { hu: 'Kék', en: 'Blue' },
		green: { hu: 'Zöld', en: 'Green' },
		purple: { hu: 'Lila', en: 'Purple' },
		teal: { hu: 'Türkiz', en: 'Teal' }
	},
	symbolSetLabel: {
		hu: 'Szimbólumkészlet:',
		en: 'Symbol set:'
	},
	symbolSets: {
		classic: { hu: 'Klasszikus', en: 'Classic' },
		geometric: { hu: 'Geometriai', en: 'Geometric' },
		lines: { hu: 'Vonalak', en: 'Lines' },
		arrows: { hu: 'Nyilak', en: 'Arrows' },
		unicode: { hu: 'Unicode', en: 'Unicode' },
		unicodeExtended: { hu: 'Unicode Kibővített', en: 'Unicode Extended' }
	},
	randomizeButton: {
		hu: '🔀 Szimbólumok keverése',
		en: '🔀 Shuffle symbols'
	},

	practiceTitle: {
		hu: '🎓 Gyakorlás',
		en: '🎓 Practice'
	},
	practiceText: {
		hu: 'Először gyakorolj 10 feladattal, hogy megismerkedj a teszttel. Nincs időkorlát, és látni fogod, hogy helyesen válaszoltál-e.',
		en: 'First practice with 10 trials to familiarize yourself with the test. There is no time limit, and you will see if you answered correctly.'
	},
	startPracticeButton: {
		hu: 'Gyakorlás indítása',
		en: 'Start practice'
	},

	testSectionTitle: {
		hu: '🧪 Teszt',
		en: '🧪 Test'
	},
	testSectionText: {
		hu: 'alatt válaszolj a lehető legtöbb feladatra. A teszt nem áll meg hibás válasz esetén.',
		en: 'to answer as many trials as possible. The test does not stop for incorrect answers.'
	},
	testDuration: {
		hu: '90 másodperc',
		en: '90 seconds'
	},
	startTestButton: {
		hu: 'Teszt indítása',
		en: 'Start test'
	},

	testModes: {
		classic: {
			hu: 'Klasszikus (9 szimbólum)',
			en: 'Classic (9 symbols)'
		},
		mobile: {
			hu: 'Mobil (6 szimbólum)',
			en: 'Mobile (6 symbols)'
		},
		random: {
			hu: 'Véletlenszerű (9 szimbólum)',
			en: 'Random (9 symbols)'
		}
	},

	practiceProgress: {
		hu: '🎓 Gyakorlás',
		en: '🎓 Practice'
	},
	testMode: {
		hu: '🧪 Teszt',
		en: '🧪 Test'
	},
	correctAnswers: {
		hu: 'Helyes válaszok:',
		en: 'Correct answers:'
	},
	timeRemaining: {
		hu: 'Hátralévő idő:',
		en: 'Time remaining:'
	},
	testPaused: {
		hu: 'A teszt szünetel. Maradék idő:',
		en: 'Test paused. Remaining time:'
	},
	whichNumber: {
		hu: 'Melyik szám tartozik ehhez a szimbólumhoz?',
		en: 'Which number belongs to this symbol?'
	},

	testComplete: {
		hu: '🎉 Teszt Befejezve!',
		en: '🎉 Test Complete!'
	},
	yourResults: {
		hu: 'Eredményeid',
		en: 'Your Results'
	},
	rawScore: {
		hu: 'Nyers pontszám',
		en: 'Raw score'
	},
	accuracy: {
		hu: 'Pontosság',
		en: 'Accuracy'
	},
	totalResponses: {
		hu: 'Összes válasz',
		en: 'Total responses'
	},
	testModeUsed: {
		hu: 'Teszt mód',
		en: 'Test mode'
	},

	bicamsZScore: {
		hu: 'BICAMS Z-score',
		en: 'BICAMS Z-score'
	},
	percentile: {
		hu: 'Percentilis',
		en: 'Percentile'
	},
	performanceLevel: {
		hu: 'Teljesítményszint',
		en: 'Performance level'
	},

	performanceLevels: {
		normal: {
			label: { hu: 'Normális', en: 'Normal' },
			description: {
				hu: 'Teljesítményed az elvártnak megfelelő vagy felette van.',
				en: 'Your performance meets or exceeds expected levels.'
			}
		},
		borderline: {
			label: { hu: 'Határérték', en: 'Borderline' },
			description: {
				hu: 'Teljesítményed a normális tartomány alsó határán van.',
				en: 'Your performance is at the lower boundary of the normal range.'
			}
		},
		impaired: {
			label: { hu: 'Enyhe károsodás', en: 'Mild impairment' },
			description: {
				hu: 'Teljesítményed enyhe kognitív károsodásra utal.',
				en: 'Your performance suggests mild cognitive impairment.'
			}
		},
		severelyImpaired: {
			label: { hu: 'Súlyos károsodás', en: 'Severe impairment' },
			description: {
				hu: 'Teljesítményed jelentős kognitív károsodásra utal.',
				en: 'Your performance suggests significant cognitive impairment.'
			}
		}
	},

	backToMenu: {
		hu: '🔙 Vissza a menübe',
		en: '🔙 Back to menu'
	},
	restart: {
		hu: '🔄 Újraindítás',
		en: '🔄 Restart'
	},
	exportResults: {
		hu: '💾 Eredmények exportálása',
		en: '💾 Export results'
	},

	noZScoreMessage: {
		hu: 'Add meg a demográfiai adatokat a Z-score számításához',
		en: 'Provide demographic data for Z-score calculation'
	}
};
