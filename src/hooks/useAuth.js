import { useSelector } from "react-redux"
import { selectAuth } from "../features/auth/authSlice"

const useAuth = () => {
  const { data } = useSelector(selectAuth)
  return data
}
export default useAuth
