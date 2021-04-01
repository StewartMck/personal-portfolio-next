import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import styles from '../styles/Projects.module.scss';

export default function Projects(props) {

  const projects = props.data.projects;

  const data = [{
    title: "Beanli",
    description: "Beanli is a Single Page Full-Stack Application that rewards customers with 'beans' for ordering at local coffee shops and allows store owners to manage incoming orders.",
    image: "https://github.com/StewartMck/beanli/raw/master/docs/Ordering.gif",
    url: "https://github.com/StewartMck/beanli",
  },
  {
    title: "Beanli",
    description: "Beanli is a Single Page Full-Stack Application that rewards customers with 'beans' for ordering at local coffee shops and allows store owners to manage incoming orders.",
    image: "https://github.com/StewartMck/beanli/raw/master/docs/Ordering.gif",
    url: "https://github.com/StewartMck/beanli",
  },
  {
    title: "Beanli",
    description: "Beanli is a Single Page Full-Stack Application that rewards customers with 'beans' for ordering at local coffee shops and allows store owners to manage incoming orders.",
    image: "https://github.com/StewartMck/beanli/raw/master/docs/Ordering.gif",
    url: "https://github.com/StewartMck/beanli",
  },
  {
    title: "Beanli",
    description: "Beanli is a Single Page Full-Stack Application that rewards customers with 'beans' for ordering at local coffee shops and allows store owners to manage incoming orders.",
    image: "https://github.com/StewartMck/beanli/raw/master/docs/Ordering.gif",
    url: "https://github.com/StewartMck/beanli",
  },
  ]

  if (!projects || projects.length < 1) {
    return (
      <div className={styles.container}>
        <h3>Featured Projects</h3>
        <Grid item xs={12}>
          <Paper>Projects Pending...</Paper>
        </Grid>
      </div>
    )} else {
    return (
      <div className={styles.container}>
        <h3>Featured Projects</h3>
        <Grid container spacing={3}>
          {props.data.projects.map(proj => {
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
