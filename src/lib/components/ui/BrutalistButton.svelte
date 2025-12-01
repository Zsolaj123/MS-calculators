<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		label?: string;
		variant?: 'primary' | 'secondary' | 'danger' | 'success';
		size?: 'sm' | 'md' | 'lg';
		fullWidth?: boolean;
		disabled?: boolean;
		type?: 'button' | 'submit' | 'reset';
		icon?: Snippet;
		onclick?: (e: MouseEvent) => void;
	}

	let {
		label = '',
		variant = 'primary',
		size = 'md',
		fullWidth = false,
		disabled = false,
		type = 'button',
		icon,
		onclick
	}: Props = $props();

	const variantColors = {
		primary: {
			shadow: '#3b82f6',
			hoverShadow: '#1d4ed8',
			activeBg: '#3b82f6'
		},
		secondary: {
			shadow: '#06b6d4',
			hoverShadow: '#0891b2',
			activeBg: '#06b6d4'
		},
		danger: {
			shadow: '#ef4444',
			hoverShadow: '#dc2626',
			activeBg: '#ef4444'
		},
		success: {
			shadow: '#10b981',
			hoverShadow: '#059669',
			activeBg: '#10b981'
		}
	};

	const sizeClasses = {
		sm: 'h-10 px-3 text-sm',
		md: 'h-12 px-4 text-base',
		lg: 'h-14 px-6 text-lg'
	};

</script>

<button
	{type}
	{disabled}
	class="brutalist-button {sizeClasses[size]} {variant}"
	class:full-width={fullWidth}
	class:disabled
	onclick={onclick}
	style="--shadow-color: {variantColors[variant].shadow}; --hover-shadow: {variantColors[variant].hoverShadow}; --active-bg: {variantColors[variant].activeBg}"
>
	{#if icon}
		<span class="icon-wrapper">
			{@render icon()}
		</span>
	{/if}
	{#if label}
		<span class="button-label">{label}</span>
	{/if}
</button>

<style>
	.brutalist-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		background-color: #000;
		color: #fff;
		font-family: system-ui, -apple-system, sans-serif;
		font-weight: 600;
		border: 3px solid #fff;
		outline: 3px solid #000;
		box-shadow: 6px 6px 0 var(--shadow-color, #3b82f6);
		transition: all 0.1s ease-out;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		min-width: 44px;
		min-height: 44px;
	}

	.brutalist-button::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
		z-index: 1;
		opacity: 0;
		transition: none;
	}

	.brutalist-button:hover::before {
		opacity: 1;
		animation: slide 1.5s infinite;
	}

	@keyframes slide {
		0% {
			left: -100%;
		}
		100% {
			left: 100%;
		}
	}

	.brutalist-button:hover {
		transform: translate(-3px, -3px);
		box-shadow: 9px 9px 0 var(--hover-shadow, #1d4ed8);
	}

	.brutalist-button:active {
		transform: translate(3px, 3px);
		box-shadow: 0 0 0 var(--shadow-color, #3b82f6);
		background-color: var(--active-bg, #3b82f6);
		border-color: var(--active-bg, #3b82f6);
	}

	.brutalist-button:focus-visible {
		outline: 3px solid var(--shadow-color, #3b82f6);
		outline-offset: 4px;
	}

	.brutalist-button.disabled {
		opacity: 0.5;
		cursor: not-allowed;
		pointer-events: none;
	}

	.brutalist-button.full-width {
		width: 100%;
	}

	.icon-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.25em;
		height: 1.25em;
		position: relative;
		z-index: 2;
	}

	.button-label {
		position: relative;
		z-index: 2;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.brutalist-button {
			transition: none;
		}
		.brutalist-button::before {
			display: none;
		}
		.brutalist-button:hover {
			transform: none;
		}
		.brutalist-button:active {
			transform: none;
		}
	}
</style>
