export default {
  state: {
    fromLocations: [],
    toLocations: [],
    stars: [],
    products: [],
    price: 500,
    roomTypes: [],
    hotelAmenities: [],
    ceilingHeight: 10,
    meetingRoomCap: 1000,
    distance: 300
  },
  mutations: {
    SET_FILTERS(state, data) {
      state.fromLocations = data.fromLocations;
      state.toLocations = data.toLocations;
      state.stars = data.stars;
      state.products = data.products;
      state.price = data.price;
      state.roomTypes = data.roomTypes;
      state.hotelAmenities = data.hotelAmenities;
      state.ceilingHeight = data.ceilingHeight;
      state.meetingRoomCap = data.meetingRoomCap;
      state.distance = data.distance;
    }
  },
  actions: {
    async populate({ commit }){
      let { data } = await this.$axios.get('/user/filters')
      if(data){
        commit('SET_FILTERS', data)
      }
    }
  }
}