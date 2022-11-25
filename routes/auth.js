const router = require('express').Router(); 
const User = require('../models/User')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

//REGISTER

router.post('/register', async(req,res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        // password: req.body.password // password ke jagah crypo js likhenge aur uske 1st parameter me req.body.password dalenhe  
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString() // 2nd parameter me .env file me password likhenge aur usko yaha process.env se call krnge. toString kiye taki hascode string me change ho jaye
    })
    try{ //jb save kr rhe h to try block me daal rhe h taki koi error ho to error fek de
    let savedUser = await newUser.save() // .save kiye h taki wo DB me save ho jaye aur since save hone me time lgta h to await lagaye h
    res.status(201).json(savedUser) // 201-> added successfully
        // savedUser = savedUser.toObject()
        // res.send(savedUser)
    }
    catch (err){
        res.status(500).json(err)
        console.log(err);
    }

})

//LOGIN
//isme yeh DB se check krna h ki user hai ya nh

router.post('/login', async(req,res)=>{
    try{
        //find user in DB
        const user = await User.findOne({username:req.body.username})

        //check user 
        !user && res.status(401).json("Wrong credentials!")

        // Decrypting passowrd 
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET)
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

        //check password 
        originalPassword !==req.body.password && res.status(401).json("Wrong credentials!")

        //JWT TOKEN
        const accessToken = jwt.sign(
            {
                id:user._id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_SECRET,
            {expiresIn: "3d"}
        )

        //while sending response send everything except password
        // user ko password aur others me tod diye others me spread kiye taki usme baki sara kuch aa jaye except password
        const {password, ...others} = user._doc // ._doc kiye qki uske under ji id email wala content tha
        

        res.status(200).json({...others, accessToken})// yaha others dale taki password nh aaye response me
        //access Token bhi pass krna pregaaur usko object ke under pass krna hga tbhi kaam krega
    }catch(err){
        res.status(500).json(err)
    }

})

module.exports = router