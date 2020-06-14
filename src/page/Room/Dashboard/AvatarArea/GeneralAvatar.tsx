
import React from 'react';
import { IntlShape, injectIntl } from 'react-intl';

import { GeneralProfile, Kingdom } from '@karuta/sanguosha-core';

interface Props {
	general: GeneralProfile;
	position: 'head' | 'deputy';
	children?: React.ReactNode;
	intl: IntlShape;
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
			name: general ? general.name : '',
			kingdom: (general && general.kingdom as Kingdom) || Kingdom.Unknown,
			avatar: (general && general.name) || 'unknown',
		};
	}

	render(): JSX.Element {
		const {
			position,
			children,
			intl,
		} = this.props;
		const {
			kingdom,
			avatar,
			name,
		} = this.state;

		const className = `general-avatar ${Kingdom[kingdom].toLowerCase()} ${position}`;
		const generalName = intl.formatMessage({ id: `general.${name}` });
		return (
			<div className={className}>
				<img className="avatar" src={`style/general/fullphoto/${avatar}.png`} alt="" />
				<div className="frame" />
				<div className="name-label">
					<i className="icon" />
					<div className={`name l${generalName.length}`}>{generalName}</div>
				</div>
				{children}
			</div>
		);
	}
}

export default injectIntl(GeneralAvatar);
