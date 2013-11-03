
GLmol.prototype.spin = function(){
	dx = this.x;
	dy = this.y;
	
	//Modify stored X value
	this.x = parseFloat(dx) + .002;
	this.y = parseFloat(dy) + .002;
	
	var r = Math.sqrt(dx * dx + dy * dy);
	var rs = Math.sin(r * Math.PI) / r;
	this.dq.x = Math.cos(r * Math.PI);
	this.dq.y = 0;
	this.dq.z =  rs * dx;
	this.dq.w =  rs * dy;
	this.rotationGroup.quaternion = new THREE.Quaternion(1, 0, 0, 0);
	this.rotationGroup.quaternion.multiplySelf(this.dq);
	this.rotationGroup.quaternion.multiplySelf(this.cq);
	this.show();
	//window.requestAnimationFrame($.proxy(game_glmol.spin, game_glmol));
	window.requestAnimationFrame($.proxy(this.spin, this));
}
