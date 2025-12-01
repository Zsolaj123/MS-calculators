/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				// NEURATOS brand colors
				'neuratos-blue': {
					50: '#eff6ff',
					100: '#dbeafe',
					200: '#bfdbfe',
					300: '#93c5fd',
					400: '#60a5fa',
					500: '#3b82f6',
					600: '#2563eb',
					700: '#1d4ed8',
					800: '#1e40af',
					900: '#1e3a8a',
					950: '#172554'
				},
				// Galaxy dark theme colors
				'galaxy-dark': {
					50: '#f8fafc',
					100: '#e2e8f0',
					200: '#cbd5e1',
					300: '#94a3b8',
					400: '#64748b',
					500: '#475569',
					600: '#334155',
					700: '#1e293b',
					800: '#0f172a',
					900: '#0d1117',
					950: '#020617'
				},
				// Brutalist accent colors
				brutalist: {
					black: '#000000',
					white: '#ffffff',
					shadow: '#00a4ef',
					border: '#32303e',
					surface: '#1a1a2e',
					'surface-alt': '#16162a'
				}
			},
			minHeight: {
				'touch-target': '44px'
			},
			minWidth: {
				'touch-target': '44px'
			},
			boxShadow: {
				brutalist: '6px 6px 0 var(--shadow-color, #3b82f6)',
				'brutalist-hover': '9px 9px 0 var(--shadow-color, #1d4ed8)',
				'brutalist-active': '0 0 0 var(--shadow-color, #3b82f6)',
				'dark-card': '4px 4px 0 #000',
				'dark-card-elevated': '4px 4px 0 #000, 8px 8px 20px rgba(0, 0, 0, 0.4)'
			}
		}
	},
	plugins: []
};
