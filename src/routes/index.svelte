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

<svelte:head>
  <title>Houdini with GraphCMS | Welcome</title>
</svelte:head>

<div class="prose mb-12">
  <h1>Houdini with GraphCMS</h1>
  <p>
    An example project using the GraphCMS blog template and Houdini
    for the GraphQL client
  </p>
</div>

{#each posts as { title, slug, excerpt, coverImage, tags }}
  <div class="card text-center shadow-2xl mb-20">
    <figure class="">
      <img
        class=""
        src={coverImage.url}
        alt={`Cover image for ${title}`}
      />
    </figure>
    <div class="card-body prose">
      <h2 class="title">{title}</h2>
      <p>{excerpt}</p>
      <div class="flex justify-center mt-5 space-x-2">
        {#each tags as tag}
          <span class="badge badge-primary">{tag}</span>
        {/each}
      </div>
      <div class="justify-center card-actions">
        <a
          sveltekit:prefetch
          href={`/posts/${slug}`}
          class="btn btn-outline btn-primary">Read &rArr;</a
        >
      </div>
    </div>
  </div>
{/each}
