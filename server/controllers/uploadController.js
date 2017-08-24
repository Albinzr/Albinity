const uploadController = {}

uploadController.uploadBlogImages = (req, res) => {
	var baseURL = req.protocol + "://" + req.get("host") + "/"
	res.status(200).json({
		url: baseURL + req.file.path
	})
}

export default uploadController
