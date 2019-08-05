export const state = () => ({
  logged: true,
  notifications: [],
  companies: [],
  locations: [],
  hotels: [],
  airports: [],
  suppliers: [],
  markets: [],
  currencies: [],
  languages: [],
  users: [],
  user: {
    name: '',
    defaults: {
      systemLanguage: 'en'
    },
    active: false,
    roles: [],
    permissions: [],
    locations: [],
    companies: []
  },
  types: []
})
export const mutations = {
  fill(state, obj){
    set(state, obj[0], obj[1])
  },
  add(state, obj){
    get(state, obj[0]).push(obj[1])
  },
  replace(state, obj){
    let items = get(state, obj[0])
    if(obj[1].hasOwnProperty('id')){
      let index = items.findIndex(item => item.id == obj[1].id)
      state[obj[0]].splice(index, 1, obj[1])
    }else{
      set(state, obj[0], obj[1])
    }
  },
  remove(state, obj){
    let items = get(state, obj[0])
    if(obj[1].hasOwnProperty('id')){
      let index = items.findIndex(item => item.id == obj[1].id)
      state[obj[0]].splice(index, 1)
    }else{
      state[obj[0]].splice(obj[1], 1)
    }
  }
}

export const getters = {
  notifications: state => {
    return {
      unread: state.notifications.filter(n => n.read_at == null),
      confirmable: state.notifications.filter(n => n.read_at == null).filter(n => n.confirmable === true)
    }
  },
  loggedIn (state) {
    return state.loggedIn
  },
  user (state) {
    return state.user
  }
}

export const actions = {
  async setLogged({ state }, val){
    state.logged = val
    return true
  },
  async setUser({ commit, dispatch }, data){
    try{
      var user = data.user
      commit('fill', ['user', user])
      Vue.prototype.can = function(name){
        return (user.permissions.includes(name) && user.active === true) || user.root === true
      }
      Vue.prototype.hasRole = function(role){
        return (user.roles.includes(role) && user.active === true) || user.root === true
      }
      let userLang = get(user, 'defaults.systemLanguage')
      if(userLang){
        let activeLang = en
        if(userLang == 'en'){
          activeLang = en
        }else if(userLang == 'tr'){
          activeLang = tr
        }else if(userLang == 'ru'){
          activeLang = ru
        }
        locale.use(activeLang)
        moment.locale(userLang)
      }
      return Promise.resolve(user)
    }catch(e){
      return Promise.reject(e)
    }
  },
  async logout({ state }) {
    window.localStorage.removeItem('token')
    state.logged = false
  },
  fetch({ commit, dispatch }, obj) {
    var path = null
    var	params = null
    if(typeof obj === 'string'){
      path = obj
    }else{
      path = obj[0]
      params = obj[1]
    }
    commit('replace', ['loading.'+path, true])
    return new Promise((resolve, reject) => {
      axios.get(`/api/${path}`, { params })
        .then(res => {
          commit('fill', [path, res.data])
          commit('replace', ['loading.' + path, false])
          resolve(res)
        })
        .catch(errors => {
          reject(errors)
        })
    })
  },
  store({ commit, dispatch }, obj){
    commit('replace', ['loading.' + obj[0], true])
    return new Promise((resolve, reject) => {
      axios.post(`/api/${obj[0]}`, obj[1])
        .then(res => {
          if(obj[2] === true){
            dispatch('add', [obj[0], res.data])
          }
          commit('replace', ['loading.' + obj[0], false])
          resolve(res)
        })
        .catch(errors => {
          commit('replace', ['loading.' + obj[0], false])
          reject(errors)
        })
    })
  },
  update({ commit, dispatch }, obj){
    commit('replace', ['loading.' + obj[0], true])
    return new Promise((resolve, reject) => {
      axios.put(`/api/${obj[0]}/${obj[1]['id']}`, obj[1])
        .then(res => {
          if(obj[2] === true){
            dispatch('change', [obj[0], res.data])
          }
          commit('replace', ['loading.' + obj[0], false])
          resolve(res)
        })
        .catch(errors => {
          commit('replace', ['loading.' + obj[0], false])
          reject(errors)
        })
    })
  },
  destroy({ commit, dispatch, state }, obj){
    commit('replace', ['loading.' + obj[0], true])
    return new Promise((resolve, reject) => {
      if(obj[1] !== undefined && obj[1] !== null){
        let item = undefined
        if(obj[1].hasOwnProperty('id')){
          item = obj[1]
        }else{
          item = state[obj[0]][obj[1]]
        }
        if(item.hasOwnProperty('id')){
          axios.delete(`/api/${obj[0]}/${item.id}`)
            .then(res => {
              if(res.data.success){
                commit('remove', obj)
                commit('replace', ['loading.' + obj[0], false])
                resolve(res)
              }
            })
            .catch(errors => {
              commit('replace', ['loading.' + obj[0], false])
              reject(errors)
            })
        }else{
          commit('remove', obj)
          commit('replace', ['loading.' + obj[0], false])
          resolve(true)
        }
      }
    })
  },
  restore({ commit, dispatch }, obj){
    commit('replace', ['loading.' + obj[0], true])
    return new Promise((resolve, reject) => {
      axios.post(`/api/${obj[0]}/restore/${obj[1]}`)
        .then(res => {
          if(res.data.success){
            commit('replace', ['loading.' + obj[0], false])
            resolve(res)
          }
        })
        .catch(errors => {
          commit('replace', ['loading.' + obj[0], false])
          reject(errors)
        })
    })
  },
  change({ commit }, obj){
    return new Promise((resolve, reject) => {
      commit('replace', obj)
      resolve(obj)
    })
  },
  unset({ commit }, path){
    commit('replace', [path, []])
  },
  remove({ commit }, obj){
    if(typeof obj === 'string'){
      commit('replace', [obj, null])
    }else{
      commit('remove', obj)
    }
  },
  add({ commit }, obj){
    commit('add', obj)
  },
  toggle({ commit, state }, path){
    commit('replace', [path, !get(state, path)])
  }
}