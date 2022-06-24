	
// You can write more code here
var player;
var speed = 200;
var gravity = 10;
var gravityScale = 2;
var jumpForce = 600;

var inputPlayer;

var cursors;
var spacebar;
/* START OF COMPILED CODE */

class PlayerPrefab extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "PlayerImage", frame);

		this.scaleX = 0.5;
		this.scaleY = 0.5;

		/* START-USER-CTR-CODE */
		

		player = this.scene.physics.add.existing(this);
		player.body.setCollideWorldBounds(true);
		inputPlayer = Phaser.Input.Keyboard;
		player.body.setMaxVelocityX = speed;
		//this.scene.input.keyboard.addKey
		
		this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		this.scene.events.on("update", () => this.update());
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	create()
	{
		
		console.log("Listo! Esta conectado");
		cursors = this.scene.input.keyboard.createCursorKeys();
		spacebar = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		
	}
	
	update()
	{
		
		if(inputPlayer.JustDown(spacebar))
		{
			player.body.setVelocityY(-jumpForce);
		}

		if(cursors.left.isDown)
		{
			this.scene.scale.x = -1;
			player.body.setVelocityX(-speed);
		}else if(cursors.right.isDown)
		{
			this.scene.scale.x = 1;
			player.body.setVelocityX(speed);
		}else{
			player.body.setVelocityX(0);
		}
	}	
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here