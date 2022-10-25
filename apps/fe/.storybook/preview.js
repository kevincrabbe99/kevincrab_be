export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds:{
    default: 'Desktop Green',
    values: [
      {
        name: 'Desktop Green',
        value: '#55AAAA',
      },
      {
        name: 'black',
        value: '#000000',
      }
    ]
  }
}