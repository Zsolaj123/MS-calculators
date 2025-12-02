<script lang="ts">
	import {
		getSpeechRecognitionService,
		SpeechRecognitionService,
		type SpeechRecognitionLanguage
	} from '$lib/services/speech-recognition.service';

	interface Props {
		onResult: (digit: number) => void;
		language?: SpeechRecognitionLanguage;
		disabled?: boolean;
		maxDigit?: number;
		// Callbacks for timer pause functionality (live test mode)
		onConfirmStart?: () => void;
		onConfirmEnd?: () => void;
	}

	let {
		onResult,
		language = 'hu-HU',
		disabled = false,
		maxDigit = 9,
		onConfirmStart,
		onConfirmEnd
	}: Props = $props();

	let isListening = $state(false);
	let transcript = $state('');
	let interimTranscript = $state('');
	let interimDigit = $state<number | null>(null); // Immediate interim digit display
	let error = $state<string | null>(null);
	let showConfirm = $state(false);
	let recognizedDigit = $state<number | null>(null);
	let isEditing = $state(false);
	let editValue = $state('');

	const service = getSpeechRecognitionService();
	const isSupported = service.isSupported();

	$effect(() => {
		service.setLanguage(language);
	});

	// Notify parent when confirmation panel shows/hides (for timer pause)
	$effect(() => {
		if (showConfirm) {
			onConfirmStart?.();
		}
	});

	function startListening() {
		if (!isSupported || disabled || isListening) return;

		error = null;
		transcript = '';
		interimTranscript = '';
		interimDigit = null;
		showConfirm = false;
		recognizedDigit = null;
		isEditing = false;

		service.start(
			(result) => {
				if (result.isFinal) {
					transcript = result.transcript;
					interimTranscript = '';
					interimDigit = null;

					// Try to parse the number
					const digit = SpeechRecognitionService.parseNumber(transcript, language);
					if (digit !== null && digit >= 1 && digit <= maxDigit) {
						recognizedDigit = digit;
						showConfirm = true;
					} else {
						error =
							language === 'hu-HU'
								? `Nem értelmezhető szám (1-${maxDigit}). Próbáld újra!`
								: `Not a valid number (1-${maxDigit}). Please try again.`;
					}
				} else {
					interimTranscript = result.transcript;
					// Immediately try to show recognized digit for faster feedback
					const digit = SpeechRecognitionService.parseNumber(result.transcript, language);
					if (digit !== null && digit >= 1 && digit <= maxDigit) {
						interimDigit = digit;
					}
				}
			},
			(err) => {
				error = err;
				isListening = false;
			},
			() => {
				isListening = false;
			}
		);

		isListening = true;
	}

	function stopListening() {
		service.stop();
		isListening = false;
	}

	function confirmAnswer() {
		if (recognizedDigit !== null) {
			onResult(recognizedDigit);
			resetState();
			// Auto-restart listening for faster continuous input
			setTimeout(() => startListening(), 100);
		}
	}

	function resetState() {
		const wasConfirming = showConfirm;
		showConfirm = false;
		recognizedDigit = null;
		transcript = '';
		interimTranscript = '';
		interimDigit = null;
		error = null;
		isEditing = false;
		editValue = '';
		// Notify parent that confirmation ended (to resume timer)
		if (wasConfirming) {
			onConfirmEnd?.();
		}
	}

	function startEdit() {
		isEditing = true;
		editValue = recognizedDigit?.toString() || '';
	}

	function confirmEdit() {
		const digit = parseInt(editValue, 10);
		if (!isNaN(digit) && digit >= 1 && digit <= maxDigit) {
			recognizedDigit = digit;
			isEditing = false;
		} else {
			error =
				language === 'hu-HU'
					? `Érvénytelen szám (1-${maxDigit})`
					: `Invalid number (1-${maxDigit})`;
		}
	}

	function handleEditKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			confirmEdit();
		} else if (e.key === 'Escape') {
			isEditing = false;
		}
	}
</script>

<div class="voice-input-container">
	{#if !isSupported}
		<div class="not-supported">
			<svg class="warning-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
				/>
			</svg>
			<p>
				{language === 'hu-HU'
					? 'A beszédfelismerés nem támogatott ebben a böngészőben.'
					: 'Speech recognition is not supported in this browser.'}
			</p>
		</div>
	{:else if showConfirm && !isEditing}
		<!-- Confirm Dialog -->
		<div class="confirm-panel">
			<div class="recognized-result">
				<span class="result-label">
					{language === 'hu-HU' ? 'Felismert szám:' : 'Recognized:'}
				</span>
				<span class="result-digit">{recognizedDigit}</span>
				<span class="result-transcript">"{transcript}"</span>
			</div>

			<div class="confirm-buttons">
				<button type="button" class="btn-confirm" onclick={confirmAnswer}>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
					</svg>
					{language === 'hu-HU' ? 'Elfogadom' : 'Confirm'}
				</button>
				<button type="button" class="btn-edit" onclick={startEdit}>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
						/>
					</svg>
					{language === 'hu-HU' ? 'Javítás' : 'Edit'}
				</button>
				<button type="button" class="btn-retry" onclick={resetState}>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
						/>
					</svg>
					{language === 'hu-HU' ? 'Újra' : 'Retry'}
				</button>
			</div>
		</div>
	{:else if isEditing}
		<!-- Edit Mode -->
		<div class="edit-panel">
			<label class="edit-label">
				{language === 'hu-HU' ? 'Írd be a számot (1-' + maxDigit + '):' : 'Enter number (1-' + maxDigit + '):'}
			</label>
			<input
				type="number"
				min="1"
				max={maxDigit}
				bind:value={editValue}
				onkeydown={handleEditKeydown}
				class="edit-input"
				autofocus
			/>
			<div class="edit-buttons">
				<button type="button" class="btn-confirm" onclick={confirmEdit}>
					{language === 'hu-HU' ? 'OK' : 'OK'}
				</button>
				<button type="button" class="btn-cancel" onclick={() => (isEditing = false)}>
					{language === 'hu-HU' ? 'Mégse' : 'Cancel'}
				</button>
			</div>
		</div>
	{:else}
		<!-- Main Voice Button -->
		<button
			type="button"
			class="voice-button"
			class:listening={isListening}
			onclick={isListening ? stopListening : startListening}
			{disabled}
			aria-label={isListening
				? language === 'hu-HU'
					? 'Leállítás'
					: 'Stop listening'
				: language === 'hu-HU'
					? 'Beszédfelismerés indítása'
					: 'Start voice input'}
		>
			{#if isListening}
				<div class="listening-animation">
					<span class="pulse-ring"></span>
					<span class="pulse-ring delay-1"></span>
					<span class="pulse-ring delay-2"></span>
				</div>
				<svg class="mic-icon active" viewBox="0 0 24 24" fill="currentColor">
					<path
						d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z"
					/>
				</svg>
			{:else}
				<svg class="mic-icon" viewBox="0 0 24 24" fill="currentColor">
					<path
						d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z"
					/>
				</svg>
			{/if}
			<span class="button-text">
				{#if isListening}
					{language === 'hu-HU' ? 'Figyelek...' : 'Listening...'}
				{:else}
					{language === 'hu-HU' ? 'Beszélj!' : 'Speak!'}
				{/if}
			</span>
		</button>

		{#if isListening}
			{#if interimDigit !== null}
				<!-- Immediate digit feedback while speaking -->
				<div class="interim-digit">
					<span class="interim-digit-value">{interimDigit}</span>
					<span class="interim-digit-label">{interimTranscript}</span>
				</div>
			{:else if interimTranscript}
				<p class="interim-text">{interimTranscript}</p>
			{/if}
		{/if}

		{#if error}
			<p class="error-text">{error}</p>
		{/if}
	{/if}
</div>

<style>
	.voice-input-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		width: 100%;
	}

	.not-supported {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		padding: 1rem;
		background: #1a1a2e;
		border: 2px solid #f59e0b;
		border-radius: 8px;
		color: #f59e0b;
		text-align: center;
	}

	.warning-icon {
		width: 32px;
		height: 32px;
	}

	/* Voice Button */
	.voice-button {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 120px;
		height: 120px;
		border-radius: 50%;
		background: linear-gradient(135deg, #1a1a2e 0%, #16162a 100%);
		border: 4px solid #32303e;
		color: #a0a0b0;
		cursor: pointer;
		transition: all 0.2s ease;
		overflow: visible;
	}

	.voice-button:hover:not(:disabled) {
		border-color: #3b82f6;
		color: #3b82f6;
		transform: scale(1.05);
	}

	.voice-button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.voice-button.listening {
		border-color: #10b981;
		color: #10b981;
		background: linear-gradient(135deg, #064e3b 0%, #0f172a 100%);
	}

	.mic-icon {
		width: 48px;
		height: 48px;
	}

	.mic-icon.active {
		animation: pulse-mic 1s ease-in-out infinite;
	}

	@keyframes pulse-mic {
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.1);
		}
	}

	.button-text {
		margin-top: 0.5rem;
		font-size: 0.875rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	/* Listening Animation */
	.listening-animation {
		position: absolute;
		inset: -20px;
		pointer-events: none;
	}

	.pulse-ring {
		position: absolute;
		inset: 0;
		border: 2px solid #10b981;
		border-radius: 50%;
		animation: pulse-ring 1.5s ease-out infinite;
		opacity: 0;
	}

	.pulse-ring.delay-1 {
		animation-delay: 0.5s;
	}

	.pulse-ring.delay-2 {
		animation-delay: 1s;
	}

	@keyframes pulse-ring {
		0% {
			transform: scale(1);
			opacity: 0.6;
		}
		100% {
			transform: scale(1.5);
			opacity: 0;
		}
	}

	/* Interim Text */
	.interim-text {
		font-size: 1rem;
		color: #a0a0b0;
		font-style: italic;
		animation: fade-in 0.2s ease;
	}

	/* Immediate Digit Feedback */
	.interim-digit {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		padding: 0.75rem 1.5rem;
		background: rgba(16, 185, 129, 0.1);
		border: 2px solid rgba(16, 185, 129, 0.4);
		border-radius: 12px;
		animation: pulse-glow 0.5s ease-in-out infinite alternate;
	}

	.interim-digit-value {
		font-size: 3rem;
		font-weight: 700;
		color: #10b981;
		line-height: 1;
	}

	.interim-digit-label {
		font-size: 0.75rem;
		color: #808090;
		font-style: italic;
	}

	@keyframes pulse-glow {
		from {
			border-color: rgba(16, 185, 129, 0.4);
			box-shadow: 0 0 10px rgba(16, 185, 129, 0.2);
		}
		to {
			border-color: rgba(16, 185, 129, 0.7);
			box-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
		}
	}

	/* Error Text */
	.error-text {
		font-size: 0.875rem;
		color: #ef4444;
		background: rgba(239, 68, 68, 0.1);
		padding: 0.5rem 1rem;
		border-radius: 6px;
		border: 1px solid rgba(239, 68, 68, 0.3);
	}

	/* Confirm Panel */
	.confirm-panel {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.25rem;
		padding: 1.5rem;
		background: linear-gradient(135deg, #1a1a2e 0%, #16162a 100%);
		border: 3px solid #32303e;
		border-radius: 12px;
		width: 100%;
		max-width: 320px;
	}

	.recognized-result {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.result-label {
		font-size: 0.875rem;
		color: #808090;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.result-digit {
		font-size: 4rem;
		font-weight: 700;
		color: #10b981;
		line-height: 1;
	}

	.result-transcript {
		font-size: 0.875rem;
		color: #a0a0b0;
		font-style: italic;
	}

	.confirm-buttons {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	.btn-confirm,
	.btn-edit,
	.btn-retry,
	.btn-cancel {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.25rem;
		min-height: 44px;
		border-radius: 8px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.btn-confirm {
		background: #10b981;
		color: #fff;
		border: none;
	}

	.btn-confirm:hover {
		background: #059669;
	}

	.btn-confirm svg {
		width: 20px;
		height: 20px;
	}

	.btn-edit {
		background: transparent;
		color: #3b82f6;
		border: 2px solid #3b82f6;
	}

	.btn-edit:hover {
		background: rgba(59, 130, 246, 0.1);
	}

	.btn-edit svg {
		width: 18px;
		height: 18px;
	}

	.btn-retry {
		background: transparent;
		color: #f59e0b;
		border: 2px solid #f59e0b;
	}

	.btn-retry:hover {
		background: rgba(245, 158, 11, 0.1);
	}

	.btn-retry svg {
		width: 18px;
		height: 18px;
	}

	.btn-cancel {
		background: transparent;
		color: #808090;
		border: 2px solid #32303e;
	}

	.btn-cancel:hover {
		background: rgba(128, 128, 144, 0.1);
	}

	/* Edit Panel */
	.edit-panel {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		padding: 1.5rem;
		background: linear-gradient(135deg, #1a1a2e 0%, #16162a 100%);
		border: 3px solid #32303e;
		border-radius: 12px;
		width: 100%;
		max-width: 280px;
	}

	.edit-label {
		font-size: 0.875rem;
		color: #a0a0b0;
	}

	.edit-input {
		width: 100%;
		padding: 0.75rem 1rem;
		font-size: 2rem;
		font-weight: 700;
		text-align: center;
		background: #0f172a;
		color: #fff;
		border: 2px solid #32303e;
		border-radius: 8px;
		min-height: 44px;
	}

	.edit-input:focus {
		outline: none;
		border-color: #3b82f6;
	}

	.edit-buttons {
		display: flex;
		gap: 0.75rem;
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.voice-button,
		.mic-icon.active,
		.pulse-ring,
		.interim-digit {
			animation: none;
		}
		.voice-button:hover:not(:disabled) {
			transform: none;
		}
	}
</style>
