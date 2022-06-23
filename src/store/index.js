import { createStore } from 'vuex'

import { initializeApp } from 'firebase/app'
import router from '@/router'
import { getDatabase, ref, set } from 'firebase/database'

const app = initializeApp({
  apiKey: 'AIzaSyBR72w8SfdXJKEZVaUlEGc3DPPzYg-aXrk',
  authDomain: 'news-vf.firebaseapp.com',
  databaseURL: 'https://news-vf-default-rtdb.firebaseio.com',
  projectId: 'news-vf',
  storageBucket: 'news-vf.appspot.com',
  messagingSenderId: '972542800946',
  appId: '1:972542800946:web:f01a06eae96951773f382b',
  measurementId: 'G-KE43EED5K1',
})

export default createStore({
  state: {
    error: null,
  },
  getters: {
    error: (s) => s.error,
  },
  mutations: {
    setErrors(state, error) {
      state.error = error
    },
    clearErorr(state) {
      state.error = null
    },
  },
  actions: {
    register({ dispatch, commit }, { id, name, email, title, body }) {
      const db = getDatabase(app)
      set(ref(db, '/news/' + `${id}`), {
        id: id,
        avtor: name,
        email: email,
        title: title,
        body: body,
      })
      router.push({ path: '/' })
      console.log(id, name, email, title, body, 'Успешно зарегистрирован')
    },
  },
})
