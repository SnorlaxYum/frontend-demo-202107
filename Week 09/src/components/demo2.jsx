import { withModifiers, defineComponent, createTextVNode, ref } from "vue";

const App = defineComponent({
  setup() {
    let form = {
      name: '',
      region: '',
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: '',
    },
    dropzoneCol = new Set(),
    dragzoneCol = new Set()
    return {form, dropzoneCol, dragzoneCol}
  },
  methods: {
  },
  mounted() {
    const dragZoneHeight = getComputedStyle(document.getElementById("dragzone")).height
    document.getElementById("dropzone").style.height = dragZoneHeight
    // get their position
    for(const item of [...document.querySelectorAll("#dragzone > .el-form-item[draggable]")]) {
      this.dragzoneCol.add(item)
    }

    /* https://developer.mozilla.org/en-US/docs/Web/API/Document/drag_event */
    /* events fired on the draggable target */
    document.addEventListener("drag", function(event) {

    }, false);

    document.addEventListener("dragstart", (event) => {
      // store a ref. on the dragged elem
      this.dragged = event.target;
      // make it half transparent
      event.target.style.opacity = .5;
    }, false);

    document.addEventListener("dragend", function(event) {
      // reset the transparency
      event.target.style.opacity = "";
    }, false);

    /* events fired on the drop targets */
    document.addEventListener("dragover", function(event) {
      // prevent default to allow drop
      event.preventDefault();
    }, false);

    document.addEventListener("dragenter", function(event) {
      // highlight potential drop target when the draggable element enters it
      // if (event.target.className == "dropzone") {
      //   event.target.style.background = "purple";
      // }

    }, false);

    document.addEventListener("dragleave", function(event) {
      // reset background of potential drop target when the draggable element leaves it
      
    }, false);

    document.addEventListener("drop", (event) => {
      // prevent default action (open as link for some elements)
      event.preventDefault();
      // move dragged elem to the selected drop target
      console.log(event.target, event)
      if(event.target.classList.contains('el-col') || event.target.parentNode.classList.contains('submitArea')) {
        console.log("impossible")
        return
      } else if (event.target.classList.contains("formArea") && event.target.parentNode.id === "dropzone") {
        event.target.style.background = "";
        this.dragged.parentNode.removeChild( this.dragged );
        if(this.dropzoneCol.size === 0) {
          event.target.appendChild( this.dragged );
          this.dropzoneCol.add(this.dragged)
        } else {
          let closestEle, closestDis = -1
          for(const item of this.dropzoneCol) {
            const dis = item.getBoundingClientRect().top-event.y
            if(dis >= 0 && (dis < closestDis || closestDis === -1)) {
              closestEle = item
              closestDis = dis
            }
          }
          event.target.insertBefore(this.dragged, closestEle)
          this.dropzoneCol.add(this.dragged)
        }
        this.dragzoneCol.delete(this.dragged)
      } else if (event.target.classList.contains("formArea") && event.target.parentNode.id === "dragzone") {
        event.target.style.background = "";
        this.dragged.parentNode.removeChild( this.dragged );
        if(this.dragzoneCol.size === 0) {
          event.target.appendChild( this.dragged );
          this.dragzoneCol.add(this.dragged)
        } else {
          let closestEle, closestDis = -1
          for(const item of this.dragzoneCol) {
            const dis = item.getBoundingClientRect().top-event.y
            if(dis >= 0 && (dis < closestDis || closestDis === -1)) {
              closestEle = item
              closestDis = dis
            }
          }
          event.target.insertBefore(this.dragged, closestEle)
          this.dragzoneCol.add(this.dragged)
        }
        this.dropzoneCol.delete(this.dragged)
      } else if (event.target.id === "dropzone") {
        event.target.style.background = "";
        this.dragged.parentNode.removeChild( this.dragged );
        if(this.dropzoneCol.size === 0) {
          event.target.querySelector(".formArea").appendChild( this.dragged );
          this.dropzoneCol.add(this.dragged)
        } else {
          let closestEle, closestDis = -1
          for(const item of this.dropzoneCol) {
            const dis = item.getBoundingClientRect().top-event.y
            if(dis >= 0 && (dis < closestDis || closestDis === -1)) {
              closestEle = item
              closestDis = dis
            }
          }
          document.querySelector("#dropzone .formArea").insertBefore(this.dragged, closestEle)
          this.dropzoneCol.add(this.dragged)
        }
        this.dragzoneCol.delete(this.dragged)
      } else if (event.target.id === "dragzone") {
        event.target.style.background = "";
        this.dragged.parentNode.removeChild( this.dragged );
        if(this.dragzoneCol.size === 0) {
          event.target.querySelector(".formArea").appendChild( this.dragged );
          this.dragzoneCol.add(this.dragged)
        } else {
          let closestEle, closestDis = -1
          for(const item of this.dragzoneCol) {
            const dis = item.getBoundingClientRect().top-event.y
            if(dis >= 0 && (dis < closestDis || closestDis === -1)) {
              closestEle = item
              closestDis = dis
            }
          }
          document.querySelector("#dragzone .formArea").insertBefore(this.dragged, closestEle)
          this.dragzoneCol.add(this.dragged)
        }
        this.dropzoneCol.delete(this.dragged)
      } else if(event.target.classList.contains('el-form-item')) {
        event.target.style.background = "";
        const owner = this.dragged.parentNode.id
        const targetOwner = event.target.parentNode.id
        this.dragged.parentNode.removeChild( this.dragged );
        event.target.parentNode.insertBefore(this.dragged, event.target)
        if(owner === "dragzone") {
          this.dragzoneCol.delete(this.dragged)
        } else {
          this.dropzoneCol.delete(this.dragged)
        }
        if(targetOwner === "dragzone") {
          this.dragzoneCol.add(this.dragged)
        } else {
          this.dropzoneCol.add(this.dragged)
        }
      } else {
        event.target.style.background = "";
        const owner = this.dragged.parentNode.id
        const path = [...event.path]
        // get the item and insert before it
        const item = path.find(ele => 
          ele.classList && ele.classList.contains('el-form-item')
        )
        const targetOwner = item.parentNode.id
        
        if(owner === "dragzone") {
          this.dragzoneCol.delete(this.dragged)
        } else {
          this.dropzoneCol.delete(this.dragged)
        }
        console.log(this.dragged, item)
        item.parentNode.insertBefore(this.dragged, item)
        if(targetOwner === "dragzone") {
          this.dragzoneCol.add(this.dragged)
        } else {
          this.dropzoneCol.add(this.dragged)
        }
      }
    }, false);
  },
  render() {
    return (<el-row style='height: 100%'>
    <el-col class="modelTextarea" span={12}>
    <h1>Draggable Form</h1>
    <el-form label-width="120px" id={"dragzone"} class="dropable">
      <div class="formArea">
      <el-form-item label="Activity name" draggable="true">
        <el-input v-model={this.form.name}></el-input>
      </el-form-item>
      <el-form-item label="Activity zone" draggable="true">
        <el-select v-model={this.form.region} placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai"></el-option>
          <el-option label="Zone two" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Activity time" draggable="true">
        <el-col span={11}>
          <el-date-picker
            type="date"
            placeholder="Pick a date"
            v-model={this.form.date1}
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
        <el-col class="line" span={2}>-</el-col>
        <el-col span={11}>
          <el-time-picker
            placeholder="Pick a time"
            v-model={this.form.date2}
            style="width: 100%;"
          ></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="Instant delivery" draggable="true">
        <el-switch v-model={this.form.delivery}></el-switch>
      </el-form-item>
      <el-form-item label="Activity type" draggable="true">
        <el-checkbox-group v-model={this.form.type}>
          <el-checkbox label="Online activities" name="type"></el-checkbox>
          <el-checkbox label="Promotion activities" name="type"></el-checkbox>
          <el-checkbox label="Offline activities" name="type"></el-checkbox>
          <el-checkbox label="Simple brand exposure" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Resources" draggable="true">
        <el-radio-group v-model={this.form.resource}>
          <el-radio label="Sponsor"></el-radio>
          <el-radio label="Venue"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Activity form" draggable="true">
        <el-input type="textarea" v-model={this.form.desc}></el-input>
      </el-form-item>
      </div>
    </el-form>

    </el-col>
    <el-col span={12}>
    <h1>Result Area</h1>
    <el-form id={"dropzone"} label-width="120px">
      <div class="formArea"></div>
      <el-form-item class="submitArea">
        <el-button onClick={() => {console.log(this.dropzoneCol)}} type="primary">Create</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
    </el-col>
  </el-row>)
  }
});

export default App