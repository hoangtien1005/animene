import styles from "./styles.module.scss"
import { useEffect, useState } from "react"
import Editor from "../../../components/Editor"

const Component = ({}) => {
  const [editorState, setEditorState] = useState("")

  // TODO: set maximum characters
  const handleEditorStateChange = (editorState) => {
    setEditorState(editorState)
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.section}>
          <h4 className={styles.title}>About</h4>
          <Editor
            placeholder="A little about yourself..."
            onStateChange={handleEditorStateChange}
          />
          <div className="space-top-40"></div>
          <div dangerouslySetInnerHTML={{ __html: editorState }}></div>
        </div>
        <div className={styles.section}>
          <h4 className={styles.title}>Avatar</h4>
        </div>
        <div className={styles.section}>
          <h4 className={styles.title}>Username</h4>
        </div>
        <div className={styles.section}>
          <h4 className={styles.title}>Email</h4>
        </div>
        <div className={styles.section}>
          <h4 className={styles.title}>Change Password</h4>
        </div>
        <div className={styles.section}>
          <h4 className={styles.title}>Privacy</h4>
        </div>
        <div className={styles.section}>
          <h4 className={styles.title}>Delete Account</h4>
        </div>
      </div>
    </>
  )
}
export default Component
