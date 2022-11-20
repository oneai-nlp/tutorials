import oneai

oneai.api_key = "< Your API key from oneai>" 

url = "https://techcrunch.com/2022/11/17/twitter-is-working-on-a-feature-to-divide-long-text-into-a-thread-automatically/"

pipeline = oneai.Pipeline(
  steps = [
		    oneai.skills.HtmlToArticle(),
        oneai.skills.SplitByTopic(),
  ]
  
)

output = pipeline.run(url)

tweets = []
for segment in output.html_article.segments.output_spans:
    output_ = oneai.Pipeline(steps =[oneai.skills.Topics(),oneai.skills.Summarize(max_length=240)]).run(segment[0].text)
    tweet = output_.summary.text + " ".join(["#" + topic for topic in output_.topics.values])
    tweets.append(tweet)
