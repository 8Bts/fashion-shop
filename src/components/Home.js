import { Link } from "react-router-dom";
import home from '../styles/home.module.css';
import logo from '../assets/logo.png';

const Home = () => (
  <div>
    <nav>
      <div className={home.navbar}>
        <div>
          <span className={home.logo}>
            <img className="w-100" src={logo} alt="logo"></img>
          </span>
        </div>
        <div className={home.navright}>
          <Link className={home.navlink}>SIGN IN</Link>
          <Link className={home.navlink}>CREATE ACCOUNT</Link>
        </div>
      </div>
    </nav>
    <header>
      <div className={home.header}>
        <h1>Find your favourite clothing in no time</h1>
        <p>Get the list of the finest clothes and fashion stuff without time loss.</p>
        <Link className={home.start}>START FREE</Link>
      </div>
    </header>
  </div>
);

export default Home;