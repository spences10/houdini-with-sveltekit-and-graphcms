import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-auto'
import houdini from 'houdini-preprocess'
import path from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    houdini(),
    preprocess({
      postcss: true,
    }),
  ],
  kit: {
    adapter: adapter(),
    vite: {
      resolve: {
        alias: {
          $houdini: path.resolve('.', '$houdini'),
        },
      },
      server: {
        fs: {
          // Allow serving files from one level up to the project root
          // posts, copy
          allow: ['..'],
        },
      },
    },
  },
}

export default config
