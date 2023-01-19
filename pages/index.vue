<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title>
          <h3>
            Your lists
          </h3>
        </v-card-title>
        <v-divider></v-divider>
        <v-row
          class="pa-5"
        >
          <v-col
            cols="12"
          >

          </v-col>
          <v-col
            cols="12"
            class="py-0"
          >
            <ListCreate
              @create="createList($event)"
            />
          </v-col>
          <v-col
            cols="12"
            class="py-0"
          >
            <ListElement
              v-for="(list, index) in lists" :key="index"
              :list="list"
              :index="index"
              @refreshData="getLists()"
            />
          </v-col>
          <v-col
            v-if="lists.length === 0"
            cols="12"
            class="d-flex py-0"
          >
            <h4>
              You dont have any lists.
            </h4>
          </v-col>
        </v-row>
        <v-card-actions>

        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
export default {
  name: 'IndexPage',
  data() {
    return {
      lists: []
    }
  },
  mounted() {
    this.getLists()
  },
  computed: {
    userName() {
      return this.$store.state.userName
    }
  },
  methods: {
    getLists() {
      this.$axios.get('/lists/')
        .then((result) => {
          this.lists = result.data.filter((list) => list.user === this.userName)
        }).catch((err) => {

        });
    },
    createList(obj) {
      const list = {
        user: this.userName,
        uniqueId: uuidv4(),
        title: obj.name,
        icon: obj.icon,
        iconColor: obj.iconColor
      }
      this.$axios.post('/lists/', list)
        .then((result) => {
          this.getLists()
        }).catch((err) => {

        });
    }
  },
}
</script>
