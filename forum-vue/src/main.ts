import '@/extensions.js'

import App from '@/App.vue'

import { createApp } from 'vue'
import router from '@/router'
import { Auth } from '@/api/auth.js'

Auth.rememberLogin().then(result => {
    if (result.message)
        console.warn(result.message)
})

const app = createApp(App)

app.use(router)
app.mount('body');
