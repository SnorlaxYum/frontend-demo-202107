import { createApp, h } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'

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
app.mount('#app')

function handleScroll(e) {
  const {el, cb, distance} = e.target.nodeName === '#document' ? window['scrollElement'] : e.target['scrollElement']
  let reachedTheEnd

  if(e.target.nodeName === '#document') {
    const {bottom} = el.getBoundingClientRect()
    const {innerHeight} = window
    reachedTheEnd = bottom-innerHeight <= distance
  } else {
    const {scrollHeight, scrollTop, clientHeight} = el
    reachedTheEnd = scrollHeight - Math.floor(scrollTop) - clientHeight <= distance
  }

  if(reachedTheEnd) {
    cb()
  }
}

// idea from @element-plus/utils/dom
// nice code!
function isScroll(el, isVertical) {
  const overflow = isVertical ? getComputedStyle(el)['overflow-y'] : getComputedStyle(el)['overflow-x']
  return overflow.match(/(auto|scroll|overlay)/)
}

// idea from @element-plus/utils/dom
// nice code!
function getScrollContainer(el, isVertical) {
  let parent = el
  while(parent) {
    if([window, document, document.documentElement].includes(parent)) {
      parent = window
      break
    }
    if(isScroll(parent, isVertical)) {
      break
    }
    parent = parent.parentNode
  }
  return parent
}

app.directive('infinite-scroll', {
  mounted(el, binding, dir) {
    // console.log(el, binding, dir)
    const distance = 100
    const container = getScrollContainer(el)
    // const containerEl = container === window ? window.documentElement : container
    const {value: cb} = binding
    if(container) {
      container['scrollElement'] = {cb, el, distance}
      container.addEventListener('scroll', handleScroll)
    }
  }
})