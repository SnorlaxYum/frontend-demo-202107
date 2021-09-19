import { withModifiers, defineComponent, createTextVNode, ref } from "vue";
import Button from "./button";
import ButtonGroup from "./buttonGroup";

const App = defineComponent({
  setup() {
  },
  methods: {
    handleClick(e: Event) {
      console.log(e)
    }
  },
  render() {
    return (<>
    <h1>Element UI - Button</h1>
    <table>
      <tr><td rowSpan={4}>Default Style</td><td>
        <Button onClick={this.handleClick}>Default</Button>
        <Button type={"primary"} onClick={this.handleClick}>Primary</Button>
        <Button type={"success"} onClick={this.handleClick}>Success</Button>
        <Button type={"info"} onClick={this.handleClick}>Info</Button>
        <Button type={"warning"} onClick={this.handleClick}>Warning</Button>
        <Button type={"danger"} onClick={this.handleClick}>Danger</Button>
      </td></tr>
      <tr><td><Button onClick={this.handleClick} plain>Default</Button>
        <Button type={"primary"} onClick={this.handleClick} plain>Primary</Button>
        <Button type={"success"} onClick={this.handleClick} plain>Success</Button>
        <Button type={"info"} onClick={this.handleClick} plain>Info</Button>
        <Button type={"warning"} onClick={this.handleClick} plain>Warning</Button>
        <Button type={"danger"} onClick={this.handleClick} plain>Danger</Button></td></tr>
      <tr><td><Button onClick={this.handleClick} round>Default</Button>
        <Button type={"primary"} onClick={this.handleClick} round>Primary</Button>
        <Button type={"success"} onClick={this.handleClick} round>Success</Button>
        <Button type={"info"} onClick={this.handleClick} round>Info</Button>
        <Button type={"warning"} onClick={this.handleClick} round>Warning</Button>
        <Button type={"danger"} onClick={this.handleClick} round>Danger</Button></td></tr>
      <tr><td>
        <Button icon="el-icon-search" circle></Button>
        <Button type="primary" icon="el-icon-edit" circle></Button>
        <Button type="success" icon="el-icon-check" circle></Button>
        <Button type="info" icon="el-icon-message" circle></Button>
        <Button type="warning" icon="el-icon-star-off" circle></Button>
        <Button type="danger" icon="el-icon-delete" circle></Button>
      </td></tr>

      
      <tr><td>Disabled</td><td>
        <Button onClick={this.handleClick} disabled>Default</Button>
        <Button type={"primary"} onClick={this.handleClick} disabled>Primary</Button>
        <Button type={"success"} onClick={this.handleClick} disabled>Success</Button>
        <Button type={"info"} onClick={this.handleClick} disabled>Info</Button>
        <Button type={"warning"} onClick={this.handleClick} disabled>Warning</Button>
        <Button type={"danger"} onClick={this.handleClick} disabled>Danger</Button>
      </td></tr>

      <tr>
        <td>Text Button</td>
        <td>
          <Button type="text">Text Button</Button>
          <Button type="text" disabled>Text Button</Button>
        </td>
      </tr>

      <tr>
        <td>Icon Button</td>
        <td>
        <Button type={"primary"} icon={"el-icon-edit"}></Button>
        <Button type="primary" icon="el-icon-share"></Button>
        <Button type="primary" icon="el-icon-delete"></Button>
        <Button type="primary" icon="el-icon-search">Search</Button>
        <Button type="primary"
          >Upload<i class="el-icon-upload el-icon-right"></i
        ></Button>
        </td>
      </tr>

      <tr>
        <td>Loading</td>
        <td>
        <Button type="primary" loading={true}>Loading</Button>
        </td>
      </tr>

      <tr>
        <td>Size</td>
        <td>
        <Button>Default</Button>
        <Button size="medium">Medium</Button>
        <Button size="small">Small</Button>
        <Button size="mini">Mini</Button>
        </td>
      </tr>

      <tr>
        <td>Button Group</td>
        <td>
        <ButtonGroup>
          <Button type="primary" icon="el-icon-arrow-left">Previous Page</Button>
          <Button type="primary"
            >Next Page<i class="el-icon-arrow-right el-icon-right"></i>
          </Button>
        </ButtonGroup>
        </td>
      </tr>

    </table>
    
    </>)
  }
});

export default App