import {db , Table  } from './db.config.js'
import { PutCommand , DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
// import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import AWS from 'aws-sdk'
import { hashSync } from 'bcrypt';

// import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
// import { DocumentClient } from 'dynamo';
const docClient = DynamoDBDocumentClient.from(db);
// import {uui } from 'uuid';
// const uid = uuidv4();
const create = async (data) =>{
    const params = new PutCommand({
        TableName: Table,
        Item: {
                id : data.id,
                name : data.name ,
                password : hashSync(data.password, 10) 
              }
              ,
              ConditionExpression: 'attribute_not_exists(id)'
    });

    const response = await docClient.send(params);

    // console.log(response);

}
const getUserById = async (id) => {
    // const params = 
    // const params = new PutCommand({
    //     TableName: Table,
    //     Item: {
    //             id : data.id,
    //             name : data.name ,
    //             password : hashSync(data.password, 10) 
    //           }
    //           ,
    //           ConditionExpression: 'attribute_not_exists(id)'
    // });
    // console.log( "params ==> ",params);
    // const command = 
    // console.log( "command ",command);
    try{
        const  response  = await docClient.send(new GetCommand(
            {
                TableName: Table,
                Key: {
                    id : id
                }
            }
           ) )
           return response;
    }
    catch(err){
        console.log(err);
    }
   
//    .then((res)=>{
//         console.log(  "res",res);
//         return res.Item.password;
//     }).catch(err=>{
//         console.log( "error =>" , err);
//         return undefined;
//     })
    // console.log( response);

}

export {create , getUserById};