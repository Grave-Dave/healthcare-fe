import {Route, Routes} from "react-router-dom";

import {ROUTES} from "./constants.ts";
import Layout from "./layouts/Layout/Layout.tsx";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Register from "./containers/Register";
import UserVisitOverview from "./containers/UserVisitOverview";
import VisitManager from "./containers/VisitManager";
import AdminPanel from "./containers/AdminPanel";
import ProtectedRoute from "./reusableComponents/ProtectedRoute";

function App() {

    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path={ROUTES.LOGIN} element={<Login/>}/>
                <Route path={ROUTES.REGISTER} element={<Register/>}/>
                <Route
                    path="*"
                    element={
                        <ProtectedRoute>
                            <Routes>
                                <Route path={ROUTES.MY_VISITS} element={<UserVisitOverview/>}/>
                                <Route path={ROUTES.MAKE_VISIT} element={<VisitManager/>}/>
                                <Route path={ROUTES.CALENDAR} element={<VisitManager/>}/>
                                <Route path={ROUTES.VISITS} element={<UserVisitOverview/>}/>
                                <Route path={ROUTES.ADMIN} element={<AdminPanel/>}/>
                            </Routes>
                        </ProtectedRoute>
                    }
                />
            </Route>
        </Routes>
    )
}

export default App
