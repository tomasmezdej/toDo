<template>
  <v-card
    class="mt-2 task-element"
  >
    <v-card-title class="d-flex justify-space-between">
      {{ task.title }}
      <v-icon
        v-if="!requestSent"
        :color="
          (task.status)
            ? 'success'
            : 'primary'
        "
        @click="changeTaskStatus(task.id)"
      >
        {{
          (task.status)
            ? 'mdi-checkbox-marked-circle-outline'
            : 'mdi-checkbox-blank-circle-outline'
         }}
      </v-icon>
      <v-progress-circular
        v-else
        size="27"
        width="3"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col class="py-0" cols="12" lg="6">
          <p class="limited-text">
            {{ task.description }}
          </p>
        </v-col>
        <v-col class="pt-0" cols="12" lg="6">
          <div class="d-flex" :class="($vuetify.breakpoint.mdAndDown) ? 'justify-space-between' : ' justify-end' ">
            <small >
              <v-icon>
                mdi-calendar
              </v-icon>
              Due to {{ `${new Date(task.deadline).toLocaleDateString()} - ${task.time}` }}
            </small>
            <v-icon
              color="error"
              @click="removeItem(task.id)"
            >
              mdi-trash-can-outline
            </v-icon>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: ['task'],
  data() {
    return {
      requestSent: false
    }
  },
  methods: {
    removeItem(taskId) {
      this.$axios.delete(`/tasks/${taskId}`)
        .then((response) => {
          this.$emit('removedTask', taskId)
        })
        .catch((error) => {
        })
    },
    changeTaskStatus(taskId) {
      const task = {
        ...this.task,
        status: !this.task.status
      }
      this.requestSent = true
      this.$axios.put(`/tasks/${taskId}`,task)
        .then((response) => {
          this.$emit('refreshData', this.task.listId)
          setTimeout(() => {
            this.requestSent = false
          }, 220);
        })
        .catch((error) => {
        })
    }
  },
}
</script>