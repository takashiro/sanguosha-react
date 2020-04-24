
import React from 'react';

import Dashboard from '../../../../game/Room/Dashboard/index';
import DashboardOption from '../../../../game/Room/Dashboard/Option';
import Button from './Button';

import './index.scss';

interface AreaProps {
	dashboard: Dashboard;
}

interface AreaState {
	options: DashboardOption[];
}

class ButtonArea extends React.Component<AreaProps, AreaState> {
	constructor(props: AreaProps) {
		super(props);

		this.state = {
			options: [],
		};
	}

	componentDidMount(): void {
		const { dashboard } = this.props;
		dashboard.on('optionsChanged', this.updateOptions);
	}

	componentWillUnmount(): void {
		const { dashboard } = this.props;
		dashboard.off('optionsChanged', this.updateOptions);
	}

	updateOptions = (options: DashboardOption[]): void => {
		this.setState({ options });
	}

	cleanOptions = (): void => {
		this.setState({ options: [] });
	}

	render(): JSX.Element {
		const { options } = this.state;

		return (
			<div className="button-area">
				{options.map((option) => <Button key={`option-${option.getId()}`} option={option} onClick={this.cleanOptions} />)}
			</div>
		);
	}
}

export default ButtonArea;
