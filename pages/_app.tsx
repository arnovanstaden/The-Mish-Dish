import PageTemplate from "../components/PageTemplate/PageTemplate";

import ReactGA from 'react-ga';

// Styles, Fonts, Icons
import '../styles/global.scss';
import "typeface-poppins";
import "../assets/icons/style.css";


function MyApp({ Component, pageProps }) {

  // Google Analytics
  ReactGA.initialize('G-H9ZZFL2TRP');
  ReactGA.pageview(window.location.pathname + window.location.search);

  return (
    <PageTemplate>
      <Component {...pageProps} />
    </PageTemplate>
  )
}

export default MyApp
