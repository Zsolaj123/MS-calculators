<script lang="ts">
	interface Props {
		checked: boolean;
		onchange: (checked: boolean) => void;
		label?: string;
		description?: string;
		disabled?: boolean;
		size?: 'sm' | 'md' | 'lg';
	}

	let {
		checked = false,
		onchange,
		label = '',
		description = '',
		disabled = false,
		size = 'md'
	}: Props = $props();

	const sizeConfig = {
		sm: { track: 'w-10 h-5', thumb: 'w-4 h-4', translate: 'translate-x-5' },
		md: { track: 'w-12 h-6', thumb: 'w-5 h-5', translate: 'translate-x-6' },
		lg: { track: 'w-14 h-7', thumb: 'w-6 h-6', translate: 'translate-x-7' }
	};

	function handleChange() {
		if (!disabled) {
			onchange(!checked);
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			handleChange();
		}
	}
</script>

<div class="toggle-container" class:disabled>
	<button
		type="button"
		role="switch"
		aria-checked={checked}
		aria-label={label || 'Toggle switch'}
		{disabled}
		class="toggle-track {sizeConfig[size].track}"
		class:checked
		onclick={handleChange}
		onkeydown={handleKeydown}
	>
		<span class="toggle-thumb {sizeConfig[size].thumb}" class:translate={checked}></span>
	</button>

	{#if label || description}
		<div class="toggle-labels">
			{#if label}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<span class="toggle-label" onclick={handleChange}>{label}</span>
			{/if}
			{#if description}
				<span class="toggle-description">{description}</span>
			{/if}
		</div>
	{/if}
</div>

<style>
	.toggle-container {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
	}

	.toggle-container.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.toggle-track {
		position: relative;
		flex-shrink: 0;
		border-radius: 999px;
		background: #32303e;
		border: 2px solid #4a4858;
		cursor: pointer;
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		padding: 2px;
	}

	.toggle-track:hover:not(:disabled) {
		border-color: #5a5868;
	}

	.toggle-track:focus-visible {
		outline: 2px solid #3b82f6;
		outline-offset: 2px;
	}

	.toggle-track.checked {
		background: #3b82f6;
		border-color: #3b82f6;
	}

	.toggle-track:disabled {
		cursor: not-allowed;
	}

	.toggle-thumb {
		position: absolute;
		left: 2px;
		border-radius: 999px;
		background: #fff;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
		transition: transform 0.2s ease;
	}

	.toggle-thumb.translate {
		transform: translateX(100%);
	}

	/* Size-specific translate overrides */
	.w-10 .toggle-thumb.translate {
		transform: translateX(calc(100% + 2px));
	}
	.w-12 .toggle-thumb.translate {
		transform: translateX(calc(100% + 2px));
	}
	.w-14 .toggle-thumb.translate {
		transform: translateX(calc(100% + 2px));
	}

	.toggle-labels {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
	}

	.toggle-label {
		font-size: 0.9375rem;
		font-weight: 500;
		color: #e0e0f0;
		cursor: pointer;
		line-height: 1.4;
	}

	.toggle-description {
		font-size: 0.8125rem;
		color: #808090;
		line-height: 1.4;
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.toggle-track,
		.toggle-thumb {
			transition: none;
		}
	}
</style>
