import { withModifiers, defineComponent, createTextVNode, ref } from "vue";

const App = defineComponent({
  setup() {
    const form = {
    }
    // pretty paint it
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
        },
        {
          attr: {
            label: "Resources",
          },
          children: [
            {
              name: "ElRadioGroup",
              attrs: {
                "v-model": "resources",
                "value": "Venue",
                "children": 
                [
                  {
                    name: "ElRadio",
                    attrs: {
                      label: "Sponsor"
                    }
                  },
                  {
                    name: "ElRadio",
                    attrs: {
                      label: "Venue"
                    }
                  }
                ]
              }
            }
          ]
        },
        {
          attr: {
            label: "Activity Zone",
          },
          children: [
            {
              name: "ElSelect",
              attrs: {
                "v-model": "region",
                value: "Shanghai",
                "placeholder": "please select your zone",
                "children": [
                  {
                    name: "ElOption",
                    attrs: {label: "Zone One", value: "Shanghai"}
                  },
                  {
                    name: "ElOption",
                    attrs: {label: "Zone Two", value: "Peking"}
                  }
                ]
              }
            }
          ]
        },
        {
          attr: {
            label: "Activity Time",
          },
          children: [
            {
              name: "ElCol",
              attrs: {
                span: 11,
                children: [
                  {
                    name: "ElDatePicker",
                    attrs: {
                      type: "date",
                      placeholder: "Pick a date",
                      'v-model': "date1",
                      style: "width: 100%"
                    }
                  },
                ]
              }
            },
            {
              name: "ElCol",
              attrs: {
                span: 2,
                children: [
                  {
                    name: "TextNode",
                    attrs: {
                      value: "-"
                    }
                  },
                ]
              }
            },
            {
              name: "ElCol",
              attrs: {
                span: 11,
                children: [
                  {
                    name: "ElTimePicker",
                    attrs: {
                      placeholder: "Pick a time",
                      "v-model": "date2",
                      style: "width: 100%"
                    }
                  },
                ]
              }
            }
          ]
        },
        {
          attr: {
            label: "Instant Delivery",
          },
          children: [
            {
              name: "ElSwitch",
              attrs: {
                value: false,
                "v-model": "delivery"
              }
            }
          ]
        },
        {
          attr: {
            label: "Activity Type",
          },
          children: [
            {
              name: "ElCheckboxGroup",
              attrs: {
                "v-model": "type",
                children: [
                  {
                    name: "ElCheckbox",
                    attrs: {
                      label: "Activity 1",
                      name: "type"
                    }
                  },
                  {
                    name: "ElCheckbox",
                    attrs: {
                      label: "Activity 2",
                      name: "type"
                    }
                  },
                  {
                    name: "ElCheckbox",
                    attrs: {
                      label: "Activity 3",
                      name: "type"
                    }
                  },
                  {
                    name: "ElCheckbox",
                    attrs: {
                      label: "Activity 4",
                      name: "type"
                    }
                  }
                ]
              },
              
            }
          ]
        },
        {
          attr: {
            label: 'Activity Form'
          },
          children: [
            {
              name: "ElInput",
              attrs: {
                type: "textarea",
                'v-model': 'desc'
              }
            }
          ]
        },
        {
          attr: {
            
          },
          children: [
            {
              name: "ElButton",
              attrs: {
                type: "primary",
                onClick: `e => {
                  console.log('submit', e)
                }`, 
                children: [{
                  name: "TextNode",
                  attrs: {
                    value: `Submit`
                  }
                }]
              }
            },
            {
              name: "ElButton",
              attrs: {
                children: [{
                  name: "TextNode",
                  attrs: {
                    value: `Cancel`
                  }
                }]
              },
            }
          ]
        },
      ]
    }, null, 2))
    return {form, formDef}
  },
  methods: {
    elementRender(obj, objIndex) {
      // https://stackoverflow.com/questions/49630866/how-declare-v-model-for-custom-component-in-vue-render-function
      // const {attrs, name} = obj, modelName = attrs["v-model"]
      // let value = ''
      // console.log(attrs,name)
      // if(typeof attrs["value"] !== "undefined") {
      //   value = attrs["value"]
      // }
      // let valueRef = ref(value)
      // form[modelName] = valueRef
      // attrs["v-model"] = `form.${modelName}`
      // const modelDir = resolveDirective('model')
      // return withDirectives(
      //   h(resolveComponent(name), {...attrs}),
      //   [[modelDir, form[modelName]]]
      // )
      // I abandoned this approach because I cannot make v-model working. It seems the components heavily relies on v-model.....
      // TODO: if-else iteration...... 
      const {attrs, name} = obj, modelName = attrs && attrs["v-model"] || `formOption${objIndex}`
      const attrsCopy = {...attrs}
      if(name !== "ElOption" && name !== "ElRadio" && name !== "ElCheckbox" && name !== "TextNode" && name !== "ElCol" && name !== "ElButton") {
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
        delete attrsCopy["v-model"]
        delete attrsCopy["value"]
        delete attrsCopy["children"]
      } else {
        delete attrsCopy["children"]
      }
 
      if(attrsCopy.onClick) {
        // I know it's dangerous, but cannot think of another idea.
        attrsCopy.onClick = eval(attrsCopy.onClick)
      }

      // INCOMPLETE-THINGS-HERE: still don't know why the returned element isn't reactive ;(
      // v-model isn't working here, so I tried onInput, hoping to bring back reactivity too......
      // this.$set dosn't exist here
      if(name === "ElRadioGroup") {
        return <el-radio-group {...attrsCopy} v-model={this.form[modelName]} onInput={e => {this.form = {...this.form, [modelName]: e.target.value}; console.log(e)}}>
          {
            attrs.children.map((options, optionsIndex) => this.elementRender(options, optionsIndex))
          }
        </el-radio-group>
      } else if(name === "ElCheckboxGroup") {
        return <el-checkbox-group {...attrsCopy} v-model={this.form[modelName]} onInput={e => {this.form = {...this.form, [modelName]: e.target.value}; console.log(e)}}>
          {
            attrs.children.map((options, optionsIndex) => this.elementRender(options, optionsIndex))
          }
        </el-checkbox-group>
      } else if(name === "ElSelect") {
        return <el-select {...attrsCopy} v-model={this.form[modelName]} onChange={e => {this.form = {...this.form, [modelName]: e}; console.log(e)}}>
          {
            attrs.children.map((options, optionsIndex) => this.elementRender(options, optionsIndex))
          }
        </el-select>
      } else if(name === "ElButton") {
        return <el-button {...attrsCopy}>{
          attrs.children.map((options, optionsIndex) => this.elementRender(options, optionsIndex))
        }</el-button>
      } else if(name === "ElOption") {
        return <el-option {...attrsCopy}></el-option>
      } else if(name === "ElRadio") {
        return <el-radio {...attrsCopy}></el-radio>
      } else if(name === "ElCheckbox") {
        return <el-checkbox {...attrsCopy}></el-checkbox>
      } else if(name === "ElTimePicker") {
        return <el-time-picker {...attrsCopy} v-model={this.form[modelName]}></el-time-picker>
      } else if(name === "ElDatePicker") {
        return <el-date-picker {...attrsCopy} v-model={this.form[modelName]}></el-date-picker>
      } else if(name === "ElCol") {
        return <el-col {...attrsCopy}>
          {
            attrs.children.map((options, optionsIndex) => this.elementRender(options, optionsIndex))
          }
        </el-col>
      } else if(name === "ElInput") {
        return <el-input {...attrsCopy} v-model={this.form[modelName]} onInput={e => {this.form = {...this.form, [modelName]: e}; console.log(e)}}></el-input>
      } else if(name === "ElSwitch") {
        return <el-switch {...attrsCopy} v-model={this.form[modelName]} onInput={e => {this.form = {...this.form, [modelName]: e}; console.log(e)}}></el-switch>
      } else if(name === "TextNode") {
        return attrsCopy.value
      }
    },
    formNow() {
      const def = JSON.parse(this.formDef)
      return <el-form {...def.formAttr}>
        {def.formItems.map(item => {
        return <el-form-item {...item.attr}>
          {item.children.map((como, comoIndex) => this.elementRender(como, comoIndex))}
        </el-form-item>})}
      </el-form>
    }
  },
  render() {
    return (<el-row style='height: 100%'>
    <el-col class="modelTextarea" span={12}> <el-input
      type="textarea"
      style={'height:100%'}
      placeholder="Please input Form Rows"
      v-model={this.formDef}
    ></el-input></el-col>
    <el-col span={12}>{this.formNow()}</el-col>
  </el-row>)
  }
});

export default App