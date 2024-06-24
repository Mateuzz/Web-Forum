import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig((command) => {
    return {
        server: {
            port: 8080
        },
        preview: {
            port: 8080
        },
        build: {
            sourcemap: true,
        },
        plugins: [
            vue({ 
            }),
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
                '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
                '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
                '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
                '@img': fileURLToPath(new URL('./src/assets/img', import.meta.url)),
                '@fonts': fileURLToPath(new URL('./src/assets/fonts', import.meta.url)),
                '@composables': fileURLToPath(new URL('./src/composables', import.meta.url)),
                '@props': fileURLToPath(new URL('./src/props', import.meta.url)),
            }
        }
    };
})

