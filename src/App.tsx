import {Route, Routes} from "react-router-dom";
import Layout from "./layouts/Layout/Layout.tsx";
import Home from "./containers/Home";
import Login from "./containers/Login";

function App() {

  return (
    <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            {/*<Route path="contact" element={<Contact />} />*/}
        </Route>
    </Routes>
  )
}

export default App
