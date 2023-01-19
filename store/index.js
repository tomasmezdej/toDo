export const state = () => ({
  userName: null
})

export const getters = {
  getUserName(state) {
    return state.userName
  }
}

export const mutations = {
  setUserName(state, val) {
    state.userName = val
  }
}
