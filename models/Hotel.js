import Model from './Model'

import Media from './Media'
import Amenity from './Amenity'

export default class Hotel extends Model {
    resource(){ return 'hotels' }

	amenities(){
		return this.hasMany(Amenity)
	}

	
}