export default {
  state: {
    // locations
    from: 2,
    to: 1,
    // event size
    sgl: 3,
    dbl: 2,
    trp: 1,
    pax: 10,
    dates: [
      new Date().toISOString().substr(0, 10),
      new Date().toISOString().substr(0, 10)
    ],
    hotels: [
      {
        id: 1,
        priceType: 'mice'
      },
      {
        id: 2,
        priceType: 'wedding'
      }
    ],
    // change when load the filters
    currentPriceType: 'mice'
  },
  mutations: {
    SET_SEARCH_PANEL_DATA(state, query) {
      console.log('wut', state)
      state = { ...state, ...query }
    }
  },
  actions: {}
}
