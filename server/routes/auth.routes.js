const {Router} = require("express")
const router = Router()
const bcrypt = require("bcryptjs")
const User = require("../models/User")
const {check, validationResult} = require("express-validator")
const jwt = require("jsonwebtoken")
const config = require("config")

//register
router.post(
    "/register",
    [
        check('login', 'Максимальная длина логина 20 символов').isLength({max : 30, min: 3}),
        check('password', "Минимальная длина пароля 6 символов").isLength({min : 6})
    ],
    async (req, res) => {
    try{
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array(),
                message: "Некорректные данные при регистрации"
            })
        }

        const {login, password} = req.body
        const candidate = await User.findOne({ login })
        if (candidate){
            return res.status(400).json({message : "Такой пользователь уже существует"})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({ login, password: hashedPassword})

        await user.save()

        res.status(201).json({message:"Пользователь создан"})
        
    }catch (e) {
        console.log(e)
        res.status(500).json({message : "Что-то пошло не так"})
    }
})

//login
router.post(
    "/login",
    [
        check('login', 'Введите ваш логин').isLength({max : 20}),
        check('password', "Введите пароль").isLength({min : 6}).exists()
    ],
    async (req, res) => {
    try{
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array(),
                message: "Некорренктные данные при входе"
            })
        }

        const {login,password} = req.body
        const user = await User.findOne({ login })

        if(!user){
            return res.status(400).json({message:"Неправильный логин или пароль"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch){
            return res.status(400).json({message: "Неправильный логин или пароль"})
        }

        let token = jwt.sign(
            { userId : user.id },
            config.get("jwtSecret"),
            // {expiresIn: "1h"}
        )

        res.json({ token, userId: user.id })



    }catch (e) {
        res.status(500).json({message : "Что-то пошло не так"})
    }
})

router.get(
    "/user",
    async (req, res) => {
        let token = req.headers.token;
        // console.log(token)
        jwt.verify( token, config.get("jwtSecret"), (err, decoded) =>{
            if (err)
                return res.status(401).json({ message: "unathorized" })

            // console.log(decoded)
            User.findOne({ _id: decoded.userId}, (err, user) => {
                if (err) return console.log(err)
                return res.status(200).json({
                    message: "user grabbed",
                    user:{
                        login: user.login
                    }
                })
            })
        })
    }
)



module.exports = router
