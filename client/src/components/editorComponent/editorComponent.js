import React, { Component } from "react"
import ReactQuill from "react-quill"

class Editor extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			editorHtml: "",
			theme: "snow"
		}
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(html) {
		this.setState({
			editorHtml: html
		})
	}

	render() {
		return (
			<div>
				<ReactQuill
					theme={this.state.theme}
					onChange={this.handleChange}
					value={this.state.editorHtml}
					modules={Editor.modules}
					formats={Editor.formats}
					bounds={".app"}
					placeholder={this.props.placeholder}
				/>
			</div>
		)
	}
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
	toolbar: [
		["bold", "italic", "underline", "strike"], // toggled buttons
		[{ header: 1 }, { header: 2 }],
		["blockquote", "code-block"],
		["link", "image", "video"],
		[{ list: "ordered" }, { list: "bullet" }],
		[{ indent: "-1" }, { indent: "+1" }], // outdent/indent
		[{ size: [] }], // custom dropdown
		[{ header: [1, 2, 3, 4, 5, 6, false] }],
		[{ color: [] }, { background: [] }], // dropdown with defaults from theme
		[{ align: [] }],
		[{ script: "sub" }, { script: "super" }], // superscript/subscript
		["clean"] // remove formatting button
	]
}

// Editor.formats = [
// 	"header",
// 	"font",
// 	"size",
// 	"bold",
// 	"italic",
// 	"underline",
// 	"strike",
// 	"blockquote",
// 	"list",
// 	"bullet",
// 	"indent",
// 	"link",
// 	"image",
// 	"video"
// ]

export default Editor
