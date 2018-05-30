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
var bg,playerGroup,scoreText,cropRect,star = null
var player = {}
var hole = {}
var OVER = false
var score = 0
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
    this.load.image('background','assets/images/bg_canvas.png')
    this.load.image('hammer','assets/images/hammer.png')
    //加载音效
    // this.load.audio('score','assets/images/score.wav')
    // this.load.audio('ground-hit','assets/images/ground-hit.wav')
    // this.load.audio('pipe-hit','assets/images/pipe-hit.wav')
    //加载雪碧图资源
    // this.load.spritesheet('icon','assets/images/icon.png')
    this.load.spritesheet('star','assets/images/star.png',{frameWidth:125,frameHeight:77})
    // this.load.spritesheet('next','assets/images/next.png')
    this.load.spritesheet('hole','assets/images/bg_hole.png',{frameWidth:144,frameHeight:80})
    this.load.spritesheet('mouse','assets/images/mouse.png',{frameWidth:137,frameHeight:120})
    loadFn.call(this)    
}
var playerPos = {
    mouse1:{
            x:190,
            y:330,
        },
    mouse2:{
            x:375,
            y:330
        },
    mouse3:{
            x:575,
            y:340
        },
    mouse4:{
            x:160,
            y:422
        },
    mouse5:{
            x:375,
            y:422
        },
    mouse6:{
            x:575,
            y:422
        },
    mouse7:{
            x:160,
            y:516
        },
    mouse8:{
            x:375,
            y:526
        },
    mouse9:{
            x:595,
            y:530
        }
}
function createPlayer(){
    playerGroup = this.add.group()
    player.mouse1 = playerGroup.create(playerPos.mouse1.x,playerPos.mouse1.y,'mouse',0).setInteractive().setVisible(false)
    player.mouse2 = playerGroup.create(playerPos.mouse2.x,playerPos.mouse2.y,'mouse',4).setInteractive().setVisible(false)
    player.mouse3 = playerGroup.create(playerPos.mouse3.x,playerPos.mouse3.y,'mouse',8).setInteractive().setVisible(false)
    
    player.mouse4 = playerGroup.create(playerPos.mouse4.x,playerPos.mouse4.y,'mouse',12).setDepth(1).setInteractive().setVisible(false)
    player.mouse5 = playerGroup.create(playerPos.mouse5.x,playerPos.mouse5.y,'mouse',16).setDepth(1).setInteractive().setVisible(false)
    player.mouse6 = playerGroup.create(playerPos.mouse6.x,playerPos.mouse6.y,'mouse',0).setDepth(1).setInteractive().setVisible(false)

    player.mouse7 = playerGroup.create(playerPos.mouse7.x,playerPos.mouse7.y,'mouse',0).setDepth(2).setInteractive().setVisible(false)
    player.mouse8= playerGroup.create(playerPos.mouse8.x,playerPos.mouse8.y,'mouse',4).setDepth(2).setInteractive().setVisible(false)
    player.mouse9 = playerGroup.create(playerPos.mouse9.x,playerPos.mouse9.y,'mouse',12).setDepth(2).setInteractive().setVisible(false)
}
function updatePlayer(){
    
}
function createHole(){
    hole = this.add.group()
    hole.hole1 = hole.create(200,294,'hole',0)
    hole.hole2 = hole.create(386,294,'hole',1)
    hole.hole3 = hole.create(580,294,'hole',2)   
    hole.hole4 = hole.create(172,368,'hole',3).setDepth(1)
    hole.hole5 = hole.create(386,372,'hole',4).setDepth(1)
    hole.hole6 = hole.create(584,370,'hole',5).setDepth(1)
    hole.hole7 = hole.create(166,446,'hole',6).setDepth(2)
    hole.hole8 = hole.create(386,452,'hole',7).setDepth(2)
    hole.hole9 = hole.create(606,454,'hole',8).setDepth(2)
}
function startAn(x,y){
    if(star){
        star.x = x
        star.y = y
        star.anims.play('star')
    }else{
        star = this.add.sprite(x,y-20,'star').setDepth(3)
        this.anims.create({
            key:'star',
            frames:this.anims.generateFrameNumbers('star',{mouse : 0,end : 11}),
            frameRate:20,
        })
        star.anims.play('star')
    }
}
// 游戏准备
function loadCreate(){
    var that = this
    // 添加背景进画布    
    bg = this.add.tileSprite(config.width/2, config.height/2, config.width, config.height, 'background')
    
    createPlayer.call(this)
    createHole.call(this)
    
    
    //添加动画
    that.anims.create({
        key:'hit',
        frames:that.anims.generateFrameNumbers('mouse',{mouse : 2,end : 3}),
        frameRate:20,
    })
    
    for(var i in player){
        (function(i){
                
                player[i].on('pointerdown',function(){
                    startAn.call(that,player[i].x,player[i].y)
                    player[i].anims.play('hit')
                })
        })(i)
    }
    // startButton.on('pointerdown', function (pointer) {
    //     game.scene.start('gameStartScene');
    // });
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
var upSpeed = 0
var ySpeed = 0
//  更新函数
function update() {
    var that = this  
    if(upSpeed<120){
        upSpeed=upSpeed+2.5
    }
    if(ySpeed<112){
        ySpeed= ySpeed+2
    }

    player.mouse9.setVisible(true)
    player.mouse9.frame.height = upSpeed;
    player.mouse9.frame.cutHeight = upSpeed;
    player.mouse9.frame.updateUVs();
    player.mouse9.y = playerPos.mouse9.y -  ySpeed
    
}