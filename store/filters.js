export default {
  state: () => ({
    fromLocations: [],
    toLocations: [],
    stars: [],
    b2b: 'b2b',
    products: [],
    price: 2000,
    roomTypes: [],
    hotelAmenities: [],
    hotelCategories: [],
    hotelChains: [],
    ceilingHeight: 20,
    meetingRoomCap: 18000,
    maxdistance: 300
  }),
  getters: {
    fromLocationsList(state) {
      let list = []
      for (let location of state.fromLocations) {
        for (let descendant of location.descendants) {
          list.push({
            text: location.name + ', ' + descendant.name,
            value: descendant.id
          })
        }
      }
      return list
    },
    toLocationsList(state) {
      let list = []
      for (let location of state.toLocations) {
        for (let descendant of location.descendants) {
          list.push({
            text: location.parent.name + ', ' + descendant.name,
            value: descendant.id
          })
        }
      }
      return list
    }
  },
  mutations: {
    SET_FILTERS(state, data) {
      state.fromLocations   = data.fromLocations
      state.toLocations     = data.toLocations
      state.products        = data.products
      state.price           = data.price
      state.b2b             = data.b2b
      state.roomTypes       = data.roomTypes
      state.hotelAmenities  = data.hotelAmenities
      state.hotelCategories = data.hotelCategories
      state.hotelChains     = data.hotelChains
      state.ceilingHeight   = data.ceilingHeight
      state.meetingRoomCap  = data.meetingRoomCap
      state.minDate         = data.minDate
      state.maxDate         = data.maxDate
    },
    SET_MAX_PRICE(state, data){
      state.price = data
    }
  },
  actions: {
    async populate({ commit }) {
      let { data } = await this.$axios.get('/user/filters')
      if (data) {
        commit('SET_FILTERS', data)
      }
    }
  }
}
