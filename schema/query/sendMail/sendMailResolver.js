import {processEmail} from '../../../connection/emailQueue/emailQueue.js'

const sendMailResolver = async(parent,args,context,info)=>{
    try{
let res ={};
  res = await processEmail(args)
    return res
}catch(e){
    console.log("Error from send mail resolver function",e)
}
}



export{
    sendMailResolver
}