import "./App.css";
import { SiteHeader } from "./components/site-header";
import GiftForm from "./pages/gift-forms";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SiteHeader/>

      <GiftForm />
    </ThemeProvider>
  );
}

export default App;
