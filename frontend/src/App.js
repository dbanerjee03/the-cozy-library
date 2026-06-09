import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookDetails from "./pages/BookDetails";
 import {BrowserRouter,Route,Routes} from "react-router-dom";
 import Auth from "./pages/Auth";
 import { Toaster } from "react-hot-toast";
 import Top50 from "./pages/Top50";
 import Cart from "./pages/Cart";
 import Checkout from "./pages/Checkout";
 import Orders from "./pages/Orders";
 import ProtectedRoute from "./components/ProtectedRoute";
 import Landing from "./pages/Landing";
 import ReadEbook from "./pages/ReadEbook";

 import About from "./pages/About";

import Privacy from "./pages/Privacy";

import Terms from "./pages/Terms";

import Contact from "./pages/Contact";

import Ebooks from "./pages/Ebooks";

import EbookDetails from "./pages/EbookDetails";
 
function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route
  path="/"
  element={<Landing />}
/>

<Route
  path="/home"
  element={<Home />}
/>

        <Route
          path="/search/:query"
          element={<SearchResults />}
        />
        <Route
        path="/top50"
        element={<Top50 />}
      />

        <Route path="/book/:isbn" element={<BookDetails />} />

        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/auth" element={<Auth />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/orders" element={<Orders />} />

        <Route
        path="/checkout"
        element={<Checkout />}
        />

        <Route
  path="/about"
  element={<About />}
/>

<Route
  path="/ebook/read"
  element={<ReadEbook />}
/>

<Route
  path="/privacy"
  element={<Privacy />}
/>
<Route
  path="/ebook/:id"
  element={<EbookDetails />}
/>

<Route
  path="/terms"
  element={<Terms />}
/>

<Route
  path="/contact"
  element={<Contact />}
/>

<Route
  path="/ebooks"
  element={<Ebooks />}
/>

      </Routes>

      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      
      
    </BrowserRouter>
  );
}

export default App;