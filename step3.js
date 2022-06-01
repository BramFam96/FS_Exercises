// 1)
const fs = require('fs')
const process = require('process')
const axios = require('axios')

/** read file at path and print it out. */

const cat = (path, pathOut) => {
	fs.readFile(path, 'utf8', function (err, data) {
		if (err) {
			console.error('ERROR:', err)
			process.exit(1)
		} else {
			writeToFile(data, pathOut)
		}
	})
}

const webCat = async (path, pathOut) => {
	try {
		const resp = await axios.get(path)
		writeToFile(resp.data, pathOut)
	} catch (err) {
		console.error('ERROR:', err)
	}
}

const writeToFile = (text, pathOut) => {
	if (pathOut) {
		fs.writeFile(pathOut, text, 'utf8', (err) => {
			if (err) {
				console.error(`ERROR:`, err)
				process.exit(1)
			}
		})
	} else {
		console.log(text)
		console.log(process.argv)
	}
}

let path = process.argv[2]
let pathOut

process.argv[3] === '--out' ? (pathOut = process.argv[4]) : pathOut
path.slice(0, 4) === 'https' ? webCat(path, pathOut) : cat(path, pathOut)
