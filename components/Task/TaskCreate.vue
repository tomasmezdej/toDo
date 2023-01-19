<template>
  <v-form
    ref="createTaskForm"
    lazy-validation
    v-on:submit.prevent
    v-model="createFormModel"
  >
    <v-row class="mt-2">
      <v-col
        cols="12"
        lg="5"
        md="5"
        class="py-0"
      >
        <v-text-field
          :key="requestSent"
          v-model="task.name"
          required
          :rules="taskTitleRules"
          clearable
          solo
          label="Title"
          single-line
        />
      </v-col>
      <v-col
        cols="12"
        lg="4"
        md="4"
        class="py-0"
      >
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="computedDate"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="computedDate"
              label="Deadline"
              prepend-inner-icon="mdi-calendar"
              readonly
              solo
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="task.deadline"
            no-title
            scrollable
          >
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              @click="menu = false"
            >
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.menu.save(task.deadline)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col
        cols="12"
        lg="3"
        md="3"
        class="py-0"
      >
        <v-menu
          ref="timeMenu"
          v-model="timeMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="task.time"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="task.time"
              label="Time"
              prepend-inner-icon="mdi-clock-time-four-outline"
              readonly
              solo
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="timeMenu"
            format="24"
            v-model="task.time"
            full-width
            @click:minute="$refs.timeMenu.save(task.time)"
          ></v-time-picker>
        </v-menu>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        class="py-0"
      >
        <v-textarea
          v-model="task.descr"
          label="Description"
          :rules="taskDescriptionRules"
          counter="15"
          auto-grow
          solo
          rows="3"
          row-height="25"
        />
      </v-col>
      <v-col
        cols="12"
        class="py-0"
      >

        <v-btn
          color="primary"
          :style="($vuetify.breakpoint.mdAndDown) ? 'width: 100%;' : '' "
          :disabled="requestSent"
          @click="createTask()"
        >
          Create task
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>
<script>

class Task {
  constructor() {
    this.name = null
    this.descr = null
    this.deadline = new Date().toISOString().split('T')[0]
    this.time = '12:00'
  }
  resetTask() {
    this.name = null
    this.descr = null
    this.deadline = new Date().toISOString().split('T')[0]
    this.time = '12:00'
  }
}

export default {
  data() {
    return {
      createFormModel: false,
      task: new Task(),
      menu: false,
      timeMenu: false,
      requestSent: false
    }
  },
  computed: {
    computedDate() {
      return new Date(this.task.deadline).toLocaleDateString()
    }
  },
  methods: {
    createTask() {
      if (this.validateCreateTask()) {
        this.$emit('create', this.task)
        this.requestSent = true
        setTimeout(() => {
          this.requestSent = false
        }, 500);
        this.task.resetTask()
      }
    }
  },
}
</script>
