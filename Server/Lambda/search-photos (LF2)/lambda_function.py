import json
from helpers import *
from ESmethods import *
from lexMethods import *
from s3methods import *

def lambda_handler(event, context):
    # Extract label from event
    search_term = event['queryStringParameters']['q']
    # Get IP address for unique user ID
    userId = event['requestContext']['identity']['sourceIp']

    # getAllItemsES()
    photos_response = []
    
    #send to Lex & get labels
    lex_response = sendToLex(search_term, userId)
    labels = parse_lex_event(lex_response)
    
    #get photo pointers from ElasticSearch
    for label in labels:
        photos_response.extend(searchES(label))
    print(f"photos_response = {photos_response}")
    
    #get array of photos from S3
    s3_response = getS3(photos_response)
    
    #loop each photo
    response_arr=[]
    for s3_img in s3_response:
        img_bytestream = s3_img["Body"]
        #compress & encode
        img = encode_img(img_bytestream)
        #format for response
        response_obj = {'image': img }
        response_arr.append(response_obj)
    
    return {
        'statusCode': 200,
        'headers': {   
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(response_arr)
    }

