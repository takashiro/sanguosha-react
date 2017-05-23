
class CardList{

	constructor(object){
		this.object = object;
		this.cards = [];
	}

	append(card){
		this.cards.push(card);
		this.update();
	}

	update(){
		var pos = this.object.offset();
		for(var i = 0; i < this.cards.length; i++){
			var card = this.cards[i];
			card.object.animate({
				'left' : pos.left,
				'top' : pos.top
			});

			pos.left += card.object.width() + 2;
		}
	}

}
