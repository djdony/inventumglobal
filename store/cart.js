export default {
  state: () => ({
    orders: []
  }),
  mutations: {
    ADD_ORDER(state, data){
      state.orders.push(data)
    },
    REMOVE_ORDER(){

    },
    ADD_HOTEL(state, data) {
      state.orders[data.order].hotels.push(data.hotel)
    },
    INIT_CART(state) {
      if(!process.server){
        let orders = localStorage.getItem('cart')
        orders = JSON.parse(orders)
        if (orders && orders.length) {
          orders.forEach(order => {
            state.orders.push(order)
          })
        }
      }
    },
    CLEAN_CART(state) {
      if(!process.server){
        localStorage.removeItem('cart')
        state.orders = []
      }
    }
  },
  actions: {
    addHotel({ state, commit, dispatch }, data) {
      let idx = state.orders.findIndex(o => 
        o.from === data.from &&
        o.to === data.to &&
        o.product_id === data.product_id &&
        o.departure_date === data.departure_date && 
        o.arrival_date === data.arrival_date
      )

      if(idx === -1) {
        data.sgl  = Number(data.sgl) || 0
        data.dbl  = Number(data.dbl) || 0
        data.trpl  = Number(data.trpl) || 0
        data.pax     = Number(data.pax) || 0
        let newOrder = {
          hotels: [data.hotel],
          note: '',
          ...data 
        }
        delete newOrder.hotel
        commit('ADD_ORDER', newOrder)
      } else {
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
        } else {
          if(!!order.hotels.find(h => h.id === data.hotel.id)){
            commit(
              'snackbar/showSnackbar',
              {
                message: 'The hotel has been already added',
                color: 'red'
              },
              { root: true }
            )
          } else {
            commit('ADD_HOTEL', { order: idx, hotel: data.hotel })
          }
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
    updateStorage({ state }) {
      if(!process.server)
        localStorage.setItem('cart', JSON.stringify(state.orders))
    },
    removeOrder({ state, dispatch }, i){
      state.orders.splice(i, 1)
      dispatch('updateStorage')
    },
    removeHotel({ state, dispatch }, data) {
      state.orders[data.order].hotels.splice(data.hotel, 1)
      dispatch('updateStorage')
    }
  }
}
