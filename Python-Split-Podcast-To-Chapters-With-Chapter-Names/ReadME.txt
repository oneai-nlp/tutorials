import oneai
import base64
#oneai.api_key = "[YOUR ONEAI API KEY]"
with open("AudioFile.mp3", "rb") as f:
    pipeline = oneai.Pipeline(
        steps = [
            oneai.skills.Transcribe(speaker_detection=False),
            oneai.skills.Proofread(),
            oneai.skills.SplitByTopic(std_ratio=3.7),

          ]
        )
    Output = pipeline.run(f)
    
    chapters = [[x.data['subheading'],"Start time: " + str(x.timestamp.seconds) + " seconds","End time: " + str(x.timestamp_end.seconds) + " seconds"] for x in Output.transcription.proofread.segments]
