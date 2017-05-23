
class Card{

	constructor(name){
		var suit = $('<div class="suit spade"></div>');
		var number = $('<div class="number n13"></div>');
		this.object = $('<div class="card black"></div>');
		this.object.css('background-image', 'url(style/card/' + name + '.png)');
		this.object.append(suit);
		this.object.append(number);
	}

	remove(){
		this.object.remove();
	}

	get color(){
		return this.object.data('color');
	}

	set color(color){
		this.object.data('color', color);
		for(var i = 0; i < Card.colors.length; i++){
			this.object.removeClass(Card.colors[i]);
		}
		this.object.addClass(color);
	}

	get suit(){
		return this.object.data('suit');
	}

	set suit(suit){
		this.object.data('suit', suit);
		var suit_object = this.object.children('.suit');
		suit_object.attr('class', 'suit ' + suit);
	}

	get number(){
		return parseInt(this.object.data('number'), 10);
	}

	set number(number){
		this.object.data('number', number);

		var number_object = this.object.children('.number');
		number_object.attr('class', 'number n' + number);
	}

}

Card.colors = ['red', 'black'];
