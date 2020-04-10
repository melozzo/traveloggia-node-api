const Member = require('./../Models/members');
const moment = require('moment');

exports.login= ( req, res, next)=>{
       
        let email = req.body.Email;
        let pwd = req.body.Password;

        Member.findOne({"Email":email,"Password":pwd})
        .then( member =>{
                if(! member)
                        throw new Error("member not found");
                res.status(200).json(member)
        })
        .catch(error=>{
                console.log(error)
        })
}

exports.create = ( req, res, next)=>{
        let email = req.body.Email;
        let pwd = req.body.Password;
        let createDate = moment().toDate().toLocalString();

        Member.findOne().sort({"MemberID":-1}).select("MemberID")
        .then(maxMemberId)



}