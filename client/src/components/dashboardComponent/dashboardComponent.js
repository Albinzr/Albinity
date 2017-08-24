import React, { Component } from "react"
import ReactQuill from "react-quill"
import $ from "jquery"

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			heading: "",
			subHeading: "",
			editorHtml: "",
			theme: "snow",
			delta: ""
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleHeading = this.handleHeading.bind(this)
		this.handSubHeading = this.handSubHeading.bind(this)
		this.imageHandler = this.imageHandler.bind(this)
		this.getFirstImageFromHtml = this.getFirstImageFromHtml.bind(this)
		this.save = this.save.bind(this)
		this.modules = {}

		this.modules = {
			toolbar: {
				container: [
					["bold", "italic", "underline", "strike"], // toggled buttons
					[{ header: 1 }, { header: 2 }],
					["blockquote", "code-block"],
					["link", "video", "image"],
					[{ list: "ordered" }, { list: "bullet" }],
					[{ indent: "-1" }, { indent: "+1" }], // outdent/indent
					[{ size: [] }], // custom dropdown
					[{ header: [1, 2, 3, 4, 5, 6, false] }],
					[{ color: [] }, { background: [] }], // dropdown with defaults from theme
					[{ align: [] }],
					[{ script: "sub" }, { script: "super" }], // superscript/subscript
					["clean"]
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

	save() {
		event.preventDefault()
		const heading = this.state.heading
		const subHeading = this.state.subHeading
		const context = JSON.stringify(this.state.delta)
		const username = this.state.username
		const password = this.state.password
		const mainImage = this.getFirstImageFromHtml(this.state.delta)
		console.log(mainImage)
		$.ajax({
			type: "POST",
			xhrFields: {
				withCredentials: true
			},
			url: "http://localhost:4000/api/newpost",
			// contentType: "application/json; charset=utf-8",
			// dataType: "json",
			data: {
				heading: heading,
				subHeading: subHeading,
				context: context,
				section: "sadsa",
				tags: "sdasd",
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
			<div>
				<input
					type="text"
					placeholder="Heading"
					onChange={this.handleHeading}
				/>
				<input
					type="text"
					placeholder="Sub heading"
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
				/>
				<button onClick={this.save}>Save</button>
			</div>
		)
	}
}

/*
  * Quill modules to attach to editor
  * See https://quilljs.com/docs/modules/ for complete options
  */

export default App
