import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import styles from '../styles/Projects.module.scss';
import {filterFeaturedProjects} from '../lib/projects';
import Image from 'next/image'

export default function Projects(props) {

  let projects = []
  if(props.filtered){
    projects = filterFeaturedProjects(props.data.projects);
  } else {
    projects = props.data.projects;
  }

  if (!projects || projects.length < 1) {
    return (
      <div className={styles.container}>
        <h3>{props.title}</h3>
        <Grid item xs={12}>
          <Image
            src="/work-progress.png"
            alt='Work in progress'
            width="200px"
            height="200px"
          />
        </Grid>
      </div>
    )} else {
    return (
      <div className={styles.container}>
        <h3>{props.title}</h3>
        <Grid container spacing={3}>
          {projects.map(proj => {
            return (
              <Grid item xs={6} sm={3}>
                <a href={proj.url}>
                  <Paper>
                    <h3>{proj.title}</h3>
                    <p>{proj.description}</p>
                    <img className={styles.img} src={proj.image} alt={proj.title} />
                  </Paper>
                </a>
              </Grid>
            )
          })}
        </Grid>
      </div>
    )
  }
}
