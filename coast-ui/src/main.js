import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'


// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const myCustomLightTheme = {
    dark: false,
    colors: {
        background: '#F1F1F9',
    },
  }

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
        myCustomLightTheme
    },
  },
})


const app = createApp(App)

app.use(createPinia())
app.use(vuetify);

app.mount('#app')
