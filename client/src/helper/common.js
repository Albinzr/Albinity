const mainUrl = () => {
	switch (process.env.REACT_ENV) {
		case 'production':
			console.log(process.env.REACT_ENV)
			return 'http://albin.in:9000'
		default:
			console.log(process.env.REACT_ENV)
			return 'http://localhost:9000'
	}
}

let baseUrl = mainUrl()

export { baseUrl }
