import { Model as BaseModel } from 'vue-api-query'

export default class Model extends BaseModel {
    baseURL () {
        return ''
    }
    request (config) {
        return this.$http.request(config)
    }
}