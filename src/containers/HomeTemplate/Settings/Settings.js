import styles from "./styles.module.scss"
import clsx from "clsx"
import { useEffect, useState, useRef } from "react"
import Editor from "../../../components/Editor"
import Button from "../../../components/ui/Button"
import AvatarPlaceholder from "../../../assets/img/avatar_placeholder.png"

const Component = ({}) => {
  const [about, setAbout] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [avatar, setAvatar] = useState()

  const usernameRef = useRef()
  const passwordRef = useRef()
  const avatarRef = useRef()

  // TODO: set maximum characters
  const handleAboutChange = (editorState) => {
    setAbout(editorState)
  }

  const handleUsernameChange = (e) => {
    setUsername(usernameRef.current.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(passwordRef.current.value)
  }

  const handleAvatarChange = (e) => {
    const file = avatarRef.current.files[0]
    file.preview = URL.createObjectURL(file)
    setAvatar(file)
  }

  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview)
    }
  }, [avatar])

  return (
    <>
      <div className={styles.container}>
        <div className={styles.section}>
          <h4 className={styles.title}>Email</h4>
          <input type="text" disabled value="Test@example" />
        </div>
        <div className={styles.section}>
          <h4 className={styles.title}>Username</h4>
          <div>
            <input
              type="text"
              onChange={handleUsernameChange}
              value={username}
              ref={usernameRef}
            />
          </div>
          {username?.length > 0 && (
            <Button className={styles.button}>Save</Button>
          )}
        </div>
        <div className={styles.section}>
          <h4 className={styles.title}>About</h4>
          <Editor
            placeholder="A little about yourself..."
            onStateChange={handleAboutChange}
          />
          {about?.length > 8 && <Button className={styles.button}>Save</Button>}
        </div>
        <div className={styles.section}>
          <h4 className={styles.title}>Avatar</h4>
          <div>
            <div>
              <input
                type="file"
                accept="image/*"
                ref={avatarRef}
                onChange={handleAvatarChange}
              />
            </div>
            {avatar && (
              <div
                className={styles.avatar}
                style={{ backgroundImage: `url(${avatar.preview})` }}
              ></div>
            )}
            {!avatar && (
              <div
                className={styles.avatar}
                style={{ backgroundImage: `url(${AvatarPlaceholder})` }}
              ></div>
            )}
          </div>
          {avatar && <Button className={styles.button}>Save</Button>}
        </div>
        <div className={styles.section}>
          <h4 className={styles.title}>Change Password</h4>
          <div>
            <input
              type="text"
              onChange={handlePasswordChange}
              value={password}
              ref={passwordRef}
            />
          </div>
          {password?.length > 0 && (
            <Button className={styles.button}>Save</Button>
          )}
        </div>
        {/* <div className={styles.section}>
          <h4 className={styles.title}>Privacy</h4>
          <div>
            <input type="radio"/>
          </div>
          <Button className={styles.button}>Save</Button>
        </div> */}
        <div className={styles.section}>
          <h4 className={styles.title}>Delete User Account</h4>
          <Button className={clsx(styles.button, "secondary")}>
            Delete Account
          </Button>
        </div>
      </div>
    </>
  )
}
export default Component
