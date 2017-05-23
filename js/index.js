
var server = null;

$(function(){
	require('lib/server', function(){
		server = new Server;

		server.on('open', function(){
			server.request(net.CreateRoom, {
				'id' : 1,
				'game' : 'sanguosha'
			});
		});

		require('protocol', function(){
			server.onmessage = BasicActions();
		});
	});

	require('hp-bar', function(){
		require('photo', function(){
			var photo1 = new Photo(1);
			photo1.maxHp = 3;
			photo1.hp = 1;
		});

		require('dashboard');
	});

	require('card-list', function(){
		require('card', function(){
			var handcard_area = new CardList($('#handcard-list'));
			var body = $('body');
			for(var i = 1; i <= 5; i++){
				var card = new Card('savage_assault');
				card.color = 'black';
				card.suit = 'club';
				card.number = i;
				body.append(card.object);
				handcard_area.append(card);
			}
		});
	});

	$('#connection-form').submit(function(e){
		e.preventDefault();
		if(server){
			var server_url = $(this).find('input[name="server_url"]').val();
			server.connect(server_url);
		}
	});

	$('#chat-send').click(function(){
		var input = $('#chat-input');
		var message = input.val();
		input.val('');
		if(server){
			server.request(net.Speak, message);
		}
	});
});
