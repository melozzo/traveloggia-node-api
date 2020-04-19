const Journal = require('./../Models/journal');
const moment = require('moment');


exports.createJournal = (req, res, next ) => {
      const siteId = req.body.SiteID;
      const text = req.body.Text;
      const title = req.body.Title;
      const keyWords = req.body.KeyWords;
      const isDeleted = req.body.IsDeleted;
      const memberId = req.body.MemberID;
      const journalDate = req.body.JournalDate;

      Journal.findOne().sort({"JournalID": -1}).select("JournalID")
      .then( result=>{
            journalId = result.JournalID + 1;
            let journal = new Journal({
                  JournalID:journalId, 
                  SiteID:siteId,
                  Text:text,
                  Title:title,
                  JournalDate:journalDate,
                  KeyWords:keyWords,
                  IsDeleted:isDeleted,
                  DateAdded:moment().format()});
            journal.save()
            .then( () => {
                  res.status(201).json(journal);
          })
          .catch( error=>{
                console.log(error)
                  res.status(500).json(JSON.stringify(error))
          })
        })
        .catch( error=>{
              console.log(error)
            res.status(500).json(JSON.stringify(error))
    })
};

exports.getList = ( req, res, next ) => {
        const siteId = req.params.siteId;
        Journal.find({SiteID:parseInt(siteId)})
        .then( result => {
                res.status(200).json(result );
        })
        .catch( error => {
            res.status(500).json(JSON.stringify(error))
        })

}

exports.getJournal = (req, res, next)=>{
        const journalId = req.params.journalId;
        //Map.findById(mapId)//only works with object id's mongoose converts string to object id 
        Journal.findOne({JournalID:parseInt(journalId)})
        .then( data => {
                res.status(200).json(data );
        })
        .catch( error => {
            res.status(500).json(JSON.stringify(error))
        })
}

exports.updateJournal = ( req, res, next) =>{
        const journalId = req.params.journalId;
        const siteId = req.body.SiteID;
        const text = req.body.Text;
        const title = req.body.Title;
        const keyWords = req.body.KeyWords;
        const journalDate = req.body.JournalDate;
        const isDeleted = req.body.IsDeleted;
       Journal.findOne({JournalID:journalId})
        .then( result =>{
            result.SiteID = siteId;
            result.Text = text;
            result.Title = title;
            result.JournalDate = journalDate;
            result.KeyWords = keyWords;
            result.isDeleted = isDeleted;
            result.save();
        })
        .then( result =>{
                res.status(200).json(result);
        })
        .catch( error =>{
            res.status(500).json(JSON.stringify(error))
        })
       
}

exports.deleteJournal = ( req,res, next) =>{
      const journalId = req.params.journalId;
     Journal.findOne({JournalID:journalId})
      .then( result =>{
          result.isDeleted = true;
          result.save()
          .then( deleted =>{
                  res.status(200).json(deleted);
            })
            .catch( error =>{
                  res.status(500).json(JSON.stringify(error))
            })
      })
      .catch( error =>{
          res.status(500).json(JSON.stringify(error))
      })
}
