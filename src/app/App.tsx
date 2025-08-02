import { Header } from "@/widgets/Header";
import { Navbar } from "@/widgets/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="main-container">
      <Header />
      <main>
        <Outlet />
      </main>
      <Navbar />
    </div>
  );
}

export default App;
