import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from 'next/link';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';

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
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Link href='/'>
                        <IconButton>
                            <HomeIcon />
                        </IconButton>
                    </Link>
                    <div>
                        {navLinks.map(link=>{
                            return (
                                <Link href={link.path}>
                                    <a>{link.title}</a>
                                </Link>
                            )
                        })}
                    </div>
                    <div>
                        {socialLinks.map(link=>{
                            return (
                                <a href={link.path}>
                                    <img src={link.img} alt={link.title} />
                                </a>
                            )
                        })}
                    </div>

                </Toolbar>
            </AppBar>
        </div>
    )
}

