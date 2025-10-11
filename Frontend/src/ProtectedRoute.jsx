import { Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext"
import { useEffect } from "react"

function ProtectedRoute(props) {
    //verify the auth
    const { user, loading } = useAuth()
    const navigate = useNavigate()
    

    if(loading) return <h1>Loading.....................</h1>

    if(!user) return <Navigate to={'/login'} replace/>
    return (
        <>
            {props.children}
        </>
    )
}
export default ProtectedRoute