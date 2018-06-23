
import React from 'react';

import cmd from '../../protocol';
import GameRoom from '../../game/Room';

import GeneralCard from './GeneralCard';

import './index.scss';

class GeneralSelector extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			num: 1,
			sameKingdom: true,
			generals: [],
			selectedGenerals: [],
		};

		this.handleSelection = this.handleSelection.bind(this);

		const client = props.client;

		this.room = new GameRoom(client);
		client.bind(cmd.ChooseGeneral, option => {
			this.setState({
				num: parseInt(option.num, 10) || 1,
				sameKingdom: !!option.sameKingdom,
				generals: option.generals,
			});
		});
	}

	componentDidMount() {
		this.room.start();
	}

	handleSelection(general, selected) {
		this.setState(prev => {
			let selectedGenerals = prev.selectedGenerals;
			if (selected) {
				if (!selectedGenerals.find(g => g.name === general.name)) {
					selectedGenerals.push(general);
					return {selectedGenerals};
				}
			} else {
				for (let i = 0; i < selectedGenerals.length; i++) {
					if (selectedGenerals[i].name === general.name) {
						selectedGenerals.splice(i, 1);
						return {selectedGenerals};
					}
				}
			}
		});
	}

	render() {
		const {generals, selectedGenerals} = this.state;

		let cards = null;
		if (generals) {
			cards = generals.map(
				(general, i) => {
					let selected = selectedGenerals.some(g => g.name === general.name);
					let selectable = selected
						|| selectedGenerals.length < this.state.num;
					if (this.state.sameKingdom) {
						let same = selectedGenerals.every(s => s.kingdom === general.kingdom);
						if (!same) {
							selectable = false;
						} else {
							let available = 0;
							for (let g of generals) {
								if (g.kingdom === general.kingdom) {
									available++;
								}
							}

							if (available < this.state.num) {
								selectable = false;
							}
						}
					}
					return <li key={i}>
						<GeneralCard
							general={general}
							selectable={selectable}
							selected={selected}
							onChange={this.handleSelection}
						/>
					</li>;
				}
			);
		}

		return <div className="general-selector">
			<ul className="general">
				{cards}
			</ul>
		</div>;
	}

}

export default GeneralSelector;
