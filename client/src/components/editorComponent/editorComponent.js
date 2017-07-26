import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import React, { Component } from 'react';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw } from 'draft-js';

import uploadImageCallBack from './uploadImageCallBack';

class MyEditor extends Component {

  state: any = {
    editorContents: [],
    html: ""
  };

  onEditorStateChange: Function = (index, editorContent) => {
    let editorContents = this.state.editorContents;
    editorContents[index] = editorContent;
    editorContents = [...editorContents];
    console.log(this.state.html);
    this.setState({
      editorContents,
      html: editorContents[0] && draftToHtml(convertToRaw(editorContents[0].getCurrentContent()))
    });
  };

  render() {
    const {editorContents} = this.state;
    return (
      <div className="editor">
      <Editor
      wrapperClassName="demo-wrapper-wide"
      editorClassName="demo-editor"
      hashtag={{}}
      editorState={editorContents[0]}
      wrapperClassName="demo-wrapper"
      onEditorStateChange={this.onEditorStateChange.bind(this, 0)}
      toolbar={{
        image: {
          uploadCallback: uploadImageCallBack
        },
        inline: {
          inDropdown: true
        },
        list: {
          inDropdown: true
        },
        textAlign: {
          inDropdown: true
        },
        link: {
          inDropdown: true
        },
        history: {
          inDropdown: true
        }
      }}
      />
  </div>
      );
  }
}

export default MyEditor;
