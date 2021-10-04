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

function getScrollOptions(el, instance) {

}

// idea from @element-plus
function offsetFromRoot(child) {
  let offset = 0
  let elementNow = child
  while (elementNow) {
    offset += elementNow.offsetTop
    elementNow = elementNow.offsetParent
  }
  return offset
}

// idea from @element-plus
function getOffsetTopDistance(child, parent) {
  return Math.abs(offsetFromRoot(child) - offsetFromRoot(parent))
}

// idea from @element-plus, nice......
function handleScroll(el, cb) {
  const {container, distance} = el['scrollElement']
  const {scrollHeight, scrollTop, clientTop, clientHeight} = el
  let reachedTheEnd

  if(container === el) {
    reachedTheEnd = scrollHeight - Math.floor(scrollTop) - clientHeight <= distance
  } else {
    const {scrollTop: containerTop, clientHeight: containerHeight} = container
    const offsetTopFromContainer = getOffsetTopDistance(el, container)
    reachedTheEnd = containerTop + containerHeight >= offsetTopFromContainer + clientTop + scrollHeight - distance
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
    console.log(binding)
    const distance = 100
    const container = getScrollContainer(el)
    // const containerEl = container === window ? window.documentElement : container
    const {value: cb} = binding
    const onScroll = handleScroll.bind(null, el, cb)
    if(container) {
      el['scrollElement'] = {distance, container: container.toString() === "[object Window]" ? document.documentElement : container}
      container.addEventListener('scroll', onScroll)
    }
  }
})