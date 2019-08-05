import Model from './Model'

import Media from './Media'
import Amenity from './Amenity'

export default class Hotel extends Model {
    resource(){ return 'hotels' }

	media(){
		return this.hasMany(Media)
	}

	amenities(){
		return this.hasMany(Amenity)
	}
}