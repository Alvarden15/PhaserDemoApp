
// You can write more code here
var swatchData;
var curves = [];
var curve = null;
var size = 1.5;
var graphics;
var brushcolor = "0x000000";
var backgroundcolor = "#ffffff";
var color = new Phaser.Display.Color();
/* START OF COMPILED CODE */

class Drawing extends Phaser.Scene {

	constructor() {
		super("Drawing");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	preload()
	{
		//this.load.image('brush', 'assets/images/brush5.png');
		//this.load.image('bg1', 'assets/images/gradient4.png');
		this.load.image('dp', 'assets/images/gradient-palettes.png');
		this.load.plugin(
			'rexsliderplugin',
			'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexsliderplugin.min.js',
			true);
	}

	create()
	{
		var green_button01 = this.add.image(123, 35, "green_button01");
		this.editorCreate();

		var distance = size;
		var lastPosition = new Phaser.Math.Vector2();
		var firstPosition = new Phaser.Math.Vector2();
		var current = null;
		var previous = null;
		green_button01.setInteractive()
			.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP,
			 this.clearCanvas,
			 this);
		graphics = this.add.graphics();

		//Preparing the color pallete
		var src = this.textures.get('dp').getSourceImage();
		swatchData = this.textures.createCanvas('swatch', src.width, src.height);
		swatchData.draw(0, 0, src);
		green_button01.setDepth(1000);
		var swatch = this.add.image(600, 0, 'dp').setOrigin(0).setDepth(1000);
		swatch.setInteractive();
				
		swatch.on("pointerdown", this.changeColor, this);
		swatch.on("pointermove", this.updateColor, this);

		this.input.on('pointerdown', function (pointer) {
			lastPosition.x = pointer.x;
			lastPosition.y = pointer.y;
			firstPosition.x = pointer.y;
			firstPosition.y = pointer.y;
			curve = new Phaser.Curves.Spline([pointer.x, pointer.y]);
			curves.push(curve);
		}, this);

		this.input.on('pointermove', function (pointer) {
			if(pointer.isDown)
			{
				var x = pointer.x;
				var y = pointer.y;
				if(Phaser.Math.Distance.Between(x,y, lastPosition.x, lastPosition.y) > distance)
				{
					lastPosition.x = pointer.x;
					lastPosition.y = pointer.y;
					previous = current;
					curve.addPoint(x,y);
					graphics.lineStyle(size * 1.5, brushcolor);
					curves.forEach(function(c){
						c.draw(graphics, 64);
					});
				}
			}
		},this);

		this.input.on('pointerup', function (pointer) {
			graphics.save();
			curves = [];
			curve = null;
		},this);
		/*
		//Add the Background
		this.add.image(0, 0, 'bg1').setOrigin(0);

		//Set the invinsible render texture to draw on it
		var rt = this.add.renderTexture(0, 0, 600, 600);

		//The draw mechanic itself
		this.input.on('pointermove', function (pointer) {

			if (pointer.isDown)
			{
				//Important note: the way the draw gets the color is different.
				//for example: it get values like 0xffffff (red),
				//With the way it's now, it gives an inaccurate color
				//There has to be a conversion

				rt.draw('brush', pointer.x - 4, pointer.y - 4, 1, color.color32);
			}

		}, this);
		*/

	}

	update()
	{

	}

	changeColor(pointer, x, y, event)
	{
		swatchData.getPixel(x, y, color)
		console.log("Color: " + Phaser.Display.Color.RGBToString(color.red, color.green, color.blue, color.alpha));
		brushcolor = Phaser.Display.Color.RGBToString(color.red, color.green, color.blue, color.alpha).replace("#","0x");
		event.stopPropagation();
	}

	updateColor(pointer, x, y, event)
	{
		if (!pointer.isDown) {
			return;
		}

		swatchData.getPixel(x, y, color);
		brushcolor = Phaser.Display.Color.RGBToString(color.red, color.green, color.blue, color.alpha).replace("#","0x");
		event.stopPropagation();
	}

	clearCanvas()
	{
		graphics.clear();
	}

	changeBrushSize()
	{
		var brushsize = 2;
		size = brushsize;
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
