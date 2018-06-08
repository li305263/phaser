// 添加自定义场景
var loadScene = {
    key:'loadScene',
    active:true,
    preload: loadPreload,
    create: loadCreate,
    update: update
}
var gameStartScene = {
    key:'gameStartScene',
    create: gameCreate,
    update: update
}
var gameOverScene = {
    key:'gameOverScene',
    create:overCreate
}
// 游戏配置
var config = {
    type: Phaser.AUTO,
    width: 750,
    height: 550,
    transparent :true,
    scene: [loadScene,gameStartScene,gameOverScene],
};
var bg,playerGroup,scoreText,cropRect,star,timeText,timeFn;
var player = {}
var hole = {}
var OVER = false
var score = 0
var time = 30
var game = new Phaser.Game(config);
// loding函数
function loadFn(){
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
        x: width / 2,
        y: height / 2 - 50,
        text: 'Loading...',
        style: {
            font: '20px monospace',
            fill: '#ffffff'
        }
    });
    loadingText.setOrigin(0.5, 0.5);
    
    var percentText = this.make.text({
        x: width / 2,
        y: height / 2 - 5,
        text: '0%',
        style: {
            font: '18px monospace',
            fill: '#ffffff'
        }
    });
    percentText.setOrigin(0.5, 0.5);
    
    this.load.on('progress', function (value) {
        percentText.setText(parseInt(value * 100) + '%');
    });

    this.load.on('complete', function () {
        loadingText.destroy();
        percentText.destroy();
    }); 
}
// 预加载
function loadPreload() {
    // 加载图片资源
    this.load.image('block','assets/images/block.png')
    this.load.image('help','assets/images/help.png')
    this.load.image('line1','assets/images/line1.png')
    this.load.image('line2','assets/images/line2.png')
    this.load.image('myScore','assets/images/myScore.png')
    this.load.image('share','assets/images/share.png')
    this.load.image('wu','assets/images/wu.png')
    this.load.image('ygdbns','assets/images/ygdbns.png')
    //加载雪碧图资源
    this.load.spritesheet('xiaoren','assets/images/xiaoren.png',{frameWidth:22.6,frameHeight:38})
    this.load.spritesheet('button','assets/images/button.png',{frameWidth:272,frameHeight:80})
    loadFn.call(this)    
}

function createPlayer(){
    
    
}
function updatePlayer(){


}


// 游戏准备
function loadCreate(){
    
}

// 游戏开始
function gameCreate() { 
    
}
function overCreate() {
    
}
function restart(){
       
}
function gameOver(that){

}

//  更新函数
function update() {


    
}