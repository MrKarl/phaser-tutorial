var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
window.onload = function () {
    var width = 800;
    var height = 600;
    var parentDivId = 'myCanvas';
    var game = new Game.HelloWorld(width, height, parentDivId);
};
/// <reference path="../node_modules/phaser-ce/typescript/phaser.d.ts"/>
// Path : src/HelloWorld.ts
// Phaser Game Class
var Game;
/// <reference path="../node_modules/phaser-ce/typescript/phaser.d.ts"/>
// Path : src/HelloWorld.ts
// Phaser Game Class
(function (Game) {
    var HelloWorld = /** @class */ (function (_super) {
        __extends(HelloWorld, _super);
        function HelloWorld(width, height, parentId) {
            var _this = _super.call(this, width, height, Phaser.AUTO, parentId, null) || this;
            // Declare the States
            _this.state.add('Intro', State.Intro);
            // Start with Intro State
            _this.state.start('Intro');
            return _this;
        }
        return HelloWorld;
    }(Phaser.Game));
    Game.HelloWorld = HelloWorld;
})(Game || (Game = {}));
// Path : src/Intro.ts
// Phaser State Class
var State;
// Path : src/Intro.ts
// Phaser State Class
(function (State) {
    var Intro = /** @class */ (function (_super) {
        __extends(Intro, _super);
        function Intro() {
            return _super.call(this) || this;
        }
        Intro.prototype.preload = function () {
            console.log('Intro State is on preload');
            this.addTweenText();
        };
        Intro.prototype.create = function () {
            console.log('Intro State is on create');
        };
        Intro.prototype.update = function () {
            // 매 프레임마다 업데이트 될 내용을 구현합니다.
        };
        Intro.prototype.render = function () {
            this.game.debug.cameraInfo(this.game.camera, 32, 32);
        };
        Intro.prototype.addTweenText = function () {
            var helloworldText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Hello World', {
                font: '60px Arial;',
                fill: '#ffffff'
            });
            helloworldText.anchor.setTo(0.5, 0.5);
            helloworldText.alpha = 0.1;
            var tweenText = this.game.tweens.create(helloworldText).to({
                alpha: 1
            }, 200, Phaser.Easing.Quartic.InOut, true, 0, -1);
        };
        return Intro;
    }(Phaser.State));
    State.Intro = Intro;
})(State || (State = {}));
//# sourceMappingURL=app.js.map