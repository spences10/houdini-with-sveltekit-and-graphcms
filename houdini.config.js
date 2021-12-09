/** @type {import('houdini').ConfigFile} */
const config = {
  schemaPath: './schema.graphql',
  sourceGlob: 'src/**/*.svelte',
  module: 'esm',
  framework: 'kit',
  scalars: {
    // the name of the scalar we are configuring
    Date: {
      // the corresponding typescript type (what the typedef generator leaves behind in the response and operation inputs)
      type: 'Date',
      // turn the api's response into that type
      unmarshal(val) {
        const date = new Date(0)
        date.setMilliseconds(val)

        return date
      },
      // turn the value into something the API can use
      marshal(date) {
        return date.getTime()
      },
    },
  },
}

export default config
