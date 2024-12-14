import {StrictMode} from 'react'
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import {createRoot} from 'react-dom/client'
import store from './store/store.ts';
import './public/styles/styles.css'
import App from './App.tsx'
import {ThunkAction} from "redux-thunk";
import {Action} from "redux";

export const dispatch = store.dispatch;

//global types for store
export type AppDispatch = typeof dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <Router>
                <App/>
            </Router>
        </Provider>
    </StrictMode>
)
