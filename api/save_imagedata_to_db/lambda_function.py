import json
import boto3
import os

from datetime import datetime

def lambda_handler(event, context):
    name = os.environ['TABLE_NAME']
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(name)
    image_data = event['Records'][0]['s3']['object']['key'].split('/')
    table.put_item(
       Item={
            'PhotoId' : image_data[0],
            'PhotoName': image_data[1],
            'Date': str(datetime.now())
        }
    )
    
    return {
        'statusCode': 200,
    }
