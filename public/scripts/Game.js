function Game()
{

  this.testString = "Here I am";
  this.inputControls = new Input(this);  

  this.player = new Player(this); 
  this.shadowList = new Array();
  this.treeList = new Array();
  this.ShadowSpawner = new ShadowSpawner(this);



  this.scene;


  //TIME
  this.clock = new THREE.Clock();
  this.delta = 0; 

  // this.isPulse = false; 
  // this.wasPulse = false; 

  // this.pulseloopTime = 0;
  // this.pulseloopTotalTime = 1000; 
  
  // this.pulselength = 100;
  // this.pulseIntensity = 0; 
  // this.pulseIntensityMax = 100; 
  // this.pulseTime = 0;
  // this.wubtime = 600;
  // this.dubtime = 750;

  //WORLD INFO:
  var worldWidth = 56, worldDepth = 56;
	this.ground;
	this.sunLight;
	this.skyColor = 0xefd1b5;

  this.init = function(){
    this.setupThree();
  }

  this.setupThree = function(){
    this.renderer = new THREE.WebGLRenderer( {clearColor: this.skyColor, antialias: true } );
      this.renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( this.renderer.domElement );


      this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 5000 );
        this.camera.position.z = 400;
        this.camera.position.y = 200;
        this.camera.rotation.copy(this.player.camRot);
  

        this.projector = new THREE.Projector();

        this.scene = new THREE.Scene();



        this.SetupWorld();

  } 

  this.SetupWorld = function(){

  		this.scene.fog = new THREE.FogExp2( this.skyColor, 0.0025 );

  		//GROUND PLANE
   		var data = this.generateHeight( worldWidth, worldDepth );

		var geometry = new THREE.PlaneGeometry( 7000, 7000, worldWidth - 1, worldDepth - 1 );
		geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );

		for ( var i = 0, l = geometry.vertices.length; i < l; i ++ ) {

			geometry.vertices[ i ].y = data[ i ] *5;

		}
		var groundTexture = THREE.ImageUtils.loadTexture("../art_assets/concrete-tile.png");
		var groundMaterial = new THREE.MeshLambertMaterial( { color: 0x483d28} );
		geometry.computeFaceNormals();
		this.ground =  new THREE.Mesh( geometry, groundMaterial );
		this.scene.add(this.ground);


		//SUN LIGHT
		this.light = new THREE.DirectionalLight( 0xffffff, 1, 0);
		this.light.position.y = 300;
		this.light.rotation.y = Math.PI;
		this.light.rotation.x = Math.PI/2;

		this.scene.add(this.light);

    var loader = new THREE.JSONLoader();
    loader.load( "art_assets/tree1mdl.js", function( geometry, material){
        var texture = mojo.assets["tree1"];
        var material = new THREE.MeshBasicMaterial( {map: texture} );
        var mesh = new THREE.Mesh( geometry, material );
        mesh.scale.set(.1,.1,.1);
        mesh.position.x = 0;
        mesh.position.y = 0;
        mesh.position.z = 0;
        game.scene.add(mesh);
      });
    
       
    var geometry2 = new THREE.CubeGeometry( 200, 200, 200 );
   	var material = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true} );
   	var mesh = new THREE.Mesh( geometry2, material );
   	this.scene.add( mesh );
    
  this.itemspawner = new ItemSpawner();
  }


  this.Render = function(){
  	this.renderer.render(this.scene,this.camera);
  }

  this.Update = function()
  {
  	this.delta = this.clock.getDelta();
  	//this.input.Update();
    //PulseSwitch();
    this.ShadowSpawner.Update();
    this.ShadowUpdate();
    this.player.Update();
    this.CameraUpdate();
    this.Render();
    this.ShadowUpdate();

  }

  this.CameraUpdate = function(){
  	this.camera.position.x = this.player.pos.x;
  	this.camera.position.y = this.player.pos.y + this.player.eyeHeight;
  	this.camera.position.z = this.player.pos.z;
    this.camera.rotation.copy(this.player.camRot);
    //this.camera.lookAt(this.player.camTargetWorld);
    
  }

  this.PulseSwitch = function()
  {
    console.log(this.clock.getDelta());
    // this.wasPulse = this.isPulse; 

    // this.pulseLoopTime += this.delta; 
    // if(this.pulseLoopTime > this.pulseloopTotalTime) this.pulseLoopTime = 0; 

    // if(this.isPulse) this.pulseTime += this.delta; 
    // if(this.pulsetime> this.pulselength)
    // { 
    //   this.pulsetime = 0;
    //   this.isPulse = false; 
    // }
    // if((this.pulseLoopTime > this.wubtime || this.pulseLoopTime > this.dubtime) && !this.isPulse)
    // {
    //   this.isPulse = true; 
    //   console.log("THUMP");
    // }




    // //<   switch logic here  >

    
    // if(this.isPulse && !this.wasPulse)// begin pulse  for
    // {
    //   for (var s in this.shadowList)
    //   {
    //     this.shadowList[s].Move(); 
    //   }
    // }
    // if(!this.isPulse && this.wasPulse)// end pulse  
    // {
     
    // }

  }



  this.setPulse = function()
  {

  }

  this.ShadowUpdate = function()
  {
    for (var s in this.shadowList)
      {
        this.shadowList[s].Update(); 
      }

  }


  this.generateHeight = function( width, height ) {

				var size = width * height, data = new Float32Array( size ),
				perlin = new ImprovedNoise(), quality = 1, z = Math.random() * 100;

				for ( var i = 0; i < size; i ++ ) {

					data[ i ] = 0

				}

				for ( var j = 0; j < 4; j ++ ) {

					for ( var i = 0; i < size; i ++ ) {

						var x = i % width, y = ~~ ( i / width );
						data[ i ] += Math.abs( perlin.noise( x / quality, y / quality, z ) * quality * 1.75 );


					}

					quality *= 5;

				}

				return data;

			}




  
}
