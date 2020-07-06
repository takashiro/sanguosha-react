import React from 'react';

import Room from '../../../../game/Room';
import Area from '../../../../game/CardArea';

import FloatBox from '../../component/FloatBox';
import InlineCardArea from './InlineCardArea';

import './index.scss';

interface SelectorProps {
	room: Room;
}

interface SelectorState {
	areas: Area[];
}

type AreaListener = (enabled: boolean) => void;

export default class MultiAreaSelector extends React.Component<SelectorProps, SelectorState> {
	private areas: Area[];

	private areaListeners: AreaListener[];

	constructor(props: SelectorProps) {
		super(props);

		this.areas = [];
		const { room } = props;
		const players = room.getOtherPlayers();
		for (const player of players) {
			this.areas.push(...player.getCardAreas());
		}
		this.areaListeners = [];

		this.state = {
			areas: [],
		};
	}

	componentDidMount(): void {
		for (const area of this.areas) {
			const listener = (enabled: boolean): void => {
				if (enabled) {
					this.addArea(area);
				} else {
					this.removeArea(area);
				}
			};
			area.on('enabledChanged', listener);
			this.areaListeners.push(listener);
		}
	}

	componentWillUnmount(): void {
		for (let i = 0; i < this.areas.length; i++) {
			const area = this.areas[i];
			const listener = this.areaListeners[i];
			area.off('enabledChanged', listener);
		}
	}

	addArea(area: Area): void {
		if (area.size <= 0) {
			return;
		}

		this.setState((prev) => {
			const { areas } = prev;
			areas.push(area);
			return { areas };
		});
	}

	removeArea(area: Area): void {
		this.setState((prev) => {
			const { areas } = prev;
			const i = areas.indexOf(area);
			if (i >= 0) {
				areas.splice(i, 1);
			}
			return { areas };
		});
	}

	render(): JSX.Element | null {
		const { areas } = this.state;
		if (areas.length <= 0) {
			return null;
		}

		return (
			<FloatBox className="multi-area-selector">
				{areas.map((area) => <InlineCardArea key={`area-${area.getSeat()}-${area.getType()}`} area={area} />)}
			</FloatBox>
		);
	}
}
