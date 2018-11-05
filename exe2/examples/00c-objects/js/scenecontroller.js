var SceneController = function(document)
{
    this.scene = new THREE.Scene();
    this.stats = new Stats();
  	this.renderer = new THREE.WebGLRenderer( { antialias: true } );
}

SceneController.prototype.setup = function()
{
    // https://threejs.org/docs/#api/renderers/WebGLRenderer
  	this.renderer.setSize( window.innerWidth, window.innerHeight);
  	document.body.appendChild( this.renderer.domElement );

    //add performance logging
    this.stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( this.stats.dom );

    this.setupCamera();
    this.setupControls();
    this.setupLight();
    this.setupGeometry();

    this.render();
    this.animate();
}

SceneController.prototype.setupCamera = function()
{
  var VIEW_ANGLE = 70;
  var ASPECT_RATIO = window.innerWidth / window.innerHeight;
  var NEAR_PLANE = 0.01;
  var FAR_PLANE = 10;

  // https://threejs.org/docs/#api/cameras/PerspectiveCamera
	this.camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT_RATIO, NEAR_PLANE, FAR_PLANE );
	this.camera.position.z = 1;
  this.camera.lookAt(this.scene.position);
}

SceneController.prototype.setupControls = function()
{
    // https://github.com/mrdoob/three.js/tree/master/examples/js/controls
    this.controls = new THREE.TrackballControls( this.camera );
				this.controls.rotateSpeed = 3.0;
				this.controls.zoomSpeed = 1.2;
				this.controls.panSpeed = 0.8;
				this.controls.noZoom = false;
				this.controls.noPan = false;
				this.controls.staticMoving = true;
				this.controls.dynamicDampingFactor = 0.3;
				this.controls.keys = [ 65, 83, 68 ];
        //bind? --> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
				this.controls.addEventListener( 'change', this.render.bind(this) );
}

SceneController.prototype.setupGeometry = function()
{
    // https://threejs.org/docs/#api/core/Geometry
  	this.geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );

    // https://threejs.org/docs/#api/materials/MeshLambertMaterial
  	this.material = new THREE.MeshLambertMaterial( {
                  color: "red",  // CSS color names can be used!
     } );

    //a mesh consists of geometry and a material; added to the scene
  	this.mesh = new THREE.Mesh( this.geometry, this.material );

    this.scene.add( this.mesh );
}

SceneController.prototype.setupLight = function()
{
  // https://threejs.org/docs/#api/lights/PointLight
  var light = new THREE.PointLight( 0xffffcc, 1, 100 );
  light.position.set( 10, 30, 15 );
  this.scene.add(light);

  var light2 = new THREE.PointLight( 0xffffcc, 1, 100 );
  light2.position.set( 10, -30, -15 );
  this.scene.add(light2);

  this.scene.add( new THREE.AmbientLight(0x999999) );
}

SceneController.prototype.render = function() {
  this.renderer.render( this.scene, this.camera );
  this.stats.update();
}

SceneController.prototype.animate = function()
{
  //bind? --> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
	requestAnimationFrame( this.animate.bind(this) );
  this.stats.update();
	this.controls.update();
}
