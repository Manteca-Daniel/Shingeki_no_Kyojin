import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import About from './pages/About.vue'
import Personajes from './pages/Personajes.vue'
import Capitulos from './pages/Capitulos.vue'
import Bandos from './pages/Bandos.vue'
import Curiosidades from './pages/Curiosidades.vue'

import { createApp } from 'vue'
import App from './App.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home,
      },
      {
        path: '/about',
        name: 'about',
        component: About,
      },
      {
        path: '/personajes',
        name: 'personajes',
        component: Personajes,
      },
      {
        path: '/capitulos',
        name: 'capitulos',
        component: Capitulos,
      },
      {
        path: '/bandos',
        name: 'bandos',
        component: Bandos,
      },
      {
        path: '/curiosidades',
        name: 'curiosidades',
        component: Curiosidades,
      },
    ],
})

const app = createApp(App)

app.use(router)

app.mount('#app')
