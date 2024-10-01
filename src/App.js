import "./App.css";
import AppHeader from "./components/AppHeader";
import PageContent from "./components/PageContent";
import Footer from "./components/Footer";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppHeader />
        <PageContent />
        <Footer />
      </BrowserRouter>
    </div>
  );
}
