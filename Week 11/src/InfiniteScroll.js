const DATA_ANCHOR = 'scrollElement'

// defaults from @element-plus
export const DEFAULT_DELAY = 200
export const DEFAULT_DISTANCE = 0
export const CHECK_INTERVAL = 50


// attributes from @element-plus
const attributes = {
  delay: {
    type: Number,
    default: DEFAULT_DELAY,
  },
  distance: {
    type: Number,
    default: DEFAULT_DISTANCE,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  immediate: {
    type: Boolean,
    default: true,
  },
}

function isDefined(val) {
  if(val === null) {
    return false
  }
  return typeof val !== "undefined"
}

// idea from @element-plus
function getScrollOptions(el, ins) {
  return Object.entries(attributes).reduce((accumulated, [key, {type, default: defaultValue}]) => {
    const attrValue = el.getAttribute(`infinite-scroll-${key}`)
    let valueNow = isDefined(ins[attrValue]) ? ins[attrValue] : isDefined(attrValue) ? attrValue : defaultValue
    accumulated[key] = type(valueNow)
    return accumulated
  }, {})
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
  const {container, distance, instance} = el[DATA_ANCHOR]
  const { disabled } = getScrollOptions(el, instance)
  const {scrollHeight, scrollTop, clientTop, clientHeight} = el
  let reachedTheEnd

  if(disabled) {
    return
  }

  if(container === el) {
    // scrollHeight is an integer while scrollTop is not, in case of situations mentioned below, I use ceil as well
    reachedTheEnd = scrollHeight - Math.ceil(scrollTop) - clientHeight <= distance
  } else {
    const {scrollTop: containerTop, clientHeight: containerHeight} = container
    const offsetTopFromContainer = getOffsetTopDistance(el, container)
    // again, scrollTop is not an integer, also there are cases like 3071.45458984375 on the left and 3072 on the right, so ceil is better here
    reachedTheEnd = Math.ceil(containerTop) + containerHeight >= offsetTopFromContainer + clientTop + scrollHeight - distance
  }

  if(reachedTheEnd) {
    cb.call(instance)
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

function throttle(fn, delay) {
  let timer = null
  return function() {
    if(!timer) {
      const context = this
      const args = arguments
      timer = setTimeout(() => {
        fn.apply(context, args)
        timer = null
      }, delay)
    }
  }
}

// idea from @element-plus, nice......
function makeFullClientHeight(el, cb) {
  const {instance, container, observer} = el[DATA_ANCHOR]
  const {disabled} = getScrollOptions(el, instance)

  if(disabled) {
    return
  }

  if(container.clientHeight >= container.scrollHeight) {
    cb.call(instance)
  } else if(observer) {
    observer.disconnect()
    el[DATA_ANCHOR].observer = null
  }
}

const InfiniteScroll = {
  mounted(el, binding) {
    const container = getScrollContainer(el)
    // const containerEl = container === window ? window.documentElement : container
    const {instance, value: cb} = binding
    const {delay, distance, immediate} = getScrollOptions(el, instance)
    const onScroll = throttle(handleScroll.bind(null, el, cb), delay)
    if(container) {
      el[DATA_ANCHOR] = {distance, immediate, container: container.toString() === "[object Window]" ? document.documentElement : container, instance}
      
      // idea from @element-plus, nice......
      if(immediate) {
        let observer = new MutationObserver(
          throttle(makeFullClientHeight.bind(null, el, cb), CHECK_INTERVAL)
        )
        el[DATA_ANCHOR].observer = observer
        observer.observe(el, {childList: true, subtree: true})
        makeFullClientHeight(el, cb)
      }

      container.addEventListener('scroll', onScroll)
    }
  }
}

InfiniteScroll.install = app => {
    app.directive('InfiniteScroll', InfiniteScroll)
}

export default InfiniteScroll