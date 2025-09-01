import { useEffect, useState } from "react";
import { Header } from "@/widgets/Header";
import { Navbar } from "@/widgets/Navbar";
import { Outlet } from "react-router-dom";
import { I18nProvider } from "./providers/i18nProvider";
import { isTMA, init, viewport } from "@telegram-apps/sdk";
import { useScrollTop } from "@/shared/lib/useScroll";
import Cookies from "js-cookie";

function App() {
  const [isTgReady, setIsTgReady] = useState(false);

  async function initTg() {
    if (await isTMA()) {
      init();

      if (viewport.mount.isAvailable()) {
        await viewport.mount();
        viewport.expand();
      }

      if (viewport.requestFullscreen.isAvailable()) {
        await viewport.requestFullscreen();
      }

      setIsTgReady(true);
    }
  }

  useEffect(() => {
    const allCookies = Cookies.get();
    Object.keys(allCookies).forEach((key) => {
      if (key.startsWith("notify_")) {
        Cookies.remove(key);
      }
    });

    initTg();
  }, []);

  const mainRef = useScrollTop<HTMLDivElement>();

  return (
    <I18nProvider>
      <div
        className={`main-container ${isTgReady && "pt-[100px]"}`}
        ref={mainRef}
      >
        <Header />
        <main>
          <Outlet />
        </main>
        <Navbar />
      </div>
    </I18nProvider>
  );
}

export default App;
