import React from 'react';

import Skill from '../../../../game/Skill';

interface ButtonProps {
	skill: Skill;
}

interface ButtonState {
	enabled: boolean;
	active: boolean;
}

export default class SkillButton extends React.Component<ButtonProps, ButtonState> {
	constructor(props: ButtonProps) {
		super(props);

		const { skill } = props;
		this.state = {
			enabled: skill.isEnabled(),
			active: skill.isActive(),
		};
	}

	componentDidMount(): void {
		const { skill } = this.props;
		skill.on('enabledChanged', this.onEnabledChanged);
		skill.on('activeChanged', this.onActiveChanged);
	}

	componentWillUnmount(): void {
		const { skill } = this.props;
		skill.off('enabledChanged', this.onEnabledChanged);
		skill.off('activeChanged', this.onActiveChanged);
	}

	onEnabledChanged = (enabled: boolean): void => this.setState({ enabled });

	onActiveChanged = (active: boolean): void => this.setState({ active });

	handleClick = (): void => {
		const { skill } = this.props;
		if (!skill.isEnabled()) {
			return;
		}

		if (skill.isActive()) {
			skill.setActive(false);
		} else {
			skill.setActive(true);
		}
	}

	handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>): void => {
		if (event.key === 'Enter') {
			this.handleClick();
		}
	}

	render(): JSX.Element {
		const { skill } = this.props;
		const { enabled } = this.state;
		const { active } = this.state;
		return (
			<button
				className={`skill-button ${enabled ? 'enabled' : 'disabled'} ${active ? 'active' : ''}`}
				type="button"
				onClick={enabled ? this.handleClick : undefined}
				onKeyDown={enabled ? this.handleKeyDown : undefined}
			>
				{skill.getName()}
			</button>
		);
	}
}
