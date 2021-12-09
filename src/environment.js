import { Environment } from '$houdini'
const GRAPHQL_API = import.meta.env.VITE_GRAPHQL_API
const SECRET_TOKEN = import.meta.env.VITE_SECRET_TOKEN

export default new Environment(async function ({
  text,
  variables = {},
}) {
  // send the request to the api
  const result = await this.fetch(GRAPHQL_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // this is here to demonstrate that secrets can't be used with Vite
      Authorization: `Bearer ${SECRET_TOKEN}`,
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  })

  // parse the result as json
  return await result.json()
})
