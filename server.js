import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { applyMiddleware } from 'graphql-middleware';
import { expressPlayground } from 'graphql-playground-middleware';
import {schema} from './schema/index.js'
import { createBullBoard } from 'bull-board';
import {createRequire} from 'module';
const require = createRequire(import.meta.url)
const { BullAdapter } = require('bull-board/bullAdapter');
import { emailQueue } from './connection/redisQueue.js';
const app = express();
const SchemaMiddleware = applyMiddleware(schema)
const {router} = createBullBoard([new BullAdapter(emailQueue)])
app.use('/queue',router)
app.use('/graphql',(req,res)=>{
    graphqlHTTP({
        schema : SchemaMiddleware,
        rootValue : global,
        graphiql : true
    })(req,res)
})
app.get('/playground',expressPlayground({
    endpoint :'/graphql'
}))
app.listen(4000,()=>{
    console.log('listening to port 4000')
})