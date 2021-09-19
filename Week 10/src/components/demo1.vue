<template>
  <el-row style='height: 100%'>
    <el-col class="modelTextarea" :span='12'> <el-input
      type="textarea"
      style='height:100%'
      placeholder="Please input Form Rows"
      v-model="this.formDef"
    ></el-input></el-col>
    <el-col :span='12'>{{this.formNow()}}</el-col>
  </el-row>
</template>

<script setup>
import { h, resolveDirective, withDirectives, resolveComponent, defineComponent, ref } from "vue";

const form = {
}

let formDef = ref(JSON.stringify({
  formAttr: {
    "label-width": "120px"
  },
  formItems: [
    {
      attr: {
        label: "Activity Name",
      },
      children: [
        {
          name: "ElInput",
          attrs: {
            "v-model": "name",
            "value": "abc",
            "placeholder": "asda",
          }
        }
      ]
    }
  ]
}))

function formNow() {
  const def = JSON.parse(this.formDef)
  return h("el-form", {...def.formAttr},
    def.formItems.map(item => {
    return h("el-form-item", {...item.attr},
      item.children.map((como, comoIndex) => {
        // https://stackoverflow.com/questions/49630866/how-declare-v-model-for-custom-component-in-vue-render-function
        // const {attrs, name} = como, modelName = attrs["v-model"]
        // let value = ''
        // console.log(attrs,name)
        // if(typeof attrs["value"] !== "undefined") {
        //   value = attrs["value"]
        // }
        // let valueRef = ref(value)
        // form[modelName] = valueRef
        // const modelDir = resolveDirective('model')
        // return withDirectives(
        //   h(resolveComponent(name), {...attrs}),
        //   [[modelDir, form[modelName]]]
        // )
        // I abandoned this approach because I cannot make v-model working. It seems the components heavily relies on v-model.....
        
        // TODO: if-else iteration...... 
        const {attrs, name} = como, modelName = attrs["v-model"] || `formOption${comoIndex}`
        if(typeof this.form[modelName] === "undefined") {
          if(typeof attrs["value"] === "undefined") {
            this.form[modelName] = ""
          } else {
            this.form[modelName] = attrs["value"]
          }
        } else {
          if(typeof attrs["value"] !== "undefined") {
            this.form[modelName] = attrs["value"]
          }
        }
        delete attrs["v-model"]
        delete attrs["value"]
        if(name === "ElRadio") {
          return 
        } else if(name === "ElInput") {
          return h("el-input", {...attrs})
          // <el-input {...attrs} v-model={this.form[modelName]}></el-input>
        }
      )
      )
    }
  ))
}
</script>