
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

	render() {
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

		className += ` ${Kingdom.fromNum(general.kingdom).toLowerCase()}`;

		return (
			<div role="button" tabIndex="0" className={className} onClick={this.handleClick} onKeyDown={this.handleClick}>
				<img src={`style/general/fullphoto/${general.name}.png`} alt="" />
			</div>
		);
	}
}

export default GeneralCard;
