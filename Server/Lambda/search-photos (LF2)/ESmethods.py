from elasticsearch import Elasticsearch, RequestsHttpConnection
from helpers import *
import boto3
from requests import *
import json
import sys
sys.path.insert(1, '/opt')
from requests_aws4auth import AWS4Auth


class MyES():
    def __init__(self):
        self.host = "search-photos-raxeemcbzh2cvhzjevl2p6oaka.us-east-1.es.amazonaws.com"
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
        
def getAllItemsES():
    json_body_obj = json.dumps({
            "query": {
                "match_all": {}
            }
        })
    es = MyES()
    es_connect = es.connect()
    
    res = es_connect.search(index="photos", body=json_body_obj)
    
    for hit in res['hits']['hits']:
        print('result :', hit)
        print('-----\n------')
        
    return len(res)
    
        
def searchES(label):
    #start ES instance
    es = MyES()
    es_connect = es.connect()
    
    # create json obj for match query
    json_body_obj = create_json_query_obj(queryType="match", key="labels", value=label)
    
    #search DB
    res = es_connect.search(index="photos", body=json_body_obj)
    
    # print("Got %d Hits:" % res['hits']['total']['value'])
    
    matchingPhotosArray = []
    
    #loop results
    for hit in res['hits']['hits']:
        # print('result :', hit)
        photo_name = hit["_source"]["objectKey"]
        bucket_name = hit["_source"]["bucket"]
        matchingPhotosArray.append((photo_name, bucket_name))
    
    return matchingPhotosArray

