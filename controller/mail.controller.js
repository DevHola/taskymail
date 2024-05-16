const Mail = require('../model/mail.model')
const sendmail = async (req, res, next) => {
    if(Object.keys(req.body).length == 0){
        res.status(400).status({
            message: 'Enter all fields'
        })
    }
    try {
        const mail = await Mail({
            from: req.user.data.USER_ID,
            to: req.body.to,
            subject: req.body.subject,
            content: req.body.content
        })
      await mail.save()
      res.status(200).json({
        message: 'mail sent'
      })  
        
    } catch (error) {
        next(error)
    }

}
const getauthusermail = async (req, res, next) => {
    try {
        const usermail = await Mail.find({to:req.user.data.USER_ID})
        res.status(200).json({
            mails: usermail
        })
    } catch (error) {
        next(error)
    }
}
const updateread = async (req, res, next) => {
    try {
        const mail = await Mail.findOneAndUpdate({_id:req.params.id},{isRead: req.body.status},{
            new: true
        })
        if(mail){
            res.status(200).json({
                message: 'status changed'
            })
        }
    } catch (error) {
        next(error)
    }
}
module.exports = {
    sendmail,
    getauthusermail,
    updateread
}