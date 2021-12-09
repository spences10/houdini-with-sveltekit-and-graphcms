# Houdini with SvelteKit and GraphCMS

An example of using Houdini with SvelteKit and GraphCMS.

## Guide from `npm init svelte@next`

Bootstrap project with `npx houdini init`, add your GraphQL endpoint.

Add `$houdini` to your `.gitignore`.

Move the GraphQL endpoint out of `src/environment.js` into a `.env`
file, and remove the `apiUrl` property from the `houdini.config.js`:

`src/environment.js`:

```diff
import { Environment } from '$houdini'
+const GRAPHQL_API = import.meta.env.VITE_GRAPHQL_API

export default new Environment(async function ({
  text,
  variables = {},
}) {
  // send the request to the api
-  const result = await this.fetch('https://graphqlendpoint.com/graphql', {
+  const result = await this.fetch(GRAPHQL_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  })

  // parse the result as json
  return await result.json()
})
```

`houdini.config.js`

```diff
const GRAPHQL_API = import.meta.env.VITE_GRAPHQL_API

/** @type {import('houdini').ConfigFile} */
const config = {
  schemaPath: './schema.graphql',
  sourceGlob: 'src/**/*.svelte',
  module: 'esm',
  framework: 'kit',
-  apiUrl: GRAPHQL_API,
}

export default config
```

Add `npx houdini generate` to your scripts:

```json
"scripts": {
  "dev": "npx houdini generate && svelte-kit dev",
  "build": "npx houdini generate && svelte-kit build",
  "preview": "npx houdini generate && svelte-kit preview"
}
```

Add the following config to your SvelteKt config `svelte.config.js`:

```js
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
```

Use `npx houdini generate` to create the files needed for the queries.

Make sure to add the Houdini environment to the
`src/routes/__layout.svelte` file:

```svelte
<script context="module">
  import { setEnvironment } from '$houdini'
  import env from '../environment'

  setEnvironment(env)
</script>

<slot />
```
