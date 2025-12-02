# Neuratos MS™ Calculators

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Svelte](https://img.shields.io/badge/Svelte-5-FF3E00?logo=svelte&logoColor=white)](https://svelte.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![SvelteKit](https://img.shields.io/badge/SvelteKit-2-FF3E00?logo=svelte&logoColor=white)](https://kit.svelte.dev/)
[![WCAG AAA](https://img.shields.io/badge/WCAG-AAA-4A90A4?logo=accessibility&logoColor=white)](https://www.w3.org/WAI/WCAG21/quickref/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

**A comprehensive Multiple Sclerosis assessment toolkit with BICAMS normalization**

*Magyar verzió lentebb / Hungarian version below*

<p align="center">
  <img src="https://img.shields.io/badge/EDSS-Calculator-3B82F6?style=for-the-badge" alt="EDSS"/>
  <img src="https://img.shields.io/badge/SDMT-Test-10B981?style=for-the-badge" alt="SDMT"/>
  <img src="https://img.shields.io/badge/PASAT-Test-8B5CF6?style=for-the-badge" alt="PASAT"/>
  <img src="https://img.shields.io/badge/MSFC-Composite-F59E0B?style=for-the-badge" alt="MSFC"/>
</p>

---

## English

### Overview

Neuratos MS™ Calculators is a modern, accessible web application for clinical MS (Multiple Sclerosis) assessment. Built with Svelte 5 and TypeScript, it provides standardized cognitive and functional tests with Hungarian BICAMS (Brief International Cognitive Assessment for MS) normalization.

### Features

- **EDSS Calculator** - Expanded Disability Status Scale with functional system scoring
- **SDMT** - Symbol Digit Modalities Test with voice input support
- **PASAT** - Paced Auditory Serial Addition Test with audio playback
- **MSFC** - Multiple Sclerosis Functional Composite (9HPT, T25FW, PASAT)
- **BICAMS Z-Score Normalization** - Hungarian population norms for cognitive tests

### Technical Highlights

- **Svelte 5** with runes (`$state`, `$derived`, `$effect`)
- **TypeScript** for type safety
- **Tailwind CSS** with Galaxy dark theme
- **WCAG AAA** accessibility compliance
- **Mobile-first** responsive design
- **Voice input** support for SDMT (Hungarian & English)
- **Offline-capable** PWA architecture

### Installation

```bash
# Clone the repository
git clone https://github.com/Zsolaj123/MS-calculators.git
cd MS-calculators

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Usage as a Library

This package can be installed and used as a component library:

```bash
npm install @neuratos/ms-calculators
```

```svelte
<script>
  import { EDSSCalculator } from '@neuratos/ms-calculators/edss';
  import { SDMTTest } from '@neuratos/ms-calculators/sdmt';
  import { PASATTest } from '@neuratos/ms-calculators/pasat';
</script>

<EDSSCalculator />
```

### Project Structure

```
src/
├── lib/
│   ├── components/     # Svelte components
│   │   ├── edss/       # EDSS calculator
│   │   ├── sdmt/       # SDMT test
│   │   ├── pasat/      # PASAT test
│   │   ├── msfc/       # MSFC composite
│   │   ├── bicams/     # BICAMS normalization
│   │   └── ui/         # Shared UI components
│   ├── services/       # Business logic services
│   ├── stores/         # Svelte stores (state management)
│   ├── types/          # TypeScript type definitions
│   └── data/           # Static data (symbols, norms)
├── routes/             # SvelteKit pages
└── tests/              # Test files
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run check` | Type-check the codebase |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run E2E tests with Playwright |
| `npm run lint` | Lint codebase |
| `npm run format` | Format code with Prettier |

### BICAMS Normalization

The BICAMS Z-score calculation follows Hungarian population norms:

```typescript
interface BICAMSDemographics {
  age: number;
  sex: 1 | 2;           // 1=Male, 2=Female
  education: 6 | 12 | 13 | 15 | 17 | 21;  // Years of education
}

interface BICAMSResult {
  zScore: number;
  scaledScore: number;
  expectedScore: number;
  isImpaired: boolean;
  performanceLevel: 'normal' | 'borderline' | 'impaired' | 'severely-impaired';
}
```

### Accessibility

This application follows WCAG AAA guidelines:
- Minimum 44px touch targets
- 7:1 contrast ratio for text
- Full keyboard navigation
- Screen reader support
- Reduced motion support
- MS-specific accommodations (cognitive fatigue, vision)

### Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### License

MIT License - see [LICENSE](LICENSE) for details.

### References

- Kurtzke JF (1983) - EDSS Scale
- Benedict RHB et al. (2006) - BICAMS
- Fischer JS et al. (1999) - MSFC

---

## Magyar

### Áttekintés

A Neuratos MS™ Calculators egy modern, akadálymentes webalkalmazás klinikai SM (sclerosis multiplex) értékeléshez. Svelte 5 és TypeScript technológiával készült, szabványosított kognitív és funkcionális teszteket biztosít magyar BICAMS (Brief International Cognitive Assessment for MS) normalizációval.

### Funkciók

- **EDSS Kalkulátor** - Kibővített Rokkantsági Állapot Skála funkcionális rendszer pontozással
- **SDMT** - Szimbólum-Szám Modalitások Teszt hangbemenet támogatással
- **PASAT** - Ütemezett Auditoros Sorozatos Összeadási Teszt hanglejátszással
- **MSFC** - Sclerosis Multiplex Funkcionális Kompozit (9HPT, T25FW, PASAT)
- **BICAMS Z-Score Normalizáció** - Magyar populációs normák kognitív tesztekhez

### Technikai jellemzők

- **Svelte 5** rune-okkal (`$state`, `$derived`, `$effect`)
- **TypeScript** típusbiztonsághoz
- **Tailwind CSS** Galaxy sötét témával
- **WCAG AAA** akadálymentességi megfelelőség
- **Mobile-first** reszponzív dizájn
- **Hangbemenet** támogatás SDMT-hez (magyar és angol)
- **Offline-képes** PWA architektúra

### Telepítés

```bash
# Repository klónozása
git clone https://github.com/Zsolaj123/MS-calculators.git
cd MS-calculators

# Függőségek telepítése
npm install

# Fejlesztői szerver indítása
npm run dev

# Éles build készítése
npm run build
```

### Használat könyvtárként

A csomag telepíthető és használható komponens könyvtárként:

```bash
npm install @neuratos/ms-calculators
```

```svelte
<script>
  import { EDSSCalculator } from '@neuratos/ms-calculators/edss';
  import { SDMTTest } from '@neuratos/ms-calculators/sdmt';
  import { PASATTest } from '@neuratos/ms-calculators/pasat';
</script>

<EDSSCalculator />
```

### Projekt struktúra

```
src/
├── lib/
│   ├── components/     # Svelte komponensek
│   │   ├── edss/       # EDSS kalkulátor
│   │   ├── sdmt/       # SDMT teszt
│   │   ├── pasat/      # PASAT teszt
│   │   ├── msfc/       # MSFC kompozit
│   │   ├── bicams/     # BICAMS normalizáció
│   │   └── ui/         # Közös UI komponensek
│   ├── services/       # Üzleti logika szolgáltatások
│   ├── stores/         # Svelte store-ok (állapotkezelés)
│   ├── types/          # TypeScript típusdefiníciók
│   └── data/           # Statikus adatok (szimbólumok, normák)
├── routes/             # SvelteKit oldalak
└── tests/              # Teszt fájlok
```

### Elérhető scriptek

| Parancs | Leírás |
|---------|--------|
| `npm run dev` | Fejlesztői szerver indítása |
| `npm run build` | Éles build készítése |
| `npm run preview` | Éles build előnézete |
| `npm run check` | Kódbázis típusellenőrzése |
| `npm run test` | Unit tesztek futtatása |
| `npm run test:e2e` | E2E tesztek Playwright-tal |
| `npm run lint` | Kódbázis lintelése |
| `npm run format` | Kód formázása Prettier-rel |

### BICAMS Normalizáció

A BICAMS Z-score számítás magyar populációs normákat követ:

```typescript
interface BICAMSDemographics {
  age: number;
  sex: 1 | 2;           // 1=Férfi, 2=Nő
  education: 6 | 12 | 13 | 15 | 17 | 21;  // Iskolázottság évei
}

interface BICAMSResult {
  zScore: number;
  scaledScore: number;
  expectedScore: number;
  isImpaired: boolean;
  performanceLevel: 'normal' | 'borderline' | 'impaired' | 'severely-impaired';
}
```

### Akadálymentesség

Az alkalmazás WCAG AAA irányelveket követ:
- Minimum 44px érintési célpontok
- 7:1 kontraszt arány szöveghez
- Teljes billentyűzetes navigáció
- Képernyőolvasó támogatás
- Csökkentett mozgás támogatás
- SM-specifikus alkalmazkodások (kognitív fáradtság, látás)

### Közreműködés

Lásd a [CONTRIBUTING.md](CONTRIBUTING.md) fájlt az irányelvekért.

### Licenc

MIT Licenc - részletek a [LICENSE](LICENSE) fájlban.

### Hivatkozások

- Kurtzke JF (1983) - EDSS Skála
- Benedict RHB et al. (2006) - BICAMS
- Fischer JS et al. (1999) - MSFC

---

## Acknowledgments / Köszönetnyilvánítás

Built with [Claude Code](https://claude.com/claude-code)

---

**Neuratos MS™** - Clinical and research MS assessment tools
**Neuratos MS™** - Klinikai és kutatási SM értékelő eszközök
