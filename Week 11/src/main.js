import { createApp, h } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import InfiniteScroll from './InfiniteScroll'

// 1. Define route components.
// These can be imported from other files
import HelloWorld from './components/HelloWorld.vue'

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: HelloWorld },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

const app = createApp({
    render() {return h(App)}
})
app.use(router)
app.use(InfiniteScroll)
app.mount('#app')

