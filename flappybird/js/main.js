// 游戏配置
var config = {
    type: Phaser.AUTO,
    width: 288,
    height: 505,
    // 设置重力
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
// 预加载
function preload() {
    // 加载图片资源
    this.load.image('background','assets/background.png')
    this.load.image('ground','assets/ground.png')
    //加载雪碧图资源
    this.load.spritesheet('pipes','assets/pipes.png',{frameWidth:54,frameHeight:320})
    this.load.spritesheet('bird','assets/bird.png',{frameWidth:34,frameHeight:24})

    console.log('preload');
}

var platforms, play = null

// 游戏角色降落补间动画
function downTween (){
    this.tweens.add({
        targets: player,
        duration:200,
        angle:20,
    })  
}

// 加载完成执行
function create() {
    // 添加背景进画布
    var bg = this.add.tileSprite(config.width/2, config.height/2, config.width, config.height, 'background')
    var ground = this.add.tileSprite(config.width-335/2, config.height-112/2, 335, 112, 'ground')
    
    //添加静态物理物体组
    platforms = this.physics.add.staticGroup()


    platforms.create(200,50,"pipes")
    //添加有重力的游戏角色
    player = this.physics.add.sprite(100,100,'bird')

    //添加碰撞
    this.physics.add.collider(player,platforms,function(){
        console.log('发送碰撞了')
    })
    //设置碰撞回弹值
    player.setBounce(0.2);
    //设置重力边界
    player.setCollideWorldBounds(true);
    //添加动画
    this.anims.create({
        key:'fly',
        frames:this.anims.generateFrameNumbers('bird',{start : 0,end : 2}),
        frameRate:10,
        repeat:-1,
    })
    // 执行降落动画
    downTween.call(this)

    // 角色飞行动画
    
    player.anims.play('fly')
    
    console.log('create');
   
}
/*
    Mouse/touch events
    scene.input.on('pointerdown', function(pointer, currentlyOver){ });
    scene.input.on('pointerup', function(pointer, currentlyOver){ });
    scene.input.on('pointermove', function(pointer, currentlyOver){ });
    scene.input.on('pointerover', function(pointer, justOver){ });
    scene.input.on('pointerout', function(pointer, justOut){ });
*/
//  更新函数
function update() {
    var that = this
    //添加按下事件监听
    this.input.on('pointerdown', function(pointer, currentlyOver){
        
        that.tweens.add({
            targets: player,
            duration:200,
            angle:-20,
        })
        //设置角色Y轴速度
        player.setVelocityY(-150)     
    });

    this.input.on('pointerup', function(pointer, justOut){
        downTween.call(that)
    });

    console.log('update1');
}