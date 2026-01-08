import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddItem from "./pages/AddItem";
import "./index.css";
import AllOufits from "./pages/AllOutfits";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/all-outfits" element={<AllOufits />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
