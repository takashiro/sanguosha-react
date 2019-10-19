
import React from 'react';

import Kingdom from '../../game/Kingdom';

class GeneralCard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selected: !!props.selected,
		};

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		e.preventDefault();
		if (this.props.selectable) {
			const selected = !this.state.selected;
			if (this.props.onChange) {
				this.setState({ selected });
				setTimeout(this.props.onChange, 0, this.props.general, selected);
			}
		}
	}

	render() {
		const { general } = this.props;

		let className = 'general-card';
		if (this.props.selectable) {
			if (this.state.selected) {
				className += ' selected';
			}
		} else {
			className += ' unselectable';
		}

		className += ` ${Kingdom.fromNum(general.kingdom).toLowerCase()}`;

		return (
			<div className={className} onClick={this.handleClick}>
				<img src={`style/general/fullphoto/${general.name}.png`} />
			</div>
		);
	}
}

export default GeneralCard;
