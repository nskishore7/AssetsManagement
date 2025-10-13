export default function checkRole(roles) {
    return (req,res,next)=>{
        try {
    const { user } = req;

    const isAuthorized = roles.includes(user.role)

    if (isAuthorized) {
      next()
    } else {
      return res.status(401).send({ message: "Access denied: super admin or admin only" })
    }

  } catch (error) {
    return res.status(500).send({ message: "Internal server error",error:error.message})
  }

    }
  
}
