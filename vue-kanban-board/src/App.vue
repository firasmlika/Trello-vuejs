<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col form-inline">
        <b-form-input
          id="input-2"
          v-model="newTask"
          required
          placeholder="Enter Task"
          @keyup.enter="add"
        ></b-form-input>
        <b-button @click="add" variant="primary" class="ml-3">Add</b-button>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-3">
        <div class="p-2 alert alert-secondary">
          <h3>Back Log</h3>
          <!-- Backlog draggable component. Pass arrBackLog to list prop -->
          <draggable
            class="list-group kanban-column"
            :list="arrBackLog"
            group="tasks"
            id="Backlog"
            @end="listMoved($event)"
          >
            <div
              class="list-group-item"
              v-for="element in arrBackLog"
              :key="element.text"
              :id="element._id"
            >
              {{ element.text }}
              <button id="button" @click="del(element)">X</button>
            </div>
          </draggable>
        </div>
      </div>

      <div class="col-3">
        <div class="p-2 alert alert-primary">
          <h3>In Progress</h3>
          <!-- In Progress draggable component. Pass arrInProgress to list prop -->
          <draggable
            class="list-group kanban-column"
            :list="arrInProgress"
            group="tasks"
            id="InProgress"
            @end="listMoved($event)"
          >
            <div
              class="list-group-item"
              v-for="element in arrInProgress"
              :key="element.text"
              :id="element.text"
            >
              {{ element.text }}
              <button id="button" @click="del(element)">X</button>
            </div>
          </draggable>
        </div>
      </div>

      <div class="col-3">
        <div class="p-2 alert alert-warning">
          <h3>Testing</h3>
          <!-- Testing draggable component. Pass arrTested to list prop -->
          <draggable
            class="list-group kanban-column"
            :list="arrTested"
            group="tasks"
            id="Testing"
            @end="listMoved($event)"
          >
            <div
              class="list-group-item"
              v-for="element in arrTested"
              :key="element.text"
              :id="element.text"
            >
              {{ element.text }}
              <button id="button" @click="del(element)">X</button>
            </div>
          </draggable>
        </div>
      </div>

      <div class="col-3">
        <div class="p-2 alert alert-success">
          <h3>Done</h3>
          <!-- Done draggable component. Pass arrDone to list prop -->
          <draggable
            class="list-group kanban-column"
            :list="arrDone"
            group="tasks"
            id="Done"
            @end="listMoved($event)"
          >
            <div
              class="list-group-item"
              v-for="element in arrDone"
              :key="element.text"
              :id="element.text"
            >
              {{ element.text }}
              <button id="button" @click="del(element)">X</button>
            </div>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import draggable
import draggable from "vuedraggable";
import axios from "axios"

export default {
  name: "kanban-board",
  components: {
    //import draggable as a component
    draggable
  },
  mounted() {
     axios.post("http://localhost:3001/todo/getAll")
    .then((result) => this.sortArray(result.data.todo))
    .catch((err) => console.log(err))
  },
  created() {
   
  },
  data() {
    return {
      // for new tasks
      newTask: "",
      // 4 arrays to keep track of our 4 statuses
      arrBackLog: [],
      arrInProgress: [],
      arrTested: [],
      arrDone: []
    };
  },
  methods: {
    //add new tasks method
    add: function() {
      if (this.newTask) {
        axios.post("http://localhost:3001/todo/add", {text: this.newTask, type: "Backlog" })
        .then((res) => this.arrBackLog.push(res.data.doc))
        .catch((err) => console.log(err))
        this.newTask = "";
      }
    },
    del: function(element) {
      console.log('element, ', element)
      axios.post("http://localhost:3001/todo/delete", {id: element._id })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))

      switch(element.type) {
        case "Backlog": 
        this.arrBackLog = this.arrBackLog.filter(function(item) {
            return element._id !== item._id
        })
        break
        case "InProgress":
          this.arrInProgress = this.arrInProgress.filter(function(item) {
            return element._id !== item._id
        }) 
        break
        case "Testing":
          this.arrTested = this.arrTested.filter(function(item) {
            return element._id !== item._id
            })
        break
        case "Done":
          this.arrDone = this.arrDone.filter(function(item) {
            return element._id !== item._id
           })
        break
      }
    },
    sortArray: function(todos) {
      this.arrBackLog = todos.filter((todo) => todo.type === 'Backlog')
      this.arrInProgress = todos.filter((todo) => todo.type === 'InProgress')
      this.arrTested = todos.filter((todo) => todo.type === 'Testing')
      this.arrDone = todos.filter((todo) => todo.type === 'Done')
    },

    listMoved: function($event) {
      console.log('element id', $event.item.id)
      console.log('element type', $event.to.id)
      axios.post("http://localhost:3001/todo/update", {id: $event.item.id, type: $event.to.id })
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }
  }
};
</script>

<style>
/* light stylings for the kanban columns */
.kanban-column {
  min-height: 300px;
}
#button {
  float: right;
}
</style>
