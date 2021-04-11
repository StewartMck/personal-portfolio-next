import NavBar from "./navbar";
import Footer from './footer';

type AppProps = {
  children: React.ReactNode;
}

export default function Layout ({children}: AppProps) {
  return (
    <div className="Layout">
      <NavBar />
      <div className="Content">{children}</div>
      <Footer />
    </div>
  );
};