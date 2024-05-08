import { GraphQLObjectType } from "graphql"
import { sendMail } from "./sendMail/sendMail.js"
const query = new GraphQLObjectType({
name :"Query",
fields:{
    sendMail
}
})

export{
    query
}