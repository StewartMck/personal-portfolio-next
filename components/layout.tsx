 
// components/Layout.js
import Head from "next/head";
import NavBar from "./navbar";
import Footer from './footer';

const Layout = props => {
  const appTitle = `Stewart McKinlay`;

  return (
    <div className="Layout">
      <Head>
        <title>Stewart McKinlay</title>
      </Head>
      <NavBar/>    
      <div className="Content">{props.children}</div>
      <Footer/>
    </div>
  );
};

export default Layout;