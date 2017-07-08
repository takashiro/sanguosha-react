
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
			var param = httpGet();
			if(param['server']){
				server.connect(param['server']);
			}
		});
	});

	require('gui/hp-bar', function(){
		require('gui/photo');
		require('gui/dashboard');
	});

	require('gui/card-list', function(){
		require('gui/card', function(){
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

	require('gui/animation');

	$('#chat-send').click(function(){
		var input = $('#chat-input');
		var message = input.val();
		input.val('');
		if(server){
			server.request(net.Speak, message);
		}
	});
});
