<script lang="ts">
	import { edssStore } from '$lib/stores/edss.svelte';
	import { FUNCTIONAL_SYSTEMS, AMBULATION_OPTIONS } from '$lib/data/edss/functional-systems';
	import type { EDSSFunctionalSystems } from '$lib/types';

	let functionalSystems = $derived(edssStore.functionalSystems);
	let ambulation = $derived(edssStore.ambulation);

	// Track which sections are expanded
	let expandedSections = $state<Record<string, boolean>>({
		pyramidal: true,
		cerebellar: false,
		brainstem: false,
		sensory: false,
		bowelBladder: false,
		visual: false,
		cerebral: false
	});

	function toggleSection(system: string) {
		expandedSections[system] = !expandedSections[system];
	}

	function handleFunctionalSystemChange(
		system: keyof EDSSFunctionalSystems,
		event: Event
	) {
		const value = parseInt((event.target as HTMLSelectElement).value);
		edssStore.setFunctionalSystemScore(system, value);
	}

	function handleAmbulationChange(event: Event) {
		const value = parseInt((event.target as HTMLSelectElement).value);
		edssStore.setAmbulation(value);
	}

	function handleCalculate() {
		try {
			edssStore.calculateScore();
		} catch (error) {
			alert(`Hiba az EDSS számítás során: ${error}`);
		}
	}

	// Get icon for functional system
	function getSystemIcon(system: string): string {
		const icons: Record<string, string> = {
			pyramidal: '💪',
			cerebellar: '⚖️',
			brainstem: '🧠',
			sensory: '👋',
			bowelBladder: '🚽',
			visual: '👁️',
			cerebral: '🤔'
		};
		return icons[system] || '📊';
	}
</script>

<div class="edss-assessment-form">
	<h2 class="section-title">
		📋 Funkcionális Rendszerek Értékelése
	</h2>

	<!-- Functional Systems -->
	<div class="functional-systems">
		{#each Object.entries(FUNCTIONAL_SYSTEMS) as [systemKey, systemDef] (systemKey)}
			<div class="system-card">
				<button
					type="button"
					class="system-header"
					onclick={() => toggleSection(systemKey)}
				>
					<div class="flex items-center gap-3">
						<span class="text-2xl">{getSystemIcon(systemKey)}</span>
						<div class="text-left flex-1">
							<h3 class="font-semibold text-lg">{systemDef.name}</h3>
							<p class="text-sm text-gray-600 dark:text-gray-400">
								{systemDef.description}
							</p>
						</div>
						<div class="score-badge">
							{functionalSystems[systemKey as keyof EDSSFunctionalSystems]}
						</div>
					</div>
					<span class="expand-icon" class:expanded={expandedSections[systemKey]}>
						▼
					</span>
				</button>

				{#if expandedSections[systemKey]}
					<div class="system-content">
						<label for={systemKey} class="block text-sm font-medium mb-2">
							Válassz fokozatot (0-{systemDef.maxScore}):
						</label>
						<select
							id={systemKey}
							value={functionalSystems[systemKey as keyof EDSSFunctionalSystems]}
							onchange={(e) => handleFunctionalSystemChange(systemKey as keyof EDSSFunctionalSystems, e)}
							class="select w-full"
						>
							{#each systemDef.options as option (option.value)}
								<option value={option.value}>
									{option.label}
								</option>
							{/each}
						</select>
					</div>
				{/if}
			</div>
		{/each}
	</div>

	<!-- Ambulation Assessment -->
	<div class="ambulation-section">
		<h2 class="section-title">
			🚶 Járóképesség Értékelése
		</h2>
		<div class="system-card">
			<div class="system-content">
				<label for="ambulation" class="block text-sm font-medium mb-2">
					Válaszd ki a beteg járóképességét legjobban leíró opciót:
				</label>
				<select
					id="ambulation"
					value={ambulation}
					onchange={handleAmbulationChange}
					class="select w-full"
				>
					{#each AMBULATION_OPTIONS as option (option.value)}
						<option value={option.value}>
							{option.label}
						</option>
					{/each}
				</select>
				<p class="text-xs text-gray-500 mt-2">
					💡 A járóképesség értékelése kritikus az EDSS 4.0 feletti pontszámok meghatározásában
				</p>
			</div>
		</div>
	</div>

	<!-- Calculate Button -->
	<div class="calculate-section">
		<button
			type="button"
			onclick={handleCalculate}
			class="calculate-button"
		>
			🧮 EDSS Számítás
		</button>
	</div>
</div>

<style>
	.edss-assessment-form {
		width: 100%;
	}

	.section-title {
		font-size: 1.375rem;
		font-weight: 700;
		color: #fff;
		margin-bottom: 1.5rem;
	}

	.functional-systems {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.system-card {
		background: #0f172a;
		border: 2px solid #32303e;
		border-radius: 12px;
		overflow: hidden;
	}

	.system-header {
		width: 100%;
		padding: 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: transparent;
		border: none;
		cursor: pointer;
		transition: background-color 0.15s ease;
		color: #e0e0f0;
	}

	.system-header:hover {
		background: rgba(59, 130, 246, 0.1);
	}

	.system-header h3 {
		font-size: 1rem;
		font-weight: 600;
		color: #e0e0f0;
	}

	.system-header p {
		font-size: 0.8125rem;
		color: #808090;
	}

	.score-badge {
		background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
		color: #fff;
		border-radius: 50%;
		width: 3rem;
		height: 3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 1.125rem;
		box-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
	}

	.expand-icon {
		color: #808090;
		transition: transform 0.2s ease;
		margin-left: 1rem;
	}

	.expand-icon.expanded {
		transform: rotate(180deg);
	}

	.system-content {
		padding: 1rem;
		background: #161b22;
		border-top: 1px solid #32303e;
	}

	.system-content label {
		display: block;
		font-size: 0.875rem;
		font-weight: 500;
		color: #a0a0b0;
		margin-bottom: 0.75rem;
	}

	.system-content :global(.select),
	.system-content select {
		width: 100%;
		padding: 0.75rem 1rem;
		font-size: 0.9375rem;
		background: #0f172a;
		color: #e0e0f0;
		border: 2px solid #32303e;
		border-radius: 8px;
		cursor: pointer;
		min-height: 44px;
	}

	.system-content :global(.select):focus,
	.system-content select:focus {
		outline: none;
		border-color: #3b82f6;
	}

	.system-content option {
		background: #0f172a;
		color: #e0e0f0;
		padding: 0.5rem;
	}

	.ambulation-section {
		padding-top: 2rem;
		margin-top: 1rem;
		border-top: 2px solid rgba(59, 130, 246, 0.3);
		margin-bottom: 2rem;
	}

	.ambulation-section .system-content p {
		font-size: 0.75rem;
		color: #808090;
		margin-top: 0.75rem;
	}

	.calculate-section {
		display: flex;
		justify-content: center;
	}

	.calculate-button {
		padding: 1rem 3rem;
		font-size: 1.125rem;
		font-weight: 700;
		color: #fff;
		background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
		border: none;
		border-radius: 12px;
		cursor: pointer;
		transition: all 0.2s ease;
		box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3);
		min-height: 56px;
	}

	.calculate-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
	}

	.calculate-button:active {
		transform: translateY(0);
	}

	/* Mobile optimizations */
	@media (max-width: 640px) {
		.system-header {
			padding: 0.875rem;
		}

		.score-badge {
			width: 2.5rem;
			height: 2.5rem;
			font-size: 1rem;
		}

		.calculate-button {
			width: 100%;
			padding: 1rem 2rem;
		}
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.system-header,
		.expand-icon,
		.calculate-button {
			transition: none;
		}

		.calculate-button:hover {
			transform: none;
		}
	}
</style>
