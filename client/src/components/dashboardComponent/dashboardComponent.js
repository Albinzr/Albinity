import React, { Component } from "react"
import ReactQuill from "react-quill"
import ReactDOM from "react-dom"
import $ from "jquery"

import ReactToastr, { ToastContainer } from "react-toastr"

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			heading: "",
			subHeading: "",
			editorHtml: "",
			theme: "snow",
			delta: "",
			userInput: "",
			categories: [],
			selectedCategories: []
		}

		this.handleHeading = this.handleHeading.bind(this)
		this.handSubHeading = this.handSubHeading.bind(this)
		this.imageHandler = this.imageHandler.bind(this)
		this.getFirstImageFromHtml = this.getFirstImageFromHtml.bind(this)
		this.save = this.save.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.modules = {}
		this.categoryCheck = this.categoryCheck.bind(this)

		this.modules = {
			toolbar: {
				container: [
					[{ header: 1 }],
					["bold", "italic", "underline", "strike"], // toggled buttons
					["blockquote"],
					["link", "video", "image"],
					[{ list: "ordered" }, { list: "bullet" }],
					[{ align: [] }]
				],
				handlers: {
					image: this.imageHandler
				}
			}
		}
	}

	categoryCheck(event) {
		var currentSelectedCategories = this.state.selectedCategories
		if (event.target.checked) {
			currentSelectedCategories.push(event.target.value)
			this.setState({
				selectedCategories: currentSelectedCategories
			})
		} else {
			let selected = currentSelectedCategories.filter(function(item) {
				return item !== event.target.value
			})
			this.setState({
				selectedCategories: selected
			})
		}
	}

	componentWillMount() {
		this.getCategories()
	}

	getCategories() {
		let url = "http://localhost:9000/api/category"
		$.ajax({
			url: url,
			type: "GET",
			xhrFields: {
				withCredentials: true
			},
			success: function(json) {
				if (json.success) {
					this.setState({
						categories: json.data
					})
				}
			}.bind(this),
			error: function(error) {
				console.log("no network")
			}
		})
	}

	setElementAttributesHelper(el, attrs) {
		for (var key in attrs) {
			el.setAttribute(key, attrs[key])
		}
	}

	getFirstImageFromHtml(delta) {
		if (delta == null || delta == undefined || delta == "") {
			return
		}
		for (let value of delta.ops) {
			if (value.insert.image != undefined || value.insert.image != null) {
				return value.insert.image
			}
		}
	}

	imageHandler = (image, callback) => {
		var range = this.quillRef.getEditor().getSelection()
		let eventTargetParent = this.quillRef.getEditor().container.parentNode
		let inputTag = document.createElement("input")
		this.setElementAttributesHelper(inputTag, {
			class: "imUpload",
			type: "file",
			accept: "image/*",
			style: "display:none;"
		})
		eventTargetParent.appendChild(inputTag)
		inputTag.addEventListener("change", event => {
			var formData = new FormData()
			formData.append("image", event.target.files[0])

			$.ajax({
				type: "POST",
				enctype: "multipart/form-data",
				cache: false,
				processData: false,
				contentType: false,
				xhrFields: {
					withCredentials: true
				},
				url: "http://localhost:9000/profile",
				dataType: "json",
				data: formData
			})
				.done(
					function(data, status, xhr) {
						return this.quillRef
							.getEditor()
							.insertEmbed(range.index, "image", data.url)
					}.bind(this)
				)
				.fail(function(xhr, status, err) {
					console.log(err, xhr, status)
				})
		})
		inputTag.click()
	}
	handleChange(html, delta, source, editor) {
		this.setState({
			editorHtml: html,
			delta: editor.getContents()
		})
	}
	handleHeading(event) {
		this.setState({
			heading: event.target.value
		})
	}
	handSubHeading(event) {
		this.setState({
			subHeading: event.target.value
		})
	}

	createTagArray(tagsString, errorMessage) {
		if (
			tagsString == null ||
			tagsString == undefined ||
			tagsString == "" ||
			tagsString.count == 0
		) {
			this.alert(errorMessage)
			return false
		}
		return JSON.stringify(tagsString.split(","))
	}
	createCategory(categoryString, errorMessage) {
		if (
			categoryString == null ||
			categoryString == undefined ||
			categoryString == "" ||
			categoryString.count == 0
		) {
			this.alert(errorMessage)
			return false
		}
		return JSON.stringify(categoryString)
	}

	alert(description) {
		this.container.error(
			<strong />,
			<p>
				{description}
			</p>,
			{
				timeOut: 5000,
				showAnimation: "animated fadeIn", //or other animations from animate.css
				hideAnimation: "animated fadeOut",
				closeButton: true
			}
		)
	}
	validationCheckForString(data, errorMessage) {
		if (data == null || data == undefined || data == "") {
			this.alert(errorMessage)
			return false
		} else {
			return data
		}
	}

	sendPost(heading, subHeading, context, mainImage, tags, category) {
		$.ajax({
			type: "POST",
			xhrFields: {
				withCredentials: true
			},
			url: "http://localhost:9000/api/post",
			data: {
				heading: heading,
				subHeading: subHeading,
				context: context,
				section: "sadsa",
				tags: tags,
				category: category,
				mainImage: mainImage,
				active: true
			}
		})
			.done(
				function(data, status, xhr) {
					if (data.success) {
						console.log("uploaded")
					}
				}.bind(this)
			)
			.fail(function(xhr, status, err) {
				console.log(xhr, status, err)
				this.alert(err.message)
			})
	}

	save() {
		event.preventDefault()
		const heading = this.validationCheckForString(
			this.state.heading,
			"Enter a valid heading"
		)
		const subHeading = this.validationCheckForString(
			this.state.subHeading,
			"Enter a valid summary"
		)
		const context = this.validationCheckForString(
			JSON.stringify(this.state.delta),
			"Enter proper content for your post"
		)

		const mainImage = this.validationCheckForString(
			this.getFirstImageFromHtml(this.state.delta),
			"Upload atleast one image"
		)

		const tags = this.createTagArray(
			this.refs.tags.value,
			"Enter some tags"
		)

		const category = this.createCategory(
			this.state.selectedCategories,
			"Select atleast one catrgory"
		)
		if (
			heading &&
			subHeading &&
			context &&
			mainImage &&
			tags &&
			category !== false
		) {
			this.sendPost(
				heading,
				subHeading,
				context,
				mainImage,
				tags,
				category
			)
		}
	}

	render() {
		const categories = this.state.categories.map((category, index) => {
			return (
				<li key={category._id}>
					<input
						type="checkbox"
						value={category._id}
						data-att={category.name}
						onChange={this.categoryCheck}
					/>
					<label>
						{category.name}
					</label>
				</li>
			)
		})
		return (
			<div className="dashboard-container">
				<ToastContainer
					ref={input => {
						this.container = input
					}}
					className="toast-top-right"
				/>
				<input
					type="text"
					placeholder="Heading"
					onChange={this.handleHeading}
					required
				/>
				<textarea
					type="text"
					placeholder="Description / Summary"
					onChange={this.handSubHeading}
				/>
				<ReactQuill
					ref={el => (this.quillRef = el)}
					theme={this.state.theme}
					onChange={this.handleChange}
					value={this.state.editorHtml}
					modules={this.modules}
					formats={this.formats}
					bounds={".app"}
					placeholder={this.props.placeholder}
					required
				/>
				<div className="dashboard-tag-container">
					<form action="" className="test" method="post">
						<input
							type="text"
							id="exist-values"
							className="tagged form-control"
							data-removeBtn="true"
							name="tag-2"
							placeholder="Add tags"
							ref="tags"
						/>
					</form>
				</div>
				<div className="dashboard-category-container">
					<p>Select Categories</p>
					<ul>
						{categories}
					</ul>
				</div>

				<button className="dashboard-save" onClick={this.save}>
					Save
				</button>
			</div>
		)
	}
}
export default App
