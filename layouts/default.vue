<template>
  <v-app dark class="main-container">
    <Header
      v-if="userName"
    />
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-btn
      v-if="userName"
      color="primary"
      fab
      dark
      class="logout-button"
      @click="logout()"
    >
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app>
</template>

<script>
import Header from '~/components/General/Header.vue'
export default {
  name: 'DefaultLayout',
  components: {
    Header
  },
  watch: {
    userName(val) {
      if (!val) {
        this.$router.push('/login')
      }
    }
  },
  computed: {
    userName() {
      return this.$store.state.userName
    }
  },
  data() {
    return {

    }
  },
  methods: {
    logout() {
      this.$store.commit('setUserName', null)
      this.$router.push('/login')
    }
  },
}
</script>
