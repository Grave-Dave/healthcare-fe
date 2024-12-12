import {Route, Routes} from "react-router-dom";
import Layout from "./layouts/Layout/Layout.tsx";

function App() {

  return (
    <Routes>
        <Route path="/" element={<Layout />}>
            {/*<Route index element={<Home />} />*/}
            {/*<Route path="about" element={<About />} />*/}
            {/*<Route path="contact" element={<Contact />} />*/}
        </Route>
    </Routes>
  )
}

export default App
