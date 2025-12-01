<script lang="ts">
	import { edssStore } from '$lib/stores/edss.svelte';

	let score = $derived(edssStore.score);
	let interpretation = $derived(edssStore.interpretation);
	let severityCategory = $derived(edssStore.severityCategory);
	let functionalSystems = $derived(edssStore.functionalSystems);
	let ambulation = $derived(edssStore.ambulation);

	// Get color styles based on severity for Galaxy dark theme
	const severityStyles = $derived.by(() => {
		if (!severityCategory) return { bg: 'rgba(128, 128, 144, 0.1)', border: '#808090', text: '#808090' };

		const colorMap: Record<string, { bg: string; border: string; text: string }> = {
			green: { bg: 'rgba(16, 185, 129, 0.15)', border: '#10b981', text: '#10b981' },
			blue: { bg: 'rgba(59, 130, 246, 0.15)', border: '#3b82f6', text: '#3b82f6' },
			yellow: { bg: 'rgba(245, 158, 11, 0.15)', border: '#f59e0b', text: '#f59e0b' },
			orange: { bg: 'rgba(249, 115, 22, 0.15)', border: '#f97316', text: '#f97316' },
			red: { bg: 'rgba(239, 68, 68, 0.15)', border: '#ef4444', text: '#ef4444' },
			gray: { bg: 'rgba(128, 128, 144, 0.15)', border: '#808090', text: '#808090' }
		};

		return colorMap[severityCategory.color] || colorMap.gray;
	});

	// Get severity icon
	const severityIcon = $derived.by(() => {
		if (!severityCategory) return '📊';
		if (severityCategory.color === 'green') return '✅';
		if (severityCategory.color === 'blue') return 'ℹ️';
		if (severityCategory.color === 'yellow') return '⚠️';
		if (severityCategory.color === 'orange') return '🔶';
		if (severityCategory.color === 'red') return '🔴';
		return '⚫';
	});

	function handleNewAssessment() {
		edssStore.reset();
	}

	function handleExport() {
		const data = edssStore.exportData();
		const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `edss-results-${Date.now()}.json`;
		a.click();
		URL.revokeObjectURL(url);
	}

	function handleBackToAssessment() {
		edssStore.goToAssessment();
	}
</script>

<div class="edss-results-container">
	<div class="results-header">
		<h2 class="results-title">📊 EDSS Eredmény</h2>
		<p class="results-subtitle">
			A beteg jelenlegi fogyatékossági állapotának értékelése
		</p>
	</div>

	<!-- Score Display -->
	<div class="score-card">
		<div class="score-display">
			<div class="score-label">EDSS Pontszám</div>
			<div class="score-value">
				{score?.toFixed(1)}
			</div>
		</div>

		{#if severityCategory}
			<div
				class="severity-badge"
				style="background: {severityStyles.bg}; border-color: {severityStyles.border};"
			>
				<span class="severity-icon">{severityIcon}</span>
				<div class="severity-content">
					<div class="severity-label" style="color: {severityStyles.text};">{severityCategory.label}</div>
					<div class="severity-description">{severityCategory.description}</div>
				</div>
			</div>
		{/if}
	</div>

	<!-- Interpretation -->
	{#if interpretation}
		<div class="interpretation-card">
			<h3 class="card-title">📋 Értelmezés</h3>
			<p class="interpretation-text">
				{interpretation}
			</p>
		</div>
	{/if}

	<!-- Functional Systems Summary -->
	<div class="summary-card">
		<h3 class="card-title">🔍 Funkcionális Rendszerek Összefoglalója</h3>
		<div class="systems-grid">
			<div class="system-item">
				<span class="system-label">💪 Piramidális:</span>
				<span class="system-value">{functionalSystems.pyramidal}</span>
			</div>
			<div class="system-item">
				<span class="system-label">⚖️ Cerebelláris:</span>
				<span class="system-value">{functionalSystems.cerebellar}</span>
			</div>
			<div class="system-item">
				<span class="system-label">🧠 Agytörzsi:</span>
				<span class="system-value">{functionalSystems.brainstem}</span>
			</div>
			<div class="system-item">
				<span class="system-label">👋 Szenzoros:</span>
				<span class="system-value">{functionalSystems.sensory}</span>
			</div>
			<div class="system-item">
				<span class="system-label">🚽 Hólyag-bél:</span>
				<span class="system-value">{functionalSystems.bowelBladder}</span>
			</div>
			<div class="system-item">
				<span class="system-label">👁️ Vizuális:</span>
				<span class="system-value">{functionalSystems.visual}</span>
			</div>
			<div class="system-item">
				<span class="system-label">🤔 Cerebrális:</span>
				<span class="system-value">{functionalSystems.cerebral}</span>
			</div>
			<div class="system-item ambulation-item">
				<span class="system-label">🚶 Járóképesség:</span>
				<span class="system-value">{ambulation}</span>
			</div>
		</div>
	</div>

	<!-- Reference Note -->
	<div class="reference-note">
		<p>
			📚 Referencia: Kurtzke JF. Rating neurologic impairment in multiple sclerosis: an expanded
			disability status scale (EDSS). Neurology. 1983;33(11):1444-52.
		</p>
	</div>

	<!-- Action Buttons -->
	<div class="action-buttons">
		<button onclick={handleBackToAssessment} class="action-btn secondary">
			✏️ Értékelés módosítása
		</button>
		<button onclick={handleNewAssessment} class="action-btn secondary">
			🔄 Új értékelés
		</button>
		<button onclick={handleExport} class="action-btn primary">
			💾 Eredmény exportálása
		</button>
	</div>
</div>

<style>
	.edss-results-container {
		width: 100%;
		max-width: 56rem;
		margin: 0 auto;
	}

	.results-header {
		text-align: center;
		margin-bottom: 2rem;
	}

	.results-title {
		font-size: 1.75rem;
		font-weight: 700;
		color: #fff;
		margin-bottom: 0.5rem;
	}

	.results-subtitle {
		font-size: 0.9375rem;
		color: #808090;
	}

	.score-card {
		background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%);
		border: 2px solid rgba(59, 130, 246, 0.3);
		border-radius: 16px;
		padding: 2rem;
		margin-bottom: 1.5rem;
	}

	.score-display {
		text-align: center;
		margin-bottom: 1.5rem;
	}

	.score-label {
		font-size: 0.875rem;
		color: #808090;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: 0.5rem;
	}

	.score-value {
		font-size: 5rem;
		font-weight: 700;
		color: #3b82f6;
		font-variant-numeric: tabular-nums;
		line-height: 1;
	}

	.severity-badge {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem 1.25rem;
		border-radius: 10px;
		border-left: 4px solid;
	}

	.severity-icon {
		font-size: 2rem;
		flex-shrink: 0;
	}

	.severity-content {
		flex: 1;
	}

	.severity-label {
		font-size: 1.125rem;
		font-weight: 700;
		margin-bottom: 0.25rem;
	}

	.severity-description {
		font-size: 0.875rem;
		color: #a0a0b0;
	}

	.interpretation-card,
	.summary-card {
		background: #0f172a;
		border: 2px solid #32303e;
		border-radius: 12px;
		padding: 1.5rem;
		margin-bottom: 1.5rem;
	}

	.card-title {
		font-size: 1.125rem;
		font-weight: 600;
		color: #fff;
		margin-bottom: 1rem;
	}

	.interpretation-text {
		font-size: 0.9375rem;
		color: #a0a0b0;
		line-height: 1.6;
	}

	.systems-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.75rem;
	}

	.system-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.875rem 1rem;
		background: #161b22;
		border-radius: 8px;
	}

	.system-item.ambulation-item {
		grid-column: span 2;
		background: rgba(59, 130, 246, 0.1);
		border: 1px solid rgba(59, 130, 246, 0.3);
	}

	.system-label {
		font-size: 0.875rem;
		font-weight: 500;
		color: #a0a0b0;
	}

	.system-value {
		font-size: 1.125rem;
		font-weight: 700;
		color: #3b82f6;
	}

	.reference-note {
		text-align: center;
		padding: 1rem;
		background: #161b22;
		border-radius: 8px;
		margin-bottom: 2rem;
	}

	.reference-note p {
		font-size: 0.75rem;
		color: #808090;
		font-style: italic;
	}

	.action-buttons {
		display: flex;
		gap: 1rem;
	}

	.action-btn {
		flex: 1;
		padding: 0.875rem 1.5rem;
		font-size: 0.9375rem;
		font-weight: 600;
		border-radius: 10px;
		cursor: pointer;
		transition: all 0.15s ease;
		min-height: 48px;
	}

	.action-btn.primary {
		background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
		color: #fff;
		border: none;
	}

	.action-btn.primary:hover {
		box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3);
	}

	.action-btn.secondary {
		background: transparent;
		color: #a0a0b0;
		border: 2px solid #32303e;
	}

	.action-btn.secondary:hover {
		border-color: #3b82f6;
		color: #3b82f6;
	}

	/* Mobile optimizations */
	@media (max-width: 640px) {
		.score-card {
			padding: 1.5rem;
		}

		.score-value {
			font-size: 4rem;
		}

		.systems-grid {
			grid-template-columns: 1fr;
		}

		.system-item.ambulation-item {
			grid-column: span 1;
		}

		.action-buttons {
			flex-direction: column;
		}
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.action-btn {
			transition: none;
		}
	}
</style>
