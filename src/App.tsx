import React from 'react';
import logo from './logo.svg';
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import Labs from "./Labs";
import Kanbas from "./Kanbas";
import './App.css';

function App() {
    return (
        <div className="App">
            <HashRouter>
                <div>
                    <Routes>
                        <Route path="/" element={<Navigate to="Labs" />} />
                        <Route path="/Labs/*" element={<Labs />} />
                        <Route path="/Kanbas/*" element={<Kanbas />} />
                    </Routes>
                </div>
            </HashRouter>
        </div>
    );
}

export default App;
