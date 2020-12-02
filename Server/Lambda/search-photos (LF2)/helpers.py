import json

def create_json_query_obj(queryType, key, value):
    obj = {}
    obj["query"] = {queryType:{}}
    obj["query"][queryType] = {key:{}}
    #account for capitalisation or minor misspellings
    obj["query"][queryType][key] = {"query":value, "fuzziness": "AUTO"}
    
    print('obj', obj)
    
    return json.dumps(obj)
