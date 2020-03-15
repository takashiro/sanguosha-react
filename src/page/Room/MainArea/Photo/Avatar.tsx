
import React from 'react';
import { GeneralProfile } from '@karuta/sanguosha-core';

interface AvatarProps {
	general: GeneralProfile | null;
	position: 'head' | 'deputy';
}

function Avatar(props: AvatarProps): JSX.Element {
	const { general } = props;
	const { position } = props;
	const avatar = (general && general.name) || 'unknown';
	const name = ''; // TODO: translate

	const className = `avatar ${position}`;
	return (
		<div className={className}>
			<img src={`style/general/fullphoto/${avatar}.png`} alt="" />
			<div className="name">{name}</div>
		</div>
	);
}

export default Avatar;
