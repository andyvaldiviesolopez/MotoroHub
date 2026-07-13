import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Garage from "./pages/Garage";
import AddMoto from "./pages/AddMoto";
import EditMoto from "./pages/EditMoto";
import MotoDetails from "./pages/MotoDetails";
import NotFound from "./pages/NotFound";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/garage" element={
                    <ProtectedRoute>
                        <Garage />
                    </ProtectedRoute>
                } />
                <Route path="/garage/add" element={
                    <ProtectedRoute>
                        <AddMoto />
                    </ProtectedRoute>
                } />
                <Route path="/garage/edit/:id" element={
                    <ProtectedRoute>
                        <EditMoto />
                    </ProtectedRoute>
                } />
                <Route path="/garage/:id" element={
                    <ProtectedRoute>
                        <MotoDetails />
                    </ProtectedRoute>
                } />
                <Route
                    path="/garage/edit/:id"
                    element={
                        <ProtectedRoute>
                            <EditMoto />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>

            <Footer />
        </>
    );
}

export default App;