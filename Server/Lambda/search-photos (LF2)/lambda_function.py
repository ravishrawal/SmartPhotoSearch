import json
from helpers import *
from ESmethods import *

def lambda_handler(event, context):
    # TODO extract label from event
    print(event)
    label = "microwave"
    # getAllItemsES()
    print(searchES(label))
    
    
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }

