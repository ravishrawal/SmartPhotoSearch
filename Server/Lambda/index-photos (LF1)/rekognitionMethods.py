import boto3

def detect_labels(photo, bucket, threshold = 80):
    '''takes in s3 photo & returns array of labels in photo above a confidence threshold'''
    
    client=boto3.client('rekognition')

    response = client.detect_labels(Image={'S3Object':{'Bucket':bucket,'Name':photo}},
        MaxLabels=10)

    outputLabels = []
    
    #create output object with all labels & parents
    for label in response['Labels']:
        if label['Confidence'] > threshold:
            outputLabels.append(label['Name'])
            #also concat all parents
            outputLabels+= [item['Name'] for item in label['Parents']]
    
    #remove duplicates
    outputLabels = list(set(outputLabels))
    
    return outputLabels
