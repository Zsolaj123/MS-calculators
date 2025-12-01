<script lang="ts">
	interface Props {
		value: string;
		onchange: (color: string) => void;
		label?: string;
		presets?: string[];
	}

	let { value = '#3b82f6', onchange, label = '', presets = [] }: Props = $props();

	// Default preset colors if none provided
	const defaultPresets = [
		'#3b82f6', // Blue
		'#10b981', // Emerald
		'#8b5cf6', // Violet
		'#14b8a6', // Teal
		'#f59e0b', // Amber
		'#ef4444', // Red
		'#ec4899', // Pink
		'#06b6d4' // Cyan
	];

	const activePresets = presets.length > 0 ? presets : defaultPresets;

	function handleColorChange(e: Event) {
		const target = e.target as HTMLInputElement;
		onchange(target.value);
	}

	function selectPreset(color: string) {
		onchange(color);
	}
</script>

<div class="color-picker-container">
	{#if label}
		<span class="color-picker-label">{label}</span>
	{/if}

	<div class="color-picker-content">
		<!-- Custom color input -->
		<div class="custom-color-section">
			<div class="color-input-wrapper">
				<input
					type="color"
					{value}
					onchange={handleColorChange}
					class="color-input"
					aria-label={label || 'Color picker'}
				/>
				<div class="color-preview" style="background-color: {value}"></div>
			</div>
			<span class="color-hex">{value.toUpperCase()}</span>
		</div>

		<!-- Preset grid -->
		<div class="preset-grid">
			{#each activePresets as preset (preset)}
				<button
					type="button"
					class="preset-button"
					class:selected={value.toLowerCase() === preset.toLowerCase()}
					style="background-color: {preset}"
					onclick={() => selectPreset(preset)}
					aria-label="Select color {preset}"
					aria-pressed={value.toLowerCase() === preset.toLowerCase()}
				>
					{#if value.toLowerCase() === preset.toLowerCase()}
						<svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="3"
								d="M5 13l4 4L19 7"
							/>
						</svg>
					{/if}
				</button>
			{/each}
		</div>
	</div>
</div>

<style>
	.color-picker-container {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.color-picker-label {
		font-size: 0.875rem;
		font-weight: 600;
		color: #d0d0e0;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.color-picker-content {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
		background: linear-gradient(135deg, #1a1a2e 0%, #16162a 100%);
		border: 2px solid #32303e;
		border-radius: 8px;
	}

	.custom-color-section {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.color-input-wrapper {
		position: relative;
		width: 48px;
		height: 48px;
		border-radius: 8px;
		overflow: hidden;
		border: 2px solid #32303e;
		cursor: pointer;
	}

	.color-input {
		position: absolute;
		top: 0;
		left: 0;
		width: 150%;
		height: 150%;
		cursor: pointer;
		opacity: 0;
	}

	.color-preview {
		width: 100%;
		height: 100%;
		transition: background-color 0.2s ease;
	}

	.color-hex {
		font-family: monospace;
		font-size: 0.875rem;
		font-weight: 600;
		color: #a0a0b0;
		background: #0d0d1a;
		padding: 0.375rem 0.75rem;
		border-radius: 4px;
		border: 1px solid #32303e;
	}

	.preset-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 0.5rem;
	}

	@media (min-width: 400px) {
		.preset-grid {
			grid-template-columns: repeat(8, 1fr);
		}
	}

	.preset-button {
		position: relative;
		width: 100%;
		aspect-ratio: 1;
		min-width: 36px;
		min-height: 36px;
		border-radius: 6px;
		border: 2px solid transparent;
		cursor: pointer;
		transition: all 0.15s ease;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.preset-button:hover {
		transform: scale(1.1);
		border-color: rgba(255, 255, 255, 0.3);
	}

	.preset-button:focus-visible {
		outline: 2px solid #3b82f6;
		outline-offset: 2px;
	}

	.preset-button.selected {
		border-color: #fff;
		box-shadow:
			0 0 0 2px #000,
			0 0 10px rgba(255, 255, 255, 0.3);
	}

	.check-icon {
		width: 16px;
		height: 16px;
		color: #fff;
		filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5));
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.preset-button {
			transition: none;
		}
		.preset-button:hover {
			transform: none;
		}
		.color-preview {
			transition: none;
		}
	}
</style>
