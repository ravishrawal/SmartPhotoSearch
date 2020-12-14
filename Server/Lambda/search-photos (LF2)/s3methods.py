import boto3
import botocore.exceptions

def getS3(arr):
    '''input: array of (key, bucket)'''
    s3 = boto3.client('s3')
    results = []
    error_count = 0
    
    for key, bucket in arr:
        try: 
            response = s3.get_object(
                Bucket=bucket,
                Key=key
            )
            results.append(response)
            
        except botocore.exceptions.ClientError as error: 
            error_count+=1
            print(f"error on {key}: {error}")
    
    print(f"s3 upload: {error_count} failures")
    
    return results
    
    