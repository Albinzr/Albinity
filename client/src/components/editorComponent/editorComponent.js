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
				<div id="tooltip-controls">
					<button id="bold-button">
						<i class="fa fa-bold" />
					</button>
					<button id="italic-button">
						<i class="fa fa-italic" />
					</button>
					<button id="link-button">
						<i class="fa fa-link" />
					</button>
					<button id="blockquote-button">
						<i class="fa fa-quote-right" />
					</button>
					<button id="header-1-button">
						<i class="fa fa-header">
							<sub>1</sub>
						</i>
					</button>
					<button id="header-2-button">
						<i class="fa fa-header">
							<sub>2</sub>
						</i>
					</button>
				</div>
				<div id="sidebar-controls">
					<button id="show-controls">
						<i class="fa fa-plus" />
					</button>
					<span class="controls">
						<button id="image-button">
							<i class="fa fa-camera" />
						</button>
						<button id="video-button">
							<i class="fa fa-play" />
						</button>
						<button id="tweet-button">
							<i class="fa fa-twitter" />
						</button>
						<button id="divider-button">
							<i class="fa fa-minus" />
						</button>
					</span>
				</div>
				<div id="editor-container">
					<p>Tell your story...</p>
				</div>
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
		[{ header: 1 }],
		["blockquote"],
		["link", "image", "video"],
		[{ list: "ordered" }, { list: "bullet" }],
		[{ size: [] }], // custom dropdown
		[{ color: [] }, { background: [] }], // dropdown with defaults from theme
		[{ align: [] }],
		[{ script: "sub" }, { script: "super" }], // superscript/subscript
		["clean"] // remove formatting button
	]
}

export default Editor
