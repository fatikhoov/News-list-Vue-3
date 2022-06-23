import { createApp } from 'vue'
import App from './App'
import components from '@/components/UI'
import directives from '@/directives'

import './registerServiceWorker'
import store from './store'
import router from '@/router'

import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getDatabase } from 'firebase/database'

const appDB = initializeApp({
  apiKey: 'AIzaSyBR72w8SfdXJKEZVaUlEGc3DPPzYg-aXrk',
  authDomain: 'news-vf.firebaseapp.com',
  databaseURL: 'https://news-vf-default-rtdb.firebaseio.com',
  projectId: 'news-vf',
  storageBucket: 'news-vf.appspot.com',
  messagingSenderId: '972542800946',
  appId: '1:972542800946:web:f01a06eae96951773f382b',
  measurementId: 'G-KE43EED5K1',
})
const analytics = getAnalytics(appDB)
const database = getDatabase(appDB)

const app = createApp(App)

components.forEach((component) => {
  app.component(component.name, component)
})

directives.forEach((directive) => {
  app.directive(directive.name, directive)
})

app.use(router).use(store).mount('#app')
