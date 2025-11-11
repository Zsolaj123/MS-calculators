import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	testDir: 'tests/e2e',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	use: {
		// Mobile-first testing
		viewport: { width: 375, height: 667 }, // iPhone SE size
		actionTimeout: 10000,
		screenshot: 'only-on-failure',
		video: 'retain-on-failure'
	},
	projects: [
		{
			name: 'Mobile',
			use: {
				viewport: { width: 375, height: 667 }
			}
		},
		{
			name: 'Tablet',
			use: {
				viewport: { width: 768, height: 1024 }
			}
		},
		{
			name: 'Desktop',
			use: {
				viewport: { width: 1280, height: 720 }
			}
		}
	]
};

export default config;
