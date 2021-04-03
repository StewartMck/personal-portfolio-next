import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import VpnKeyIcon from '@material-ui/icons/VpnKey';


import styles from '../styles/Navbar.module.scss';
import { transparent } from 'material-ui/styles/colors';
const useStyles = makeStyles(() => ({
    root: {
      color: "white",
      fontSize: "30px"
    },
    navbar: {
        backgroundColor: "transparent",
    }
  }));

export default function NavBar() {
    const classes = useStyles();


    
    const navLinks = [
        { title: 'About', path: '/about' },
        { title: 'Projects', path: '/projects' },
        {title: 'Resume', path: 'https://resume.creddle.io/resume/ixegloh48mh'}
    ]

    const socialLinks = [
        { title: 'LinkedIn', path: 'https://linkedin.com/in/stewart-mckinlay', img: '/linkedin.png' },
        { title: 'GitHub', path: "https://github.com/StewartMck", img: '/github.png' },
        { title: 'Email', path: "mailto: stewart.mckinlay@gmail.com", img: '/email.png' },
    ]

    return (
        <div >
            <AppBar
            className={classes.navbar}
            >
                <Toolbar>
                    <Link href='/'>
                        <IconButton>
                            <HomeIcon
                            className={classes.root}
                            />
                        </IconButton>
                    </Link>
                    <div className={styles.navlinks}>
                        {navLinks.map(link => {
                            return (
                                <Link href={link.path}>
                                    <a>{link.title}</a>
                                </Link>
                            )
                        })}
                    </div>
                    <div className={styles.social}>
                        {socialLinks.map(link => {
                            return (
                                <a href={link.path}>
                                    <img className={styles.socialimages} src={link.img} alt={link.title} />
                                </a>
                            )
                        })}
                    </div>
                    <Link href='/admin'>
                        <IconButton>
                            <VpnKeyIcon />
                        </IconButton>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    )
}

