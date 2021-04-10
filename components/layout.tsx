import NavBar from "./navbar";
import Footer from './footer';

const Layout = props => {

  return (
    <div className="Layout">
      <NavBar/>    
      <div className="Content">{props.children}</div>
      <Footer/>
    </div>
  );
};

export default Layout;