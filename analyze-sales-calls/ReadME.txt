import oneai
import base64
from collections import defaultdict
oneai.api_key = "[YOUR ONEAI API KEY]"

def analyse_call(path):
    with open(path, "rb") as f:
        pipeline = oneai.Pipeline(
          steps = [
              oneai.skills.Transcribe(),
              oneai.skills.Topics(),
              oneai.skills.Sentiments(),
              oneai.skills.Emotions(),
              oneai.skills.SplitByTopic(),
              oneai.skills.Summarize(),
          ]
        )
        output = pipeline.run(f)
    return output
    
path_list = ['SalesCall{}.mp3'.format(x) for x in range(1,3)]

results = defaultdict()
for path in path_list:
    output = analyse_call(path)
    results[path]['transcriptions'] = output.transcription.text
    results[path]['topics']= [x.value for x in output.transcription.topics]
    results[path]['sentiments'] = [[x.value,x.span_text,[x.timestamp.seconds,x.timestamp_end.seconds]] for x in output.transcription.sentiments]
    results[path]['emotions'] = [[x.name,x.span_text,[x.timestamp.seconds,x.timestamp_end.seconds]] for x in output.transcription.emotions]
    results[path]['chapters'] = [[x.span_text,x.data["subheading"],[x.timestamp.seconds,x.timestamp_end.seconds]] for x in output.transcription.segments]
    results[path]['summary'] = output.transcription.summary.text
