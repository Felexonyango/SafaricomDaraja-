var dotenv =require('dotenv');
dotenv.config()

 var config ={}; 


 config.Key=""+process.env.Key,
 config.Secret=""+process.env.Secret

    
 
    
 module.exports=config;