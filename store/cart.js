export default {
  state: {
    // locations
    from: 2,
    to: 1,
    // event size
    single: 0,
    triple: 0,
    double: 0,
    pax: 10,
    // dates
    departure_date: new Date().toISOString().substr(0, 10),
    arrival_date: new Date().toISOString().substr(0, 10),
    hotels: [],
    // change when load the filters
    product_id: 'mice'
  },
  getters: {
    cart(state) {
      return state
    }
  },
  mutations: {
    // replace to an action
    SET_STATE(state, data) {
      for (let i in data) {
        state[i] = data[i]
      }
    },
    ADD_HOTEL(state, hotel) {
      state.hotels.push(hotel)
    },
    INIT_CART(state) {
      let cart = localStorage.getItem('cart')
      cart = JSON.parse(cart)

      for (let item in cart) {
        state[item] = cart[item]
      }
    },
    CLEAN_CART(state) {
      console.log('clean')

      localStorage.removeItem('cart')
      state.hotels = []
    }
  },
  actions: {
    addHotel({ state, commit, dispatch }, id) {
      let exists = !!state.hotels.find(e => e.id == id)

      if (state.hotels.length >= 10)
        return this.$toast.error('You can add maximum 10 hotel')
      if (exists) return this.$toast.error('The hotel has been already added')

      commit('ADD_HOTEL', { id, product_id: state.product_id })
      dispatch('updateStorage')
      this.$toast.success('The hotel has been successfully added')
    },
    setSearchPanelData({ commit, dispatch, state }, query) {
      let parseAsNumbers = ['from', 'to', 'double', 'single', 'triple', 'pax']
      parseAsNumbers.forEach(item => {
        query[item] = query[item] ? Number(query[item]) : state[item]
      })

      let newState = { ...state, ...query }

      commit('SET_STATE', newState)
      dispatch('updateStorage')
    },
    updateStorage({ state }) {
      let data = JSON.stringify(state)
      localStorage.setItem('cart', data)
    },
    removeHotel({ state, dispatch }, id) {
      let index = state.hotels.findIndex(e => e.id == id)

      state.hotels.splice(index, 1)

      dispatch('updateStorage')
    }
  }
}
