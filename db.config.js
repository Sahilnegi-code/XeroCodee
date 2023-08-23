import AWS from 'aws-sdk'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const db = new DynamoDBClient({
    region: "eu-north-1",
    credentials:{
        // AWS_ACCESS_KEY_ID
        accessKeyId: 'AKIA4EOC6M4CF7JK7GL7',
        secretAccessKey: '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'
        }
})
// AWS_ACCESS_KEY_ID =  'AKIA4EOC6M4CF7JK7GL7'
// AWS_SECRET_ACCESS_KEY =  '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'
const marshallOptions = {
    // Whether to automatically convert empty strings, blobs, and sets to `null`.
    convertEmptyValues: false, // false, by default.
    // Whether to remove undefined values while marshalling.
    removeUndefinedValues: false, // false, by default.
    // Whether to convert typeof object to map attribute.
    convertClassInstanceToMap: false, // false, by default.
  };
  
  const unmarshallOptions = {
    // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
    wrapNumbers: false, // false, by default.
  };
  
  const translateConfig = { marshallOptions, unmarshallOptions };
  
//   const ddbDocClient = DynamoDBDocument.from(db ,  translateConfig);
 const Table = 'users';
 export {db , Table};