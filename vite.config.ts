import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import eslintPlugin from 'vite-plugin-eslint'
console.log('\x1b[33m%s\x1b[0m', 'Welcome to Slot Machine! 🎰')

export default ({ mode }) => {
  return defineConfig({
    plugins: [
      eslintPlugin(),
      viteStaticCopy({
        targets: [
          {
            src: 'src/assets/images',
            dest: 'assets',
          },
        ],
      }),
    ],
    server: {
      port: 8080,
      watch: {
        usePolling: true,
      },
    },
  })
}
