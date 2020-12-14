import json
from rekognitionMethods import *
from helpers import *
from ESmethods import *
# LOOK AT ME
def lambda_handler(event, context):
    
    #extract photo information
    photo_name = event['Records'][0]['s3']['object']['key']
    bucket_name = event['Records'][0]['s3']['bucket']['name']
    
    #obtain labels for photo from Rekognition above 80% confidence
    label_array = detect_labels(photo_name, bucket_name, 80)
    
    #store photo pointer & labels in elasticsearch
    ES_item = create_json_obj(photo_name, bucket_name, label_array)
    
    addToES(ES_item)
    
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
