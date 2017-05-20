
class Photo{

	constructor(id){
		this.object = $('#photo-' + id);
		if(this.object.length == 0){
			this.create(id);
		}
		this.hpBar = new HpBar(this.object.children('.hp-bar'));
	}

	create(id){
		var obj = Photo.template.clone();
		obj.prop('id', 'photo-' + id);
		$('#photo-area').append(obj);
		this.object = obj;
	}

	remove(){
		this.object.remove();
	}

	get kingdom(){
		var object = this.object.children('.kingdom');
		var classes = object.attr('class').split(' ');
		if(classes.length > 1){
			return classes[1];
		}else{
			return '';
		}
	}

	set kingdom(kingdom){
		var object = this.object.children('.kingdom');
		object.attr('class', 'kingdom');
		object.addClass(kingdom);
	}

	set generalName(name){
		this.headGeneralName = name;
	}

	get generalName(){
		return this.headGeneralName;
	}

	set headGeneralName(name){
		var div = this.getAvatar('head').children('.name');
		div.text(name);
	}

	get headGeneralName(){
		var div = this.getAvatar('head').children('.name');
		return div.text();
	}

	set deputyGeneralName(name){
		var div = this.getAvatar('deputy').children('.name');
		div.text(name);
	}

	get deputyGeneralName(){
		var div = this.getAvatar('deputy').children('.name');
		return div.text();
	}

	getAvatar(type){
		return this.object.children('.avatar-area').children('.avatar.' + type);
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

var area = $('#photo-area');
var template = area.children('.photo').eq(0);
Photo.template = template.clone();
template.remove();
Photo.template.removeClass('template');
