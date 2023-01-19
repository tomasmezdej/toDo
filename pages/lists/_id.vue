<template>
  <div>
    <v-row v-if="loadedList">
      <v-col
        cols="12"
        lg="6"
        class="order-lg-1 order-2"
      >

        <v-row>
          <v-col
            cols="12"
            class="d-flex justify-space-between"
          >
            <h2>
              List: {{ loadedList.title }}
            </h2>
            <v-btn
              v-if="tasksLength > 0"
              color="secondary"
              @click="sortPanel = !sortPanel"
            >
              Sort/Filter
            </v-btn>
          </v-col>
        </v-row>
        <v-expand-transition>
          <div v-show="sortPanel">
            <v-row>
              <v-col cols="12" lg="5" class="py-0">
                <h5>
                  Sort Alphabetically
                </h5>
                <v-radio-group
                  v-model="sortAlphabetically"
                  row
                  color="primary"
                >
                  <v-radio label="A-Z" value="az"></v-radio>
                  <v-radio label="Z-A" value="za"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12" lg="7" class="py-0">
                <h5>
                  Filter By status
                </h5>
                <v-radio-group
                  v-model="filterByStatus"
                  row
                  color="primary"
                >
                  <v-radio label="All" :value="null"></v-radio>
                  <v-radio label="Active" :value="false"></v-radio>
                  <v-radio label="Done" :value="true"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </div>
        </v-expand-transition>

        <TaskElement
          v-for="(task, index) in sortedTasks" :key="index"
          :task="task"
          @refreshData="getTasksByListId($event)"
          @removedTask="removeTaskWithoutRequest($event)"
        />
        <h4
          v-if="tasksLength === 0"
        >
          No tasks in this list
        </h4>
      </v-col>
      <v-col
        cols="12"
        lg="6"
        class="order-lg-2 order-1"
      >
        <h2>
          Create new task
        </h2>
        <TaskCreate
          @create="createTask($event)"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>

export default {
  data() {
    return {
      loadedList: null,
      tasks: [],
      sortPanel: false,
      sortAlphabetically: 'az',
      filterByStatus: null
    }
  },
  mounted() {
    this.getListById(this.$route.params.id)

  },
  computed: {
    tasksLength() {
      return this.sortedTasks.length
    },

    sortedTasks() {
      const sorted = this.tasks
        .filter((task) => (this.filterByStatus === null) ? task.status === true || task.status === false : task.status === this.filterByStatus)
        .sort((taskA, taskB) => (this.sortAlphabetically === 'az') ? taskA.title.localeCompare(taskB.title) : taskB.title.localeCompare(taskA.title))

      return sorted
    }
  },
  methods: {
    getListById(id) {
      this.$axios.get(`/lists/${id}`)
        .then((response) => {
          console.log(response.data)
          this.loadedList = response.data
          this.getTasksByListId(this.loadedList.uniqueId)
        })
    },
    removeTaskWithoutRequest(taskId) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId )
    },
    getTasksByListId(listId) {
      console.log(listId)
      this.$axios.get(`/tasks`)
        .then((response) => {
          console.log(listId)
          console.log(response.data)
          this.tasks = response.data.filter(task => task.listId === listId)
        })
    },
    createTask(newTask) {
      const task = {
        listId: this.loadedList.uniqueId,
        createdAt: new Date().toISOString(),
        title: newTask.name,
        description: newTask.descr,
        deadline: newTask.deadline,
        status: false
      }
      this.$axios.post(`/tasks`, task)
        .then((response) => {
          this.getTasksByListId(this.loadedList.uniqueId)
          // this.tasks = this.tasks.filter((task) => task.id !== newTask.id )
        })
    }
  },
}
</script>