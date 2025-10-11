
import { useEffect, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

function Login() {


    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const { user, login } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        if (user) {
           setTimeout(()=>  navigate("/"),500)
        }
    }, [user])

    function changeHandler(e) {
        
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    async function handleLogin(e) {
        e.preventDefault()
          await login(credentials) // call the context login function with form data (wait for the login to complete)
          
            
    }

    return (
        <>
            <h1 className="text-green-400 text-5xl font-bold text-center mt-10">Login Form</h1>
            <form onSubmit={handleLogin} className="w-[500px] bg-gray-300 rounded-2xl flex justify-center flex-col items-center m-auto mt-20 py-10 gap-12">
                <div className="flex gap-20 w-4/5 justify-start items-center">
                    <div>
                        <label htmlFor="email" className="text-xl font-bold">Email</label>
                    </div>
                    <div>
                        <input type="email" id="email" name="email" placeholder="write your Email..." required
                            className="outline-1 rounded-md text-xl flex-1" value={credentials.email} onChange={changeHandler} />
                    </div>
                </div>
                <div className="flex gap-10 w-4/5 justify-start items-center">
                    <div>
                        <label htmlFor="password" className="text-xl font-bold" >Password</label>
                    </div>
                    <div>
                        <input type="password" id="password" name="password" placeholder="write your Password..." required
                            className="outline-1 rounded-md text-xl flex-1" value={credentials.password} onChange={changeHandler} />
                    </div>
                </div>


                <div>
                    <button type="submit" className="py-2 px-20 bg-emerald-600 text-white text-2xl rounded-2xl" >Login</button>
                </div>

            </form>
        </>
    )
}
export default Login
