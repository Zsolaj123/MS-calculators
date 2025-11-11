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
// Symbol Set Type
// ============================================================================
export type SDMTSymbolSet = 'classic' | 'geometric' | 'lines' | 'random';

export const SYMBOL_SET_NAMES: Record<SDMTSymbolSet, string> = {
	classic: 'Klasszikus',
	geometric: 'Geometriai alakzatok',
	lines: 'Vonalak és szögek',
	random: 'Véletlenszerű'
};

export const SYMBOL_SET_DESCRIPTIONS: Record<SDMTSymbolSet, string> = {
	classic: 'Eredeti szimbólumok javított alakzatokkal',
	geometric: 'Egyszerű geometriai formák (körök, négyzetek, háromszögek)',
	lines: 'Vonalalapú szimbólumok nagy kontraszttal (jobb alacsony látásnál)',
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
		case 'random':
			// Create a random mix by picking one symbol from each set per position
			const allSets = [SDMT_SYMBOLS_CLASSIC, SDMT_SYMBOLS_GEOMETRIC, SDMT_SYMBOLS_LINES];
			return Array.from({ length: 9 }, (_, i) => {
				const randomSet = allSets[Math.floor(Math.random() * allSets.length)];
				return randomSet[i];
			});
		default:
			return SDMT_SYMBOLS_CLASSIC;
	}
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
