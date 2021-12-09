<script context="module">
  export const PageQueryVariables = ({ page: { params } }) => {
    const { slug } = params
    return {
      slug,
    }
  }
</script>

<script>
  import { graphql, query } from '$houdini'

  const { data } = query(
    graphql`
      query PageQuery($slug: String!) {
        page(where: { slug: $slug }) {
          title
          content {
            html
          }
        }
      }
    `
  )

  const { page } = $data
</script>

<svelte:head>
  <title>Sparkles Blog | {page.title}</title>
</svelte:head>

<h1 class="text-4xl font-semibold mb-5">{page.title}</h1>

<article class="prose">
  {@html page.content.html}
</article>
