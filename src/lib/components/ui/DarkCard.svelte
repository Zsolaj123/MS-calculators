<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title?: string;
		subtitle?: string;
		category?: string;
		categoryColor?: 'blue' | 'green' | 'yellow' | 'red' | 'cyan';
		variant?: 'default' | 'elevated' | 'glow';
		header?: Snippet;
		content?: Snippet;
		actions?: Snippet;
		footer?: Snippet;
		children?: Snippet;
	}

	let {
		title = '',
		subtitle = '',
		category = '',
		categoryColor = 'blue',
		variant = 'default',
		header,
		content,
		actions,
		footer,
		children
	}: Props = $props();

	const categoryColors = {
		blue: 'bg-blue-500',
		green: 'bg-emerald-500',
		yellow: 'bg-amber-500',
		red: 'bg-red-500',
		cyan: 'bg-cyan-500'
	};
</script>

<div class="dark-card {variant}">
	<!-- Glow effect background -->
	<div class="glow-bg"></div>

	<!-- Card content wrapper -->
	<div class="card-inner">
		{#if category || header}
			<div class="card-header">
				{#if category}
					<span class="category-badge {categoryColors[categoryColor]}">{category}</span>
				{/if}
				{#if header}
					{@render header()}
				{/if}
			</div>
		{/if}

		{#if title || subtitle}
			<div class="card-title-section">
				{#if title}
					<h3 class="card-title">{title}</h3>
				{/if}
				{#if subtitle}
					<p class="card-subtitle">{subtitle}</p>
				{/if}
			</div>
		{/if}

		{#if content}
			<div class="card-content">
				{@render content()}
			</div>
		{:else if children}
			<div class="card-content">
				{@render children()}
			</div>
		{/if}

		{#if actions}
			<div class="card-actions">
				{@render actions()}
			</div>
		{/if}

		{#if footer}
			<div class="card-footer">
				{@render footer()}
			</div>
		{/if}
	</div>
</div>

<style>
	.dark-card {
		position: relative;
		border-radius: 12px;
		background: linear-gradient(135deg, #1a1a2e 0%, #16162a 100%);
		border: 3px solid #32303e;
		box-shadow: 4px 4px 0 #000;
		overflow: hidden;
	}

	.dark-card.elevated {
		box-shadow:
			4px 4px 0 #000,
			8px 8px 20px rgba(0, 0, 0, 0.4);
	}

	.dark-card.glow {
		box-shadow:
			4px 4px 0 #000,
			0 0 20px rgba(59, 130, 246, 0.3);
	}

	.glow-bg {
		position: absolute;
		width: 150%;
		height: 150%;
		background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
		top: -75%;
		left: -25%;
		opacity: 0;
		transition: opacity 0.3s ease;
		pointer-events: none;
	}

	.dark-card:hover .glow-bg {
		opacity: 1;
	}

	.card-inner {
		position: relative;
		z-index: 1;
		padding: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.card-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
	}

	.category-badge {
		display: inline-flex;
		align-items: center;
		padding: 0.25rem 0.75rem;
		border-radius: 4px;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #fff;
	}

	.card-title-section {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.card-title {
		margin: 0;
		font-size: 1.25rem;
		font-weight: 700;
		color: #fff;
		line-height: 1.3;
	}

	.card-subtitle {
		margin: 0;
		font-size: 0.875rem;
		color: #a0a0b0;
		line-height: 1.4;
	}

	.card-content {
		color: #d0d0e0;
		font-size: 0.9375rem;
		line-height: 1.6;
	}

	.card-actions {
		display: flex;
		gap: 0.75rem;
		margin-top: 0.5rem;
		flex-wrap: wrap;
	}

	.card-footer {
		margin-top: 0.5rem;
		padding-top: 0.75rem;
		border-top: 1px solid #32303e;
		color: #808090;
		font-size: 0.8125rem;
	}

	/* Hover lift effect */
	.dark-card {
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	.dark-card:hover {
		transform: translateY(-2px);
	}

	.dark-card.elevated:hover {
		box-shadow:
			4px 4px 0 #000,
			12px 12px 30px rgba(0, 0, 0, 0.5);
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.dark-card {
			transition: none;
		}
		.dark-card:hover {
			transform: none;
		}
		.glow-bg {
			display: none;
		}
	}
</style>
