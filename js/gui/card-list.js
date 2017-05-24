
class CardList{

	constructor(object){
		this.object = object;
		this.cards = [];

		object.on('click', '.card', function(e){
			var card = $(this);
			if(card.hasClass('selected')){
				card.removeClass('selected');
				card.animate({'top' : '+=20px'}, 100, 'linear');
			}else{
				card.addClass('selected');
				card.animate({'top' : '-=20px'}, 100, 'linear');
			}
		});
	}

	append(card){
		this.cards.push(card);
		this.update();
	}

	update(){
		var list = this.object;
		var global_pos = list.offset();
		var pos = {
			'top' : 0,
			'left' : 0
		};
		for(var i = 0; i < this.cards.length; i++){
			var card = this.cards[i];
			var local_pos = {
				'top' : pos.top,
				'left' : pos.left
			};
			card.object.animate(global_pos, 500, 'swing', function(){
				card.object.remove();
				card.object.css(local_pos);
				list.append(card.object);
			});

			var step = card.object.width() + 2;
			global_pos.left += step;
			pos.left += step;
		}
	}

}
