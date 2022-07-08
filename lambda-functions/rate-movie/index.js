const AWS = require('aws-sdk');

const localstack_host = 'http://aws-localstack:4566'

const dynamodb = new AWS.DynamoDB.DocumentClient({ endpoint: localstack_host });

const RATED_MOVIE_TABLE = 'rated-movie-table'

async function createItem(params){
  try {
    await dynamodb.put(params).promise();
  } catch (err) {
    console.error(err)
    return err;
  }
}

async function getItems() {
  try {
    const params = {
      TableName: RATED_MOVIE_TABLE
     };
   
     return await dynamodb.scan(params).promise();
  }catch(err) {
    console.error(err)
    return err
  }
}


exports.handler = async (event, context, callback) => {
  try {
   
    var id = 0
    var items = []
    var itemGradeEvaluated = 0

    event.Records.forEach(async record => {
      var message = JSON.parse(record.body);
         id = message.id
    })

    await getItems().then(data => {
      console.log(JSON.stringify(data) )
      items = data.Items
    }).catch(error => {
    console.error(error)
   })

   items.forEach(item => {
    if(item.id == id){
      itemGradeEvaluated = item.grade_evaluated
    }
   })


    event.Records.forEach(async record => {
      var message = JSON.parse(record.body);
      const params = {
        TableName : RATED_MOVIE_TABLE,
        Item: {
           id: message.id,
           title: message.title,
           overview: message.overview,
           release_date: message.release_date,
           poster_path: message.poster_path,
           grade_evaluated: (+itemGradeEvaluated) + (+message.grade_evaluated)
        }
      }
      await createItem(params)
     
    })

    return { body: 'Successfully created item!' }
  } catch (err) {
    console.error(err)
    return { error: err }
  }



};