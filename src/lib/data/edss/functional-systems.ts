/**
 * EDSS Functional System Definitions with Hungarian Labels
 * Based on Kurtzke EDSS scale
 */

export interface FunctionalSystemOption {
	value: number;
	label: string;
	description?: string;
}

export interface FunctionalSystemDefinition {
	name: string;
	description: string;
	maxScore: number;
	options: FunctionalSystemOption[];
}

export const FUNCTIONAL_SYSTEMS: Record<string, FunctionalSystemDefinition> = {
	pyramidal: {
		name: 'Piramidális funkciók',
		description: 'Motoros erő értékelése',
		maxScore: 6,
		options: [
			{ value: 0, label: '0 - Normál' },
			{ value: 1, label: '1 - Kóros jelek fogyatékosság nélkül' },
			{ value: 2, label: '2 - Minimális fogyatékosság' },
			{
				value: 3,
				label: '3 - Enyhe vagy közepes paraparézis vagy hemiparézis; súlyos monoparézis'
			},
			{
				value: 4,
				label: '4 - Kifejezett paraparézis vagy hemiparézis; közepes quadraparézis; vagy monoplégia'
			},
			{ value: 5, label: '5 - Paraplégia, hemiplégia, vagy kifejezett quadraparézis' },
			{ value: 6, label: '6 - Quadriplégia' }
		]
	},
	cerebellar: {
		name: 'Cerebelláris funkciók',
		description: 'Koordináció és egyensúly',
		maxScore: 5,
		options: [
			{ value: 0, label: '0 - Normál' },
			{ value: 1, label: '1 - Kóros jelek fogyatékosság nélkül' },
			{ value: 2, label: '2 - Enyhe ataxia' },
			{ value: 3, label: '3 - Közepes ataxia' },
			{ value: 4, label: '4 - Súlyos ataxia' },
			{ value: 5, label: '5 - Ataxia miatt képtelen koordinált mozgásokra' }
		]
	},
	brainstem: {
		name: 'Agytörzsi funkciók',
		description: 'Beszéd, nyelés, nystagmus',
		maxScore: 5,
		options: [
			{ value: 0, label: '0 - Normál' },
			{ value: 1, label: '1 - Csak jelek' },
			{ value: 2, label: '2 - Közepes nystagmus vagy egyéb enyhe fogyatékosság' },
			{
				value: 3,
				label:
					'3 - Súlyos nystagmus, kifejezett extraokuláris gyengeség vagy közepes fogyatékosság más agyidegekből'
			},
			{ value: 4, label: '4 - Kifejezett dysarthria vagy egyéb kifejezett fogyatékosság' },
			{ value: 5, label: '5 - Képtelenség nyelni vagy beszélni' }
		]
	},
	sensory: {
		name: 'Szenzoros funkciók',
		description: 'Tapintás, fájdalom, vibráció, helyzetérzékelés',
		maxScore: 6,
		options: [
			{ value: 0, label: '0 - Normál' },
			{ value: 1, label: '1 - Csak vibráció- vagy ábraírás-csökkenés' },
			{
				value: 2,
				label:
					'2 - Enyhe tapintás-, fájdalom- vagy helyzetérzékelés-csökkenés, és/vagy közepes vibrációcsökkenés'
			},
			{
				value: 3,
				label:
					'3 - Közepes tapintás-, fájdalom- vagy helyzetérzékelés-csökkenés, és/vagy kifejezett vibrációcsökkenés'
			},
			{ value: 4, label: '4 - Kifejezett tapintás-, fájdalom- vagy helyzetérzékelés-csökkenés' },
			{ value: 5, label: '5 - Érzéskiesés egy vagy két végtagban' },
			{ value: 6, label: '6 - Kiterjedtebb érzéskiesés' }
		]
	},
	bowelBladder: {
		name: 'Bél- és hólyagfunkciók',
		description: 'Vizeletürítés és székletürítés kontrollja',
		maxScore: 6,
		options: [
			{ value: 0, label: '0 - Normál' },
			{ value: 1, label: '1 - Enyhe vizeletürítési nehézség, sürgősség vagy retenció' },
			{
				value: 2,
				label:
					'2 - Közepes vizeletürítési nehézség, sürgősség, retenció, vagy ritka vizeletinkontinencia'
			},
			{ value: 3, label: '3 - Gyakori vizeletinkontinencia' },
			{ value: 4, label: '4 - Katéterezésre szorul' },
			{ value: 5, label: '5 - Hólyagfunkció elvesztése' },
			{ value: 6, label: '6 - Hólyag- és bélfunkció elvesztése' }
		]
	},
	visual: {
		name: 'Vizuális funkciók',
		description: 'Látásélesség és látótér',
		maxScore: 6,
		options: [
			{ value: 0, label: '0 - Normál' },
			{ value: 1, label: '1 - Scotoma, korrigált látásélesség jobb mint 20/30' },
			{
				value: 2,
				label: '2 - Rosszabb szem scotomával és/vagy korrigált látásélesség 20/30 és 20/59 között'
			},
			{
				value: 3,
				label:
					'3 - Rosszabb szem nagy scotomával, vagy közepes látótér-csökkenés, vagy korrigált látásélesség 20/60 és 20/99 között'
			},
			{
				value: 4,
				label:
					'4 - Rosszabb szem kifejezett látótér-csökkenéssel és/vagy korrigált látásélesség 20/100 és 20/200 között; másik szem 20/60 vagy jobb'
			},
			{
				value: 5,
				label:
					'5 - Rosszabb szem korrigált látásélessége kevesebb mint 20/200; másik szem 20/60 vagy jobb VAGY 4-es fokozat plusz másik szem rosszabb mint 20/60'
			},
			{ value: 6, label: '6 - 5-ös fokozat plusz másik szem rosszabb mint 20/60' }
		]
	},
	cerebral: {
		name: 'Cerebrális (mentális) funkciók',
		description: 'Kognitív funkciók',
		maxScore: 5,
		options: [
			{ value: 0, label: '0 - Normál' },
			{ value: 1, label: '1 - Csak hangulati változás (nem befolyásolja az EDSS pontszámot)' },
			{ value: 2, label: '2 - Enyhe mentális hanyatlás' },
			{ value: 3, label: '3 - Közepes mentális hanyatlás' },
			{
				value: 4,
				label: '4 - Kifejezett mentális hanyatlás (krónikus agyi szindróma, közepes)'
			},
			{ value: 5, label: '5 - Demencia vagy krónikus agyi szindróma, súlyos' }
		]
	}
};

export interface AmbulationOption {
	value: number;
	edssRange: string;
	label: string;
}

export const AMBULATION_OPTIONS: AmbulationOption[] = [
	{
		value: 0,
		edssRange: '0-3.5',
		label: 'Teljesen járóképes, nincs károsodás (EDSS 0-3.5 tartomány, FR függő)'
	},
	{
		value: 1,
		edssRange: '4.0',
		label: 'Teljesen járóképes segédeszköz vagy pihenés nélkül >500m (EDSS 4.0)'
	},
	{
		value: 2,
		edssRange: '4.5',
		label: 'Teljesen járóképes segédeszköz vagy pihenés nélkül >300m, de <500m (EDSS 4.5)'
	},
	{
		value: 3,
		edssRange: '5.0',
		label: 'Járóképes segédeszköz vagy pihenés nélkül >200m (EDSS 5.0)'
	},
	{
		value: 4,
		edssRange: '5.5',
		label: 'Járóképes segédeszköz vagy pihenés nélkül >100m (EDSS 5.5)'
	},
	{
		value: 5,
		edssRange: '6.0',
		label: 'Egyoldali állandó segítségre (bot/mankó) szorul 100m megtételéhez (EDSS 6.0)'
	},
	{
		value: 6,
		edssRange: '6.5',
		label: 'Kétoldali állandó segítségre (botok/mankók/merevítő) szorul 20m megtételéhez (EDSS 6.5)'
	},
	{
		value: 7,
		edssRange: '7.0',
		label:
			'Kerekesszékhez kötött; önállóan képes áthelyezkedni; kerekesszékben mobilis napi 12 órában (EDSS 7.0)'
	},
	{
		value: 8,
		edssRange: '7.5',
		label:
			'Kerekesszékhez kötött; segítségre szorul az áthelyezkedéshez; kerekesszékben mobilis (EDSS 7.5)'
	},
	{
		value: 9,
		edssRange: '8.0',
		label:
			'Ágyhoz vagy székhez kötött, de a nap nagy részében ágyon kívül van; sok önellátó funkciót megőriz; karjait általában hatékonyan használja (EDSS 8.0)'
	},
	{
		value: 10,
		edssRange: '8.5',
		label:
			'A nap nagy részében ágyhoz kötött; néhány önellátó funkciót megőriz; karjait részben hatékonyan használja (EDSS 8.5)'
	},
	{
		value: 11,
		edssRange: '9.0',
		label: 'Teljesen magatehetetlen ágyban fekvő beteg; képes kommunikálni és enni (EDSS 9.0)'
	},
	{
		value: 12,
		edssRange: '9.5',
		label:
			'Teljesen magatehetetlen ágyban fekvő beteg; képtelen hatékonyan kommunikálni vagy enni/nyelni (EDSS 9.5)'
	},
	{
		value: 13,
		edssRange: '10.0',
		label: 'SM okozta halál (EDSS 10.0)'
	}
];

// EDSS Score Interpretations (Hungarian)
export const EDSS_INTERPRETATIONS: Record<number, string> = {
	0.0: 'Normál neurológiai vizsgálat.',
	1.0: 'Nincs fogyatékosság, minimális jelek egy FR-ben.',
	1.5: 'Nincs fogyatékosság, minimális jelek több FR-ben.',
	2.0: 'Minimális fogyatékosság egy FR-ben (FR 2-es fokozat, a többi 0 vagy 1).',
	2.5: 'Minimális fogyatékosság két FR-ben (két FR 2-es fokozat, a többi 0 vagy 1).',
	3.0: 'Közepes fogyatékosság egy FR-ben (egy FR 3-as fokozat, a többi 0 vagy 1) vagy enyhe fogyatékosság három vagy négy FR-ben (három/négy FR 2-es fokozat, a többi 0 vagy 1). Teljesen járóképes.',
	3.5: 'Teljesen járóképes, de közepes fogyatékossággal egy FR-ben (3-as fokozat) és enyhe fogyatékossággal egy vagy két FR-ben (2-es fokozat); vagy közepes fogyatékosság két FR-ben; vagy öt FR 2-es fokozattal.',
	4.0: 'Kb. 500 métert képes megtenni segítség vagy pihenés nélkül; jelentős fogyatékosság, de önellátó és kb. napi 12 órát talpon van.',
	4.5: 'Kb. 300 métert képes megtenni segítség vagy pihenés nélkül; teljesen járóképes, de bizonyos FR-ekben közepes fokú fogyatékossággal (egy FR 4-es fokozat, vagy több FR 3-as fokozat).',
	5.0: 'Kb. 200 métert képes megtenni segítség vagy pihenés nélkül; a fogyatékosság elég súlyos ahhoz, hogy korlátozza a teljes napi tevékenységet (pl. egész napos munkavégzés különleges intézkedések nélkül).',
	5.5: 'Több mint 100 métert képes megtenni segítség vagy pihenés nélkül; a fogyatékosság elég súlyos ahhoz, hogy kizárja a teljes napi tevékenységet.',
	6.0: 'Időszakos vagy egyoldali állandó segítség (bot, mankó vagy merevítő) szükséges kb. 100 méter megtételéhez pihenéssel vagy anélkül.',
	6.5: 'Állandó kétoldali segítség (botok, mankók vagy merevítők) szükséges kb. 20 méter megtételéhez pihenés nélkül.',
	7.0: 'Kb. 5 méternél többet nem tud gyalogolni még segítséggel sem; lényegében kerekesszékhez kötött; önmagát tolja és egyedül helyezkedik át; napi kb. 12 órát aktív a kerekesszékben.',
	7.5: 'Néhány lépésnél többet nem tud megtenni; kerekesszékhez kötött; segítségre szorul az áthelyezkedéshez; önmagát tolja a kerekesszékben, de bizonyos tevékenységekhez segítségre szorulhat.',
	8.0: 'Ágyhoz vagy székhez kötött, de a nap nagy részében ágyon kívül van; sok önellátó funkciót megőriz; karjait általában hatékonyan használja.',
	8.5: 'A nap nagy részében ágyhoz kötött; néhány önellátó funkciót megőriz; karjait részben hatékonyan használja.',
	9.0: 'Teljesen magatehetetlen ágyban fekvő beteg; képes kommunikálni és enni.',
	9.5: 'Teljesen magatehetetlen ágyban fekvő beteg; képtelen hatékonyan kommunikálni vagy enni/nyelni.',
	10.0: 'SM okozta halál.'
};

// EDSS Severity Categories
export interface EDSSSeverityCategory {
	range: [number, number];
	label: string;
	color: string;
	description: string;
}

export const EDSS_SEVERITY_CATEGORIES: EDSSSeverityCategory[] = [
	{
		range: [0, 1.5],
		label: 'Minimális vagy nincs fogyatékosság',
		color: 'green',
		description: 'A beteg tünetmentes vagy minimális neurológiai jelekkel rendelkezik'
	},
	{
		range: [2.0, 3.5],
		label: 'Enyhe fogyatékosság',
		color: 'blue',
		description: 'Enyhe fogyatékosság, de teljesen járóképes'
	},
	{
		range: [4.0, 5.5],
		label: 'Közepes fogyatékosság',
		color: 'yellow',
		description: 'Jelentős fogyatékosság, de még önellátó'
	},
	{
		range: [6.0, 6.5],
		label: 'Súlyos fogyatékosság',
		color: 'orange',
		description: 'Segítségre szorul a járás során'
	},
	{
		range: [7.0, 9.5],
		label: 'Nagyon súlyos fogyatékosság',
		color: 'red',
		description: 'Kerekesszékhez vagy ágyhoz kötött'
	},
	{
		range: [10.0, 10.0],
		label: 'Halál SM miatt',
		color: 'gray',
		description: 'SM okozta halál'
	}
];
