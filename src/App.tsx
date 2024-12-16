import {Route, Routes} from "react-router-dom";

import {ROUTES} from "./constants.ts";
import Layout from "./layouts/Layout/Layout.tsx";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Register from "./containers/Register";
import UserVisitOverview from "./containers/UserVisitOverview";

function App() {

    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path={ROUTES.LOGIN} element={<Login/>}/>
                <Route path={ROUTES.REGISTER} element={<Register/>}/>
                <Route path={ROUTES.MY_VISITS} element={<UserVisitOverview/>}/>
            </Route>
        </Routes>
    )
}

export default App
