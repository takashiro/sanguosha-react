import React from 'react';
import { FormattedMessage } from 'react-intl';

import Option from '../../../../game/Room/Dashboard/Option';

interface ButtonProps {
	option: Option;
	onClick?: () => void;
}

interface ButtonState {
	enabled: boolean;
}


export default class Button extends React.Component<ButtonProps, ButtonState> {
	constructor(props: ButtonProps) {
		super(props);

		const { option } = props;
		this.state = {
			enabled: option.isEnabled(),
		};
	}

	componentDidMount(): void {
		const { option } = this.props;
		option.on('enabledChanged', this.handleEnabledChanged);
	}

	componentWillUnmount(): void {
		const { option } = this.props;
		option.off('enabledChanged', this.handleEnabledChanged);
	}

	handleEnabledChanged = (enabled: boolean): void => {
		this.setState({ enabled });
	}

	handleClick = (): void => {
		const { onClick } = this.props;
		if (onClick) {
			onClick();
		}
		const { option } = this.props;
		option.click();
	}

	render(): JSX.Element {
		const { option } = this.props;
		const { enabled } = this.state;
		const classNames = [
			'retro',
			option.getClassName() || option.getText(),
			enabled ? 'enabled' : 'disabled',
		];
		return (
			<button type="button" className={classNames.join(' ')} onClick={this.handleClick}>
				<FormattedMessage id={option.getText()} />
			</button>
		);
	}
}
