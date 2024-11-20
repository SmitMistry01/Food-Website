import "./App.css";
import { Header } from "./components/Header";
import { Body } from "./components/Body";
import { AboutUs } from "./components/AboutUs";
import { Cart } from "./components/Cart";
import { Footer } from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import { ResMenu } from "./components/ResMenu";
import { lazy ,Suspense } from "react";
const Grocery = lazy(() => import("./components/Grocery"))

//Lazy loading helps u to divide the bundle .For large scale applications we beed many bundles(JS files) which helps for optimization alos chunking the data
//check in network tab we have different JS file for grocery 
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
          <Route path="/about" element={<AboutUs />} />
          <Route path="/" element={<Body />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/restaurant/:resId" element={<ResMenu />} />
          <Route path="/grocery" element={<Suspense fallback = {<h1>Loading...</h1>}><Grocery /></Suspense>} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
