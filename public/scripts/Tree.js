function Tree(_point, _rot)
{

	this.pos = _point;
	this.rot = _rot;
	var index = Math.floor((Math.random()*game.assets.tree_limit)+1);
	var obj = "art_assets/tree"+index+".mdl.js";
	var tex = "art_assets/tree"+index+".jpg";

	var loader = new THREE.JSONLoader();

    loader.load( obj, function( geometry, materials){
        var texture = THREE.ImageUtils.loadTexture(tex);
        var material = new THREE.MeshBasicMaterial( { map: texture} );
		var mesh = new THREE.Mesh( geometry, material );
		mesh.scale.set(.2,.2,.2);
		
		this.ray.ray.origin = this.pos;

		this.ray.ray.origin.y = game.camera.position.y;

		var intersects = this.ray.intersectObject( game.ground );

		if ( intersects.length > 0 ) {
			this.pos.y = intersects[ 0 ].point.y;
		}

		mesh.position.x = this.pos.x;
		mesh.position.y = this.pos.y;
		mesh.position.z = this.pos.z;
		this.scene.add(mesh);

    }.bind(this) );
}
