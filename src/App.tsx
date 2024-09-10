import NextTest from "@/pages/NextTest";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/nexttest" element={<NextTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
