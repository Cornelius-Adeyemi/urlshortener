const express = require("express");
const router = express.Router();
const Url = require("./schema").Url;


const dns = require("dns");



router.post("/", async function(req,res){
    const url = req.body.longUrl;
    const pattern = /^(https:\/\/)/;
   
    let newUrl; 
    if(pattern.test(url)){
        // to remove the https://
        newUrl = url.replace(pattern,""); 
      }
    else{
      res.json({error:"Invalid URL"});
      return
    }

    let myUrl = (newUrl)? newUrl : url;
    // look if the url is a valid one
   dns.lookup(myUrl, async(err, address, family)=>{
       if(err){ 
        res.json({ error:"Invalid URL"});
        return;
       };

       
     // find if url exist in the database
    let document= await Url.findOne({longUrl: "https://" + myUrl});

    if(document){
      res.json({original_url: document.longUrl,
          short_url: document.shortUrl}); 
          return;  
    }
   // the short cut url
    let id;
   let lengthOfCollection = await Url.find({});

       if(lengthOfCollection===0) id= 1 ;
       else id = lengthOfCollection.length + 1 ;

     // save our url in the database
    let toBeSave = new Url({shortUrl:id, longUrl: "https://" + myUrl});
    toBeSave.save(function(err, data){
      if(err) return;
      res.json({original_url: data.longUrl,
       short_url: data.shortUrl});
    });

   })

   
    
   
})




router.get("/:number?", function(req,res){
    let {number} = req.params;
    if(number===undefined){
        res.send("Not Found");
        return;
    }
    if(parseInt(number)===0){
        res.json({error: "wrong format"});
        return;
    }
    Url.findOne({shortUrl: parseInt(number)}, function(err, data){
        if(err) return console.log(err);
        if(!data){
            res.json({error:"No short URL found for the given input"});
            return;
        }
       res.redirect(data.longUrl);
    })
   
  
  })




module.exports = router;
