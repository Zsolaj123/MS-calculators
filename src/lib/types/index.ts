// MS Calculators - TypeScript Types

// BICAMS Types
export interface BICAMSDemographics {
	age: number;
	sex: 1 | 2; // 1=Male, 2=Female
	education: 6 | 12 | 13 | 15 | 17 | 21; // Years of education
}

export interface BICAMSResult {
	zScore: number;
	scaledScore: number;
	expectedScore: number;
	isImpaired: boolean;
	performanceLevel: 'normal' | 'borderline' | 'impaired' | 'severely-impaired';
}

export type BICAMSTestType = 'sdmt' | 'bvmt' | 'cvlt';

export interface ConversionTableRow {
	scaledScore: number;
	lower: number;
	upper: number;
}

// EDSS Types
export interface EDSSFunctionalSystems {
	visual: number; // 0-6
	brainstem: number; // 0-5
	pyramidal: number; // 0-6
	cerebellar: number; // 0-5
	sensory: number; // 0-6
	bowelBladder: number; // 0-6
	cerebral: number; // 0-5
}

export interface EDSSScore {
	functionalSystems: EDSSFunctionalSystems;
	ambulation: number; // 0-16
	score: number; // 0.0-10.0
	interpretation: string;
}

// SDMT Types
export interface SDMTSymbol {
	id: number;
	path: string;
	digit: number;
}

export interface SDMTResponse {
	itemIndex: number;
	symbolId: number;
	userAnswer: number;
	correctAnswer: number;
	isCorrect: boolean;
	timestamp: number;
}

export interface SDMTResult {
	rawScore: number;
	demographics: BICAMSDemographics;
	bicamsResult: BICAMSResult;
	responses: SDMTResponse[];
	duration: number;
}

// PASAT Types
export interface PASATQuestion {
	index: number;
	previousNumber: number;
	currentNumber: number;
	correctSum: number;
}

export interface PASATResponse {
	questionIndex: number;
	userAnswer: number;
	correctAnswer: number;
	isCorrect: boolean;
	timestamp: number;
}

export interface PASATResult {
	totalQuestions: number;
	correctAnswers: number;
	zScore: number;
	responses: PASATResponse[];
}

// MSFC Types
export interface MSFCTest {
	name: '9HPT' | 'T25FW' | 'PASAT';
	completed: boolean;
	rawScore?: number;
	zScore?: number;
}

export interface MSFCResult {
	tests: MSFCTest[];
	compositeZScore: number;
	interpretation: string;
}

// Common Types
export interface TestMetadata {
	patientId?: string;
	testDate: string;
	testDuration: number;
	deviceType: 'mobile' | 'tablet' | 'desktop';
}

export interface ValidationError {
	field: string;
	message: string;
}
