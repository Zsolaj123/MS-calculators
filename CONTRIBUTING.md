# Contributing to Neuratos MS™ Calculators

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

*Magyar verzió lentebb / Hungarian version below*

---

## English

### Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help maintain a welcoming environment for all contributors

### How to Contribute

#### Reporting Bugs

1. Check if the issue already exists in [GitHub Issues](https://github.com/Zsolaj123/MS-calculators/issues)
2. If not, create a new issue with:
   - Clear, descriptive title
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser/device information
   - Screenshots if applicable

#### Suggesting Features

1. Open a new issue with the "enhancement" label
2. Describe the feature and its use case
3. Explain how it benefits MS patients or clinicians

#### Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes following the coding standards
4. Run tests: `npm run test && npm run check`
5. Commit with clear messages: `git commit -m "feat: add new feature"`
6. Push to your fork: `git push origin feature/your-feature-name`
7. Open a Pull Request

### Development Setup

```bash
# Clone the repository (or your fork)
git clone https://github.com/Zsolaj123/MS-calculators.git
cd MS-calculators

# Install dependencies
npm install

# Start development server
npm run dev

# Run type checking
npm run check

# Run tests
npm run test
```

### Coding Standards

#### Svelte 5 Patterns

```svelte
<script lang="ts">
  // Use Svelte 5 runes
  let count = $state(0);
  let doubled = $derived(count * 2);

  $effect(() => {
    console.log('Count changed:', count);
  });
</script>
```

#### TypeScript

- Use strict types, avoid `any`
- Define interfaces for all data structures
- Export types from `src/lib/types/index.ts`

#### CSS/Styling

- Use Tailwind CSS classes
- Follow Galaxy dark theme color palette
- Ensure 7:1 contrast ratio (WCAG AAA)
- Minimum 44px touch targets

#### Accessibility

- All interactive elements must be keyboard accessible
- Use semantic HTML elements
- Include ARIA labels where needed
- Support `prefers-reduced-motion`
- Test with screen readers

### Commit Message Format

Follow conventional commits:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

Examples:
```
feat(sdmt): add voice input support
fix(edss): correct pyramidal score calculation
docs: update README with installation steps
```

### Testing

- Write unit tests for services and utilities
- Write E2E tests for user flows
- Ensure tests pass before submitting PR

```bash
# Run unit tests
npm run test

# Run E2E tests
npm run test:e2e
```

### Medical Accuracy

When contributing clinical features:

- Reference peer-reviewed sources
- Follow established MS assessment protocols
- Consult BICAMS, EDSS, and MSFC documentation
- Do not modify normalization formulas without clinical validation

---

## Magyar

### Magatartási kódex

- Légy tiszteletteljes és befogadó
- Koncentrálj a konstruktív visszajelzésre
- Segíts fenntartani egy befogadó környezetet minden közreműködő számára

### Hogyan járulhatsz hozzá

#### Hibák jelentése

1. Ellenőrizd, hogy a probléma már létezik-e a [GitHub Issues](https://github.com/Zsolaj123/MS-calculators/issues) oldalon
2. Ha nem, hozz létre új issue-t:
   - Világos, leíró cím
   - Reprodukálási lépések
   - Elvárt vs tényleges viselkedés
   - Böngésző/eszköz információ
   - Képernyőképek ha releváns

#### Funkciók javaslása

1. Nyiss új issue-t "enhancement" címkével
2. Írd le a funkciót és használati esetét
3. Magyarázd el, hogyan segít az SM-es betegeknek vagy klinikusoknak

#### Pull Request-ek

1. Fork-old a repository-t
2. Hozz létre feature branch-et: `git checkout -b feature/funkció-neve`
3. Végezd el a módosításokat a kódolási szabványok szerint
4. Futtasd a teszteket: `npm run test && npm run check`
5. Commit-olj világos üzenetekkel: `git commit -m "feat: új funkció hozzáadása"`
6. Push-olj a fork-odba: `git push origin feature/funkció-neve`
7. Nyiss Pull Request-et

### Fejlesztési beállítás

```bash
# Repository klónozása (vagy a fork-od)
git clone https://github.com/Zsolaj123/MS-calculators.git
cd MS-calculators

# Függőségek telepítése
npm install

# Fejlesztői szerver indítása
npm run dev

# Típusellenőrzés futtatása
npm run check

# Tesztek futtatása
npm run test
```

### Kódolási szabványok

#### Svelte 5 minták

```svelte
<script lang="ts">
  // Svelte 5 rune-ok használata
  let count = $state(0);
  let doubled = $derived(count * 2);

  $effect(() => {
    console.log('Count megváltozott:', count);
  });
</script>
```

#### TypeScript

- Használj szigorú típusokat, kerüld az `any`-t
- Definiálj interface-eket minden adatstruktúrához
- Exportáld a típusokat a `src/lib/types/index.ts`-ből

#### CSS/Stílus

- Használj Tailwind CSS osztályokat
- Kövesd a Galaxy sötét téma színpalettáját
- Biztosíts 7:1 kontraszt arányt (WCAG AAA)
- Minimum 44px érintési célpontok

#### Akadálymentesség

- Minden interaktív elem legyen billentyűzettel elérhető
- Használj szemantikus HTML elemeket
- Adj ARIA címkéket ahol szükséges
- Támogasd a `prefers-reduced-motion`-t
- Tesztelj képernyőolvasókkal

### Commit üzenet formátum

Kövesd a conventional commits-ot:

```
típus(hatókör): leírás

[opcionális törzs]

[opcionális lábléc]
```

Típusok:
- `feat`: Új funkció
- `fix`: Hibajavítás
- `docs`: Dokumentáció
- `style`: Formázás
- `refactor`: Kód átstrukturálás
- `test`: Tesztek hozzáadása
- `chore`: Karbantartás

Példák:
```
feat(sdmt): hangbemenet támogatás hozzáadása
fix(edss): piramidális pontszám számítás javítása
docs: README frissítése telepítési lépésekkel
```

### Tesztelés

- Írj unit teszteket szolgáltatásokhoz és segédprogramokhoz
- Írj E2E teszteket felhasználói folyamatokhoz
- Győződj meg róla, hogy a tesztek átmennek PR beküldése előtt

```bash
# Unit tesztek futtatása
npm run test

# E2E tesztek futtatása
npm run test:e2e
```

### Orvosi pontosság

Klinikai funkciók hozzáadásakor:

- Hivatkozz peer-reviewed forrásokra
- Kövesd a bevált SM értékelési protokollokat
- Konzultálj BICAMS, EDSS és MSFC dokumentációval
- Ne módosítsd a normalizációs képleteket klinikai validáció nélkül

---

## Questions? / Kérdések?

Open an issue or reach out to the maintainers.
Nyiss issue-t vagy lépj kapcsolatba a karbantartókkal.
