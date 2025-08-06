import { Header } from "@/widgets/Header";
import { Navbar } from "@/widgets/Navbar";
import { Outlet } from "react-router-dom";
import { I18nProvider } from "./providers/i18nProvider";

function App() {
  return (
    <I18nProvider>
      <div className="main-container">
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
