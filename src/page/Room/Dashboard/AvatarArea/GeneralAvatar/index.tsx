
import React from 'react';

import { GeneralProfile, Kingdom } from '@karuta/sanguosha-core';

import './index.scss';

interface Props {
	general: GeneralProfile;
	position: 'head' | 'deputy';
}

interface State {
	name: string;
	kingdom: Kingdom;
	avatar: string;
}

class GeneralAvatar extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		const { general } = props;

		this.state = {
			name: '', // TODO: translate
			kingdom: (general && general.kingdom as Kingdom) || Kingdom.Unknown,
			avatar: (general && general.name) || 'unknown',
		};
	}

	render(): JSX.Element {
		const { position } = this.props;
		const {
			kingdom,
			avatar,
			name,
		} = this.state;

		const className = `general-avatar ${Kingdom[kingdom].toLowerCase()} ${position}`;
		return (
			<div className={className}>
				<img className="avatar" src={`style/general/fullphoto/${avatar}.png`} alt="" />
				<div className="frame" />
				<div className="name">{name}</div>
			</div>
		);
	}
}

export default GeneralAvatar;
