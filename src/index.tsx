import React from "react";
import ReactDOM from "react-dom/client";
import "./css/style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Profil from "./Pages/Profil";
import { Provider } from "react-redux";
import { store } from "./utils/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./utils/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
