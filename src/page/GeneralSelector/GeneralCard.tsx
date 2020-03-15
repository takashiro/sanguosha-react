import React from 'react';
import {
	GeneralProfile,
	Kingdom,
} from '@karuta/sanguosha-core';

interface Props {
	selectable: boolean;
	selected: boolean;
	general: GeneralProfile;
	onChange: (general: GeneralProfile, selected: boolean) => void;
}

interface State {
	selected: boolean;
}

class GeneralCard extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			selected: props.selected,
		};
	}

	handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
		e.preventDefault();
		this.handleChange();
	}

	handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
		if (e.key !== 'Enter') {
			e.preventDefault();
			this.handleChange();
		}
	}

	handleChange(): void {
		const { selectable } = this.props;
		let { selected } = this.state;
		if (selectable) {
			selected = !selected;

			const { onChange } = this.props;
			if (onChange) {
				this.setState({ selected });
				const { general } = this.props;
				setTimeout(onChange, 0, general, selected);
			}
		}
	}

	render(): JSX.Element {
		const {
			general,
			selectable,
		} = this.props;
		const {
			selected,
		} = this.state;

		let className = 'general-card';
		if (selectable) {
			if (selected) {
				className += ' selected';
			}
		} else {
			className += ' unselectable';
		}

		className += ` ${Kingdom[general.kingdom].toLowerCase()}`;

		return (
			<div role="button" tabIndex={0} className={className} onClick={this.handleClick} onKeyDown={this.handleKeyDown}>
				<img src={`style/general/fullphoto/${general.name}.png`} alt="" />
			</div>
		);
	}
}

export default GeneralCard;
