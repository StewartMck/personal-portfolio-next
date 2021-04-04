import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import {useState} from 'react';

import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import Scroll from '../components/scroll';

import styles from '../styles/Navbar.module.scss';

const useStyles = makeStyles(() => ({
    navbarTransparent: {
        backgroundColor: "transparent",
    },
    navbarSolid: {
        backgroundColor: "#58534f"
    }
  }));

  
  export default function NavBar() {
      const classes = useStyles();
      
      const [colorChange, setColorChange] = useState(false);
      const changeNavBarColor = () => {
          if (window.scrollY <= 50) {
              setColorChange(true)
            } else {
                setColorChange(false)
            }
        }
      
    
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
            <Scroll
            onScroll={changeNavBarColor}
            />
            <AppBar
            className={colorChange ? classes.navbarTransparent : classes.navbarSolid}
            >
                <Toolbar>
                    <Link href='/'>
                        <IconButton>
                            <HomeIcon
                            className={styles.homeIcon}
                            // className={classes.root}
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

