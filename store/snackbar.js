export const state = () => ({
  snackbar: false,
  color: undefined,
  timeout: 3000,
  message: 'Empty message',
  nullify: undefined
})

export const mutations = {
  SET_SNACKBAR(state, value) {
    state.snackbar = value
  },
  showSnackbar(state, data = {}) {
    clearTimeout(state.nullify)

    state.timeout = data.timeout || state.timeout
    state.color = data.color || state.color
    state.message = data.message || state.message
    state.snackbar = true

    state.nullify = setTimeout(() => {
      state.timeout = 3000
      state.color = undefined
      state.message = 'Empty message'
    }, state.timeout + 250)
  }
}

// can show only one snackbar in parallel
