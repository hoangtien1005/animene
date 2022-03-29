import styles from "./styles.module.scss"
import Grid from "@mui/material/Grid"
import GridContainer from "../ui/GridContainer"
const MediaDetailsPage = ({ data }) => {
  const media = data.data
  const subInfo = data.subInfo

  return (
    <>
      <div
        className={styles.banner}
        style={{ backgroundImage: `url(${media.bannerImage})` }}
      ></div>
      <div className={styles.space}></div>
      <GridContainer spacing={3}>
        <Grid item xs={12}>
          <div className={styles.coverImageContainer}>
            <div
              className={styles.coverImage}
              style={{ backgroundImage: `url(${media.coverImage.large})` }}
            ></div>
            <div className={styles.descContainer}>
              <h2 className={styles.mediaTitle}>
                {data.data.title.romaji ||
                  data.data.title.english ||
                  data.data.title.native}
              </h2>
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{
                  __html: data.data.description || "No Description"
                }}
              ></div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={2.4}>
          <GridContainer spacing={0}>
            <Grid item xs={12}>
              <div className={styles.subInfoContainer}>
                {subInfo.map((item) => (
                  <div className={styles.subInfoItem} key={item.type}>
                    <p className={styles.subInfoType}>{item.type}</p>
                    {Array.isArray(item.value) &&
                      item.value.map((valueItem) => (
                        <p className={styles.subInfoValue}>{valueItem}</p>
                      ))}
                    {!Array.isArray(item.value) && (
                      <p className={styles.subInfoValue}>{item.value}</p>
                    )}
                  </div>
                ))}
              </div>
              <div className={styles.tagsContainer}>
                <h4 className={styles.mainTitle}>Tags</h4>
                {data.data.tags.map((tag) => (
                  <div className={styles.tag}>
                    <span className={styles.tagName}>{tag.name}</span>
                    <span className={styles.tagRank}>{tag.rank}%</span>
                  </div>
                ))}
              </div>
              <div className={styles.tagsContainer}>
                <h4 className={styles.mainTitle}>External & Streaming Links</h4>
                {data.data.externalLinks.map((link) => (
                  <div className={styles.externalLinks}>
                    <a href={link.url} target="_blank" rel="noreferrer">
                      {link.site}
                    </a>
                  </div>
                ))}
              </div>
            </Grid>
          </GridContainer>
        </Grid>
        <Grid item xs={12} sm={9}></Grid>
      </GridContainer>
      {console.log(data)}
    </>
  )
}
export default MediaDetailsPage
