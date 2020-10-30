import json
import os
import uuid

def lambda_handler(event, context):
    api_key = os.environ['API_KEY']

    return {
        'statusCode': 200,
        'body': {
            'key' : api_key,
        },
    }
