import json
import boto3
import os

def lambda_handler(event, context):
    
    table_name = os.environ['TABLE_NAME']
    bucket = os.environ['BUCKET']
    expiration = os.environ['EXPIRATION']
    id = event['queryStringParameters']['id']
    
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(table_name)
    response = table.get_item(Key={'PhotoId': id})

    if response.get('Item'):
        name = response['Item']['PhotoName']
        client = boto3.client('s3', region_name="us-east-2")
        params = {
            'Bucket': bucket,
            'Key': id + '/' + name
        }
        url = client.generate_presigned_url('get_object',
            Params=params,
            ExpiresIn=expiration,
            HttpMethod='GET'
        )

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Content-Type': 'image/png',
            },
            'body': json.dumps({
                'url': url
            })
        }
    else:
        print('Not found')
        return {
            'statusCode' : 400,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
            },
            'body': json.dumps('Image not found!')
        }
