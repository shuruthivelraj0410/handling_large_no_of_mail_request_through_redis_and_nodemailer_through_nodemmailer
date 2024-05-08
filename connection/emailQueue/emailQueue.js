import { emailQueue } from "../redisQueue.js";
import { transport } from "./mailTransport.js";
const processEmail =  (args)=>{
    return new Promise(async (resolve,reject)=>{
        const response = await emailQueue.add(args)
        if(response.data != {} && response.data != undefined){
             emailQueue.process(async(job,done)=>{
                try{
                // console.log(job.data)
                let info = await transport.sendMail(job.data)
                console.log(info)
                done()
                resolve({
                    message :"Mail sent Successfully",
                    statusCode : 200
                })
                } catch(e){
                    console.log(e)
                    reject({
                        message :"Error in sending mail",
                        statusCode : 400
                    })
                }
            })
        }
    })
}

export {
    processEmail
}