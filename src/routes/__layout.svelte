<script context="module">
  import { setEnvironment } from '$houdini'
  import env from '../environment'

  setEnvironment(env)
</script>

<script>
  import Navbar from '$lib/components/navbar.svelte'
  import Footer from '$lib/components/footer.svelte'
  import { graphql, query } from '$houdini'
  import { onMount } from 'svelte'
  import { themeChange } from 'theme-change'
  import '../app.css'

  const { data } = query(graphql`
    query AllPages {
      pages {
        title
        slug
        content {
          html
        }
      }
    }
  `)
  const { pages } = $data

  onMount(async () => {
    themeChange(false)
  })
</script>

<Navbar {pages}/>

<main class="container max-w-3xl mx-auto px-4">
  <slot />
</main>

<Footer />
