import React from 'react';

import Skill from '../../../../game/Skill';
import SkillArea from '../../../../game/SkillArea';

import SkillButton from './SkillButton';

interface ListProps {
	position: 'head' | 'deputy';
	area: SkillArea;
}

interface ListState {
	skills: Skill[];
}

export default class SkillList extends React.Component<ListProps, ListState> {
	constructor(props: ListProps) {
		super(props);

		const { area } = props;
		this.state = {
			skills: [
				...area.getSkills(),
			],
		};
	}

	componentDidMount(): void {
		const { area } = this.props;
		area.on('added', this.onAdded);
		area.on('removed', this.onRemoved);
	}

	componentWillUnmount(): void {
		const { area } = this.props;
		area.off('added', this.onAdded);
		area.off('removed', this.onRemoved);
	}

	onAdded = (skill: Skill): void => {
		this.setState((prev) => {
			const { skills } = prev;
			skills.push(skill);
			return { skills };
		});
	}

	onRemoved = (skill: Skill): void => {
		this.setState((prev) => {
			const { skills } = prev;
			const i = skills.indexOf(skill);
			if (i >= 0) {
				skills.splice(i, 1);
			}
			return { skills };
		});
	}

	render(): JSX.Element {
		const { skills } = this.state;
		return (
			<div className={`skill-list ${(skills.length % 2) === 1 ? 'odd' : 'even'}`}>
				{skills.map((skill) => <SkillButton key={skill.getName()} skill={skill} />)}
			</div>
		);
	}
}
