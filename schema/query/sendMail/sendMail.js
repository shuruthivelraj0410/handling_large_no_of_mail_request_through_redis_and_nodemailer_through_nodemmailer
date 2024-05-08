
import { GraphQLNonNull, GraphQLString } from 'graphql'
import {sendMailResolver} from './sendMailResolver.js'
import {sendMailResponse} from './sendMailResponse.js'
const sendMail = {
    type : sendMailResponse,
    args:{
    from :{
        type :new GraphQLNonNull(GraphQLString)
    },
    to :{
        type : new GraphQLNonNull(GraphQLString)
    },
    subject :{
        type : new GraphQLNonNull(GraphQLString)
    },
    text :{
        type : new GraphQLNonNull(GraphQLString)
    }
    },
    resolve:sendMailResolver
}



export {
    sendMail
}