
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
