import Vue from 'vue'

Vue.mixin({
  data() {
    return {
      nameRules: [
        v => !!v || 'Name is required'
      ],
      taskTitleRules: [
        v => !!v || 'Title is required'
      ],
      taskDescriptionRules: [
        v => !v || v.length <= 15 ||  'Max 15 characters in description.'
      ],
      createListRules: [
        v => !!v ||  'List name is required'
      ]
      /*
      dateRules: [
        v => !!v || 'Vyplňte prosím toto pole',
        v => (!!v && this.$moment(v, 'DD.MM.YYYY').format('DD.MM.YYYY') === v) || 'Zadajte dátum vo formáte DD.MM.RRRR'
      ],
      */
    }
  },
  methods: {
    validateLogin() {
      return this.$refs.loginForm.validate()
    },
    validateCreateTask() {
      return this.$refs.createTaskForm.validate()
    },
    validateCreateList() {
      return this.$refs.createListForm.validate()
    }
  }
})

