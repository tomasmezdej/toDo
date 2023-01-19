<template>
  <div>
    <v-row>
      <v-col>
        <h2>
          Tasks
        </h2>
        <div class="task-list-wrapper">
          <TaskElement
            v-for="(item, index) in 50" :key="index"
          />
        </div>
      </v-col>
      <v-col>
        <h2>
          Completed
        </h2>
        <div class="task-list-wrapper">
          <TaskElement
            v-for="(item, index) in 50" :key="index"
          />
        </div>
      </v-col>
    </v-row>
    <v-btn></v-btn>
  </div>
</template>

<script>
  export default {
    /*
    data() {
      return {
        searchValue: null
      }
    },
    methods: {
      createTask(){
        const task = {
          createdAt: new Date(),
          title: 'Test',
          description: 'descr.',
          deadline: new Date(),
          status: true
        }

        this.$axios.post('/tasks', task)
      }
    },
    */
  }
</script>