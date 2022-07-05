
// You can write more code here
var swatchData;
var curves = [];
var curve = null;
var size = 1.5;
var graphics;
var brushcolor = "0x000000";
var backgroundcolor = "#ffffff";
var color = new Phaser.Display.Color();
var index = 0;
var listGuides = []

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

		// Reset
		const reset = this.add.text(91, 27, "", {}).setDepth(1000);
		reset.text = "Reset";

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	preload()
	{
		//this.load.image('brush', 'assets/images/brush5.png');

		this.load.image('dp', 'assets/images/gradient-palettes.png');
		this.load.plugin(
			'rexsliderplugin',
			'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexsliderplugin.min.js',
			true);
	}

	create()
	{
		/*
		const blue_button05 = this.add.image(108, 560, "blue_button05").setOrigin(0).setDepth(1000);
		blue_button05.scaleX = 0.7356947202832798;
		blue_button05.scaleY = 0.5864405390547005;
		blue_button05.setInteractive();
		blue_button05.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP,this.clickMainMenu, this)
		 */

		var canvasDraw = this.add.image(0, 0, "gradient4-alt").setOrigin(0);
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
		// ovalo
		var ovalo = this.add.image(266, 117, "Ovalo");
		ovalo.scaleX = 0.7429615822519451;
		ovalo.active = false;
		// rombo
		var rombo = this.add.image(268, 330, "Rombo");
		rombo.scaleX = 0.7726206485913092;
		rombo.scaleY = 0.7258090510760751;
		rombo.angle = -90;
		// triangulo
		var triangulo = this.add.image(390, 294, "Triangulo");
		triangulo.scaleX = 0.45634591424237547;
		triangulo.angle = -32.00000000000006;
		// triangulo_1
		var triangulo_1 = this.add.image(158, 285, "Triangulo");
		triangulo_1.scaleX = 0.45634591424237547;
		triangulo_1.angle = 32;
		listGuides = [ovalo, rombo, triangulo, triangulo_1]
		/*
		listGuides.forEach(function(c)
		{
			c.setVisible(false);
		})
		listGuides[0].setVisible(true);
		 */

		restartGuide()
		swatch.on("pointerdown", this.changeColor, this);
		swatch.on("pointermove", this.updateColor, this);

		canvasDraw.setInteractive();
		canvasDraw.on('pointerdown', function (pointer)
		{
			lastPosition.x = pointer.x;
			lastPosition.y = pointer.y;
			firstPosition.x = pointer.x;
			firstPosition.y = pointer.y;
			curve = new Phaser.Curves.Spline([pointer.x, pointer.y]);
			curves.push(curve);
		}, this);

		canvasDraw.on('pointermove', function (pointer) {
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

		canvasDraw.on('pointerup', function (pointer) {
			if(Phaser.Math.Distance.Between(pointer.x,pointer.y, firstPosition.x, firstPosition.y) > distance)
			{
				var line = new Phaser.Curves.Line(new Phaser.Math.Vector2(pointer.x,pointer.y), firstPosition);
				graphics.lineStyle(size * 1.5, brushcolor);
				line.draw(graphics,64)
			}
			/*
			curves.forEach(function(c){
				graphics.fillPoints(c.getPoints())
				//c.draw(graphics, 64);
			});
			 */

			//var polygon = this.add.polygon(curve);
			//var shape = this.add.shape(this,"Polygon",curve);
			graphics.save();
			curves = [];
			curve = null;
			updateSpriteGuide();
		},this);


	}

	update()
	{

	}

	clickMainMenu()
	{
		this.scene.start("Menu");
	}

	//TODO: make it a pool.


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
		restartGuide();
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
function updateSpriteGuide()
{
	//Starts with the 0
	if(index < 4)
	{
		listGuides[index].setVisible(false);
		index++;
	}
	if(index < 4)
	{
		listGuides[index].setVisible(true);
	}
}

function setGuides()
{

}

function restartGuide()
{
	listGuides.forEach(function(c)
	{
		c.setVisible(false);
	})
	listGuides[0].setVisible(true);
	index = 0;
}