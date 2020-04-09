import Animation from '../../../../game/Animation';

export const map = new Map<string, Animation>();

export const BlackStrike: Animation = {
	name: 'strike/black',
	width: 188,
	height: 184,
	frame: 18,
};

export const RedStrike: Animation = {
	name: 'strike/red',
	width: 188,
	height: 184,
	frame: 24,
};

export const Dodge: Animation = {
	name: 'dodge',
	width: 240,
	height: 240,
	frame: 23,
};
map.set('dodge', Dodge);

export const Peach: Animation = {
	name: 'peach',
	width: 188,
	height: 188,
	frame: 17,
};
map.set('peach', Peach);
