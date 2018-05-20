
import React from 'react';

import './index.scss';

import EquipArea from './EquipArea';
import HandcardArea from './HandcardArea';
import ButtonArea from './ButtonArea';
import AvatarArea from './AvatarArea';

class Dashboard extends React.Component {

	render() {
		return <div className="dashboard">
			<EquipArea />
			<HandcardArea />
			<ButtonArea />
			<AvatarArea />
		</div>;
	}

}

export default Dashboard;
