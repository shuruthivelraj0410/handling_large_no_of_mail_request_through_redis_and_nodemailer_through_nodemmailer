import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql"



const sendMailResponse = new GraphQLObjectType({
    name :"sendMailResponse",
    fields:{
        message :{
            type : GraphQLString
        },
        statusCode :{
            type : GraphQLInt
        }
    }
})

export {
    sendMailResponse
}