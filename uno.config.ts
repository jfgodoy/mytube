import { defineConfig } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  transformers: [
    transformerDirectives(),
  ],
  theme: {
    colors: {
        'blue': '#136AE4',
        'red': '#D7214D',
        'green': '#008A64'
    }
  }
})
