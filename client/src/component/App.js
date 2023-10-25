import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./Search";
import CreateContact from "./createContact";
import ContactDetails from "./ContactDetails";
import { UserProvider } from "../context/UserContext";

function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Search />} />
            <Route 
            path="/getUsers/:id" 
            element={<ContactDetails/>} 
            />
            <Route path="/create" element={<CreateContact />} />
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;