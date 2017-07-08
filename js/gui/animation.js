
class Animation {

	constructor(name, frame_num){
		this.name = name;
		this.frameNum = frame_num;
		this.loop = 1;
		this.pos = {
			x : 0,
			y : 0
		};
		this.current = -1;
		this.event = null;
		this.fps = 16;

		this.create();
	}

	create(){
		var div = $('<div></div>');
		div.addClass('animation');

		var init = $('<img></img>');
		init.attr('src', 'style/animation/' + this.name + '/0.png');
		init.on('load', function(){
			div.css({
				'width' : init.width(),
				'height' : init.height()
			});
		});
		div.append(init);

		for(let i = 1; i < this.frameNum; i++){
			let img = $('<img></img>');
			img.attr('src', 'style/animation/' + this.name + '/' + i + '.png');
			div.append(img);
		}

		$('body').append(div);
		this.object = div;
	}

	destroy(){
		if(this.object){
			this.object.remove();
			this.object = null;
		}
	}

	next(timeout = 0){
		this.current++;
		var frames = this.object.children();
		frames.removeClass('current');
		if(this.current < this.frameNum){
			frames.eq(this.current).addClass('current');
		}else{
			this.current = -1;
			this.loop--;
		}

		if(this.loop > 0 && timeout > 0){
			var me = this;
			this.event = setTimeout(function(){
				me.next(timeout);
			}, timeout);
		}
	}

	play(loop = 1){
		this.loop = loop;
		this.next(Math.round(1000 / this.fps));
	}

	pause(){
		if(this.event){
			clearInterval(this.event);
			this.event = null;
		}
	}

	stop(){
		this.pause();
		this.object.children().removeClass('current');
		this.current = -1;
		this.loop = 1;
	}

}
