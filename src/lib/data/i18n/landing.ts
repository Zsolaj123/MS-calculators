/**
 * Landing Page Translations
 *
 * Translations for the main calculator showcase page
 */

import type { CalculatorCard, LandingTranslations } from './types';

export const landing: LandingTranslations = {
	title: {
		hu: 'Neuratos MS Calculators - Szakmai Eszközök',
		en: 'Neuratos MS Calculators - Professional Tools'
	},
	subtitle: {
		hu: 'Komplex MS értékelő eszközök klinikai és kutatási célokra',
		en: 'Comprehensive MS assessment tools for clinical and research use'
	},
	description: {
		hu: 'Komplex MS értékelő eszközök: EDSS, SDMT, PASAT, BVMT-R, CVLT-II, MSFC és további tesztek.',
		en: 'Comprehensive MS assessment tools: EDSS, SDMT, PASAT, BVMT-R, CVLT-II, MSFC and more.'
	},
	categories: {
		all: {
			hu: 'Összes',
			en: 'All'
		},
		cognitive: {
			hu: 'Kognitív',
			en: 'Cognitive'
		},
		disability: {
			hu: 'Fogyatékosság',
			en: 'Disability'
		},
		functional: {
			hu: 'Funkcionális',
			en: 'Functional'
		}
	},
	status: {
		available: {
			hu: 'Elérhető',
			en: 'Available'
		},
		comingSoon: {
			hu: 'Hamarosan',
			en: 'Coming Soon'
		},
		beta: {
			hu: 'Béta',
			en: 'Beta'
		}
	}
};

export const calculatorCards: CalculatorCard[] = [
	{
		id: 'edss',
		name: {
			hu: 'EDSS - Kibővített Rokkantsági Állapot Skála',
			en: 'EDSS - Expanded Disability Status Scale'
		},
		shortName: {
			hu: 'EDSS',
			en: 'EDSS'
		},
		description: {
			hu: 'A sclerosis multiplex által okozott fogyatékosság standardizált értékelése 0.0-tól 10.0-ig.',
			en: 'Standardized assessment of disability caused by multiple sclerosis from 0.0 to 10.0.'
		},
		category: 'disability',
		status: 'available',
		route: '/edss',
		features: [
			{
				hu: '7 funkcionális rendszer értékelése',
				en: '7 functional system assessments'
			},
			{
				hu: 'Járóképesség mérése',
				en: 'Ambulation assessment'
			},
			{
				hu: 'Automatikus EDSS számítás',
				en: 'Automatic EDSS calculation'
			},
			{
				hu: 'Részletes interpretáció',
				en: 'Detailed interpretation'
			},
			{
				hu: 'Exportálható eredmények',
				en: 'Exportable results'
			}
		]
	},
	{
		id: 'sdmt',
		name: {
			hu: 'SDMT - Symbol Digit Modalities Test',
			en: 'SDMT - Symbol Digit Modalities Test'
		},
		shortName: {
			hu: 'SDMT',
			en: 'SDMT'
		},
		description: {
			hu: 'Feldolgozási sebesség és vizuális munkamemória értékelése szimbólum-szám párosítással. Reszponzív design minden eszközre.',
			en: 'Assessment of processing speed and visual working memory through symbol-number matching. Responsive design for all devices.'
		},
		category: 'cognitive',
		status: 'available',
		route: '/sdmt',
		features: [
			{
				hu: '90 másodperces teszt',
				en: '90-second test'
			},
			{
				hu: 'Gyakorló mód',
				en: 'Practice mode'
			},
			{
				hu: 'BICAMS z-score normalizálás',
				en: 'BICAMS z-score normalization'
			},
			{
				hu: 'Többféle szimbólumkészlet',
				en: 'Multiple symbol sets'
			},
			{
				hu: 'Testreszabható beállítások',
				en: 'Customizable settings'
			},
			{
				hu: 'Mobil és tablet optimalizált',
				en: 'Mobile and tablet optimized'
			}
		]
	},
	{
		id: 'msfc',
		name: {
			hu: 'MSFC - Multiple Sclerosis Functional Composite',
			en: 'MSFC - Multiple Sclerosis Functional Composite'
		},
		shortName: {
			hu: 'MSFC',
			en: 'MSFC'
		},
		description: {
			hu: 'Komplex funkcionális értékelés láb-, kéz- és kognitív funkciók mérésével.',
			en: 'Comprehensive functional assessment measuring leg, arm, and cognitive functions.'
		},
		category: 'functional',
		status: 'available',
		route: '/msfc',
		features: [
			{
				hu: '9-Hole Peg Test (9HPT)',
				en: '9-Hole Peg Test (9HPT)'
			},
			{
				hu: 'Timed 25-Foot Walk (T25FW)',
				en: 'Timed 25-Foot Walk (T25FW)'
			},
			{
				hu: 'PASAT-3 integráció',
				en: 'PASAT-3 integration'
			},
			{
				hu: 'Z-score kalkuláció (NMSS + Európai)',
				en: 'Z-score calculation (NMSS + European)'
			},
			{
				hu: 'Időmérő és kézi bevitel mód',
				en: 'Timer and manual entry modes'
			}
		]
	},
	{
		id: 'pasat',
		name: {
			hu: 'PASAT - Paced Auditory Serial Addition Test',
			en: 'PASAT - Paced Auditory Serial Addition Test'
		},
		shortName: {
			hu: 'PASAT',
			en: 'PASAT'
		},
		description: {
			hu: 'Hallási munkamemória és információfeldolgozási sebesség mérése ritmusos számösszeadással.',
			en: 'Measurement of auditory working memory and information processing speed through paced arithmetic.'
		},
		category: 'cognitive',
		status: 'available',
		route: '/pasat',
		features: [
			{
				hu: 'PASAT-3 és PASAT-2 változatok',
				en: 'PASAT-3 and PASAT-2 versions'
			},
			{
				hu: 'Hallási stimulus Web Speech API-val',
				en: 'Auditory stimulus with Web Speech API'
			},
			{
				hu: 'BICAMS normák és z-score számítás',
				en: 'BICAMS norms and z-score calculation'
			},
			{
				hu: 'Automatikus pontozás és visszajelzés',
				en: 'Automatic scoring and feedback'
			},
			{
				hu: 'Gyakorló és fő teszt mód',
				en: 'Practice and main test modes'
			},
			{
				hu: 'Életkor és végzettség korrekció',
				en: 'Age and education adjustment'
			}
		]
	},
	{
		id: 'bvmt',
		name: {
			hu: 'BVMT-R - Brief Visuospatial Memory Test',
			en: 'BVMT-R - Brief Visuospatial Memory Test'
		},
		shortName: {
			hu: 'BVMT-R',
			en: 'BVMT-R'
		},
		description: {
			hu: 'Vizuális tanulás és emlékezet értékelése geometrikus figurák segítségével.',
			en: 'Assessment of visual learning and memory using geometric figures.'
		},
		category: 'cognitive',
		status: 'comingSoon',
		features: [
			{
				hu: '3 tanulási trial',
				en: '3 learning trials'
			},
			{
				hu: 'Késleltetett felidézés',
				en: 'Delayed recall'
			},
			{
				hu: 'Felismerési teszt',
				en: 'Recognition test'
			},
			{
				hu: 'BICAMS kompatibilis',
				en: 'BICAMS compatible'
			},
			{
				hu: 'Standardizált pontozás',
				en: 'Standardized scoring'
			}
		]
	},
	{
		id: 'cvlt',
		name: {
			hu: 'CVLT-II - California Verbal Learning Test',
			en: 'CVLT-II - California Verbal Learning Test'
		},
		shortName: {
			hu: 'CVLT-II',
			en: 'CVLT-II'
		},
		description: {
			hu: 'Verbális tanulás és emlékezet mélyreható értékelése szólisták segítségével.',
			en: 'In-depth assessment of verbal learning and memory using word lists.'
		},
		category: 'cognitive',
		status: 'comingSoon',
		features: [
			{
				hu: 'Verbális tanulás görbe',
				en: 'Verbal learning curve'
			},
			{
				hu: 'Interferencia hatás',
				en: 'Interference effect'
			},
			{
				hu: 'Hosszú távú megtartás',
				en: 'Long-term retention'
			},
			{
				hu: 'Felismerési teljesítmény',
				en: 'Recognition performance'
			},
			{
				hu: 'Részletes analitika',
				en: 'Detailed analytics'
			}
		]
	},
	{
		id: 't25fw',
		name: {
			hu: 'T25FW - Timed 25-Foot Walk',
			en: 'T25FW - Timed 25-Foot Walk'
		},
		shortName: {
			hu: 'T25FW',
			en: 'T25FW'
		},
		description: {
			hu: 'Járási sebesség és mobilitás objektív mérése 25 láb távolságon.',
			en: 'Objective measurement of walking speed and mobility over 25 feet.'
		},
		category: 'functional',
		status: 'comingSoon',
		features: [
			{
				hu: 'Egyszerű időmérés',
				en: 'Simple timing'
			},
			{
				hu: 'Ismételt mérések',
				en: 'Repeated measurements'
			},
			{
				hu: 'Segédeszköz rögzítése',
				en: 'Assistive device tracking'
			},
			{
				hu: 'Átlag kalkuláció',
				en: 'Average calculation'
			},
			{
				hu: 'Normatív adatok',
				en: 'Normative data'
			}
		]
	},
	{
		id: '9hpt',
		name: {
			hu: '9HPT - Nine-Hole Peg Test',
			en: '9HPT - Nine-Hole Peg Test'
		},
		shortName: {
			hu: '9HPT',
			en: '9HPT'
		},
		description: {
			hu: 'Felső végtag funkció és finommotoros ügyesség értékelése.',
			en: 'Assessment of upper extremity function and fine motor dexterity.'
		},
		category: 'functional',
		status: 'comingSoon',
		features: [
			{
				hu: 'Bal és jobb kéz külön',
				en: 'Left and right hand separately'
			},
			{
				hu: 'Időmérés automatizálás',
				en: 'Automated timing'
			},
			{
				hu: 'Statisztikai elemzés',
				en: 'Statistical analysis'
			},
			{
				hu: 'Longitudinális trend',
				en: 'Longitudinal trends'
			},
			{
				hu: 'MSFC kompatibilis',
				en: 'MSFC compatible'
			}
		]
	}
];
