import React from 'react';
import logo from './logo.svg';
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import store from "./Kanbas/store";
import { Provider } from "react-redux";
import Labs from "./Labs";
import Kanbas from "./Kanbas";
import Session from "./Kanbas/Account/Session";
import './App.css';

function App() {
    return (
        <div className="App">
            <HashRouter>
                <Provider store={store}>
                    <Session>
                    <div>
                        <Routes>
                            <Route path="/" element={<Navigate to="Labs" />} />
                            <Route path="/Labs/*" element={<Labs />} />
                            <Route path="/Kanbas/*" element={<Kanbas />} />
                        </Routes>
                    </div>
                    </Session>
                </Provider>
            </HashRouter>
        </div>
    );
}

export default App;
