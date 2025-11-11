<script lang="ts">
	import { goto } from '$app/navigation';

	interface Calculator {
		id: string;
		name: string;
		shortName: string;
		icon: string;
		description: string;
		category: 'cognitive' | 'disability' | 'functional';
		status: 'available' | 'coming-soon';
		route?: string;
		features: string[];
	}

	const calculators: Calculator[] = [
		{
			id: 'edss',
			name: 'EDSS - Kibővített Rokkantsági Állapot Skála',
			shortName: 'EDSS',
			icon: '🎯',
			description: 'A sclerosis multiplex által okozott fogyatékosság standardizált értékelése 0.0-tól 10.0-ig.',
			category: 'disability',
			status: 'available',
			route: '/edss',
			features: [
				'7 funkcionális rendszer értékelése',
				'Járóképesség mérése',
				'Automatikus EDSS számítás',
				'Részletes interpretáció',
				'Exportálható eredmények'
			]
		},
		{
			id: 'sdmt',
			name: 'SDMT - Symbol Digit Modalities Test',
			shortName: 'SDMT',
			icon: '🧠',
			description: 'Feldolgozási sebesség és vizuális munkamemória értékelése szimbólum-szám párosítással.',
			category: 'cognitive',
			status: 'available',
			route: '/sdmt',
			features: [
				'90 másodperces teszt',
				'Gyakorló mód',
				'BICAMS z-score normalizálás',
				'Többféle szimbólumkészlet',
				'Testreszabható beállítások'
			]
		},
		{
			id: 'sdmt-mobile',
			name: 'SDMT - Mobil Verzió',
			shortName: 'SDMT Mobil',
			icon: '📱',
			description: 'Mobilra optimalizált SDMT teszt nagy szimbólumokkal és érintésvezérlésű billentyűzettel.',
			category: 'cognitive',
			status: 'available',
			route: '/sdmt-mobile',
			features: [
				'Teljes képernyős élmény',
				'Nagy érintési célpontok',
				'Optimalizált elrendezés',
				'Tableten is használható',
				'Ugyanaz az értékelés'
			]
		},
		{
			id: 'pasat',
			name: 'PASAT - Paced Auditory Serial Addition Test',
			shortName: 'PASAT',
			icon: '🔢',
			description: 'Hallási munkamemória és információfeldolgozási sebesség mérése ritmusos számösszeadással.',
			category: 'cognitive',
			status: 'coming-soon',
			features: [
				'PASAT-3 és PASAT-2',
				'Hallási stimulus',
				'BICAMS normák',
				'Automatikus pontozás',
				'Progresszív nehézség'
			]
		},
		{
			id: 'bvmt',
			name: 'BVMT-R - Brief Visuospatial Memory Test',
			shortName: 'BVMT-R',
			icon: '👁️',
			description: 'Vizuális tanulás és emlékezet értékelése geometrikus figurák segítségével.',
			category: 'cognitive',
			status: 'coming-soon',
			features: [
				'3 tanulási trial',
				'Késleltetett felidézés',
				'Felismerési teszt',
				'BICAMS kompatibilis',
				'Standardizált pontozás'
			]
		},
		{
			id: 'cvlt',
			name: 'CVLT-II - California Verbal Learning Test',
			shortName: 'CVLT-II',
			icon: '📝',
			description: 'Verbális tanulás és emlékezet mélyreható értékelése szólisták segítségével.',
			category: 'cognitive',
			status: 'coming-soon',
			features: [
				'Verbális tanulás görbe',
				'Interferencia hatás',
				'Hosszú távú megtartás',
				'Felismerési teljesítmény',
				'Részletes analitika'
			]
		},
		{
			id: 'msfc',
			name: 'MSFC - Multiple Sclerosis Functional Composite',
			shortName: 'MSFC',
			icon: '🏃',
			description: 'Komplex funkcionális értékelés láb-, kéz- és kognitív funkciók mérésével.',
			category: 'functional',
			status: 'coming-soon',
			features: [
				'9-Hole Peg Test',
				'Timed 25-Foot Walk',
				'PASAT-3 integráció',
				'Z-score kalkuláció',
				'Longitudinális követés'
			]
		},
		{
			id: 't25fw',
			name: 'T25FW - Timed 25-Foot Walk',
			shortName: 'T25FW',
			icon: '🚶',
			description: 'Járási sebesség és mobilitás objektív mérése 25 láb távolságon.',
			category: 'functional',
			status: 'coming-soon',
			features: [
				'Egyszerű időmérés',
				'Ismételt mérések',
				'Segédeszköz rögzítése',
				'Átlag kalkuláció',
				'Normatív adatok'
			]
		},
		{
			id: '9hpt',
			name: '9HPT - Nine-Hole Peg Test',
			shortName: '9HPT',
			icon: '✋',
			description: 'Felső végtag funkció és finommotoros ügyesség értékelése.',
			category: 'functional',
			status: 'coming-soon',
			features: [
				'Bal és jobb kéz külön',
				'Időmérés automatizálás',
				'Statisztikai elemzés',
				'Longitudinális trend',
				'MSFC kompatibilis'
			]
		}
	];

	let selectedCategory = $state<'all' | 'cognitive' | 'disability' | 'functional'>('all');

	const filteredCalculators = $derived(
		selectedCategory === 'all'
			? calculators
			: calculators.filter((calc) => calc.category === selectedCategory)
	);

	const categoryLabels = {
		all: 'Összes',
		cognitive: 'Kognitív',
		disability: 'Fogyatékosság',
		functional: 'Funkcionális'
	};

	function navigateToCalculator(calc: Calculator) {
		if (calc.status === 'available' && calc.route) {
			goto(calc.route);
		}
	}
</script>

<svelte:head>
	<title>Neuratos MS Calculators - Szakmai Eszközök</title>
	<meta
		name="description"
		content="Komplex MS értékelő eszközök: EDSS, SDMT, PASAT, BVMT-R, CVLT-II, MSFC és további tesztek."
	/>
</svelte:head>

<div class="demo-container">
	<!-- Hero Section -->
	<div class="hero-section">
		<div class="hero-content">
			<h1 class="hero-title">
				<span class="hero-icon">🧬</span>
				Neuratos MS™ Calculators
			</h1>
			<p class="hero-subtitle">
				Átfogó Multiple Sclerosis értékelő eszközök kognitív, fogyatékossági és funkcionális
				tesztek szakmai használatára
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
			<p class="filter-label">Kategória szűrés:</p>
			<div class="filter-buttons">
				{#each Object.entries(categoryLabels) as [key, label]}
					<button
						class="filter-button"
						class:active={selectedCategory === key}
						onclick={() => (selectedCategory = key as typeof selectedCategory)}
					>
						{label}
					</button>
				{/each}
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
					class:coming-soon={calc.status === 'coming-soon'}
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
						<div class="card-icon">{calc.icon}</div>
						<div class="card-title-section">
							<h3 class="card-title">{calc.shortName}</h3>
							{#if calc.status === 'coming-soon'}
								<span class="status-badge coming-soon-badge">Hamarosan</span>
							{:else}
								<span class="status-badge available-badge">Elérhető</span>
							{/if}
						</div>
					</div>

					<h4 class="card-subtitle">{calc.name}</h4>
					<p class="card-description">{calc.description}</p>

					<div class="card-features">
						<p class="features-title">Funkciók:</p>
						<ul class="features-list">
							{#each calc.features as feature}
								<li class="feature-item">
									<span class="feature-bullet">✓</span>
									{feature}
								</li>
							{/each}
						</ul>
					</div>

					<div class="card-footer">
						{#if calc.status === 'available'}
							<button class="card-button">Eszköz kipróbálása →</button>
						{:else}
							<button class="card-button disabled" disabled>Fejlesztés alatt</button>
						{/if}
					</div>

					<div class="card-category-badge">
						{#if calc.category === 'cognitive'}
							<span class="category-tag cognitive">Kognitív</span>
						{:else if calc.category === 'disability'}
							<span class="category-tag disability">Fogyatékosság</span>
						{:else if calc.category === 'functional'}
							<span class="category-tag functional">Funkcionális</span>
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
	.demo-container {
		@apply min-h-screen;
		@apply bg-gradient-to-br from-neuratos-blue-50 via-white to-neuratos-blue-50;
		@apply dark:from-gray-900 dark:via-gray-800 dark:to-gray-900;
	}

	/* Hero Section */
	.hero-section {
		@apply py-16 px-4;
		@apply bg-gradient-to-r from-neuratos-blue-600 to-neuratos-blue-800;
		@apply dark:from-neuratos-blue-800 dark:to-neuratos-blue-950;
		@apply shadow-xl;
	}

	.hero-content {
		@apply max-w-4xl mx-auto text-center;
	}

	.hero-title {
		@apply text-4xl md:text-5xl font-bold mb-4;
		@apply text-white;
		@apply flex items-center justify-center gap-4;
	}

	.hero-icon {
		@apply text-5xl md:text-6xl;
	}

	.hero-subtitle {
		@apply text-lg md:text-xl mb-6;
		@apply text-neuratos-blue-100;
		@apply max-w-3xl mx-auto;
	}

	.hero-badges {
		@apply flex flex-wrap gap-3 justify-center;
	}

	.badge {
		@apply px-4 py-2 rounded-full text-sm font-semibold;
		@apply shadow-md;
	}

	.badge-primary {
		@apply bg-white text-neuratos-blue-700;
	}

	.badge-secondary {
		@apply bg-neuratos-blue-700 text-white;
	}

	.badge-success {
		@apply bg-green-500 text-white;
	}

	.badge-info {
		@apply bg-purple-500 text-white;
	}

	/* Filter Section */
	.filter-section {
		@apply py-6 px-4;
		@apply bg-white dark:bg-gray-800;
		@apply border-b border-gray-200 dark:border-gray-700;
		@apply sticky top-0 z-10;
		@apply shadow-sm;
	}

	.filter-container {
		@apply max-w-6xl mx-auto;
		@apply flex flex-col sm:flex-row items-center justify-center gap-4;
	}

	.filter-label {
		@apply text-sm font-semibold text-gray-700 dark:text-gray-300;
	}

	.filter-buttons {
		@apply flex flex-wrap gap-2 justify-center;
	}

	.filter-button {
		@apply px-5 py-2 rounded-lg;
		@apply text-sm font-medium;
		@apply bg-gray-100 dark:bg-gray-700;
		@apply text-gray-700 dark:text-gray-300;
		@apply transition-all duration-200;
		@apply hover:bg-gray-200 dark:hover:bg-gray-600;
		@apply focus:outline-none focus:ring-2 focus:ring-neuratos-blue-500;
	}

	.filter-button.active {
		@apply bg-neuratos-blue-600 dark:bg-neuratos-blue-700;
		@apply text-white;
		@apply shadow-md;
	}

	/* Calculators Grid */
	.calculators-section {
		@apply py-12 px-4;
		@apply max-w-7xl mx-auto;
	}

	.calculators-grid {
		@apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
	}

	.calculator-card {
		@apply bg-white dark:bg-gray-800;
		@apply rounded-xl shadow-lg;
		@apply p-6;
		@apply border-2 border-gray-200 dark:border-gray-700;
		@apply transition-all duration-300;
		@apply relative;
		@apply flex flex-col;
	}

	.calculator-card.available {
		@apply hover:shadow-2xl hover:border-neuratos-blue-500;
		@apply hover:-translate-y-1;
		@apply cursor-pointer;
	}

	.calculator-card.coming-soon {
		@apply opacity-75;
		@apply cursor-not-allowed;
	}

	.card-header {
		@apply flex items-start gap-4 mb-4;
	}

	.card-icon {
		@apply text-5xl;
		@apply flex-shrink-0;
	}

	.card-title-section {
		@apply flex-1;
	}

	.card-title {
		@apply text-2xl font-bold;
		@apply text-neuratos-blue-700 dark:text-neuratos-blue-300;
		@apply mb-2;
	}

	.status-badge {
		@apply inline-block px-3 py-1 rounded-full text-xs font-semibold;
	}

	.available-badge {
		@apply bg-green-100 dark:bg-green-900;
		@apply text-green-800 dark:text-green-200;
	}

	.coming-soon-badge {
		@apply bg-yellow-100 dark:bg-yellow-900;
		@apply text-yellow-800 dark:text-yellow-200;
	}

	.card-subtitle {
		@apply text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3;
	}

	.card-description {
		@apply text-gray-700 dark:text-gray-300 mb-4 leading-relaxed;
	}

	.card-features {
		@apply mb-6 flex-1;
	}

	.features-title {
		@apply text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2;
	}

	.features-list {
		@apply space-y-1.5;
	}

	.feature-item {
		@apply text-sm text-gray-600 dark:text-gray-400;
		@apply flex items-start gap-2;
	}

	.feature-bullet {
		@apply text-green-600 dark:text-green-400 font-bold;
		@apply flex-shrink-0;
	}

	.card-footer {
		@apply pt-4 border-t border-gray-200 dark:border-gray-700;
	}

	.card-button {
		@apply w-full py-3 px-4 rounded-lg;
		@apply bg-neuratos-blue-600 hover:bg-neuratos-blue-700;
		@apply text-white font-semibold;
		@apply transition-all duration-200;
		@apply focus:outline-none focus:ring-4 focus:ring-neuratos-blue-300;
		@apply shadow-md hover:shadow-lg;
	}

	.card-button.disabled {
		@apply bg-gray-300 dark:bg-gray-600;
		@apply cursor-not-allowed opacity-50;
	}

	.card-category-badge {
		@apply absolute top-4 right-4;
	}

	.category-tag {
		@apply px-3 py-1 rounded-full text-xs font-bold;
		@apply shadow-sm;
	}

	.category-tag.cognitive {
		@apply bg-purple-100 dark:bg-purple-900;
		@apply text-purple-700 dark:text-purple-300;
	}

	.category-tag.disability {
		@apply bg-blue-100 dark:bg-blue-900;
		@apply text-blue-700 dark:text-blue-300;
	}

	.category-tag.functional {
		@apply bg-orange-100 dark:bg-orange-900;
		@apply text-orange-700 dark:text-orange-300;
	}

	/* Footer Section */
	.footer-section {
		@apply py-12 px-4;
		@apply bg-gray-100 dark:bg-gray-900;
		@apply border-t border-gray-200 dark:border-gray-800;
	}

	.footer-content {
		@apply max-w-4xl mx-auto text-center;
	}

	.footer-text {
		@apply text-gray-700 dark:text-gray-300 mb-2;
	}

	.footer-subtext {
		@apply text-sm text-gray-500 dark:text-gray-500 mb-4;
	}

	.footer-copyright {
		@apply text-xs text-gray-400 dark:text-gray-600;
	}

	.footer-link {
		@apply text-neuratos-blue-600 dark:text-neuratos-blue-400;
		@apply hover:underline;
	}

	/* Mobile optimizations */
	@media (max-width: 640px) {
		.hero-title {
			@apply text-3xl flex-col;
		}

		.hero-icon {
			@apply text-4xl;
		}

		.card-icon {
			@apply text-4xl;
		}

		.card-title {
			@apply text-xl;
		}
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.calculator-card {
			transition: none;
		}

		.calculator-card.available:hover {
			transform: none;
		}
	}
</style>
