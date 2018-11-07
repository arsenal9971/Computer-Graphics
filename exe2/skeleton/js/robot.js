var Robot = function() {

    this.root = new THREE.Object3D;
};

Robot.prototype.buildRobot = function(){

    var geometry1 = new THREE.BoxGeometry( 0.22, 0.3, 0.1 );
    var geometry2 = new THREE.BoxGeometry( 0.2, 0.1, 0.1 );
	var geometry3 = new THREE.BoxGeometry( 0.1, 0.2, 0.1 );
    var geometry4 = new THREE.SphereGeometry( 0.1);


    // https://threejs.org/docs/#api/materials/MeshLambertMaterial
    var material1 = new THREE.MeshLambertMaterial( {
        color: "red",  // CSS color names can be used!
    } );


    //a mesh consists of geometry and a material; added to the scene
    var torso = new THREE.Mesh( geometry1, material1);
		
    this.root.add(torso);

	var armr = new THREE.Mesh(geometry2, material1);

	armr.position.x = 0.23;
	armr.position.y = 0.1;

	this.root.add(armr);

	var arml = new THREE.Mesh(geometry2, material1);

	arml.position.x = -0.23;
	arml.position.y = 0.1;

	this.root.add(arml);

	var legl = new THREE.Mesh(geometry3, material1);

	legl.position.y = -0.28;
	legl.position.x = -0.07;

	this.root.add(legl);

	var legr = new THREE.Mesh(geometry3, material1);

	legr.position.y = -0.28;
	legr.position.x = 0.07;

	this.root.add(legr);

    var head = new THREE.Mesh(geometry4, material1);
    
    head.position.y = 0.28

    this.root.add(head);

    return this.root
};


Robot.prototype.reset = function(){
};

Robot.prototype.selectChild = function (forward) {
};

Robot.prototype.selectSibling = function(forward){
};

Robot.prototype.toggleSelection = function(){
};

Robot.prototype.rotateOnAxis = function(axis, degree){
};
