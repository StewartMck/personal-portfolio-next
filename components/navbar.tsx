import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from 'next/link';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import styles from '../styles/Navbar.module.scss';

export default function NavBar() {

    const navLinks = [
        { title: 'About', path: '/about' },
        { title: 'Projects', path: '/projects' },
    ]

    const socialLinks = [
        { title: 'LinkedIn', path: 'www.linkedin.com/in/stewart-mckinlay', img: '/linkedin.png' },
        { title: 'GitHub', path: "https://github.com/StewartMck", img: '/github.png' },
        { title: 'Email', path: "mailto: stewart.mckinlay@gmail.com", img: '/email.png' },
    ]

    return (
        <div >
            <AppBar>
                <Toolbar>
                    <Link href='/'>
                        <IconButton>
                            <HomeIcon />
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

