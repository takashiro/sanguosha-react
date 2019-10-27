
import React from 'react';

import './index.scss';

function Card(props) {
	const { card } = props;

	if (card.getId()) {
		const classNames = ['card', card.getColor()];
		const style = {
			backgroundImage: `url(style/card/${card.getName()}.png)`,
		};
		return (
			<div className={classNames.join(' ')} style={style}>
				<div className={`suit ${card.getSuitString().toLowerCase()}`} />
				<div
					className="number"
					style={{
						backgroundImage: `url(style/card/number/${card.getColor()}/${card.getNumber()}.png)`,
					}}
				/>
			</div>
		);
	}
	return <div className="card back" />;
}

export default Card;
