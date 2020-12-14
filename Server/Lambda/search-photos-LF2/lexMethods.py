import boto3
import botocore.exceptions

lex = boto3.client('lex-runtime')
# boto3.set_stream_logger('')
print('stream logger set')

def sendToLex(msg_in, user_id):
    client = boto3.client('lex-runtime')
    print('got client')
    #send input to lex
    try: lex_response = client.post_text(
            botName = 'SearchBot',
            botAlias = 'dev',
            userId = user_id,
            inputText = msg_in,
        )
    except botocore.exceptions.ClientError as error:
        print('ERROR', error)
        raise error
    
    return lex_response
    
    
def parse_lex_event(event):
    search_terms = event["slots"]["Photos"]
    if len(search_terms)>0: # check if slot if filled
        labels = search_terms.split(" ")
        print(f"labels are {labels}")
    
    return labels