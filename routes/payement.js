//mpesa c2b and account balance transactions

var express = require('express');
var router = express.Router();
const Axios =require('axios')

router.get('/',(req, res)=> {

  res.send("Happy coding")
});
router.get("/access_token",access,(req,res)=>{
  res.status(200).json({access_token:req.access_token})
})


router.get("/register",access,(req,res)=>{

  let url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
  
 const auth = "Bearer" + req.access_token

  Axios.get(`${url}`,{
       headers: {
        Authorization: `Basic ${auth}`,
        "content-type": "application/json"
      }
       
  })
  .then(function (response) {
   
    console.log(response);
  })
  .catch(function (error) {

    console.log(error);
  })
 
})

router.post("/confirmation",(req,res)=>{
  let mpesa =req.body
  console.log(mpesa)
})
router.post("/validation",(req,res)=>{
  console.log('validation....')
  console.log(req.body)
})
//balance 
router.get("/balance",access,(req,res)=>{

  let endpoint='https://sandbox.safaricom.co.ke/mpesa/accountbalance/v1/query'
  let auth ="Bearer" + req.access_token
  Axios.get(`${endpoint}`,{

    method:"POST",
        headers : {
          Authorization: `Basic ${auth}`,
          "content-type": "application/json"
        },
        json:{
        "Initiator":"Demoapp",
      "SecurityCredential":"dMY1ao+p72o2rbCIHUxesFWPOI4p/DuG+Y8WKY4k371N97erCywE2gUXgt8bjope67O5ZKuj6AAWIkfWIqVv+H9HG23lszISElpBrcVaAVpeBiNK3J4SX8XANCq0NNLAbRZZnfyE8Gh+zpoF8xb7ge1eQkHbFpZBV7wYESJeCxutCZBddIFlp/lxHSXUwLLNv8zM1g8+FDXVp2PCUEKdAitlxrExF7VWhW5+2S3oEV6ac1TbqFRFQ1DdRT9HaW2GO5azO/YL20qK6ZFchAyvjsxz/y3ZeLyfs8rCE2sqwry5eKh5JfmO2gVFhq7Kw4PPR7FFOQ2+ZmvDWbv5Jzvqlg== ",
      "CommandID":"AccountBalance",
      "PartyA":"600113",
      "IdentifierType":"4",
      "Remarks":"Remarks",
      "QueueTimeOutURL":"https://197.248.86.122:801/timeout_url",
      "ResultURL":"https://197.248.86.122:801/result_url"
        }
  })
})
router.post("/timeout_url",(req,res)=>{
  console.log("...Balance Timeout Response...")
  console.log(req.body)
})
router.post("/result_url",(req,res)=>{
  console.log("...Balance Response...")
  console.log(req.body)
})




router.get("/simulate",access,(req,res)=>{
  let url="https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate"
  let auth ="Bearer" + req.access_token
  Axios.get(`${url}`,{
   method:"POST",
   headers : {
     "Authorization" : `${auth}`
   },
   json:{
     "Shortcode":"600113",
     "CommandID":"CustomerPayBillOnline",
     "Amount":"100",
     "Msisdn":" 254708374149",
     "BillRefNumber":"Demoapp"
 
 
   }
  })
  .then(function (response) {
    
   console.log(response);
 })
 .catch(function (error) {
  
   console.log(error);
 })
 
 
 })
 //B2c payments
 router.get('/b2c',access,(req,res)=>{
   let url="https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest"
   let auth="Bearer "+ req.access_token
   Axios.get(`${url}`,{
    method:"POST",
    headers : {
      "Authorization" : `${auth}`
    },
    json:{

      "InitiatorName":"DemoApp ",
      "SecurityCredential":"LXHSqDXdNPWpJQKY0IXIflS0oIaHns4sykJp/b59bz0HG98+olyzGST8qcva/fJ/Jv/9pCnp+ep7KkskITxJNQTH9RerbfGJpzP6GtAAlVsGCWpzpNY2yGHc6CaAeBTDcJ89+ImiRLG4SehQ1DlnuvP9vkY9Il0gIEhrAjmojv6ghm81W9RnUOf3A/Im09LFfnuo/iNvRZOxZlr3QsWNA5PHQb2jsvP7QpkKIAtP2RWJ0e3T4RoedkgbhoOONwWePXhoBtzeMQYWOAjAc9GrMI+JI6PcHeIJ6ygrlEJdn5Y0qE49IQgj+XhVmUNmfsW+xac0xUHImQLybv7ux1UFKg== ",
      "CommandID":"BusinessPayment ",
      "Amount":"2000 ",
      "PartyA":"600113",
      "PartyB":"254708374149 ",
      "Remarks":" ",
      "QueueTimeOutURL":"https://197.248.86.122:801/b2c_timeout_url",
      "ResultURL":"https://197.248.86.122:801/b2c_result_url",
      "occasion":"DEC2020"
    }
  })
  .then(function (response) {
    
    console.log(response);
  })
  .catch(function (error) {
  
    console.log(error);
  })
 })
 router.post("/b2c_timeout_url",(req,res)=>{
   console.log("Response timeout for b2c_url")
   console.log(req.body)
 })
 router.post("/b2c_result_url",(req,res)=>{
   console.log("...B2C... ")
   console.log(req.body)
 })

 //stk lipanampesa

router.get("/stk",access,(req,res)=>{
  let url="https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest"
  let auth="Bearer "+ req.access_token
  let date= new Date()
  const Timestamp= date.getFullYear() +"" + date.getMonth()+""+ date.getDate()+""+date.getHours() +""+ date.getMinutes()
  const Password= new Buffer.from("174379"+"	bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919"+ Timestamp).toString('base64')
  Axios.get(`${url}`,{
   method:"POST",
   headers : {
     "Authorization" : `${auth}`
   },
   json:{

    "BusinessShortCode": " ",
    "Password": Password,
    "Timestamp": Timestamp,
    "TransactionType": "CustomerPayBillOnline",
    "Amount": "100",
    "PartyA": "254791374149  ",
    "PartyB": "",
  "PhoneNumber": "254708374149  ",
    "CallBackUR": "https://197.248.86.122:801/stk_callback",
    "AccountReference": "345Demotest",
    "TransactionDesc": "activation "
   }

})
.then(function (response) {
    
  console.log(response);
})
.catch(function (error) {

  console.log(error);
})
router.post("/stk_callback",(req,res)=>{
  console.log("..STK...")
  console.log(req.body)
})
 


})




 function access(req,res,next){
  Key = "FxHU85k3WwHM999i7WehJdlcc9xpRjU8",
  Secret="cNC1wU7kfbjqM8Qr"
  const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
  const auth = Buffer.from(`${Key}:${Secret}`).toString("base64");
  
  Axios.get( `${url}`,{
       method:"POST",
        headers : {
          Authorization: `Basic ${auth}`,
          "content-type": "application/json"
        },
        json:{

          "Shortcode":"600113",
          "ResponseType": "Completed",
          "ConfirmationURL": "http://197.248.86.122:801/confirmation",
          "ValidationURL": "http://197.248.86.122:801/validation",
      
        }
  })
  .then(function (response) {
    
    console.log(response);
  })
  .catch(function (error) {
  
    console.log(error);
  })


}
 
 module.exports = router;
