
/*
 * This is main.js which is referenced directly from within
 * a <script> node in index.html
 */

// "use strict" means that some strange JavaScript things are forbidden
"use strict";

var camera, scene, renderer;
var geometry, material, mesh;
var stats;
var controls;

/*********************************/
/**********    SETUP    **********/
/*********************************/

function main() {
  init();
  animate();
}

function init()
{
  setupEventListener();

  // https://threejs.org/docs/#api/scenes/Scene
	scene = new THREE.Scene();

  setupCamera ();
  setupControls();
  setupLight();
  setupGeometry();

  // https://threejs.org/docs/#api/renderers/WebGLRenderer
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight);
	document.body.appendChild( renderer.domElement );

  //this is how you output to the debugger console
  window.console.log("end init method");

  //add performance logging
  stats = new Stats();
  stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild( stats.dom );

  render();
}

function setupEventListener()
{
	window.addEventListener( 'resize', onWindowResize, false );

  document.addEventListener("keydown", onDocumentKeyDown, false);
  document.addEventListener("mousedown", onDocumentMouseDown, false);
  document.addEventListener("mousemove", onDocumentMouseMove, false);
  document.addEventListener("mouseup", onDocumentMouseUp, false);
}

function setupCamera()
{
  var VIEW_ANGLE = 70;
  var ASPECT_RATIO = window.innerWidth / window.innerHeight;
  var NEAR_PLANE = 0.01;
  var FAR_PLANE = 10;

  // https://threejs.org/docs/#api/cameras/PerspectiveCamera
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT_RATIO, NEAR_PLANE, FAR_PLANE );
	camera.position.z = 1;
  camera.lookAt(scene.position);
}

function setupControls()
{
    // https://github.com/mrdoob/three.js/tree/master/examples/js/controls
    controls = new THREE.TrackballControls( camera );
				controls.rotateSpeed = 3.0;
				controls.zoomSpeed = 1.2;
				controls.panSpeed = 0.8;
				controls.noZoom = false;
				controls.noPan = false;
				controls.staticMoving = true;
				controls.dynamicDampingFactor = 0.3;
				controls.keys = [ 65, 83, 68 ];
				controls.addEventListener( 'change', render );
}

function setupGeometry()
{
    // https://threejs.org/docs/#api/core/Geometry
  	geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );

    // https://threejs.org/docs/#api/materials/MeshLambertMaterial
  	material = new THREE.MeshLambertMaterial( {
                  color: "red",  // CSS color names can be used!
     } );

    //a mesh consists of geometry and a material; added to the scene
  	mesh = new THREE.Mesh( geometry, material );
    
    scene.add( mesh );
}

function setupLight()
{
  // https://threejs.org/docs/#api/lights/PointLight
  var light = new THREE.PointLight( 0xffffcc, 1, 100 );
  light.position.set( 10, 30, 15 );
  scene.add(light);

  var light2 = new THREE.PointLight( 0xffffcc, 1, 100 );
  light2.position.set( 10, -30, -15 );
  scene.add(light2);

  scene.add( new THREE.AmbientLight(0x999999) );
}

/*********************************/
/**********    UDPATE    *********/
/*********************************/

function animate()
{
	requestAnimationFrame( animate );
  stats.update();
	controls.update();
}

function render() {
	 renderer.render( scene, camera );
	 stats.update();
}

/*********************************/
/********* EVENT HANDLER *********/
/*********************************/

//event handler that is called when the window is resized
function onWindowResize()
{
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight);
  render();
}

function onDocumentKeyDown(event) {
    //as alternative to event.key one can use event.which that returns the ASCII codes, e.g., r = 82
    var keyCode = event.key;

    // window.console.log("key input (ASCII): " + event.which + ". key input (KEY): " + keyCode);

    var translateOffset = .01;

    switch(keyCode)
    {
      case "r": // r
        controls.reset();
        mesh.position.set(0,0,0);
        mesh.setRotationFromEuler(new THREE.Euler(0,0,0));
        break;
      case "ArrowLeft":
        mesh.translateOnAxis(THREE.Vector3.XAxis,-translateOffset);
        break;
      case "ArrowRight":
        mesh.translateOnAxis(THREE.Vector3.XAxis,translateOffset);
        break;
      case "ArrowUp":
        mesh.translateOnAxis(THREE.Vector3.YAxis,translateOffset);
        break;
      case "ArrowDown":
        mesh.translateOnAxis(THREE.Vector3.YAxis,-translateOffset);
        break;
      case "k":
        mesh.rotateX(degToRad(2));
        break;
      case "l":
        mesh.rotateY(degToRad(-2));
        break;
    }
    render();
};

function onDocumentMouseDown(event)
{
    //event.button 0 - 4 gives right, middle, left, side button
    // window.console.log("mouse down at " + event.x + " / " + event.y + " with button " + event.button);
}

function onDocumentMouseMove(event)
{
    // window.console.log("mouse move");
}

function onDocumentMouseUp(event)
{
    //event.button 0 - 4 gives right, middle, left, side button
      // window.console.log("mouse up at " + event.x + " / " + event.y + " with button " + event.button);
}
