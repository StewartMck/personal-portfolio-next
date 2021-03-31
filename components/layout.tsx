 
// components/Layout.js
import Head from "next/head";
import NavBar from "./navbar";

const Layout = props => {
    console.log(props)
  const appTitle = `Stewart McKinlay`;

  return (
    <div className="Layout">
      <Head>
        <title>Stewart McKinlay</title>
      </Head>
      <NavBar/>
      <br/>     
      <div className="Content">{props.children}</div>
    </div>
  );
};

export default Layout;