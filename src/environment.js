import { Environment } from '$houdini'
const GRAPHQL_API = import.meta.env.VITE_GRAPHQL_API

export default new Environment(async function ({
  text,
  variables = {},
}) {
  // send the request to the api
  const result = await this.fetch(GRAPHQL_API, {
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
