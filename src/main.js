import Vue from 'vue'
import App from './components/App.vue'
import VueRouter from 'vue-router'
import { firebaseApp } from './firebaseApp' 
import VueSession from 'vue-session'

Vue.use(VueSession)
Vue.use(VueRouter)

import store from './store'

import Auth from './components/Auth.vue';
import Dashboard from './components/Dashboard.vue'
import Signin from './components/Signin.vue'
import Signup from './components/Signup.vue'

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/dashboard', component: Dashboard },
        { path: '/signin', component: Signin },
        { path: '/signup', component: Signup },
        { path: '/Auth', component: Auth}
    ]
})

firebaseApp.auth().onAuthStateChanged(user => {
    if (user) {
        store.dispatch('signIn', user)
        router.push('/dashboard')
    }
    else {
        router.replace('/auth')
    }
})

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})