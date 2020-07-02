import React from 'react';
import {
	IntlShape,
	FormattedMessage,
	injectIntl,
} from 'react-intl';

import Dashboard from '../../../../game/Room/Dashboard';

import './index.scss';

interface AreaProps {
	dashboard: Dashboard;
	intl: IntlShape;
}

interface AreaState {
	message: string;
	values?: Record<string, string>;
}

class PromptArea extends React.Component<AreaProps, AreaState> {
	constructor(props: AreaProps) {
		super(props);

		this.state = {
			message: '',
		};
	}

	componentDidMount(): void {
		const { dashboard } = this.props;
		dashboard.on('promptChanged', this.onPromptChanged);
	}

	componentWillUnmount(): void {
		const { dashboard } = this.props;
		dashboard.off('promptChanged', this.onPromptChanged);
	}

	onPromptChanged = (message: string, values?: Record<string, string>): void => {
		this.setState({
			message,
			values,
		});
	}

	render(): JSX.Element | null {
		const { message, values } = this.state;
		if (!message) {
			return null;
		}

		const args: Record<string, string> = {};
		if (values) {
			const { intl } = this.props;
			for (const key of Object.keys(values)) {
				args[key] = intl.formatMessage({ id: values[key] });
			}
		}

		return (
			<div className="prompt-area">
				<FormattedMessage id={message} values={args} />
			</div>
		);
	}
}

export default injectIntl(PromptArea);
