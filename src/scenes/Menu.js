
// You can write more code here
var startButton;
var optionsButton;
var exitButton;
/* START OF COMPILED CODE */

class Menu extends Phaser.Scene {

	constructor() {
		super("Menu");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// text_1
		const text_1 = this.add.text(296, 90, "", {});
		text_1.text = "Game Demo";
		text_1.setStyle({ "fontSize": "48px" });

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {
		this.editorCreate();
		this.start();
	}

	start(){
		startButton = this.add.image(430, 219, "blue_button05");
		optionsButton = this.add.image(430, 319, "blue_button05");
		exitButton = this.add.image(431, 418, "blue_button05");
		const text_3 = this.add.text(373, 319, "", {});
		text_3.text = "Drawing Demo";

		const text_4 = this.add.text(373, 418, "", {});
		text_4.text = "End Game";
		this.cameras.main.fadeIn(500,0,0,0);

		// text_2
		const text_2 = this.add.text(373, 209, "", {});
		text_2.text = "Start Scene";
		startButton
			.setInteractive()
			.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP
				, this.onButtonClick,
				this);
		optionsButton
			.setInteractive()
			.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP
				, this.onDrawButtonClick
				,this);
	}

	onButtonClick(){
		startButton.removeInteractive();
		optionsButton.removeInteractive();
		/* Phaser.Tweens.
		startButton.add.tween({
			targets: this.gameObject,
			scaleX: "*=1.2",
			scaleY: "*=1.2",
			duration: 80,
			yoyo: true
		})*/
		
		this.cameras.main.fadeOut(500,0,0,0);
		this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
			()=>{this.scene.start("Level")});
	}

	onDrawButtonClick()
	{
		startButton.removeInteractive();
		optionsButton.removeInteractive();
		this.cameras.main.fadeOut(500,0,0,0);
		this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
			() => {this.scene.start("Drawing")});
	}

	update()
	{

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
