
// You can write more code here
var menuButton;
/* START OF COMPILED CODE */

class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// dino
		const dino = this.add.image(400, 218, "dino");

		// text_1
		const text_1 = this.add.text(400, 408, "", {});
		text_1.setOrigin(0.5, 0.5);
		text_1.text = "Phaser 3 + Phaser Editor 2D";
		text_1.setStyle({ "fontFamily": "Arial", "fontSize": "30px" });

		// Player
		const player = new PlayerPrefab(this, 267, 502);
		this.add.existing(player);

		// dino (components)
		new PushOnClick(dino);

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write more your code here

	create() {

		this.editorCreate();
		// green_button01
		menuButton = this.add.image(132, 83, "green_button01");

		// text_2
		const text_2 = this.add.text(89, 63, "", {});
		text_2.scaleX = 2.186064493398654;
		text_2.scaleY = 2.536050281219824;
		text_2.text = "Menu";
		text_2.setStyle({ "align": "center" });
		menuButton.setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP,this.onMenuButtonClick, this);
	}

	onMenuButtonClick()
	{
		menuButton.removeInteractive();
		this.scene.start("Menu");
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
