const mouth = [
	'cute',
	'drip',
	'kissHeart',
	'lilSmile',
	'plain',
	'shout',
	'shy',
	'sick',
	'smileLol',
	'smileTeeth',
	'tongueOut',
	'wideSmile'
];
export function getAvatarUrl(name: string | undefined) {
	if (!name)
		return `https://api.dicebear.com/9.x/fun-emoji/svg?mouth=${mouth.join(',')}&seed=anonymous`;
	return `https://api.dicebear.com/9.x/fun-emoji/svg?mouth=${mouth.join(',')}&seed=${name}`;
}
