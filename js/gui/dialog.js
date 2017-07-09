
class Dialog {

	constructor(title, width = 400, height = 300){
		this.title = title;
		this.create(width, height);
	}

	create(width, height){
		var dialog = $('<div></div>');
		dialog.addClass('dialog');
		dialog.css({
			'width' : width,
			'height' : height,
			'margin-left' : -Math.round(width / 2),
			'margin-top' : -Math.round(height / 2),
			'top' : '50%',
			'left' : '50%'
		});

		var title = $('<h4></h4>');
		title.text(this.title);
		dialog.append(title);

		var content = $('<div></div>');
		content.addClass('content');
		dialog.append(content);

		this.object = dialog;
		$('body').append(dialog);
	}

	destroy(){
		if(this.object){
			this.object.remove();
			this.object = null;
		}
	}

}
