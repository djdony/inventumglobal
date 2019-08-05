import Model from './model'

export default class Invoice extends Model {
    resource(){ return 'invoices' }
}