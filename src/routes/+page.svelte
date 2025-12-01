<script lang="ts">
	import { goto } from '$app/navigation';
	import { t } from '$lib/utils/i18n';
	import { landing, calculatorCards } from '$lib/data/i18n/landing';
	import LanguageSwitcher from '$lib/components/common/LanguageSwitcher.svelte';
	import type { CalculatorCard } from '$lib/data/i18n/types';

	// Icon mapping for calculator cards
	const calculatorIcons: Record<string, string> = {
		edss: '🎯',
		sdmt: '🧠',
		pasat: '🔢',
		bvmt: '👁️',
		cvlt: '📝',
		msfc: '🏃',
		t25fw: '🚶',
		'9hpt': '✋'
	};

	let selectedCategory = $state<'all' | 'cognitive' | 'disability' | 'functional'>('all');

	const filteredCalculators = $derived(
		selectedCategory === 'all'
			? calculatorCards
			: calculatorCards.filter((calc) => calc.category === selectedCategory)
	);

	function navigateToCalculator(calc: CalculatorCard) {
		if (calc.status === 'available' && calc.route) {
			goto(calc.route);
		}
	}
</script>

<svelte:head>
	<title>{t(landing.title)}</title>
	<meta name="description" content={t(landing.description)} />
</svelte:head>

<div class="demo-container">
	<!-- Hero Section -->
	<div class="hero-section">
		<div class="hero-content">
			<div class="hero-header">
				<h1 class="hero-title">
					<span class="hero-icon">🧬</span>
					Neuratos MS™ Calculators
				</h1>
				<LanguageSwitcher />
			</div>
			<p class="hero-subtitle">
				{t(landing.subtitle)}
			</p>
			<div class="hero-badges">
				<span class="badge badge-primary">Svelte 5</span>
				<span class="badge badge-secondary">TypeScript</span>
				<span class="badge badge-success">BICAMS</span>
				<span class="badge badge-info">WCAG AAA</span>
			</div>
		</div>
	</div>

	<!-- Category Filter -->
	<div class="filter-section">
		<div class="filter-container">
			<div class="filter-buttons">
				<button
					class="filter-button"
					class:active={selectedCategory === 'all'}
					onclick={() => (selectedCategory = 'all')}
				>
					{t(landing.categories.all)}
				</button>
				<button
					class="filter-button"
					class:active={selectedCategory === 'cognitive'}
					onclick={() => (selectedCategory = 'cognitive')}
				>
					{t(landing.categories.cognitive)}
				</button>
				<button
					class="filter-button"
					class:active={selectedCategory === 'disability'}
					onclick={() => (selectedCategory = 'disability')}
				>
					{t(landing.categories.disability)}
				</button>
				<button
					class="filter-button"
					class:active={selectedCategory === 'functional'}
					onclick={() => (selectedCategory = 'functional')}
				>
					{t(landing.categories.functional)}
				</button>
			</div>
		</div>
	</div>

	<!-- Calculators Grid -->
	<div class="calculators-section">
		<div class="calculators-grid">
			{#each filteredCalculators as calc (calc.id)}
				<div
					class="calculator-card"
					class:available={calc.status === 'available'}
					class:coming-soon={calc.status === 'comingSoon'}
					role="button"
					tabindex="0"
					onclick={() => navigateToCalculator(calc)}
					onkeydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							navigateToCalculator(calc);
						}
					}}
				>
					<div class="card-header">
						<div class="card-icon">{calculatorIcons[calc.id]}</div>
						<div class="card-title-section">
							<h3 class="card-title">{t(calc.shortName)}</h3>
							{#if calc.status === 'comingSoon'}
								<span class="status-badge coming-soon-badge">{t(landing.status.comingSoon)}</span>
							{:else}
								<span class="status-badge available-badge">{t(landing.status.available)}</span>
							{/if}
						</div>
					</div>

					<h4 class="card-subtitle">{t(calc.name)}</h4>
					<p class="card-description">{t(calc.description)}</p>

					<div class="card-features">
						<ul class="features-list">
							{#each calc.features as feature, idx (idx)}
								<li class="feature-item">
									<span class="feature-bullet">✓</span>
									{t(feature)}
								</li>
							{/each}
						</ul>
					</div>

					<div class="card-category-badge">
						{#if calc.category === 'cognitive'}
							<span class="category-tag cognitive">{t(landing.categories.cognitive)}</span>
						{:else if calc.category === 'disability'}
							<span class="category-tag disability">{t(landing.categories.disability)}</span>
						{:else if calc.category === 'functional'}
							<span class="category-tag functional">{t(landing.categories.functional)}</span>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Footer Info -->
	<div class="footer-section">
		<div class="footer-content">
			<p class="footer-text">
				<strong>Neuratos MS™ Calculators</strong> - Klinikai és kutatási célokra fejlesztett MS
				értékelő eszközök
			</p>
			<p class="footer-subtext">
				Referencia: Kurtzke JF (1983), Benedict RHB et al. (2006), Fischer JS et al. (1999)
			</p>
			<p class="footer-copyright">
				🧮 Generated with <a
					href="https://claude.com/claude-code"
					target="_blank"
					rel="noopener noreferrer"
					class="footer-link">Claude Code</a
				>
			</p>
		</div>
	</div>
</div>

<style>
	/* Galaxy Dark Theme - Landing Page */
	.demo-container {
		min-height: 100vh;
		background: linear-gradient(135deg, #0d1117 0%, #161b22 50%, #0d1117 100%);
	}

	/* Hero Section */
	.hero-section {
		padding: 4rem 1rem;
		background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 100%);
		border-bottom: 2px solid rgba(59, 130, 246, 0.3);
	}

	.hero-content {
		max-width: 64rem;
		margin: 0 auto;
		text-align: center;
	}

	.hero-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	@media (min-width: 768px) {
		.hero-header {
			flex-direction: row;
		}
	}

	.hero-title {
		font-size: 2.5rem;
		font-weight: 700;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}

	@media (min-width: 768px) {
		.hero-title {
			font-size: 3rem;
		}
	}

	.hero-icon {
		font-size: 3rem;
	}

	@media (min-width: 768px) {
		.hero-icon {
			font-size: 3.75rem;
		}
	}

	.hero-subtitle {
		font-size: 1.125rem;
		color: #a0a0b0;
		max-width: 48rem;
		margin: 0 auto 1.5rem;
		line-height: 1.6;
	}

	@media (min-width: 768px) {
		.hero-subtitle {
			font-size: 1.25rem;
		}
	}

	.hero-badges {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		justify-content: center;
	}

	.badge {
		padding: 0.5rem 1rem;
		border-radius: 9999px;
		font-size: 0.875rem;
		font-weight: 600;
		border: 2px solid;
	}

	.badge-primary {
		background: rgba(59, 130, 246, 0.15);
		color: #3b82f6;
		border-color: #3b82f6;
	}

	.badge-secondary {
		background: rgba(6, 182, 212, 0.15);
		color: #06b6d4;
		border-color: #06b6d4;
	}

	.badge-success {
		background: rgba(16, 185, 129, 0.15);
		color: #10b981;
		border-color: #10b981;
	}

	.badge-info {
		background: rgba(139, 92, 246, 0.15);
		color: #8b5cf6;
		border-color: #8b5cf6;
	}

	/* Filter Section */
	.filter-section {
		padding: 1.5rem 1rem;
		background: #0f172a;
		border-bottom: 2px solid #32303e;
		position: sticky;
		top: 0;
		z-index: 10;
	}

	.filter-container {
		max-width: 72rem;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.filter-buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		justify-content: center;
	}

	.filter-button {
		padding: 0.625rem 1.25rem;
		border-radius: 8px;
		font-size: 0.875rem;
		font-weight: 500;
		background: #1a1a2e;
		color: #a0a0b0;
		border: 2px solid #32303e;
		cursor: pointer;
		transition: all 0.15s ease;
		min-height: 44px;
	}

	.filter-button:hover {
		border-color: #3b82f6;
		color: #e0e0f0;
	}

	.filter-button:focus {
		outline: none;
		border-color: #3b82f6;
		box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
	}

	.filter-button.active {
		background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
		color: #fff;
		border-color: #3b82f6;
		box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3);
	}

	/* Calculators Grid */
	.calculators-section {
		padding: 3rem 1rem;
		max-width: 80rem;
		margin: 0 auto;
	}

	.calculators-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.5rem;
	}

	@media (min-width: 768px) {
		.calculators-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.calculators-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.calculator-card {
		background: linear-gradient(135deg, #1a1a2e 0%, #16162a 100%);
		border: 2px solid #32303e;
		border-radius: 16px;
		padding: 1.5rem;
		transition: all 0.2s ease;
		position: relative;
		display: flex;
		flex-direction: column;
	}

	.calculator-card.available {
		cursor: pointer;
	}

	.calculator-card.available:hover {
		border-color: #3b82f6;
		box-shadow: 0 8px 32px rgba(59, 130, 246, 0.2);
		transform: translateY(-4px);
	}

	.calculator-card.coming-soon {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.card-header {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.card-icon {
		font-size: 3rem;
		flex-shrink: 0;
	}

	.card-title-section {
		flex: 1;
	}

	.card-title {
		font-size: 1.5rem;
		font-weight: 700;
		color: #3b82f6;
		margin-bottom: 0.5rem;
	}

	.status-badge {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		border-radius: 9999px;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.available-badge {
		background: rgba(16, 185, 129, 0.15);
		color: #10b981;
		border: 1px solid rgba(16, 185, 129, 0.3);
	}

	.coming-soon-badge {
		background: rgba(245, 158, 11, 0.15);
		color: #f59e0b;
		border: 1px solid rgba(245, 158, 11, 0.3);
	}

	.card-subtitle {
		font-size: 0.875rem;
		font-weight: 600;
		color: #808090;
		margin-bottom: 0.75rem;
	}

	.card-description {
		font-size: 0.9375rem;
		color: #a0a0b0;
		margin-bottom: 1rem;
		line-height: 1.6;
	}

	.card-features {
		margin-bottom: 1.5rem;
		flex: 1;
	}

	.features-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.feature-item {
		font-size: 0.875rem;
		color: #808090;
		display: flex;
		align-items: flex-start;
		gap: 0.5rem;
	}

	.feature-bullet {
		color: #10b981;
		font-weight: 700;
		flex-shrink: 0;
	}

	.card-category-badge {
		position: absolute;
		top: 1rem;
		right: 1rem;
	}

	.category-tag {
		padding: 0.25rem 0.75rem;
		border-radius: 9999px;
		font-size: 0.75rem;
		font-weight: 700;
	}

	.category-tag.cognitive {
		background: rgba(139, 92, 246, 0.15);
		color: #8b5cf6;
		border: 1px solid rgba(139, 92, 246, 0.3);
	}

	.category-tag.disability {
		background: rgba(59, 130, 246, 0.15);
		color: #3b82f6;
		border: 1px solid rgba(59, 130, 246, 0.3);
	}

	.category-tag.functional {
		background: rgba(249, 115, 22, 0.15);
		color: #f97316;
		border: 1px solid rgba(249, 115, 22, 0.3);
	}

	/* Footer Section */
	.footer-section {
		padding: 3rem 1rem;
		background: #0f172a;
		border-top: 2px solid #32303e;
	}

	.footer-content {
		max-width: 64rem;
		margin: 0 auto;
		text-align: center;
	}

	.footer-text {
		color: #a0a0b0;
		margin-bottom: 0.5rem;
	}

	.footer-text strong {
		color: #e0e0f0;
	}

	.footer-subtext {
		font-size: 0.875rem;
		color: #808090;
		margin-bottom: 1rem;
	}

	.footer-copyright {
		font-size: 0.75rem;
		color: #606070;
	}

	.footer-link {
		color: #3b82f6;
		text-decoration: none;
		transition: color 0.15s ease;
	}

	.footer-link:hover {
		color: #60a5fa;
		text-decoration: underline;
	}

	/* Mobile optimizations */
	@media (max-width: 640px) {
		.hero-section {
			padding: 2.5rem 1rem;
		}

		.hero-title {
			font-size: 1.75rem;
			flex-direction: column;
			gap: 0.5rem;
		}

		.hero-icon {
			font-size: 2.5rem;
		}

		.card-icon {
			font-size: 2.5rem;
		}

		.card-title {
			font-size: 1.25rem;
		}

		.filter-buttons {
			gap: 0.375rem;
		}

		.filter-button {
			padding: 0.5rem 0.875rem;
			font-size: 0.8125rem;
		}
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.calculator-card,
		.filter-button,
		.footer-link {
			transition: none;
		}

		.calculator-card.available:hover {
			transform: none;
		}
	}
</style>
