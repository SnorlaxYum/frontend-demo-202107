import { withModifiers, defineComponent, createTextVNode, ref } from "vue";
// import 'element-plus/components/base/style'
import 'element-plus/theme-chalk/src/base.scss'
import 'element-plus/theme-chalk/src/button.scss'
import type { PropType } from 'vue'
import type { ComponentSize } from 'element-plus/packages/utils/types'
import { isValidComponentSize } from 'element-plus/packages/utils/validators'
import type { ButtonNativeType, ButtonType } from './types'

// const Button = (props, {slots}) => <el-button>{slots?.default()}</el-button>

const App = defineComponent({
  props: {
    type: {
        type: String as PropType<ButtonType>,
        default: 'default',
        validator: (val: string) => {
          return [
            'default',
            'primary',
            'success',
            'warning',
            'info',
            'danger',
            'text',
          ].includes(val)
        },
      },
      size: {
        type: String as PropType<ComponentSize>,
        validator: isValidComponentSize,
      },
      icon: {
        type: String,
        default: '',
      },
      nativeType: {
        type: String as PropType<ButtonNativeType>,
        default: 'button',
        validator: (val: string) => {
          return ['button', 'submit', 'reset'].includes(val)
        },
      },
      loading: Boolean,
      disabled: Boolean,
      plain: Boolean,
      autofocus: Boolean,
      round: Boolean,
      circle: Boolean,
  },
  setup(props, {emit, slots}) {
    function handleClick(e: Event) {
        if(props.disabled) {
            return
        }
        emit('click', e)
    }
    const className = () => ["el-button",
    props.type ? `el-button--${props.type}` : "",
    props.size ? 'el-button--' + props.size : '',
    {
        'is-disabled': props.disabled,
        'is-loading': props.loading,
        'is-plain': props.plain,
        'is-round': props.round,
        'is-circle': props.circle,
    },
    ]
    const getContent = () => {
        const results = []
        if(props.icon) {
            if(props.loading) {
                results.push(<i class="el-icon-loading" />)
            } else {
                results.push(<i class={props.icon} />)
            }
        }
        if(slots && slots.default) {
            if(!props.icon && props.loading) {
                results.push(<i class="el-icon-loading" />)
            }
            results.push(slots.default())
        }
        return results
    }
    return () => <button class={className()} onClick={handleClick}>{getContent()}</button>
  },
  emits: ['click']
});

export default App