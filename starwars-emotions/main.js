// Edit this One AI API call using our studio at https://studio.oneai.com/?pipeline=gILcHf

// npm install oneai
import OneAI from "oneai";

const oneai = new OneAI("34edcd74-860a-4aed-8184-463cb0ffdcc1");
const conversation = [
	{ "speaker": "speaker 1", "utterance": "General Kenobi. Years ago, you served my father in the Clone Wars.", "timestamp": "00:00:00.590" },
	{ "speaker": "speaker 2", "utterance": "Now he begs you to help him in his struggle against the empire.", "timestamp": "00:00:05.270" },
	{ "speaker": "speaker 1", "utterance": "I regret that I am unable to present my father's request to.", "timestamp": "00:00:08.510" },
	{ "speaker": "speaker 2", "utterance": "In person, but my.", "timestamp": "00:00:10.790" },
	{ "speaker": "speaker 1", "utterance": "Ship has fallen under attack, and I'm afraid my mission to bring you to older on his fan. I have placed information vital to the survival of the rebellion into the memory systems of the Tsar two unit. My father will know how to retrieve it. You must see this drawing safely delivered to him on older. This is our most desperate hour. Help me Obi-Wan Kenobi. You're my only hope.", "timestamp": "00:00:12.170" }
];

const pipeline = new oneai.Pipeline(
	oneai.skills.emotions(),
	oneai.skills.sentiments(),
);

const output = await pipeline.run(conversation);

console.log(output);