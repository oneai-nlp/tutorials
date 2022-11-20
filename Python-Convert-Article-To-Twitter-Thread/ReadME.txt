import oneai

oneai.api_key = "< Your API key >"

url = "https://techcrunch.com/2022/11/18/elon-musk-talked-about-laying-off-75-of-employees-he-may-have-just-gotten-his-wish/"

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
