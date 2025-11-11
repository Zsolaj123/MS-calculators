/**
 * i18n Type Definitions for MS-Calculators
 *
 * Supports Hungarian (hu) and English (en) translations
 */

export type Language = 'hu' | 'en';

export interface Translation {
	hu: string;
	en: string;
}

export interface TranslationArray {
	hu: string[];
	en: string[];
}

export interface TranslationObject<T = string> {
	hu: T;
	en: T;
}

// Common UI translations
export interface CommonTranslations {
	buttons: {
		start: Translation;
		stop: Translation;
		pause: Translation;
		resume: Translation;
		reset: Translation;
		next: Translation;
		back: Translation;
		submit: Translation;
		cancel: Translation;
		save: Translation;
		export: Translation;
		close: Translation;
		backToMenu: Translation;
		backToHome: Translation;
		startPractice: Translation;
		startTest: Translation;
	};
	labels: {
		age: Translation;
		education: Translation;
		gender: Translation;
		male: Translation;
		female: Translation;
		score: Translation;
		time: Translation;
		result: Translation;
		results: Translation;
		settings: Translation;
		instructions: Translation;
		status: Translation;
		progress: Translation;
	};
	messages: {
		loading: Translation;
		saving: Translation;
		saved: Translation;
		error: Translation;
		success: Translation;
		required: Translation;
		optional: Translation;
		completed: Translation;
		inProgress: Translation;
		pending: Translation;
	};
}

// Landing page translations
export interface LandingTranslations {
	title: Translation;
	subtitle: Translation;
	description: Translation;
	categories: {
		all: Translation;
		cognitive: Translation;
		disability: Translation;
		functional: Translation;
	};
	status: {
		available: Translation;
		comingSoon: Translation;
		beta: Translation;
	};
}

// Calculator card translation
export interface CalculatorCard {
	id: string;
	name: Translation;
	shortName: Translation;
	description: Translation;
	category: 'cognitive' | 'disability' | 'functional';
	status: 'available' | 'comingSoon' | 'beta';
	route: string;
	features: Translation[];
}
