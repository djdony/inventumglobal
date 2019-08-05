import Model from './Model'

export default class User extends Model {
    resource(){ return 'users' }

    toggleStatus(){
        this.active = !this.active
    }
}