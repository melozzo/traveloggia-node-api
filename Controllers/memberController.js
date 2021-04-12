const Member = require('../Models/member');
const moment = require('moment');

exports.login= ( req, res, next)=>{      

      let email = req.body.Email;
      let pwd = req.body.Password;
      console.log('api method login entered', email, pwd)
      if( ! email || ! pwd)
            throw new Error("email and or password undefined")
      Member.findOne({"Email":email,"Password":pwd})
      .then( member =>{
            if(! member)
                  throw new Error("member not found");
                  console.log(member)
            res.status(200).json(member)
            })
      .catch(error=>{
            res.status(500).json(JSON.stringify(error))
      })
}

exports.create = ( req, res, next)=>{
        let email = req.body.Email;
        let pwd = req.body.Password;
        let createDate = moment().format();

        Member.findOne({"Email":email})
        .then(result=>{
                if(result){
                        throw new Error({message:"email already registered"})
                } else {
                        Member.findOne().sort({"MemberID":-1}).select("MemberID")
                        .then(maxMemberId=>{
                                let nextMemberId = maxMemberId.MemberID + 1;
                                let member = new Member( {MemberID:nextMemberId, Email:email, Password:pwd, AccountCreateDate:createDate});
                                member.save()
                                .then( saved =>{
                                        res.status(201).json(member)
                                })
                                .catch(error=>{
                                    res.status(500).json(JSON.stringify(error))
                                })
                        })
                }
        })

}