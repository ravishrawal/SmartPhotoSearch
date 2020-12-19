from elasticsearch import Elasticsearch, RequestsHttpConnection
import boto3
from requests import *
import json
import sys
sys.path.insert(1, '/opt')
from requests_aws4auth import AWS4Auth


class MyES():
    def __init__(self):
        self.host = "search-search-photos-g7nnykm7uwwvtnkbzv5coxsxua.us-east-1.es.amazonaws.com"
        self.region = 'us-east-1' # e.g. us-west-1
        self.service = 'es'
        self.credentials = boto3.Session().get_credentials()
        self.awsauth = AWS4Auth(self.credentials.access_key, self.credentials.secret_key,
                                self.region, self.service, session_token=self.credentials.token)
    
    def connect(self):
        self.es = Elasticsearch(
            hosts=[{'host': self.host, 'port': 443}],
            http_auth = self.awsauth,
            use_ssl = True,
            verify_certs=True,
            connection_class = RequestsHttpConnection
            )

        return self.es
        
def addToES(json_obj):
    #start ES instance
    es = MyES()
    es_connect = es.connect()
    
    obj = json.loads(json_obj)
    obj_id = obj["objectKey"]+obj["createdTimestamp"]
    print('obj_id', obj_id)
    
    res = es_connect.index(index="photos", id=obj_id, body=json_obj)
    
    print('ES upload:', res)
    return len(res)
