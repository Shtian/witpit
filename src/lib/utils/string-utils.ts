import type { WitCategorySchema } from '../../routes/wit/create/schema';

export function truncate(str: string, maxLength: number) {
	if (!str) return '';
	if (str.length <= maxLength) {
		return str;
	}
	return str.slice(0, maxLength) + '...';
}

export function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function toWitCategory(category: WitCategorySchema) {
	switch (category) {
		case 'wit':
			return '🧠 Wit';
		case 'win':
			return '🏆 Win';
		case 'wipeout':
			return '💣 Wipeout';
		default:
			return '';
	}
}
