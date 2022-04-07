import styles from "./styles.module.scss"
import { useEffect, useState } from "react"
import { Editor } from "react-draft-wysiwyg"
import { EditorState, convertToRaw } from "draft-js"
import draftToHtml from "draftjs-to-html"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

const Component = ({ placeholder, onStateChange }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )

  // TODO: set maximum characters
  const handleEditorStateChange = (editorState) => {
    setEditorState(editorState)
  }

  useEffect(() => {
    onStateChange(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  }, [editorState, onStateChange])

  return (
    <Editor
      wrapperClassName={styles.editorWrapper}
      editorClassName={styles.editor}
      toolbarClassName={styles.toolbar}
      editorState={editorState}
      onEditorStateChange={handleEditorStateChange}
      toolbar={{
        options: [
          "inline",
          "list",
          "textAlign",
          "link",
          "embedded",
          "emoji",
          "image",
          "remove"
        ],
        inline: {
          options: ["bold", "italic", "underline", "strikethrough"],
          className: styles.option
        },
        list: {
          options: ["unordered", "ordered"],
          className: styles.option
        },
        textAlign: {
          className: styles.option
        },
        link: {
          showOpenOptionOnHover: false,
          className: styles.option
        },
        emoji: {
          className: styles.option
        },
        embedded: {
          className: styles.option
        },
        image: {
          defaultSize: {
            width: "220px"
          },
          className: styles.option
        },
        remove: {
          className: styles.option
        }
      }}
      placeholder={placeholder}
      hashtag={{
        separator: " ",
        trigger: "#"
      }}
    />
  )
}
export default Component
