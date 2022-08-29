import streamlit as st
import requests

st.title('Text Summarization')
text = st.text_area('Text to Summarize')
st.button('Summarize')

authorization = 'place your api key here'
end_point = "https://api.oneai.com/api/v0/pipeline"

headers = {
  "api-key": authorization,
  "content-type": "application/json"
}
payload = {
  "input": text,
  "input_type": "article",
  "steps": [
      {
        "skill": "summarize"
      }
    ]
}
results = requests.post(end_point, json=payload, headers=headers)
summarized_article = results.json()['output'][0]['text']
st.write(summarized_article)