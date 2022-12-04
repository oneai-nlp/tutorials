import oneai
import base64
oneai.api_key = "<YOUR API KEY>"

with open("AudioFile.mp3", "rb") as f:
    pipeline = oneai.Pipeline(
        steps = [
            oneai.skills.Transcribe(),
            oneai.skills.Proofread(),
            oneai.skills.SplitByTopic(),
            oneai.skills.Highlights(),
          ]
        )
    Output = pipeline.run(f)
    
#split the recording into chapters
chapters = [{"chapter_name":x.data['subheading'],"chapter_start":x.timestamp,
"chapter_end":x.timestamp_end,"highlight_count":0} 
for x in Output.transcription.proofread.segments]
 
#Find the chapter with the most highlights
for highlight in Output.transcription.proofread.highlights:
    for chapter in chapters:
        if highlight.timestamp >= chapter["chapter_start"]:
            chapter["highlight_count"] += 1
            
#Get the top 3 clips with most highlights
top_3 = sorted(chapters, key=lambda x: x['highlight_count'],reverse=True)[:2]
