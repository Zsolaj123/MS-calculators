<script lang="ts">
	import { sdmtStore } from '$lib/stores/sdmt.svelte';
	import type { BICAMSDemographics } from '$lib/types/index';

	let age = $state(30);
	let sex = $state<1 | 2>(2);
	let education = $state<6 | 12 | 13 | 15 | 17 | 21>(15);

	const sexOptions = [
		{ value: 1, label: 'Férfi' },
		{ value: 2, label: 'Nő' }
	];

	const educationOptions = [
		{ value: 6, label: '6 év - Általános iskola' },
		{ value: 12, label: '12 év - Középiskola' },
		{ value: 13, label: '13 év - Szakképzés' },
		{ value: 15, label: '15 év - Főiskola (BSc)' },
		{ value: 17, label: '17 év - Egyetem (MSc)' },
		{ value: 21, label: '21 év - Doktori fokozat (PhD)' }
	];

	function handleSubmit() {
		const demographics: BICAMSDemographics = {
			age,
			sex,
			education
		};

		sdmtStore.setDemographics(demographics);
		sdmtStore.startPractice();
	}
</script>

<div class="demographics-form space-y-6">
	<div class="alert-info">
		<h3 class="font-semibold text-lg mb-2">ℹ️ Miért szükségesek ezek az adatok?</h3>
		<p class="text-sm">
			Az SDMT eredmények értékeléséhez a BICAMS (Brief International Cognitive Assessment for MS)
			módszertant használjuk, amely figyelembe veszi az életkorot, nemet és iskolai végzettséget. Ez
			lehetővé teszi, hogy az Ön eredményét összehasonlítsuk a hasonló demográfiai profilú
			személyekkel (Costers et al. 2017, belga validációs tanulmány).
		</p>
	</div>

	<form onsubmit={handleSubmit} class="space-y-4">
		<!-- Age -->
		<div>
			<label for="age" class="block font-medium mb-2"> Életkor (év) </label>
			<input id="age" type="number" bind:value={age} min="18" max="100" required class="input w-full" />
			<p class="text-sm text-gray-600 mt-1">Kérem, adja meg jelenlegi életkorát.</p>
		</div>

		<!-- Sex -->
		<div>
			<label for="sex" class="block font-medium mb-2"> Nem </label>
			<select id="sex" bind:value={sex} required class="select w-full">
				{#each sexOptions as option (option.value)}
					<option value={option.value}>{option.label}</option>
				{/each}
			</select>
		</div>

		<!-- Education -->
		<div>
			<label for="education" class="block font-medium mb-2"> Legmagasabb iskolai végzettség </label>
			<select id="education" bind:value={education} required class="select w-full">
				{#each educationOptions as option (option.value)}
					<option value={option.value}>{option.label}</option>
				{/each}
			</select>
			<p class="text-sm text-gray-600 mt-1">
				Az összevont tanulási idő (évek) alapján kerül normalizálásra az eredmény.
			</p>
		</div>

		<button type="submit" class="btn btn-primary w-full"> Tovább a gyakorláshoz </button>
	</form>
</div>

<style>
	.alert-info {
		@apply bg-neuratos-blue-100 border-l-4 border-neuratos-blue-500 p-4 rounded-r-lg;
	}
</style>
