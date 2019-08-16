import axios from 'axios'

export default {
  state: {
    stars: [
      {
        id: 1,
        name: 'Apart'
      },
      {
        id: 2,
        name: '2'
      },
      {
        id: 3,
        name: '3'
      },
      {
        id: 4,
        name: '3 +'
      },
      {
        id: 5,
        name: '4'
      },
      {
        id: 6,
        name: '4+'
      },
      {
        id: 7,
        name: 'HV -2'
      },
      {
        id: 8,
        name: 'HV -1'
      },
      {
        id: 9,
        name: '5'
      }
    ]
  },
  mutations: {
    SET_STARS(state, stars) {
      state.stars = stars
    }
  }
}
