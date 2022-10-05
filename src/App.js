import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SingelMovie from "./Pages/SingelMovie";
import Error from "./Pages/Error";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="movie/:id" element={<SingelMovie />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
