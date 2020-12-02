import json
from datetime import datetime

def create_json_obj(photo_name, bucket_name, label_array):
    obj = {}
    obj["objectKey"] = photo_name
    obj["bucket"] = bucket_name
    obj["labels"] = label_array
    obj["createdTimestamp"] = datetime.now().isoformat(timespec='seconds')
    
    return json.dumps(obj)
