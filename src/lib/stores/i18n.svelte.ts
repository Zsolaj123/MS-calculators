/**
 * i18n Store for MS-Calculators
 *
 * Manages current language state with localStorage persistence
 * Supports Hungarian (hu) and English (en)
 */

import type { Language } from '$lib/data/i18n/types';

const STORAGE_KEY = 'ms-calc-lang';
const DEFAULT_LANG: Language = 'hu';

function createI18nStore() {
	// Initialize from localStorage or default
	let currentLang = $state<Language>(DEFAULT_LANG);

	// Load from localStorage on client
	if (typeof window !== 'undefined') {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored === 'hu' || stored === 'en') {
			currentLang = stored;
		}
	}

	return {
		// Reactive getter
		get lang(): Language {
			return currentLang;
		},

		// Set language with persistence
		setLang(lang: Language) {
			currentLang = lang;
			if (typeof window !== 'undefined') {
				localStorage.setItem(STORAGE_KEY, lang);
			}
		},

		// Toggle between languages
		toggle() {
			const newLang: Language = currentLang === 'hu' ? 'en' : 'hu';
			this.setLang(newLang);
		},

		// Check if current language
		isHungarian(): boolean {
			return currentLang === 'hu';
		},

		isEnglish(): boolean {
			return currentLang === 'en';
		}
	};
}

export const i18n = createI18nStore();
