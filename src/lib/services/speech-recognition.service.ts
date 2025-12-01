/**
 * Speech Recognition Service - Browser-native voice input for SDMT
 * Supports Hungarian (hu-HU) and English (en-US) number recognition
 */

export interface SpeechRecognitionResult {
	transcript: string;
	confidence: number;
	isFinal: boolean;
}

export type SpeechRecognitionLanguage = 'hu-HU' | 'en-US';

// Hungarian number words mapping
const HUNGARIAN_NUMBERS: Record<string, number> = {
	egy: 1,
	ketto: 2,
	kettő: 2,
	harom: 3,
	három: 3,
	negy: 4,
	négy: 4,
	ot: 5,
	öt: 5,
	hat: 6,
	het: 7,
	hét: 7,
	nyolc: 8,
	kilenc: 9,
	// Also handle spoken digits
	'1': 1,
	'2': 2,
	'3': 3,
	'4': 4,
	'5': 5,
	'6': 6,
	'7': 7,
	'8': 8,
	'9': 9
};

// English number words mapping
const ENGLISH_NUMBERS: Record<string, number> = {
	one: 1,
	two: 2,
	three: 3,
	four: 4,
	five: 5,
	six: 6,
	seven: 7,
	eight: 8,
	nine: 9,
	// Also handle spoken digits
	'1': 1,
	'2': 2,
	'3': 3,
	'4': 4,
	'5': 5,
	'6': 6,
	'7': 7,
	'8': 8,
	'9': 9
};

export class SpeechRecognitionService {
	private recognition: SpeechRecognition | null = null;
	private isListening = false;
	private currentLanguage: SpeechRecognitionLanguage = 'hu-HU';

	constructor() {
		if (typeof window !== 'undefined') {
			// Use vendor-prefixed version if needed
			const SpeechRecognitionAPI =
				(window as unknown as { SpeechRecognition?: typeof SpeechRecognition }).SpeechRecognition ||
				(window as unknown as { webkitSpeechRecognition?: typeof SpeechRecognition })
					.webkitSpeechRecognition;

			if (SpeechRecognitionAPI) {
				this.recognition = new SpeechRecognitionAPI();
				this.recognition.continuous = false;
				this.recognition.interimResults = true;
				this.recognition.maxAlternatives = 3;
				this.recognition.lang = this.currentLanguage;
			}
		}
	}

	/**
	 * Check if speech recognition is supported in this browser
	 */
	isSupported(): boolean {
		return this.recognition !== null;
	}

	/**
	 * Check if currently listening
	 */
	getIsListening(): boolean {
		return this.isListening;
	}

	/**
	 * Set the recognition language
	 */
	setLanguage(lang: SpeechRecognitionLanguage): void {
		this.currentLanguage = lang;
		if (this.recognition) {
			this.recognition.lang = lang;
		}
	}

	/**
	 * Get current language
	 */
	getLanguage(): SpeechRecognitionLanguage {
		return this.currentLanguage;
	}

	/**
	 * Start listening for speech
	 */
	start(
		onResult: (result: SpeechRecognitionResult) => void,
		onError: (error: string) => void,
		onEnd: () => void
	): void {
		if (!this.recognition) {
			onError('Speech recognition not supported in this browser');
			return;
		}

		if (this.isListening) {
			this.stop();
		}

		this.recognition.onresult = (event: SpeechRecognitionEvent) => {
			const result = event.results[event.results.length - 1];
			const alternative = result[0];

			onResult({
				transcript: alternative.transcript,
				confidence: alternative.confidence,
				isFinal: result.isFinal
			});
		};

		this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
			let errorMessage: string;

			switch (event.error) {
				case 'not-allowed':
					errorMessage = this.currentLanguage === 'hu-HU'
						? 'Mikrofon hozzáférés megtagadva. Engedélyezd a böngészőben.'
						: 'Microphone access denied. Please enable it in your browser.';
					break;
				case 'no-speech':
					errorMessage = this.currentLanguage === 'hu-HU'
						? 'Nem hallottam beszédet. Próbáld újra!'
						: 'No speech detected. Please try again.';
					break;
				case 'audio-capture':
					errorMessage = this.currentLanguage === 'hu-HU'
						? 'Mikrofon nem elérhető.'
						: 'Microphone not available.';
					break;
				case 'network':
					errorMessage = this.currentLanguage === 'hu-HU'
						? 'Hálózati hiba. Ellenőrizd az internetkapcsolatot.'
						: 'Network error. Please check your connection.';
					break;
				default:
					errorMessage = this.currentLanguage === 'hu-HU'
						? `Hiba történt: ${event.error}`
						: `Error occurred: ${event.error}`;
			}

			onError(errorMessage);
			this.isListening = false;
		};

		this.recognition.onend = () => {
			this.isListening = false;
			onEnd();
		};

		try {
			this.isListening = true;
			this.recognition.start();
		} catch (error) {
			this.isListening = false;
			onError(
				this.currentLanguage === 'hu-HU'
					? 'Nem sikerült elindítani a hangfelismerést.'
					: 'Failed to start speech recognition.'
			);
		}
	}

	/**
	 * Stop listening
	 */
	stop(): void {
		if (this.recognition && this.isListening) {
			this.recognition.stop();
			this.isListening = false;
		}
	}

	/**
	 * Abort listening (immediate stop without results)
	 */
	abort(): void {
		if (this.recognition && this.isListening) {
			this.recognition.abort();
			this.isListening = false;
		}
	}

	/**
	 * Parse a spoken number to digit (1-9)
	 * Returns null if not a valid number
	 */
	static parseNumber(text: string, language: SpeechRecognitionLanguage = 'hu-HU'): number | null {
		// Normalize text: lowercase, remove punctuation, trim
		const normalized = text
			.toLowerCase()
			.replace(/[^\wáéíóöőúüűÁÉÍÓÖŐÚÜŰ\s]/g, '')
			.trim();

		// Try to match against number words
		const numberMap = language === 'hu-HU' ? HUNGARIAN_NUMBERS : ENGLISH_NUMBERS;

		// Check if it's a direct match
		if (numberMap[normalized] !== undefined) {
			return numberMap[normalized];
		}

		// Check if any word in the phrase is a number
		const words = normalized.split(/\s+/);
		for (const word of words) {
			if (numberMap[word] !== undefined) {
				return numberMap[word];
			}
		}

		// Try to parse as numeric digit
		const numericMatch = normalized.match(/\d/);
		if (numericMatch) {
			const digit = parseInt(numericMatch[0], 10);
			if (digit >= 1 && digit <= 9) {
				return digit;
			}
		}

		return null;
	}

	/**
	 * Get the display name for a number in the current language
	 */
	static getNumberDisplayName(digit: number, language: SpeechRecognitionLanguage): string {
		const hungarianNames = ['egy', 'kettő', 'három', 'négy', 'öt', 'hat', 'hét', 'nyolc', 'kilenc'];
		const englishNames = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

		if (digit < 1 || digit > 9) {
			return digit.toString();
		}

		return language === 'hu-HU' ? hungarianNames[digit - 1] : englishNames[digit - 1];
	}
}

// Singleton instance
let speechServiceInstance: SpeechRecognitionService | null = null;

export function getSpeechRecognitionService(): SpeechRecognitionService {
	if (!speechServiceInstance) {
		speechServiceInstance = new SpeechRecognitionService();
	}
	return speechServiceInstance;
}
