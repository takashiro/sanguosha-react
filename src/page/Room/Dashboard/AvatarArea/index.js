
import React from 'react';

import './index.scss';

import GeneralAvatar from './GeneralAvatar';
import HpBar from '../../component/HpBar';

class AvatarArea extends React.Component {

	render() {
		return <div className="avatar-area">
			<GeneralAvatar
				position="head"
				kingdom="shu"
				name="黄月英"
				avatar="huangyueying"
			/>
			<GeneralAvatar
				position="deputy"
				kingdom="shu"
				name="诸葛亮"
				avatar="zhugeliang"
			/>
			<div className="hp-bar-wrapper">
				<HpBar
					size="24"
					maxHp="4"
					hp="3"
				/>
			</div>
		</div>;
	}

}

export default AvatarArea;
