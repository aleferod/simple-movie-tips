const AWS = require('aws-sdk');

const localstack_host = 'http://aws-localstack:4566'

const dynamodb = new AWS.DynamoDB.DocumentClient({ endpoint: localstack_host });

async function getBestMoviesRated() {
  try {
    let params = { TableName: 'rated-movie-table' };
    let data = await dynamodb.scan(params).promise();
    data.Items.sort((a, b) => b.grade_evaluated - a.grade_evaluated);
    return data
  } catch (err) {
    return err;
  }
}

exports.handler = async event => {
  try {
    const data = await getBestMoviesRated();
    return {
      statusCode: 200,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: error.message,
    };
  }
};
