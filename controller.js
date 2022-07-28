const whois = require('whois');
const { getDomain } = require('tldjs');
const fs = require("fs");
exports.getlookup  = async(req,res,next)=>{

        const {searchUrl} = req.body;
        console.log(req.protocol);
        const lookupUrl = getDomain(searchUrl);
        const data = whois.lookup(lookupUrl, function(err, data) {
                const text = data;
                console.log(data);
                const urll ="http" ;
                const registrar= text.split('\n')[7].split('Registrar:')[1];
                const expiration_date= text.split('\n')[6].split('Registrar Registration Expiration Date:')[1]
                const creation_date = text.split('\n')[5].split('Creation Date:')[1];
                const updated_date = text.split('\n')[4].split('Updated Date:')[1];
                const domain = text.split('\n')[0].split('Domain Name:')[1];
                const reg_country =text.split('\n')[24].split('Registrant Country:')[1];
                let object =  {
                "url":"",
                "domain": domain,
                "updated_date": updated_date,
                "creation_date": creation_date,
                "expiration_date": expiration_date,
                "registrar": registrar,
                "reg_country":reg_country
                 }
                 let jsonData = JSON.stringify(object);
                 fs.writeFileSync("jsondata.json",jsonData);

        });
        const file = fs.readFileSync("jsondata.json");
        const filedata = JSON.parse(file);
        filedata.url = req.protocol+"://"+filedata.domain;
        res.send(filedata);

}
exports.home = async(req,res,next)=>{
    res.render("home");
}