const router = require('express').Router()
const userController = require("../controllers/user")

const userRoutes = (app) => {
    router.get("/all", userController.allUsers)
    router.get("/:id", userController.getUserById)
    router.post("/register", userController.register)
    router.get('/change/:cmd', userController.changeCmd)
    router.post("/login", userController.login)
    router.patch("/:id", userController.updateUser)
    router.get("/current/cmd", userController.getCmd)
    return app.use("/user", router)
}

module.exports = {
    userRoutes
}