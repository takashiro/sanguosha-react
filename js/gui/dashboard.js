
class Dashboard{

	constructor(){
		this.object = $('#dashboard');
		this.hpBar = new HpBar(this.object.children('.avatar-area').children('.hp-bar-wrapper').children('.hp-bar'));
	}

	get generalName(){
		return this.headGeneralName;
	}

	set generalName(name){
		this.headGeneralName = name;
	}

	get general(){
		return this.headGeneral;
	}

	set general(general){
		this.headGeneral = general;
	}

	get kingdom(){
		return this.headKingdom;
	}

	set kingdom(kingdom){
		this.headKingdom = kingdom;
	}

	get headGeneralName(){
		var avatar = this.getAvatar('head');
		return avatar.children('.name').text();
	}

	set headGeneralName(name){
		var avatar = this.getAvatar('head');
		avatar.children('.name').text(name);
	}

	get headGeneral(){
		return this.object.data('head-general');
	}

	set headGeneral(general){
		this.object.data('head-general', general);

		var avatar = this.getAvatar('head');
		avatar.children('img').attr('src', 'style/general/fullphoto/' + general + '.png');
	}

	get deputyGeneralName(){
		var avatar = this.getAvatar('deputy');
		return avatar.children('.name').text();
	}

	set deputyGeneralName(name){
		var avatar = this.getAvatar('deputy');
		avatar.children('.name').text(name);
	}

	get deputyGeneral(){
		return this.object.data('deputy-general');
	}

	set deputyGeneral(general){
		this.object.data('deputy-general', general);

		var avatar = this.getAvatar('deputy');
		avatar.children('img').attr('src', 'style/general/fullphoto/' + general + '.png');
	}

	getAvatar(type){
		return this.object.children('.avatar-area').children('.general-avatar.' + type);
	}

	get maxHp(){
		return this.hpBar.maxHp;
	}

	set maxHp(max_hp){
		this.hpBar.maxHp = max_hp;
	}

	get hp(){
		return this.hpBar.hp;
	}

	set hp(hp){
		this.hpBar.hp = hp;
	}

}
