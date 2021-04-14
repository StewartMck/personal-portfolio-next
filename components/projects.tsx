import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Image from 'next/image'

import { filterFeaturedProjects } from '../lib/projects';
import styles from '../styles/Projects.module.scss';

interface Props{
  title: string;
  filtered: boolean
  data: Project[];
}

type Project = {
  id: number
  title: string;
  description: string;
  image: string;
  url: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default function Projects({title, filtered, data}: Props) {

  let projects = []
  if (filtered) {
    projects = filterFeaturedProjects(data);
  } else {
    projects = data;
  }

  if (!projects || projects.length < 1) {
    return (
      <div className={styles.container}>
        <h3>{title}</h3>
        <Grid item xs={12}>
          <Image
            src="/work-progress.png"
            alt='Work in progress'
            width="200px"
            height="200px"
          />
        </Grid>
      </div>
    )
  } else {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>{title}</h3>
        <Grid container spacing={3}>
          {projects.map((proj, i) => {
            return (
              <Grid key={i} item xs={6} sm={3}>
                <a href={proj.url}>
                  <Paper className={styles.card}>
                    <h4>{proj.title}</h4>
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
