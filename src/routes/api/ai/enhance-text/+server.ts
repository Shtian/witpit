import { getSuggestion } from '$lib/ai/writing-assistant';
import { error, json } from '@sveltejs/kit';

export async function POST(event) {
	const { content } = await event.request.json();
	if (!content) return error(400, 'Content is required');
	const result = await getSuggestion(content);

	if (!result) return error(500, 'Could not rewrite the text');

	const requestOrigin = event.request.headers.get('origin');
	const allowOrigin =
		requestOrigin === 'http://localhost:5173' || requestOrigin === 'https://witpit.vercel.app'
			? requestOrigin
			: '';

	return json(
		{
			content: result
		},
		{
			headers: {
				'Access-Control-Allow-Origin': allowOrigin,
				'Access-Control-Allow-Methods': 'POST, OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type'
			}
		}
	);
}
