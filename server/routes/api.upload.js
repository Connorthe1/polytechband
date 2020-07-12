const {Router} = require("express")
const router = Router()
const multer  = require('multer')
const Album = require("../models/Album")
const User = require("../models/User")
const {check, validationResult} = require("express-validator")

const storage = multer.diskStorage({
    destination(req, file, cb) {
        if (req.files['logo']){
            cb(null, './uploads/logo/')
        }else {
            cb(null, './uploads/sounds/')
        }
    },
    filename(req, file, cb) {
        cb(null, Date.now() +"-"+ file.originalname)
    }
})

const fileFilter = (req, file, cb) => {

    if (req.files['logo']){
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true)
        } else {
            cb(null, false)
        }
    }else {
        if (file.mimetype === 'audio/mpeg') {
            cb(null, true)
        } else {
            cb(null, false)
        }
    }

}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 50
    },
    fileFilter: fileFilter
})


router.post("/upload",
        upload.fields([{name: 'logo', maxCount: 1}, {name: 'songs', maxCount: 1}]),
        [
        check('name', 'Введите название альбома').isLength({max: 40, min: 3}),
        ],
    async (req, res) => {
        try {

            // console.log(req.files)

            if(!req.user){
                return res.status(401).json({message: "Не авторизован"})
            }

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некорректное заполнение формы"
                })
            }

            const {name, desc, tags} = req.body

            const newAlbum = await Album.findOne({ name })
            if (newAlbum){
                return res.status(400).json({message : "Такой альбом уже добавлен"})
            }

            // let getSongs = []
            // let i = 0
            //
            // while(i >= req.files["songs"].length){
            //     getSongs.push(req.files["songs"][i].path)
            //     i++
            // }

            const album = new Album({
                host: req.user.userId,
                data: new Date().toISOString(),
                name,
                desc,
                logo: "http://localhost:5000/" + req.files["logo"][0].path,
                songs: "http://localhost:5000/" + req.files["songs"][0].path,
                tags,
                status : false
            })


            await album.save()

            res.status(201).json({message: "Альбом добавлен"})

        } catch (e) {
            console.log(e)
            res.status(500).json({message: "Что-то пошло не так"})
        }
    })

router.get(
    "/albums",
    async (req, res) => {

        Album.find({status: false}, (err, album) => {
            if (err) return console.log(err)
            return res.status(200).json({
                message: "album grabbed",
                album: album
            })
        })
    })

router.get(
    "/albums/one",
    async (req, res) => {
        let idAlbum = req.headers.idalbum

        Album.findOne({_id: idAlbum}, (err, album) => {
            if (err) return console.log(err)
            return res.status(200).json({
                message: "album grabbed",
                album: album
            })
        })
    }
)


module.exports = router

