import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'


// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faCircleHalfStroke, faSort, faSortUp, faSortDown} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faCircleHalfStroke, faSort, faSortUp, faSortDown)

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light'
  }
})


const app = createApp(App)

app.use(createPinia())
app.use(vuetify)
.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
