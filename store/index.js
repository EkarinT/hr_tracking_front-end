export const state = () => {
  return {
    admin: undefined
  }
}

export const mutations = {
  setAdminData (state, data) {
    state.admin = data
  }
}
