const defaultValues = {
  headerLogoStyle: 'dark',
  headerDarkText: true,
  appClassName: '',
  footerBg: true
}

export const state = () => ({
  ...defaultValues
})

export const getters = {
  headerLogoStyle(state) {
    return state.headerLogoStyle
  },
  headerDarkText(state) {
    return state.headerDarkText
  },
  appClassName(state) {
    return state.appClassName
  },
  footerBg(state) {
    return state.footerBg
  }
}

export const mutations = {
  setHeaderLogoStyle(state, style) {
    state.headerLogoStyle = style
  },
  setHeaderDarkText(state, val) {
    state.headerDarkText = val
  },
  setAppClassName(state, className) {
    state.appClassName = className
  },
  setFooterBg(state, val) {
    state.footerBg = val
  },
  setDefault(state) {
    for (let prop of Object.keys(defaultValues)) {
      state[prop] = defaultValues[prop]
    }
  }
}
