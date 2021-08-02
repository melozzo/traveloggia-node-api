const Map = require('./../Models/map');
const moment = require('moment');


exports.createMap = (req, res, next) => {
	const name = req.body.MapName;
	const memberId = req.body.MemberID;
	let mapId;
	Map.findOne().sort({ "MapID": -1 }).select("MapID")
		.then(result => {
			mapId = result.MapID + 1;
			let map = new Map({ MemberID: memberId, MapName: name, MapID: mapId, CreateDate: moment().format() });
			map.save()
				.then(() => {
					res.status(201).json(map);
				})
				.catch(error => {
					res.status(500).json(JSON.stringify(error))
				})
		})
		.catch(error => {
			res.status(500).json(JSON.stringify(error))
		})
};


exports.getList = (req, res, next) => {
	const memberId = req.params.memberId;
	console.log('getting map list for member', memberId)
	Map.find({ "MemberID": memberId, IsDeleted: { $not: { $eq: true } } }).sort({ "CreateDate": -1 })// unling mongo mongoose doest not return a cursor here, so to array not needed, however need cursor to implement pagination if thats going to be a problem
		.then(maps => {
			res.status(200).json(maps);
		})
		.catch(error => {
			res.status(500).json(JSON.stringify(error))
		})
}


exports.getMap = (req, res, next) => {
	const mapId = req.params.mapId;
	//Map.findById(mapId)//only works with object id's mongoose converts string to object id 
	Map.findOne({ "MapID": mapId, IsDeleted: { $not: { $eq: true } } })
		.populate({ path: 'Sites' })
		.then(map => {
			res.status(200).json(map);
		})
		.catch(error => {
			res.status(500).json(JSON.stringify(error))
		})
}

exports.getLastMap = (req, res, next) => {
	const memberId = req.params.memberId;
	Map.findOne({ "MemberID": parseInt(memberId), IsDeleted: { $not: { $eq: true } } }).sort({ "CreateDate": -1 })
		.populate({ path: 'Sites' })
		.then(map => {
			res.status(200).json(map);
		})
		.catch(error => {
			res.status(500).json(JSON.stringify(error))
		})
}



//findOneAndUpdate() finds the first document that matches a given filter, applies
//findOneAndUpdate() returns the document as it was before update was applied.

exports.updateMap = async (req, res, next) => {
	const mapId = req.params.mapId;
	const filter = { "MapID": mapId }
	const update = { $set: req.body }
	const options ={new: true} // return the updated rather than original
	try{
		const afterUpdate = await Map.findOneAndUpdate(filter, update, options);
		console.log( 'updated map', afterUpdate)
		res.status(200).json(afterUpdate)
	}catch( error ){
		console.log(err)
		res.status(500).json(JSON.stringify(err))
	}
}


exports.deleteMap = (req, res, next) => {
	const mapId = req.params.mapId;
	Map.findOne({ "MapID": req.params.mapId })
		.then(result => {
			if (!result)
				throw error("map not found")
			result.IsDeleted = true;
			result.save()
				.then(updatedMap => {
					res.status(204).json(updatedMap);
				})
				.catch(error => {
					console.log(error)
					res.status(500).json(JSON.stringify(error))
				})
		})

		.catch(error => {
			console.log(error)
			res.status(500).json(JSON.stringify(error))
		})
}