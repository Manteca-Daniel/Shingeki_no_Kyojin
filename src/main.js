import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import About from './pages/About.vue'
import Personajes from './pages/Personajes.vue'
import Capitulos from './pages/Capitulos.vue'
import Bandos from './pages/Bandos.vue'
import Curiosidades from './pages/Curiosidades.vue'
import PersonajeDetalle from './pages/PersonajeDetalle.vue'
import Capitulo from './pages/Capitulo.vue'
import Titanes from './pages/Titanes.vue'
import Localicaciones from './pages/Localicaciones.vue'
import Lugar from './pages/Lugar.vue'
import Titan from './pages/Titan.vue'

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
            path: '/personaje/:id',
            name: 'personajeDetalle',
            component: PersonajeDetalle,
        },
        {
            path: '/capitulos',
            name: 'capitulos',
            component: Capitulos,
        },
        {
            path: '/capitulo/:id',
            name: 'capitulo',
            component: Capitulo,
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
        {
            path: '/localicaciones',
            name: 'localicaciones',
            component: Localicaciones,
        },
        {
            path: '/titanes',
            name: 'titanes',
            component: Titanes,
        },
        {
            path: '/lugar/:id',
            name: 'lugar',
            component: Lugar,
        },
        {
            path: '/titan/:id',
            name: 'titan',
            component: Titan,
        },
    ],
});

const app = createApp(App)

app.use(router)

app.mount('#app')
