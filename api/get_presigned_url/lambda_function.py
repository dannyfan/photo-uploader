import json
import os
import boto3

client = boto3.client('s3', region_name="us-east-2")

def lambda_handler(event, context):
    bucket = os.environ['BUCKET']
    expiration = os.environ['URL_EXPIRATION_SECONDS']

    file_name = event['queryStringParameters']['name']
    file_type = event['queryStringParameters']['type']

    params = {
        'Bucket': bucket,
        'Key': file_name,
        'ContentType': file_type,
    }

    url = client.generate_presigned_url('put_object', params, expiration)

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Content-Type': file_type,
        },
        'body': json.dumps({
            'url': url
        }),
        "isBase64Encoded": False
    }