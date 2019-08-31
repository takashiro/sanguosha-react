
import React from 'react';

import './index.scss';

function onClick() {
	this.setState(prev => {
		const selected = !prev.selected;
		const listener = selected ? this.props.onSelected : this.props.onUnselected;
		if (listener) {
			setTimeout(listener, 0, this.props.card);
		}
		return {selected};
	});
}

class Card extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			selected: false,
		};

		this.onClick = props.selectable ? onClick.bind(this) : null;
	}

	render() {
		const card = this.props.card;

		const style = {};
		if (this.props.visibility) {
			style.visibility = this.props.visibility;
		}

		if (card.id()) {
			const classNames = ['card', card.color()];
			if (this.state.selected) {
				classNames.push('selected');
			}

			style.backgroundImage = `url(style/card/${card.name()}.png)`;
			return <div className={classNames.join(' ')} style={style} onClick={this.onClick}>
				<div className={'suit ' + card.suitString().toLowerCase()} />
				<div className="number" style={{
					backgroundImage: `url(style/card/number/${card.color()}/${card.number()}.png)`,
				}} />
			</div>;
		} else {
			return <div className="card back" />;
		}
	}

}

export default Card;
