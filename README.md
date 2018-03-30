# Phaser Tutorial
This project is for scaffolding phaser game with typescript.

You can setup the phaser environment with following the guilde line below.

# I. VSCode 이용하여 세팅
본문에서는 **TypeScript** 를 이용한 Phaser 초기 세팅을 설명합니다. pure JavaScript(es5/es6)로 세팅하는 방법은 추후 작성할 예정입니다.


## 0. Prerequisite
본문의 내용을 진행하기 위해서는 다음의 준비사항이 필요합니다.
- Visual Studio Code 설치 : [VS Code download link](https://code.visualstudio.com/)
- npm 설치 : [nodejs download link](https://nodejs.org/en/download/) (npm : node package manager, yarn 등을 이용할 수도 있으나 본문에서는 npm을 사용합니다.)
- TypeScript 설치
    ```shell
    // Install TypeScript Globally using npm
    $ npm install -g typescript
    ```


## 1.npm initialization
원하는 프로젝트 폴더를 생성한 후, 터미널에서 다음 명령어를 입력합니다.
편의상 설명에서 프로젝트 루트를 ***${projectRoot}*** 라고 줄여서 설명하겠습니다.

```shell
// npm 프로젝트 생성
$ npm init -y
$ npm i phaser-ce --save-dev
...

// 폴더 생성
$ mkdir -p public/assets/img
$ mkdir -p public/assets/css
$ mkdir -p public/assets/js
$ mkdir -p public/libs/
$ mkdir -p src
...

// phaser 관련 파일을 실제 웹서버가 위치하는 경로로 복사
$ cp node_modules/phaser-ce/build/phaser.js ./public/libs
$ cp node_modules/phaser-ce/build/phaser.min.js ./public/libs
```


### 참고
위의 phaser 관련 파일 복사에서는 **개발** 용으로 phaser.js 를 복사하였습니다. **배포**시에는 phaser.min.js를 이용해야합니다.


## 2. TypeScript initialization
```shell
$ tsc --init
```

***${projectRoot}*** 에 생성된 ``````tsconfig.json`````` 파일에 다음과 같이 설정을 해줍니다.tsconfig.json 파일을 이용하여 typescript를 JavaScript로 컴파일하게 되는데, 컴파일 및 번들링된 app.js 파일을 이용해 phaser를 로드합니다.

tsconfig.json 에 대한 상세 내용은 [링크](http://www.typescriptlang.org/docs/handbook/tsconfig-json.html)를 참조하시길 바랍니다.

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "system",
    "outFile": "./public/assets/js/app.js",
    "outDir": "./public/assets/js",
    "allowJs": true,
    "sourceMap": true
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

### 참고
***compilerOptions.module*** 의 값이 ***system*** 인 이유는 해당 본문에서 bundling된 JavaScript파일을 참조하기 위해서입니다. 많이 사용하는 module 중 ***commonJS*** 는 bundling을 지원하지 않으므로(outFile 파라미터 이용 불가), 따로 webPack등을 이용해 bundling 작업이 필요합니다. commonJS 사용법에 대해서는 ~~부록에서 다루도록 하겠습니다.~~ 다음 기회에 다루도록 하겠습니다.



## 3. Write index.html
***${projectRoot}/public*** 위치에 ``````index.html`````` 파일을 생성하고 다음 코드를 작성합니다. 해당 파일이 실제로 웹페이지에 로딩이 되고, 작성할 Phaser Game이 올라가게 됩니다.
```html
<!DOCTYPE html>
<html>
<head>
    <title>Phaser Application</title>

    <!-- Phaser JS -->
    <script src="libs/phaser.min.js"></script>

    <!-- My Game JS -->
    <script src="assets/js/app.js"></script>
</head>

<body>
    <!-- #myCanvas 하위에 canvas가 올라가게 됩니다. -->
    <div id="myCanvas"></div>
</body>
</html>
```



## 4. Write game classes

### 1) game.ts
***${projectRoot}/src*** 하위에 ``````game.ts`````` 파일을 생성하고, 다음과 같이 작성해줍니다. 해당 파일에서는 웹페이지 로드가 완료된 후, HelloWorld 객체를 생성 및 호출을 해줍니다.

```typescript
// Path : src/game.ts
// load and initialize the Game.HelloWorld in window.onload event
window.onload = () => {
    const width = 800;
    const height = 600;
    const parentDivId = 'myCanvas';
    const game = new Game.HelloWorld(width, height, parentDivId);
};
```


### 2) HelloWorld.ts
***${projectRoot}/src*** 하위에 ``````HelloWorld.ts`````` 파일을 생성하고 다음과 같이 작성해줍니다. 해당 파일의 HelloWorld 클래스는 **Phaser.Game** 를 상속받아서, Canvas에 렌더링을 해줍니다.

첫 줄의 `/// <reference ...` 구문은 TypeScript에서 import 와 같은 역할을 합니다.

```typescript
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
```


### 3) Intro.ts
***${projectRoot}/src*** 하위에 ``````Intro.ts`````` 파일을 생성하고 다음과 같이 작성해줍니다.
아래 클래스는 **Phaser.State** 를 상속받아 구현되며, Scene의 역할을 합니다.

```typescript
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
```

## 5. Run
위의 개발이 끝나고 나면, 실제 렌더링을 확인해 볼 수 있습니다.
Live Server Plugin 을 설치 및 웹서버를 구동 후, 컴파일된 TypeScript 를 로딩한 index.html 을 불러옵니다.


### Run tsc watch
웹서버를 띄워주기 전에, TypeScript 를 JavaScript로 컴파일해줘야합니다. 이 때, 매번 TypeScript 파일 변경시마다 컴파일하는 수고를 덜어주기 위해, ***${projectRoot}*** 에서 다음과 같이 입력해줍니다.

```shell
$ tsc --watch
```
위의 명령어를 입력하면, tsconfig.json 파일 설정에 따라서, ***${projectRoot}/public/assets/js*** 위치에 컴파일된 ``````app.js`````` 파일이 번들링되어 생성됩니다.


### Run Live Server (plugin)
[Live Server](https://github.com/ritwickdey/live-server-web-extension) 플러그인을 설치해줍니다.
현재, WebServer Root는 자동적으로 ***${projectRoot}*** 가 될 것이므로, ***{$projectRoot/public}*** 으로 변경해주어야합니다. 해당 설정 파일은 ``````${projectRoot}/.vscode/settings.json`````` 에 있습니다. 해당 파일을 연 후, 다음과 같이 설정을 추가해줍니다.

```json
{
	"liveServer.settings.root": "/public"
}
```

위 설정 후, Live Server를 실행해주면(VSCode상, *"Go Live"* 버튼) 구현된 Canvas 를 확인 할 수 있습니다.


