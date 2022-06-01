
const fs = require('fs')
const process = require('process')
const axios = require('axios')

/** read file at path and print it out. */

const cat = (path) => {
	fs.readFile(path, 'utf8', function (err, data) {
		if (err) {
			console.error('ERROR:', err)
			process.exit(1)
		} else {
			console.log(data)
		}
	})
}

const webCat = async (path) => {
	try {
		const resp = await axios.get(path)
		console.log(resp.data)
	} catch (err) {
		console.error('ERROR:', err)
	}
}
let path = process.argv[2]
path.slice(0, 1) === '.' ? cat(path) : webCat(path)
