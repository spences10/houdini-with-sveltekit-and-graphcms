<script context="module">
  export const PostQueryVariables = ({ page: { params } }) => {
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
      query PostQuery($slug: String!) {
        post(where: { slug: $slug }) {
          title
          date
          tags
          author {
            name
            authorTitle: title
            picture {
              url(
                transformation: {
                  image: {
                    resize: { fit: clip, height: 50, width: 50 }
                  }
                }
              )
            }
          }
          content {
            html
          }
          coverImage {
            url
          }
        }
      }
    `
  )

  const { post } = $data
</script>

<pre>{JSON.stringify(post, null, 2)}</pre>
