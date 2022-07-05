const AWS = require('aws-sdk');

const localstack_host = 'http://aws-localstack:4566'

const dynamodb = new AWS.DynamoDB.DocumentClient({ endpoint: localstack_host });


async function createItem(params){
  try {
    await dynamodb.put(params).promise();
  } catch (err) {
    return err;
  }
}


exports.handler = async (event, context, callback) => {
  try {
    event.Records.forEach(async record => {
      var message = JSON.parse(record.body);


      const params = {
        TableName : 'rated-movie-table',
        Item: {
           id: message.id,
           tittle: message.tittle,
           grade_evaluated:  message.grade_evaluated
        }
      }
      console.log(params)
      await createItem(params)
     
    })

    return { body: 'Successfully created item!' }
  } catch (err) {
    return { error: err }
  }



};