/**
 * SDMT Symbol definitions - Multiple symbol sets for Symbol Digit Modalities Test
 *
 * IMPORTANT: The official SDMT uses copyrighted symbols from Western Psychological Services (1982).
 * These are approximations for non-commercial educational/clinical use.
 *
 * Multiple symbol sets provided for:
 * - Symbol set variation (prevents memorization in repeated testing)
 * - Accessibility (different visual styles for various impairments)
 * - Research (allows comparison across symbol types)
 */

// ============================================================================
// SYMBOL SET 1: "Classic" (Original sm-demo implementation)
// ============================================================================
export const SDMT_SYMBOLS_CLASSIC = [
	'<svg viewBox="0 0 100 100" class="symbol-svg"><path d="M40,10 Q70,50 40,90" stroke="currentColor" stroke-width="10" fill="none"/></svg>', // Right curve
	'<svg viewBox="0 0 100 100" class="symbol-svg"><line x1="10" y1="30" x2="90" y2="30" stroke="currentColor" stroke-width="10"/><line x1="50" y1="30" x2="50" y2="90" stroke="currentColor" stroke-width="10"/></svg>', // T-shape
	'<svg viewBox="0 0 100 100" class="symbol-svg"><path d="M60,10 Q30,50 60,90" stroke="currentColor" stroke-width="10" fill="none"/></svg>', // Left curve
	'<svg viewBox="0 0 100 100" class="symbol-svg"><line x1="10" y1="70" x2="90" y2="70" stroke="currentColor" stroke-width="10"/><line x1="50" y1="10" x2="50" y2="70" stroke="currentColor" stroke-width="10"/></svg>', // Inverted T
	'<svg viewBox="0 0 100 100" class="symbol-svg"><line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" stroke-width="10"/><circle cx="50" cy="25" r="10" fill="currentColor"/><circle cx="50" cy="75" r="10" fill="currentColor"/></svg>', // Divided (÷)
	'<svg viewBox="0 0 100 100" class="symbol-svg"><line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" stroke-width="10"/><line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" stroke-width="10"/></svg>', // Plus (+)
	'<svg viewBox="0 0 100 100" class="symbol-svg"><rect x="25" y="25" width="50" height="50" stroke="currentColor" stroke-width="10" fill="none"/></svg>', // Square
	'<svg viewBox="0 0 100 100" class="symbol-svg"><circle cx="50" cy="50" r="30" stroke="currentColor" stroke-width="10" fill="none"/></svg>', // Circle
	'<svg viewBox="0 0 100 100" class="symbol-svg"><polygon points="50,20 80,75 20,75" stroke="currentColor" stroke-width="10" fill="none" stroke-linejoin="round"/></svg>' // Triangle
];

// ============================================================================
// SYMBOL SET 2: "Geometric" (Clear basic shapes)
// ============================================================================
export const SDMT_SYMBOLS_GEOMETRIC = [
	'<svg viewBox="0 0 100 100" class="symbol-svg"><circle cx="50" cy="50" r="30" stroke="currentColor" stroke-width="10" fill="none"/></svg>', // Circle
	'<svg viewBox="0 0 100 100" class="symbol-svg"><rect x="25" y="25" width="50" height="50" stroke="currentColor" stroke-width="10" fill="none"/></svg>', // Square
	'<svg viewBox="0 0 100 100" class="symbol-svg"><polygon points="50,20 80,75 20,75" stroke="currentColor" stroke-width="10" fill="none" stroke-linejoin="round"/></svg>', // Triangle
	'<svg viewBox="0 0 100 100" class="symbol-svg"><path d="M50,20 L80,50 L50,80 L20,50 Z" stroke="currentColor" stroke-width="10" fill="none"/></svg>', // Diamond
	'<svg viewBox="0 0 100 100" class="symbol-svg"><polygon points="50,20 80,40 80,70 50,90 20,70 20,40" stroke="currentColor" stroke-width="10" fill="none" stroke-linejoin="round"/></svg>', // Hexagon
	'<svg viewBox="0 0 100 100" class="symbol-svg"><path d="M30,50 L50,20 L70,50 L50,80 Z" stroke="currentColor" stroke-width="10" fill="none"/></svg>', // Star-like diamond
	'<svg viewBox="0 0 100 100" class="symbol-svg"><polygon points="50,15 65,40 90,40 70,60 80,85 50,70 20,85 30,60 10,40 35,40" stroke="currentColor" stroke-width="8" fill="none" stroke-linejoin="round"/></svg>', // Star
	'<svg viewBox="0 0 100 100" class="symbol-svg"><rect x="20" y="35" width="60" height="30" stroke="currentColor" stroke-width="10" fill="none"/></svg>', // Rectangle horizontal
	'<svg viewBox="0 0 100 100" class="symbol-svg"><ellipse cx="50" cy="50" rx="35" ry="20" stroke="currentColor" stroke-width="10" fill="none"/></svg>' // Ellipse
];

// ============================================================================
// SYMBOL SET 3: "Lines" (Line-based symbols, better for low vision)
// ============================================================================
export const SDMT_SYMBOLS_LINES = [
	'<svg viewBox="0 0 100 100" class="symbol-svg"><line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" stroke-width="12"/></svg>', // Vertical line
	'<svg viewBox="0 0 100 100" class="symbol-svg"><line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" stroke-width="12"/></svg>', // Horizontal line
	'<svg viewBox="0 0 100 100" class="symbol-svg"><line x1="20" y1="20" x2="80" y2="80" stroke="currentColor" stroke-width="12"/></svg>', // Diagonal \
	'<svg viewBox="0 0 100 100" class="symbol-svg"><line x1="80" y1="20" x2="20" y2="80" stroke="currentColor" stroke-width="12"/></svg>', // Diagonal /
	'<svg viewBox="0 0 100 100" class="symbol-svg"><line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" stroke-width="12"/><line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" stroke-width="12"/></svg>', // Cross +
	'<svg viewBox="0 0 100 100" class="symbol-svg"><line x1="20" y1="20" x2="80" y2="80" stroke="currentColor" stroke-width="12"/><line x1="80" y1="20" x2="20" y2="80" stroke="currentColor" stroke-width="12"/></svg>', // X
	'<svg viewBox="0 0 100 100" class="symbol-svg"><polyline points="20,80 50,20 80,80" stroke="currentColor" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>', // Zigzag up
	'<svg viewBox="0 0 100 100" class="symbol-svg"><polyline points="20,20 50,80 80,20" stroke="currentColor" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>', // Zigzag down
	'<svg viewBox="0 0 100 100" class="symbol-svg"><line x1="50" y1="20" x2="50" y2="50" stroke="currentColor" stroke-width="12"/><line x1="30" y1="50" x2="70" y2="50" stroke="currentColor" stroke-width="12"/><line x1="50" y1="50" x2="50" y2="80" stroke="currentColor" stroke-width="12"/></svg>' // T junction
];

// ============================================================================
// SYMBOL SET 4: "Arrows" (Directional symbols)
// ============================================================================
export const SDMT_SYMBOLS_ARROWS = [
	'<svg viewBox="0 0 100 100" class="symbol-svg"><polyline points="20,50 50,20 50,80 20,50" stroke="currentColor" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>', // Left arrow
	'<svg viewBox="0 0 100 100" class="symbol-svg"><polyline points="80,50 50,20 50,80 80,50" stroke="currentColor" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>', // Right arrow
	'<svg viewBox="0 0 100 100" class="symbol-svg"><polyline points="50,20 20,50 80,50 50,20" stroke="currentColor" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>', // Up arrow
	'<svg viewBox="0 0 100 100" class="symbol-svg"><polyline points="50,80 20,50 80,50 50,80" stroke="currentColor" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>', // Down arrow
	'<svg viewBox="0 0 100 100" class="symbol-svg"><polyline points="30,30 50,50 30,70" stroke="currentColor" stroke-width="10" fill="none" stroke-linecap="round"/><polyline points="50,30 70,50 50,70" stroke="currentColor" stroke-width="10" fill="none" stroke-linecap="round"/></svg>', // Double right chevron
	'<svg viewBox="0 0 100 100" class="symbol-svg"><polyline points="70,30 50,50 70,70" stroke="currentColor" stroke-width="10" fill="none" stroke-linecap="round"/><polyline points="50,30 30,50 50,70" stroke="currentColor" stroke-width="10" fill="none" stroke-linecap="round"/></svg>', // Double left chevron
	'<svg viewBox="0 0 100 100" class="symbol-svg"><polyline points="30,40 50,20 70,40" stroke="currentColor" stroke-width="10" fill="none" stroke-linecap="round"/><polyline points="30,70 50,50 70,70" stroke="currentColor" stroke-width="10" fill="none" stroke-linecap="round"/></svg>', // Double up chevron
	'<svg viewBox="0 0 100 100" class="symbol-svg"><polyline points="30,30 50,50 70,30" stroke="currentColor" stroke-width="10" fill="none" stroke-linecap="round"/><polyline points="30,60 50,80 70,60" stroke="currentColor" stroke-width="10" fill="none" stroke-linecap="round"/></svg>', // Double down chevron
	'<svg viewBox="0 0 100 100" class="symbol-svg"><circle cx="50" cy="50" r="8" fill="currentColor"/><polyline points="30,30 50,50 70,30 50,50 70,70 50,50 30,70" stroke="currentColor" stroke-width="10" fill="none" stroke-linecap="round"/></svg>' // Compass
];

// ============================================================================
// SYMBOL SET 5: "Unicode" (Mathematical Unicode symbols)
// ============================================================================
export const SDMT_SYMBOLS_UNICODE = [
	'<svg viewBox="0 0 100 100" class="symbol-svg"><text x="50" y="70" font-size="60" text-anchor="middle" fill="currentColor" font-family="Arial, sans-serif">⊕</text></svg>', // Circled plus
	'<svg viewBox="0 0 100 100" class="symbol-svg"><text x="50" y="70" font-size="60" text-anchor="middle" fill="currentColor" font-family="Arial, sans-serif">⊗</text></svg>', // Circled times
	'<svg viewBox="0 0 100 100" class="symbol-svg"><text x="50" y="70" font-size="60" text-anchor="middle" fill="currentColor" font-family="Arial, sans-serif">⊤</text></svg>', // Down tack
	'<svg viewBox="0 0 100 100" class="symbol-svg"><text x="50" y="70" font-size="60" text-anchor="middle" fill="currentColor" font-family="Arial, sans-serif">⊥</text></svg>', // Up tack
	'<svg viewBox="0 0 100 100" class="symbol-svg"><text x="50" y="70" font-size="60" text-anchor="middle" fill="currentColor" font-family="Arial, sans-serif">∴</text></svg>', // Therefore
	'<svg viewBox="0 0 100 100" class="symbol-svg"><text x="50" y="70" font-size="60" text-anchor="middle" fill="currentColor" font-family="Arial, sans-serif">∵</text></svg>', // Because
	'<svg viewBox="0 0 100 100" class="symbol-svg"><text x="50" y="70" font-size="60" text-anchor="middle" fill="currentColor" font-family="Arial, sans-serif">⊂</text></svg>', // Subset
	'<svg viewBox="0 0 100 100" class="symbol-svg"><text x="50" y="70" font-size="60" text-anchor="middle" fill="currentColor" font-family="Arial, sans-serif">⊃</text></svg>', // Superset
	'<svg viewBox="0 0 100 100" class="symbol-svg"><text x="50" y="70" font-size="60" text-anchor="middle" fill="currentColor" font-family="Arial, sans-serif">∠</text></svg>' // Angle
];

// ============================================================================
// SYMBOL SET 6: "Unicode Extended" (Extended mathematical symbols)
// ============================================================================
export const SDMT_SYMBOLS_UNICODE_EXTENDED = [
	'<svg viewBox="0 0 100 100" class="symbol-svg"><text x="50" y="70" font-size="60" text-anchor="middle" fill="currentColor" font-family="Arial, sans-serif">→</text></svg>', // Rightwards arrow
	'<svg viewBox="0 0 100 100" class="symbol-svg"><text x="50" y="70" font-size="60" text-anchor="middle" fill="currentColor" font-family="Arial, sans-serif">←</text></svg>', // Leftwards arrow
	'<svg viewBox="0 0 100 100" class="symbol-svg"><text x="50" y="70" font-size="60" text-anchor="middle" fill="currentColor" font-family="Arial, sans-serif">↑</text></svg>', // Upwards arrow
	'<svg viewBox="0 0 100 100" class="symbol-svg"><text x="50" y="70" font-size="60" text-anchor="middle" fill="currentColor" font-family="Arial, sans-serif">↓</text></svg>', // Downwards arrow
	'<svg viewBox="0 0 100 100" class="symbol-svg"><text x="50" y="70" font-size="60" text-anchor="middle" fill="currentColor" font-family="Arial, sans-serif">↔</text></svg>', // Left right arrow
	'<svg viewBox="0 0 100 100" class="symbol-svg"><text x="50" y="70" font-size="60" text-anchor="middle" fill="currentColor" font-family="Arial, sans-serif">⇄</text></svg>', // Rightwards arrow over leftwards arrow
	'<svg viewBox="0 0 100 100" class="symbol-svg"><text x="50" y="70" font-size="60" text-anchor="middle" fill="currentColor" font-family="Arial, sans-serif">≠</text></svg>', // Not equal to
	'<svg viewBox="0 0 100 100" class="symbol-svg"><text x="50" y="70" font-size="60" text-anchor="middle" fill="currentColor" font-family="Arial, sans-serif">≈</text></svg>', // Almost equal to
	'<svg viewBox="0 0 100 100" class="symbol-svg"><text x="50" y="70" font-size="60" text-anchor="middle" fill="currentColor" font-family="Arial, sans-serif">≡</text></svg>' // Identical to
];

// ============================================================================
// Symbol Set Type
// ============================================================================
export type SDMTSymbolSet = 'classic' | 'geometric' | 'lines' | 'arrows' | 'unicode' | 'unicode-extended' | 'random';

export const SYMBOL_SET_NAMES: Record<SDMTSymbolSet, string> = {
	classic: 'Klasszikus',
	geometric: 'Geometriai alakzatok',
	lines: 'Vonalak és szögek',
	arrows: 'Nyilak és irányok',
	unicode: 'Unicode szimbólumok',
	'unicode-extended': 'Unicode kiterjesztett',
	random: 'Véletlenszerű'
};

export const SYMBOL_SET_DESCRIPTIONS: Record<SDMTSymbolSet, string> = {
	classic: 'Eredeti szimbólumok javított alakzatokkal',
	geometric: 'Egyszerű geometriai formák (körök, négyzetek, háromszögek)',
	lines: 'Vonalalapú szimbólumok nagy kontraszttal (jobb alacsony látásnál)',
	arrows: 'Irányított nyilak és chevronok (különböző orientációk)',
	unicode: 'Matematikai Unicode szimbólumok',
	'unicode-extended': 'Kiterjesztett nyilak, relációk és logikai szimbólumok',
	random: 'Véletlenszerűen keveri az összes szimbólumkészletet'
};

// ============================================================================
// Default Symbol Set (backward compatibility)
// ============================================================================
export const SDMT_SYMBOLS = SDMT_SYMBOLS_CLASSIC;

// ============================================================================
// Get Symbol Set Function
// ============================================================================
export function getSymbolSet(setType: SDMTSymbolSet): string[] {
	switch (setType) {
		case 'classic':
			return SDMT_SYMBOLS_CLASSIC;
		case 'geometric':
			return SDMT_SYMBOLS_GEOMETRIC;
		case 'lines':
			return SDMT_SYMBOLS_LINES;
		case 'arrows':
			return SDMT_SYMBOLS_ARROWS;
		case 'unicode':
			return SDMT_SYMBOLS_UNICODE;
		case 'unicode-extended':
			return SDMT_SYMBOLS_UNICODE_EXTENDED;
		case 'random':
			// Create a random mix by picking random symbols from the entire pool (54 symbols)
			const allSets = [
				SDMT_SYMBOLS_CLASSIC,
				SDMT_SYMBOLS_GEOMETRIC,
				SDMT_SYMBOLS_LINES,
				SDMT_SYMBOLS_ARROWS,
				SDMT_SYMBOLS_UNICODE,
				SDMT_SYMBOLS_UNICODE_EXTENDED
			];
			const allSymbols = allSets.flat(); // 54 total symbols
			const shuffled = [...allSymbols].sort(() => Math.random() - 0.5);
			return shuffled.slice(0, 9); // Pick first 9 after shuffle
		default:
			return SDMT_SYMBOLS_CLASSIC;
	}
}

// ============================================================================
// Get all symbols as flat array (54 total)
// ============================================================================
export function getAllSymbolsFlat(): string[] {
	return [
		...SDMT_SYMBOLS_CLASSIC,
		...SDMT_SYMBOLS_GEOMETRIC,
		...SDMT_SYMBOLS_LINES,
		...SDMT_SYMBOLS_ARROWS,
		...SDMT_SYMBOLS_UNICODE,
		...SDMT_SYMBOLS_UNICODE_EXTENDED
	];
}

// ============================================================================
// Symbol Selection Mode type
// ============================================================================
export type SymbolSelectionMode = 'original' | 'random-from-pool';

export const SYMBOL_SELECTION_MODE_NAMES: Record<SymbolSelectionMode, string> = {
	original: 'Eredeti 9 szimbólum',
	'random-from-pool': 'Véletlenszerű (54-ből)'
};

export const SYMBOL_SELECTION_MODE_NAMES_EN: Record<SymbolSelectionMode, string> = {
	original: 'Original 9 symbols',
	'random-from-pool': 'Random (from 54)'
};

export const SYMBOL_SELECTION_MODE_DESCRIPTIONS: Record<SymbolSelectionMode, string> = {
	original: 'A klasszikus SDMT teszt eredeti 9 szimbóluma',
	'random-from-pool': '9 véletlenszerűen kiválasztott szimbólum az összes 54-ből'
};

export const SYMBOL_SELECTION_MODE_DESCRIPTIONS_EN: Record<SymbolSelectionMode, string> = {
	original: 'The original 9 symbols from the classic SDMT test',
	'random-from-pool': '9 randomly selected symbols from all 54 available'
};

// ============================================================================
// Get random 9 symbols from all 54 available
// ============================================================================
export function getRandomSymbolsFromPool(count: number = 9): string[] {
	const allSymbols = getAllSymbolsFlat();
	const shuffled = [...allSymbols].sort(() => Math.random() - 0.5);
	return shuffled.slice(0, count);
}

// ============================================================================
// Helper function to generate symbol-digit key
// ============================================================================
export function generateSymbolDigitKey(symbolSet: SDMTSymbolSet = 'classic'): Array<{
	symbolIndex: number;
	digit: number;
	svgHtml: string;
}> {
	const symbols = getSymbolSet(symbolSet);
	return symbols.map((svg, index) => ({
		symbolIndex: index,
		digit: index + 1, // Digits 1-9
		svgHtml: svg
	}));
}

// ============================================================================
// Generate test items
// ============================================================================
export function generateTestItems(count: number, symbolSet: SDMTSymbolSet = 'classic'): number[] {
	return Array.from({ length: count }, () => Math.floor(Math.random() * 9));
}

// ============================================================================
// Mobile Mode - Get 6 symbols for better screen sizing
// ============================================================================
export function getSymbolSetMobile(setType: SDMTSymbolSet): string[] {
	const fullSet = getSymbolSet(setType);
	return fullSet.slice(0, 6); // Return first 6 symbols
}

export function generateSymbolDigitKeyMobile(
	symbolSet: SDMTSymbolSet = 'classic'
): Array<{
	symbolIndex: number;
	digit: number;
	svgHtml: string;
}> {
	const symbols = getSymbolSetMobile(symbolSet);
	return symbols.map((svg, index) => ({
		symbolIndex: index,
		digit: index + 1, // Digits 1-6
		svgHtml: svg
	}));
}

export function generateTestItemsMobile(count: number): number[] {
	return Array.from({ length: count }, () => Math.floor(Math.random() * 6)); // Only 0-5
}
