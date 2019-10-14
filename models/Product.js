import Model from './Model'

import Media from './Media'
import Amenity from './Amenity'

export default class Product extends Model {
    resource(){ return 'products' }
}