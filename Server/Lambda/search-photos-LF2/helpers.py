import json
import base64
import zlib

def create_json_query_obj(queryType, key, value):
    obj = {}
    obj["query"] = {queryType:{}}
    obj["query"][queryType] = {key:{}}
    #account for capitalisation or minor misspellings
    obj["query"][queryType][key] = {"query":value, "fuzziness": "AUTO"}
    
    print('obj', obj)
    
    return json.dumps(obj)
    
def encode_img(byte_obj):
    data = byte_obj.read()
    b64_data = base64.b64encode(data)
    b64_str = b64_data.decode('utf-8')
        
    return b64_str