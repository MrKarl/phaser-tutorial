/// <reference path="../node_modules/phaser-ce/typescript/phaser.d.ts"/>

// Path : src/HelloWorld.ts
// Phaser Game Class
module Game {
	export class HelloWorld extends Phaser.Game {
		constructor(width: number, height: number, parentId: string) {
			super(width, height, Phaser.AUTO, parentId, null);

			// Declare the States
			this.state.add('Intro', State.Intro);

			// Start with Intro State
			this.state.start('Intro');
		}
	}
}