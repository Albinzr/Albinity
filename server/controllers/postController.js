import Post from "../model/postModel"
import slug from "slug"

const postController = {}

postController.createPost = (req, res) => {
	const {
		heading,
		subHeading,
		context,
		section,
		tags,
		active,
		mainImage
	} = req.body

	console.log(context, "XCC")

	let post = new Post({
		heading,
		subHeading,
		context,
		active,
		mainImage
	})

	post.author = req.session.userId
	post.slug = slug(heading) + "_" + Math.random().toString(36).substring(7)

	// for (var i = 0; i <= section.length - 1; i++) {
	// post.section[i] = section[i]
	// }
	// for (var i = 0; i <= tags.length - 1; i++) {
	// post.tags[i] = tags[i]
	// }
	post.section[0] = "00"
	post.tags[0] = "99"
	post
		.save()
		.then(newPost => {
			res.status(200).json({
				success: true,
				data: newPost
			})
		})
		.catch(error => {
			return res.status(403).json({
				success: false,
				message: "Could not save your post, try after sometime",
				error: error
			})
		})
}

postController.display = (req, res) => {
	let offset = parseInt(req.param("offset"))
	let limit = parseInt(req.param("limit"))

	Post.find(
		{
			active: true
		},
		(error, post) => {
			if (error == null) {
				res.status(200).json({
					success: true,
					data: post
				})
			} else {
				res.status(400).json({
					success: false,
					message: "Dose not exist.",
					error: error
				})
			}
		}
	)
		.skip(offset)
		.limit(limit)
}

postController.detailedPost = (req, res) => {
	const slug = req.params.slug
	console.log(slug)
	Post.findOne(
		{
			slug: slug
		},
		(error, post) => {
			if (error == null) {
				console.log(post)
				res.status(200).json({
					success: true,
					data: post,
					error: error
				})
			} else {
				res.status(400).json({
					success: false,
					message: "Dose not exist.",
					error: error
				})
			}
		}
	)
}

postController.update = (req, res) => {
	const { id, heading, subHeading, context, section, tags } = req.body

	console.log("update")

	Post.findOne(
		{
			_id: id
		},
		(error, post) => {
			if (error == null) {
				post.heading = heading
				post.subHeading = subHeading
				post.context = context
				post.section = section
				post.tags = tags

				post
					.save()
					.then(newAffliction => {
						res.status(200).json({
							success: true,
							data: "Updated successfully"
						})
					})
					.catch(error => {
						return res.status(501).json({
							success: false,
							message:
								"Couldn't update post. Try again after sometime.",
							error: error
						})
					})
			} else {
				res.status(400).json({
					success: false,
					message: "post dose not exist.",
					error: error
				})
			}
		}
	)
}
postController.delete = (req, res) => {
	const { id } = req.body

	Post.findOne(
		{
			_id: id
		},
		(res, error) => {
			if (error == null) {
				post.active = false
				post.save().then(data => {
					res.status(200).json({
						success: true,
						data: "removed successfully"
					})
				})
			} else {
				res.status(400).json({
					success: false,
					message: "post dose not exist.",
					error: error
				})
			}
		}
	)
}

export default postController
