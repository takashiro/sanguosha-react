
class HpBar{

	constructor(bar){
		this.bar = bar;
	}

	get maxHp(){
		var max_hp = parseInt(this.bar.data('max-hp'), 10);
		return isNaN(max_hp) ? 0 : max_hp;
	}

	set maxHp(max_hp){
		if(isNaN(max_hp)){
			return;
		}
		this.bar.data('max-hp', max_hp);

		if(max_hp <= 5){
			this.bar.attr('class', 'hp-bar n' + max_hp);
		}else{
			this.bar.attr('class', 'hp-bar');
		}

		var hp = this.hp;
		if(hp > max_hp){
			this.hp = max_hp;
		}else{
			this.updateHpColor();
		}
	}

	get hp(){
		var hp = parseInt(this.bar.data('hp'), 10);
		return isNaN(hp) ? 0 : hp;
	}

	set hp(hp){
		if(isNaN(hp)){
			return;
		}

		hp = Math.min(hp, this.maxHp);
		this.bar.data('hp', hp);

		this.updateHpColor();
	}

	updateHpColor(){
		var max_hp = this.maxHp;
		var hp = this.hp;

		var bar = this.bar.children('.hp');
		bar.attr('class', 'hp');
		if(max_hp <= 5){
			bar.addClass('n' + hp);
		}else{
			bar.text(hp + ' / ' + max_hp);
		}

		if(max_hp == 2){
			if(hp < max_hp){
				bar.addClass('low');
			}
		}else if(max_hp == 3){
			if(hp < 2){
				bar.addClass('low');
			}else if(hp < 3){
				bar.addClass('medium');
			}
		}else{
			if(hp <= max_hp / 3){
				bar.addClass('low');
			}else if(hp <= max_hp / 2){
				bar.addClass('medium');
			}
		}
	}

}
