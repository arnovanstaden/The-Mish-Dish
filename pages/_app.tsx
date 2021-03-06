import { installPrompt, registerServiceWorker, requestNotificationPermission } from "../utils/pwa";
import { useEffect } from "react";
// Components
import PageTemplate from "../components/PageTemplate/PageTemplate";

// Styles, Fonts, Icons
import '../styles/global.scss';
import "typeface-poppins";
import "../assets/icons/style.css";



function MyApp({ Component, pageProps }) {
  useEffect(() => {
    installPrompt();
    registerServiceWorker();
    requestNotificationPermission()
  }, [])

  return (
    <PageTemplate>
      <Component {...pageProps} />
    </PageTemplate>
  )
}

export default MyApp
