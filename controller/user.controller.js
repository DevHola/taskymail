const User = require('../model/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Register = async (req, res, next) => {
    if(Object.keys(req.body).length == 0){
        res.status(400).json({
            message: 'Enter all fields'
        })
    }
    const precheck = await User.findOne({email: req.body.email})
            if(precheck){
                res.status(200).json({
                    message: 'Account already exist'
                })
            }

        try {
            const hash = await bcrypt.hashSync(req.body.password,10)
            const user = await User({
                name: req.body.name,
                email: req.body.email,
                password: hash
            })
            await user.save()
            const data = {
                USER_ID: user._id
            }
            const token = await jwt.sign( {data}, process.env.SECRET, { expiresIn: 60 * 60 })
            // res.cookie('token',token, {
            //     withCredentials: true,
            //     httpOnly: false,
            // })
            res.status(200).json({
                message: 'Registration Successful',
                success: true
            })
        } catch (error) {
            next(error)
        }
}
const login = async (req, res, next) => {
    if(Object.keys(req.body).length == 0){
        res.status(400).json({
            message: 'Enter all fields'
        })
    }
        try {
            const user = await User.findOne({email: req.body.email})
            if(!user){
                res.status(200).json({
                    message:'user not found'
                })
            }
            const password = await bcrypt.compareSync(req.body.password, user.password)
            if(!password){
                res.status(401).json({
                    message: 'Incorrect Password'
                })
            }
            const data = {
                USER_ID: user._id
            }
            const token = await jwt.sign( {data}, process.env.SECRET, { expiresIn: '1hr' },)
            // res.cookie('token',token, {
            //     path: '/',
            //     withCredentials: true,
            //     httpOnly: false,
            //     secure: true,
            //     sameSite:'None'
            // })
            res.status(201).json({
                message: 'Authentication Success',
                success: true,
                token: token
            }) 
            next()     
        } catch (error) {
            next(error)
        }}
const getauthuser = async (req, res, next) => {
    try {
        const user = await User.findOne({_id:req.user.data.USER_ID}).select('-password').exec()
        if(user){
            res.status(200).json({
                user: user
            })
        }
    } catch (error) {
        next(error)
    }

}
const verifyAuthentication = async (req, res, next) => {
    try {
        const user = await User.findOne({_id:req.user.data.USER_ID}).select('-password').exec()
        if(user){
            res.status(200).json({
                status:true,
                user:user
            })
        }else{
            res.status(200).json({
                status:false
            })
        }
    } catch (error) {
        next(error)
    }
}
const getuser = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.params.id}).select('-password').exec()
        if(user){
            res.status(200).json({
                user:user,
                message: 'Success'
            })
        }else {
            res.status(200).json({
                message:'Failed'
            })
        }
    } catch (error) {
        next(error)
    }
}
const logout = async (req, res, next) => {
    try {
    
        res.clearCookie('token', { path: '/', domain: 'taskymail-frontend.onrender.com' });
        res.clearCookie('token', { path: '/', domain: 'localhost' });
        res.clearCookie('token', { path: '/', domain: "https://taskymail.onrender.com" });
        
        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    Register,
    login,
    getauthuser,
    getuser,
    verifyAuthentication,
    logout
}