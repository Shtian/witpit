import { OPENAI_ASSITANT_ID } from '$env/static/private';
import { openai } from './openai-client';

export async function getSuggestion(prompt: string) {
	const thread = await openai.beta.threads.create();
	await openai.beta.threads.messages.create(thread.id, {
		role: 'user',
		content: prompt
	});

	// eslint-disable-next-line prefer-const
	let run = await openai.beta.threads.runs.createAndPoll(thread.id, {
		assistant_id: OPENAI_ASSITANT_ID
	});

	if (run.status === 'completed') {
		const messages = await openai.beta.threads.messages.list(run.thread_id);
		for (const message of messages.data) {
			for (const content of message.content) {
				if (content.type === 'text') {
					console.debug(`AI Suggestion thread> ${message.role}: ${content.text.value}`);
				}
			}
		}
		const message = messages.data.find((message) => message.role === 'assistant');
		const content = message?.content?.find((content) => content.type === 'text');
		return content?.text.value;
	} else {
		return null;
	}
}
