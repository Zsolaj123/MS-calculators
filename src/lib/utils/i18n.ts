/**
 * i18n Helper Utilities
 *
 * Provides translation lookup functions
 */

import type { Translation } from '$lib/data/i18n/types';
import { i18n } from '$lib/stores/i18n.svelte';

/**
 * Get translated string from Translation object
 *
 * @param translation - Object with hu and en properties
 * @returns Translated string in current language
 *
 * @example
 * const title = { hu: 'Üdvözöljük', en: 'Welcome' };
 * t(title) // Returns 'Üdvözöljük' if lang is 'hu'
 */
export function t(translation: Translation): string {
	return translation[i18n.lang];
}

/**
 * Get translated array from TranslationArray object
 *
 * @param translations - Object with hu and en arrays
 * @returns Translated array in current language
 *
 * @example
 * const items = { hu: ['Egy', 'Kettő'], en: ['One', 'Two'] };
 * tArray(items) // Returns ['Egy', 'Kettő'] if lang is 'hu'
 */
export function tArray<T>(translations: { hu: T[]; en: T[] }): T[] {
	return translations[i18n.lang];
}

/**
 * Get translated value from TranslationObject
 *
 * @param translations - Object with hu and en properties
 * @returns Translated value in current language
 *
 * @example
 * const options = { hu: ['Igen', 'Nem'], en: ['Yes', 'No'] };
 * tObject(options) // Returns ['Igen', 'Nem'] if lang is 'hu'
 */
export function tObject<T>(translations: { hu: T; en: T }): T {
	return translations[i18n.lang];
}

/**
 * Helper to check if current language is Hungarian
 */
export function isHu(): boolean {
	return i18n.lang === 'hu';
}

/**
 * Helper to check if current language is English
 */
export function isEn(): boolean {
	return i18n.lang === 'en';
}
