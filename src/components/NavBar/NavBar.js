import IconButton from "@mui/material/IconButton"
import AutoStoriesIcon from "@mui/icons-material/AutoStories"
import AccountBoxIcon from "@mui/icons-material/AccountBox"
import PersonIcon from "@mui/icons-material/Person"
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded"
import MenuItem from "@mui/material/MenuItem"
import clsx from "clsx"
import { Link } from "react-router-dom"
import { PATHS } from "../../utils/constants"

import styles from "./styles.module.scss"

const Component = ({ isMobile }) => {
  const items = [
    { Icon: PlayArrowRoundedIcon, label: "Anime", linkTo: PATHS.ANIME.SEARCH },
    { Icon: AutoStoriesIcon, label: "Manga", linkTo: PATHS.MANGA.SEARCH },
    { Icon: AccountBoxIcon, label: "Staff", linkTo: PATHS.STAFF.SEARCH },
    { Icon: PersonIcon, label: "Characters", linkTo: PATHS.CHARACTER.SEARCH }
  ]
  if (isMobile) {
    return (
      <>
        {items.map((item) => (
          <MenuItem>
            <Link to={item.linkTo} className={styles.link}>
              <IconButton size="large" aria-label={item.label} color="inherit">
                <item.Icon />
              </IconButton>
            </Link>
            <Link to={item.linkTo} className={styles.link}>
              <p>{item.label}</p>
            </Link>
          </MenuItem>
        ))}
      </>
    )
  }

  return (
    <>
      {items.map((item) => (
        <Link to={item.linkTo} className={clsx(styles.item, styles.link)}>
          <IconButton size="large" aria-label={item.label} color="inherit">
            <item.Icon />
            <p className={styles.label}>{item.label}</p>
          </IconButton>
        </Link>
      ))}
    </>
  )
}
export default Component
