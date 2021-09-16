import { createApp, h } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'

// 1. Define route components.
// These can be imported from other files
import Home from './components/HelloWorld.vue'
import Demo1 from './components/demo1.jsx'
import Demo2 from './components/demo2.jsx'
const About = { template: '<div>About</div>' }

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/demo1', component: Demo1 },
  { path: '/demo2', component: Demo2 },
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
app.use(ElementPlus)
app.use(router)
app.mount('#app')
