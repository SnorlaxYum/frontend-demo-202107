import { withModifiers, defineComponent, createTextVNode, ref } from "vue";
// import 'element-plus/components/base/style'
import 'element-plus/theme-chalk/src/button-group.scss'
import type { PropType } from 'vue'
import type { ComponentSize } from 'element-plus/packages/utils/types'
import { isValidComponentSize } from 'element-plus/packages/utils/validators'

// const Button = (props, {slots}) => <el-button>{slots?.default()}</el-button>

const App = defineComponent({
  props: {
    size: {
        type: String as PropType<ComponentSize>,
        validator: isValidComponentSize,
    },
  },
  setup(props, {slots}) {
    return () => <div class="el-button-group">
        {slots?.default()}
    </div>
  }
});

export default App