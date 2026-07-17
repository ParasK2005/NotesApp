import {BrowserRouter,Routes,Route} from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import TrafficAlert from "./components/TrafficAlert";

function App(){
  return (
    <BrowserRouter>
    <TrafficAlert />
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
    </Routes>
    </BrowserRouter>
  )
}
export default App