
import React from 'react';

import './index.scss';

class Card extends React.Component {

	render() {
		const card = this.props.card;

		const style = {};
		if (this.props.visibility) {
			style.visibility = this.props.visibility;
		}

		if (card.id()) {
			style.backgroundImage = `url(style/card/${card.name()}.png)`;
			return <div className={'card ' + card.color()} style={style}>
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
