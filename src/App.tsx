import {Route, Routes} from "react-router-dom";
import './locales/i18n.ts';

import {ROUTES} from "./constants.ts";
import Layout from "./layouts/Layout/Layout.tsx";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Register from "./containers/Register";
import UserVisitOverview from "./containers/UserVisitOverview";
import VisitManager from "./containers/VisitManager";
import AdminPanel from "./containers/AdminPanel";
import ProtectedRoute from "./reusableComponents/ProtectedRoutes";
import UserAccount from "./containers/UserAccount";
import {ProtectedRouteEnum} from "./reusableComponents/ProtectedRoutes/constants.ts";
import AdminVisitOverview from "./containers/AdminVisitOverview";
import PasswordResetLink from "./containers/PasswordReset/components/PasswordResetLink";
import ChangePassword from "./containers/PasswordReset/components/ChangePassword";
import AboutMe from "./containers/AboutMe";
import Contact from "./containers/Contact";

function App() {

    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path={ROUTES.ABOUT_ME} element={<AboutMe/>}/>
                <Route path={ROUTES.CONTACT} element={<Contact/>}/>
                <Route
                    path={ROUTES.LOGIN}
                    element={
                        <ProtectedRoute routeType={ProtectedRouteEnum.GuestRoute}>
                            <Login/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path={ROUTES.REGISTER}
                    element={
                        <ProtectedRoute routeType={ProtectedRouteEnum.GuestRoute}>
                            <Register/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path={ROUTES.PASSWORD_LINK}
                    element={
                        <ProtectedRoute routeType={ProtectedRouteEnum.GuestRoute}>
                            <PasswordResetLink/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path={ROUTES.PASSWORD_RESET}
                    element={
                        <ProtectedRoute routeType={ProtectedRouteEnum.GuestRoute}>
                            <ChangePassword/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path={ROUTES.ADMIN}
                    element={
                        <ProtectedRoute routeType={ProtectedRouteEnum.AdminRoute}>
                            <AdminPanel/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path={ROUTES.VISITS}
                    element={
                        <ProtectedRoute routeType={ProtectedRouteEnum.AdminRoute}>
                            <AdminVisitOverview/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="*"
                    element={
                        <ProtectedRoute routeType={ProtectedRouteEnum.AuthRoute}>
                            <Routes>
                                <Route path={ROUTES.MY_VISITS} element={<UserVisitOverview/>}/>
                                <Route path={ROUTES.MAKE_VISIT} element={<VisitManager/>}/>
                                <Route path={ROUTES.CALENDAR} element={<VisitManager/>}/>
                                <Route path={ROUTES.USER} element={<UserAccount/>}/>
                            </Routes>
                        </ProtectedRoute>
                    }
                />
            </Route>
        </Routes>
    )
}

export default App
