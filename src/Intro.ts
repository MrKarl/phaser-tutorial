// Path : src/Intro.ts
// Phaser State Class
module State {
	export class Intro extends Phaser.State {
		constructor() {
			super();
		}

		preload() {
			console.log('Intro State is on preload');

			this.addTweenText();
		}

		create() {
			console.log('Intro State is on create');
		}

		update() {
			// 매 프레임마다 업데이트 될 내용을 구현합니다.
		}

		render() {
			this.game.debug.cameraInfo(this.game.camera, 32, 32);
		}

		addTweenText() {
			const helloworldText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Hello World', {
				font: '60px Arial;',
				fill: '#ffffff'
			});

			helloworldText.anchor.setTo(0.5, 0.5);
			helloworldText.alpha = 0.1;

			const tweenText = this.game.tweens.create(helloworldText).to({
				alpha: 1
			}, 200, Phaser.Easing.Quartic.InOut, true, 0, -1);
		}
	}
}