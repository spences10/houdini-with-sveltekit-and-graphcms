<script>
  import { graphql, query } from '$houdini'
  const { data } = query(graphql`
    query AllPosts {
      posts {
        title
        slug
        date
        excerpt
        tags
        coverImage {
          url
        }
      }
    }
  `)
  const { posts } = $data
</script>

{#each posts as post}
  <a href={`/posts/${post.slug}`}>{post.title}</a>
{/each}

<pre>{JSON.stringify(posts, null, 2)}</pre>

<h1>Welcome to SvelteKit</h1>
<p>
  Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the
  documentation
</p>
