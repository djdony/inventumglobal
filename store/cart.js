export default {
  state: {
    orders: [{
      from: null,
      to: null,
      product_id: 1,
      departure_date: new Date().toISOString().substr(0, 10),
      arrival_date: new Date().toISOString().substr(0, 10),
      single: 0,
      triple: 0,
      double: 0,
      pax: 10,
      hotels: []
    }]
  },
  mutations: {
    // replace to an action
    SET_STATE(state, data) {
      for (let i in data) {
        state[i] = data[i]
      }
    },
    ADD_ORDER(state, data){
      state.orders.push(data)
    },
    ADD_HOTEL(state, data) {
      state.orders[data.order].hotels.push(data.hotel)
    },
    INIT_CART(state) {
      /*
      let cart = localStorage.getItem('cart')
      cart = JSON.parse(cart)
      if (cart && cart.length) {
        for (let item in cart) {
          state[item] = cart[item]
        }
      }
      */
    },
    CLEAN_CART(state) {
      //localStorage.removeItem('cart')
      //state.hotels = []
    }
  },
  actions: {
    addHotel({ state, commit, dispatch }, data) {

      let idx = 0
      if(state.orders.length > 1){

        idx = state.orders.findIndex(o => 
          o.from === data.from &&
          o.to === data.to &&
          o.product_id === data.product_id &&
          o.departure_date === data.departure_date && 
          o.arrival_date === data.arrival_date
        )

        if(idx === -1){
          let newOrder = {
            hotels: [data.hotel],
            ...data 
          }
          delete newOrder.hotel
          commit('ADD_ORDER', newOrder)
        }

      }

      let order = state.orders[idx]

      if(order.hotels.length >= 10){
        commit(
          'snackbar/showSnackbar',
          {
            message: 'You can add maximum 10 hotels',
            color: 'red'
          },
          { root: true }
        )
      }else{

        if(!!order.hotels.find(h => h.id === data.hotel.id)){
          commit(
            'snackbar/showSnackbar',
            {
              message: 'The hotel has been already added',
              color: 'red'
            },
            { root: true }
          )
        }else{
          commit('ADD_HOTEL', { order: idx, hotel: data.hotel })
        }
      }

      dispatch('updateStorage')

      commit(
        'snackbar/showSnackbar',
        {
          message: 'The hotel has been succesfully added',
          color: 'green'
        },
        { root: true }
      )
    },
    setSearchPanelData({ commit, dispatch, state }, query) {
      /*
      let parseAsNumbers = ['from', 'to', 'double', 'single', 'triple', 'pax']
      parseAsNumbers.forEach(item => {
        query[item] = query[item] ? Number(query[item]) : state[item]
      })

      let newState = { ...state, ...query }

      commit('SET_STATE', newState)
      dispatch('updateStorage')
      */
    },
    updateStorage({ state }) {
      //localStorage.setItem('cart', JSON.stringify(state))
    },
    removeHotel({ state, dispatch }, id) {
      /*
      let index = state.hotels.findIndex(e => e.id == id)
      state.hotels.splice(index, 1)
      dispatch('updateStorage')
      */
    }
  }
}
