import ReactGA from 'react-ga';
import { useEffect } from "react"

// Components
import PageTemplate from "../components/PageTemplate/PageTemplate";

// Styles, Fonts, Icons
import '../styles/global.scss';
import "typeface-poppins";
import "../assets/icons/style.css";


function MyApp({ Component, pageProps }) {
  ReactGA.initialize('G-H9ZZFL2TRP');
  // Google Analytics
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [])

  return (
    <PageTemplate>
      <Component {...pageProps} />
    </PageTemplate>
  )
}

export default MyApp
