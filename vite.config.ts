import { defineConfig, loadEnv } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import progress from 'vite-plugin-progress';
// https://vitejs.dev/config/

export default defineConfig({
	base: './',
	dts: true,
	plugins: [
		progress({
			format: 'building [:bar] :percent',
			total: 100,
			width: 100,
			complete: '-',
			incomplete: ''
		}),
		uni()
	],
	server: {
		port: 3000
	}
});
