import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import { Navigate } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/home";
import Navbar from "./components/Home/navbar";
import Aboutus from "./components/About/about";
import MiniHome from "./components/mini/mini-home";
import Largehome from "./components/large/large-home";
import Cake from "./components/cake-section/cake";
import Deceration from "./components/Deceration/Deceration";
import Userinputs from "./components/userinputs/userinputs";
import Paymentstep from "./components/payment/payment";
import AdminAuth from "./components/Admin/AdminAuth";
import Login from "./components/User/UserLogin";
import Signup from "./components/User/UserSignup";
import Blog from "./components/Admin/Blogs/Blogs";
// import Whatsapp from "./components/whatsapp/Whatsapp";
import Gallery from "./components/Gallery/gallery";
import Refund from "./components/Refundpolicy/refund";
import Contact from "./components/contactus/contact";
import Userinputslarge from "./components/userinputsl-large/userinputslarge";
import profile from "./assets/images/WhatsApp.jpeg";
import Whatsappbeingin from "./components/whatsapp/Whatsapp";

function App() {
  return (
    <>
      <BrowserRouter>
        <FloatingWhatsApp
          phoneNumber="9963715817"
          accountName="Binge-in"
          avatar={profile}
        />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/navbar" element={<Navbar />}></Route>
          <Route path="/aboutus" element={<Aboutus />}></Route>
          <Route path="/minihome" element={<MiniHome />}></Route>
          <Route path="/largehome" element={<Largehome />}></Route>
          <Route path="/cakemain" element={<Cake />}></Route>
          <Route path="/decoration" element={<Deceration />}></Route>
          <Route path="/userinputs" element={<Userinputs />}></Route>
          <Route path="/userinputslarge" element={<Userinputslarge />}></Route>
          <Route path="/payment" element={<Paymentstep />}></Route>
          <Route path="/admin" element={<AdminAuth />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/blogs" element={<Blog />}></Route>
          <Route path="/whatsapp" element={<Whatsappbeingin />}></Route>
          <Route path="/gallery" element={<Gallery />}></Route>
          <Route path="/refund" element={<Refund />}></Route>
          <Route path="/contactus" element={<Contact />}></Route>
          {/* Wildcard route for unknown routes */}
          <Route
            path="/*"
            element={
              <Routes>
                {/* Allow /adminlogin route */}
                <Route path="/admin" element={<AdminAuth />} />
                {/* Redirect any other unknown route to the root */}
                <Route path="/*" element={<Navigate to="/" />} />
              </Routes>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
