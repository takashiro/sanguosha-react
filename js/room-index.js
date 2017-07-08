
var server = null;
var room = {
	'users' : {}
};

$(function(){
	require('lib/server', function(){
		server = new Server;

		server.on('open', function(){
			if($_GET['uid']){
				let uid = parseInt($_GET['uid'], 10);
				if(!isNaN(uid) && uid > 0){
					server.request(net.Login, {
						'uid' : uid
					});
				}
			}
		});

		require('protocol', function(){
			server.onmessage = BasicActions();
			if($_GET['server']){
				server.connect($_GET['server']);
			}
		});
	});

	require('gui/hp-bar');
	require('gui/photo');
	require('gui/dashboard');
	require('gui/card-list');
	require('gui/card');
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
