aws --endpoint-url=http://localhost:4566 s3api create-bucket \
    --bucket get-movies-lambda-integration-bucket \
    --region us-east-1;

aws --endpoint-url=http://localhost:4566 s3api put-object \
  --bucket get-movies-lambda-integration-bucket \
  --key GetMoviesLambdaFunction \
  --region us-east-1 \
  --body ./lambda-functions/get-movies/index.zip;


aws --endpoint-url=http://localhost:4566 s3api create-bucket \
    --bucket rate-movie-lambda-integration-bucket \
    --region us-east-1;

aws --endpoint-url=http://localhost:4566 s3api put-object \
  --bucket rate-movie-lambda-integration-bucket \
  --key RateMovieLambdaFunction \
  --region us-east-1 \
  --body ./lambda-functions/rate-movie/index.zip;

aws --endpoint-url=http://localhost:4566 s3api create-bucket \
    --bucket get-best-movies-rated-lambda-integration-bucket \
    --region us-east-1;

aws --endpoint-url=http://localhost:4566 s3api put-object \
  --bucket get-best-movies-rated-lambda-integration-bucket \
  --key GetBestMoviesRatedLambdaFunction \
  --region us-east-1 \
  --body ./lambda-functions/get-best-rated-movies/index.zip;

  
aws --endpoint-url=http://localhost:4566 cloudformation create-stack \
  --region us-east-1 \
  --stack-name simple-movie-tips-stack \
  --template-body file://infra/simple-movies-tips-stack.yml \
  --capabilities CAPABILITY_NAMED_IAM;
