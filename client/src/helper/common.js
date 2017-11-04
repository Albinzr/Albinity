const mainUrl = () => {
	//console.log('current env', process.env.REACT_APP_ENV)
	switch (process.env.REACT_APP_ENV) {
		case 'production':
			//console.log(process.env.REACT_APP_ENV)
			return 'http://albin.in:9000'
		default:
			//console.log(process.env.REACT_APP_ENV)
			return 'http://localhost:9000'
	}
}

let baseUrl = mainUrl()

export { baseUrl }
