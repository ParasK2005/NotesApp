import { useState } from "react"
import { registeruser } from "../services/authservice"
import { useNavigate } from "react-router-dom"
import "../styles/register.css"


function Register(){
    const [name,setName] = useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword] = useState("")
    const [error, setError] = useState("");
    const navigate = useNavigate()

    const handlesubmit = async (e) =>{
        e.preventDefault()
        try{
            const response = await registeruser({
                name,
                email,
                password
            })
            console.log("success",response.data)
            navigate("/")
        }catch (error) {
  setError(
    error.response?.data?.message || "Registration failed"
  );
}
    }
   return (
  <div className="register-container">
    <div >
        <button className="Login-button" onClick={()=>navigate("/")}>Login</button>
      </div>
    <div className="register-box">
      
      <h1>Register</h1>

      <form onSubmit={handlesubmit}>
        <input
          type="text"
          placeholder="enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p>{error}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
  </div>
)

   
}
export default Register