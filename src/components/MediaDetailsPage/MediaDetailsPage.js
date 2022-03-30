import styles from "./styles.module.scss"
import Grid from "@mui/material/Grid"
import GridContainer from "../ui/GridContainer"
import DefaultCard from "../cards/DefaultCard"
import CardHorizontal from "./CardHorizontal"
import BannerPlaceholder from "../../assets/img/banner_placeholder.jpg"
import useMediaQuery from "@mui/material/useMediaQuery"
const MediaDetailsPage = ({ data }) => {
  const media = data.data
  const subInfo = data.subInfo
  const isMedium = useMediaQuery("(min-width: 900px)")

  return (
    <>
      <div
        className={styles.banner}
        style={{
          backgroundImage: `url(${media.bannerImage || BannerPlaceholder})`
        }}
      ></div>
      <div className={styles.space}></div>
      <GridContainer spacing={3}>
        <Grid item xs={12}>
          <div className={styles.mainTitleContainer}>
            <div
              className={styles.coverImage}
              style={{ backgroundImage: `url(${media.coverImage.large})` }}
            ></div>
            <div className={styles.subContainer}>
              <div>
                <h2 className={styles.mediaTitle}>
                  {media.title.romaji ||
                    media.title.english ||
                    media.title.native}
                </h2>
              </div>
              <div className={styles.descContainer}>
                <div
                  className={styles.description}
                  dangerouslySetInnerHTML={{
                    __html: media.description || "No Description"
                  }}
                ></div>
              </div>
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
                    {isMedium &&
                      Array.isArray(item.value) &&
                      item.value.map((valueItem) => (
                        <p className={styles.subInfoValue} key={valueItem}>
                          {valueItem}
                        </p>
                      ))}
                    {!isMedium && Array.isArray(item.value) && (
                      <p className={styles.subInfoValue}>
                        {item.value.join(",  ")}
                      </p>
                    )}

                    {!Array.isArray(item.value) && (
                      <p className={styles.subInfoValue}>{item.value}</p>
                    )}
                  </div>
                ))}
              </div>
              {isMedium && (
                <div className={styles.tagsContainer}>
                  <h4
                    style={{ marginBottom: "10px" }}
                    className={styles.sectionTitle}
                  >
                    Tags
                  </h4>
                  {media.tags.map((tag) => (
                    <div className={styles.tag} key={tag.name}>
                      <span className={styles.tagName}>{tag.name}</span>
                      <span className={styles.tagRank}>{tag.rank}%</span>
                    </div>
                  ))}
                </div>
              )}
              {isMedium && (
                <div className={styles.tagsContainer}>
                  <h4
                    style={{ marginBottom: "10px" }}
                    className={styles.sectionTitle}
                  >
                    External & Streaming Links
                  </h4>
                  {media.externalLinks.map((link) => (
                    <div className={styles.externalLinks} key={`${link.url}`}>
                      <a href={link.url} target="_blank" rel="noreferrer">
                        {link.site}
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </Grid>
          </GridContainer>
        </Grid>
        <Grid item xs={12} md={9.6}>
          <GridContainer>
            {data.relations.length > 0 && (
              <>
                <Grid className={styles.section} item xs={12}>
                  <h5 className={styles.sectionTitle}>Relations</h5>
                </Grid>
                {data.relations.map((relation) => (
                  <Grid item xs={4} sm={2.4} md={3} lg={2.4} key={relation.id}>
                    <DefaultCard noDialog data={relation} />
                  </Grid>
                ))}
              </>
            )}
            <Grid className={styles.section} item xs={12}>
              <h5 className={styles.sectionTitle}>Characters</h5>
            </Grid>
            {data.characters.slice(0, 6).map((character) => (
              <Grid item xs={12} md={6} key={character.id}>
                <CardHorizontal data={character} />
              </Grid>
            ))}
            <Grid className={styles.section} item xs={12}>
              <h5 className={styles.sectionTitle}>Staff</h5>
            </Grid>
            {data.staff.slice(0, 6).map((staffItem) => (
              <Grid
                item
                xs={12}
                md={6}
                key={`${staffItem.id} ${staffItem.role}`}
              >
                <CardHorizontal data={staffItem} />
              </Grid>
            ))}
            {data.recommendations.length > 0 && (
              <>
                <Grid className={styles.section} item xs={12}>
                  <h5 className={styles.sectionTitle}>Recommendations</h5>
                </Grid>
                {data.recommendations.slice(0, 5).map((recommendation) => (
                  <Grid
                    item
                    xs={4}
                    sm={2.4}
                    md={3}
                    lg={2.4}
                    key={recommendation.id}
                  >
                    <DefaultCard noDialog data={recommendation} />
                  </Grid>
                ))}
              </>
            )}
            {media.trailer && (
              <>
                <Grid className={styles.section} item xs={12}>
                  <h5 className={styles.sectionTitle}>Trailer</h5>
                </Grid>
                <Grid item xs={12}>
                  <iframe
                    className={styles.trailer}
                    title={media.trailer.id}
                    src={`https://www.youtube.com/embed/${media.trailer.id}`}
                    frameBorder="0"
                    allowFullScreen
                  />
                </Grid>
              </>
            )}
          </GridContainer>
        </Grid>
      </GridContainer>
    </>
  )
}
export default MediaDetailsPage
