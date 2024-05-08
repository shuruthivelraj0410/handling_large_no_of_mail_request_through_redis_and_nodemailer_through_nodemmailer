import {  GraphQLSchema } from "graphql"
import {query} from './query/index.js'
const schema = new GraphQLSchema({
    query : query
})


export {
    schema
}