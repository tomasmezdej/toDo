<template>
  <div class="login-page d-flex align-center justify-left flex-column">
    <div class="step-one">
      <div>
        <img src="~/assets/img/login.png" alt="login image">
      </div>
      <div>
        <h2
          class="mb-5"
        >
          {{
            (step === 0)
              ? 'Get things done.'
              : 'Let´s get started!'
           }}
        </h2>
        <p v-if="step === 0" class="text-light">
          Just a click away from planning your tasks.
        </p>
        <div
          v-if="step === 0"
          class="d-flex mt-4"
        >
          <div class="login-dot inactive-dot"/>
          <div class="login-dot inactive-dot"/>
          <div class="login-dot active-dot"/>
        </div>
        <div
          v-if="step === 0"
          class="bottom-button"
          @click="step++"
        >
          <v-icon
            class="icon"
            size="60px"
            color="white"
          >
            mdi-arrow-right
          </v-icon>
        </div>
      </div>
    </div>
    <div v-if="step === 1" class="step-two w-100 text-center pb-5">
      <v-form
        ref="loginForm"
        lazy-validation
        v-on:submit.prevent
      >
        <v-text-field
          v-model="name"
          required
          :rules="nameRules"
          label="Your name"
          outlined
          @keydown.enter="login()"
        ></v-text-field>
        <v-btn
          class="rounded-xl px-8"
          color="primary"
          @click="login()"
        >
          Continue
        </v-btn>
      </v-form>
      <v-row class="mt-2">
        <v-col cols="12" class="pb-0 ">
          <p class="text-light">
            or dont sign up with
          </p>
        </v-col>
        <v-col cols="8" class=" mx-auto pt-2 d-flex justify-center justify-space-around ">
          <v-icon
            color="#3B5998"
            size="50"
          >
            mdi-facebook
          </v-icon>
          <v-icon
            color="#EA4335"
            size="50"
          >
            mdi-gmail
          </v-icon>
          <v-icon
            color="#010101"
            size="50"
          >
            mdi-apple
          </v-icon>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
export default {
  auth: false,
  data() {
    return {
      name: null,
      step: 0,
    }
  },
  computed: {},
  methods: {
    login() {
      if (this.validateLogin()) {
        this.$store.commit('setUserName', this.name)
        this.$router.push('/')
      }
    }
  },
}
</script>