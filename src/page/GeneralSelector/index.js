import React from 'react';

import cmd from '../../protocol';
import Room from '../../game/Room';

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
		this.handleConfirm = this.handleConfirm.bind(this);

		const { client, onPageLoad } = props;
		this.room = new Room(client);
		client.bind(cmd.ChooseGeneral, (option) => {
			this.setState({
				num: parseInt(option.num, 10) || 1,
				sameKingdom: !!option.sameKingdom,
				generals: option.generals,
			});
		});
		client.bind(cmd.ToBattle, () => {
			onPageLoad('room', { room: this.room });
		});
	}

	componentDidMount() {
		this.room.start();
	}

	handleSelection(general, selected) {
		this.setState((prev) => {
			const { selectedGenerals } = prev;
			if (selected) {
				if (!selectedGenerals.find((g) => g.id === general.id)) {
					selectedGenerals.push(general);
					return { selectedGenerals };
				}
			} else {
				for (let i = 0; i < selectedGenerals.length; i++) {
					if (selectedGenerals[i].id === general.id) {
						selectedGenerals.splice(i, 1);
						return { selectedGenerals };
					}
				}
			}

			return {};
		});
	}

	handleConfirm(e) {
		e.preventDefault();

		const { selectedGenerals } = this.state;
		const selected = selectedGenerals.map((g) => g.id);
		const { client } = this.props;
		client.send(cmd.ChooseGeneral, selected);
	}

	render() {
		const {
			generals,
			selectedGenerals,
			num,
			sameKingdom,
		} = this.state;

		let cards = null;
		if (generals) {
			cards = generals.map((general) => {
				const selected = selectedGenerals.some((g) => g.id === general.id);
				let selectable = selected
					|| selectedGenerals.length < num;
				if (sameKingdom) {
					const same = selectedGenerals.every((s) => s.kingdom === general.kingdom);
					if (!same) {
						selectable = false;
					} else {
						let available = 0;
						for (const g of generals) {
							if (g.kingdom === general.kingdom) {
								available++;
							}
						}

						if (available < num) {
							selectable = false;
						}
					}
				}
				return (
					<li key={general.id}>
						<GeneralCard
							general={general}
							selectable={selectable}
							selected={selected}
							onChange={this.handleSelection}
						/>
					</li>
				);
			});
		}

		const feasible = true;// selectedGenerals.length === this.state.num;

		return (
			<div className="general-selector">
				<ul className="general">
					{cards}
				</ul>
				<div className="button-area">
					{feasible ? <button type="button" onClick={this.handleConfirm}>确定</button> : null}
				</div>
			</div>
		);
	}
}

export default GeneralSelector;
