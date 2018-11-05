function degToRad(deg)
{
  return deg * 0.0174532925;
}
function radToDeg(rad)
{
  return rad * 57.2958;
}

THREE.Vector3.XAxis = new THREE.Vector3( 1, 0, 0 );
THREE.Vector3.YAxis = new THREE.Vector3( 0, 1, 0 );
THREE.Vector3.ZAxis = new THREE.Vector3( 0, 0, 1 );
THREE.Vector3.Zeros = new THREE.Vector3( 0, 0, 0 );


//from https://soledadpenades.com/articles/three-js-tutorials/drawing-the-coordinate-axes/
function buildAxes ( length ) {
  var axes = new THREE.Object3D();

  axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( length, 0, 0 ), 0xFF0000, false ) ); // +X
  axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, length, 0 ), 0x00FF00, false ) ); // +Y
  axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, length ), 0x0000FF, false ) ); // +Z

  return axes;
}

function buildAxis ( src, dst, colorHex, dashed ) {
 var geom = new THREE.Geometry(),
 mat;

 if(dashed) {
   mat = new THREE.LineDashedMaterial({ linewidth: 3, color: colorHex, dashSize: 3, gapSize: 3 });
 } else {
   mat = new THREE.LineBasicMaterial({ linewidth: 3, color: colorHex });
 }

 geom.vertices.push( src.clone() );
 geom.vertices.push( dst.clone() );
 geom.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines

 var axis = new THREE.Line( geom, mat, THREE.LineSegments );

 return axis;
}

function toggleVisibility(element) {
    var style = element.style;
    if (style.visibility != "hidden") {
        style.visibility = "hidden";
    } else {
        style.visibility = "visible";
    }
}
