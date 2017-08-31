import React, { Component } from "react"
import ReactQuill from "react-quill"
import ReactDOM from "react-dom"
import $ from "jquery"

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			heading: "",
			subHeading: "",
			editorHtml: "",
			theme: "snow",
			delta: "",
			userInput: ""
		}

		this.handleHeading = this.handleHeading.bind(this)
		this.handSubHeading = this.handSubHeading.bind(this)
		this.imageHandler = this.imageHandler.bind(this)
		this.getFirstImageFromHtml = this.getFirstImageFromHtml.bind(this)
		this.save = this.save.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.modules = {}

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

	setElementAttributesHelper(el, attrs) {
		for (var key in attrs) {
			el.setAttribute(key, attrs[key])
		}
	}

	getFirstImageFromHtml(delta) {
		for (let value of delta.ops) {
			if (value.insert.image != undefined || value.insert.image != null) {
				return value.insert.image
			}
		}
	}
	alert() {
		console.log("yo")
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
				url: "http://localhost:4000/profile",
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

	createTagArray(tagsString) {
		return JSON.stringify(tagsString.split(","))
	}
	save() {
		event.preventDefault()
		const heading = this.state.heading
		const subHeading = this.state.subHeading
		const context = JSON.stringify(this.state.delta)
		const username = this.state.username
		const password = this.state.password
		const mainImage = this.getFirstImageFromHtml(this.state.delta)
		console.log(this.createTagArray(this.refs.tags.value), "check tags")
		$.ajax({
			type: "POST",
			xhrFields: {
				withCredentials: true
			},
			url: "http://localhost:4000/api/post",
			// contentType: "application/json; charset=utf-8",
			// dataType: "json",
			data: {
				heading: heading,
				subHeading: subHeading,
				context: context,
				section: "sadsa",
				tags: this.createTagArray(this.refs.tags.value),
				mainImage: mainImage,
				active: true
			}
		})
			.done(
				function(data, status, xhr) {
					console.log(data)
					if (data.success) {
						console.log("uploaded")
					}
				}.bind(this)
			)
			.fail(function(xhr, status, err) {
				console.log(err)
			})
	}

	render() {
		return (
			<div className="dashboard-container">
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

				<button className="dashboard-save" onClick={this.save}>
					Save
				</button>
			</div>
		)
	}
}
export default App
