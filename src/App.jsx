import "./App.css";
import { Header } from "./components/Header";
import { Body } from "./components/Body";
import { AboutUs } from "./components/AboutUs";
import { Cart } from "./components/Cart";
import { Footer } from "./components/Footer";
import { Routes, Route } from "react-router-dom";

function App() {
  // useEffect(() => {
  //   console.log("app renders then after this function is called");
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (pos) => {
  //         console.log(pos.coords.latitude);
  //         console.log(pos.coords.longitude);
  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //     );
  //   }
  // }, []);

  return (
    <>
      <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<Body />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <Footer />
      </div>
    </>
  );
}

export default App;
