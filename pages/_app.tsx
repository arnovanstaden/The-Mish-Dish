// Components
import PageTemplate from "../components/PageTemplate/PageTemplate";

// Styles, Fonts, Icons
import '../styles/global.scss';
import "typeface-poppins";
import "../assets/icons/style.css";



function MyApp({ Component, pageProps }) {

  return (
    <PageTemplate>
      <Component {...pageProps} />
    </PageTemplate>
  )
}

export default MyApp
