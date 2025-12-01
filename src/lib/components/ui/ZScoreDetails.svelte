<script lang="ts">
	import type { BICAMSResult, BICAMSDemographics } from '$lib/types';

	interface Props {
		result: BICAMSResult;
		demographics: BICAMSDemographics;
		rawScore: number;
		language?: 'hu' | 'en';
	}

	let { result, demographics, rawScore, language = 'hu' }: Props = $props();

	let isExpanded = $state(false);

	const labels = {
		hu: {
			title: 'Számítási részletek',
			rawScore: 'Nyers pontszám',
			scaledScore: 'Skálázott pontszám',
			expectedScore: 'Várt pontszám (normatív)',
			zScore: 'Z-Score',
			age: 'Életkor (év)',
			sex: 'Nem',
			male: 'Férfi',
			female: 'Nő',
			education: 'Iskolai végzettség (év)',
			formula: 'Képlet',
			reference: 'Referencia',
			performanceLevel: 'Teljesítmény szint'
		},
		en: {
			title: 'Calculation Details',
			rawScore: 'Raw Score',
			scaledScore: 'Scaled Score',
			expectedScore: 'Expected Score (normative)',
			zScore: 'Z-Score',
			age: 'Age (years)',
			sex: 'Sex',
			male: 'Male',
			female: 'Female',
			education: 'Education (years)',
			formula: 'Formula',
			reference: 'Reference',
			performanceLevel: 'Performance Level'
		}
	};

	const t = labels[language];

	function getPerformanceLevelColor(level: string): string {
		switch (level) {
			case 'normal':
				return '#10b981';
			case 'borderline':
				return '#f59e0b';
			case 'impaired':
				return '#f97316';
			case 'severely-impaired':
				return '#ef4444';
			default:
				return '#a0a0b0';
		}
	}

	function getPerformanceLevelLabel(level: string): string {
		const levelsHu: Record<string, string> = {
			normal: 'Normál',
			borderline: 'Határérték',
			impaired: 'Enyhe károsodás',
			'severely-impaired': 'Súlyos károsodás'
		};
		const levelsEn: Record<string, string> = {
			normal: 'Normal',
			borderline: 'Borderline',
			impaired: 'Impaired',
			'severely-impaired': 'Severely Impaired'
		};
		return language === 'hu' ? levelsHu[level] || level : levelsEn[level] || level;
	}
</script>

<div class="z-score-details">
	<button
		type="button"
		class="details-toggle"
		onclick={() => (isExpanded = !isExpanded)}
		aria-expanded={isExpanded}
	>
		<span class="toggle-text">{t.title}</span>
		<svg
			class="toggle-icon"
			class:expanded={isExpanded}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
		</svg>
	</button>

	{#if isExpanded}
		<div class="details-content">
			<!-- Demographics Section -->
			<div class="section">
				<h4 class="section-title">Demográfiai adatok</h4>
				<div class="detail-grid">
					<div class="detail-row">
						<span class="detail-label">{t.age}</span>
						<span class="detail-value">{demographics.age}</span>
					</div>
					<div class="detail-row">
						<span class="detail-label">{t.sex}</span>
						<span class="detail-value">{demographics.sex === 1 ? t.male : t.female}</span>
					</div>
					<div class="detail-row">
						<span class="detail-label">{t.education}</span>
						<span class="detail-value">{demographics.education}</span>
					</div>
				</div>
			</div>

			<!-- Scores Section -->
			<div class="section">
				<h4 class="section-title">Pontszámok</h4>
				<div class="detail-grid">
					<div class="detail-row">
						<span class="detail-label">{t.rawScore}</span>
						<span class="detail-value highlight">{rawScore}</span>
					</div>
					<div class="detail-row">
						<span class="detail-label">{t.scaledScore}</span>
						<span class="detail-value">{result.scaledScore}</span>
					</div>
					<div class="detail-row">
						<span class="detail-label">{t.expectedScore}</span>
						<span class="detail-value">{result.expectedScore.toFixed(2)}</span>
					</div>
					<div class="detail-row">
						<span class="detail-label">{t.zScore}</span>
						<span
							class="detail-value z-score"
							style="color: {getPerformanceLevelColor(result.performanceLevel)}"
						>
							{result.zScore.toFixed(2)}
						</span>
					</div>
					<div class="detail-row">
						<span class="detail-label">{t.performanceLevel}</span>
						<span
							class="detail-value performance-level"
							style="color: {getPerformanceLevelColor(result.performanceLevel)}"
						>
							{getPerformanceLevelLabel(result.performanceLevel)}
						</span>
					</div>
				</div>
			</div>

			<!-- Formula Section -->
			<div class="section formula-section">
				<h4 class="section-title">{t.formula}</h4>
				<div class="formula-box">
					<code>Z = (Skálázott - Várt) / SD</code>
					<code class="formula-calc">
						Z = ({result.scaledScore} - {result.expectedScore.toFixed(2)}) / 2.79
					</code>
					<code class="formula-result">Z = {result.zScore.toFixed(3)}</code>
				</div>
			</div>

			<!-- Reference Section -->
			<div class="section reference-section">
				<h4 class="section-title">{t.reference}</h4>
				<p class="reference-text">
					Costers et al. (2017). "Does including the full CVLT-II and BVMT-R improve BICAMS?"
					<em>Multiple Sclerosis and Related Disorders, 18</em>, 51-56.
				</p>
			</div>
		</div>
	{/if}
</div>

<style>
	.z-score-details {
		width: 100%;
		border-radius: 8px;
		overflow: hidden;
	}

	.details-toggle {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 0.875rem 1rem;
		background: linear-gradient(135deg, #1a1a2e 0%, #16162a 100%);
		border: 2px solid #32303e;
		border-radius: 8px;
		color: #a0a0b0;
		cursor: pointer;
		transition: all 0.2s ease;
		min-height: 44px;
	}

	.details-toggle:hover {
		border-color: #3b82f6;
		color: #e0e0f0;
	}

	.toggle-text {
		font-size: 0.9375rem;
		font-weight: 600;
	}

	.toggle-icon {
		width: 20px;
		height: 20px;
		transition: transform 0.2s ease;
	}

	.toggle-icon.expanded {
		transform: rotate(180deg);
	}

	.details-content {
		margin-top: 0.5rem;
		padding: 1.25rem;
		background: linear-gradient(135deg, #1a1a2e 0%, #16162a 100%);
		border: 2px solid #32303e;
		border-radius: 8px;
		animation: slide-down 0.2s ease;
	}

	@keyframes slide-down {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.section {
		margin-bottom: 1.25rem;
	}

	.section:last-child {
		margin-bottom: 0;
	}

	.section-title {
		margin: 0 0 0.75rem 0;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: #808090;
	}

	.detail-grid {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.detail-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.375rem 0;
		border-bottom: 1px solid rgba(50, 48, 62, 0.5);
	}

	.detail-row:last-child {
		border-bottom: none;
	}

	.detail-label {
		font-size: 0.875rem;
		color: #a0a0b0;
	}

	.detail-value {
		font-size: 0.9375rem;
		font-weight: 600;
		color: #e0e0f0;
	}

	.detail-value.highlight {
		color: #3b82f6;
	}

	.detail-value.z-score {
		font-size: 1.125rem;
		font-weight: 700;
	}

	.detail-value.performance-level {
		font-weight: 700;
		text-transform: uppercase;
		font-size: 0.8125rem;
		letter-spacing: 0.05em;
	}

	.formula-section .formula-box {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 1rem;
		background: #0d1117;
		border-radius: 6px;
		font-family: monospace;
	}

	.formula-box code {
		font-size: 0.875rem;
		color: #a0a0b0;
	}

	.formula-box .formula-calc {
		color: #06b6d4;
	}

	.formula-box .formula-result {
		color: #10b981;
		font-weight: 600;
	}

	.reference-section .reference-text {
		margin: 0;
		font-size: 0.8125rem;
		color: #808090;
		line-height: 1.5;
	}

	.reference-text em {
		font-style: italic;
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.toggle-icon,
		.details-content {
			animation: none;
			transition: none;
		}
	}
</style>
