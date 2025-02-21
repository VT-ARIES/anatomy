import * as THREE from "../../modules/three.js";
import UIElement from "./uielem.js";

export default class Block2D extends UIElement {

    constructor(parameters) {

        super();

        let color = 0x0;
        let scale = [1,1];
        let pos = [0,0,0];
        let transparent = false;
        let opacity = 1;

        this.is_image = true;

        if (parameters.color) {
            color = parameters.color;
            this.is_image = false;
        }
        if (parameters.src) {
            this.src = parameters.src;
        }
        if (parameters.width)
            scale[0] = parameters.width;
        if (parameters.height)
            scale[1] = parameters.height;
        if (parameters.x)
            pos[0] = parameters.x;
        if (parameters.y)
            pos[1] = parameters.y;
        if (parameters.z)
            pos[2] = parameters.z;
        if (parameters.transparent)
            transparent = parameters.transparent;
        if (parameters.opacity)
            opacity = parameters.opacity;
        

        let geometry = new THREE.PlaneGeometry( scale[0], scale[1]);
        let material;
        if (!this.is_image) 
            material = new THREE.MeshBasicMaterial( {color: color, transparent: transparent, opacity:opacity, side:THREE.DoubleSide} );
        else {
            material = new THREE.MeshBasicMaterial( {color: 0xffffff, transparent: transparent, opacity:opacity, side:THREE.DoubleSide} );
            this.loadTexture(this.src);
        }
        let mesh = new THREE.Mesh( geometry, material );
        mesh.position.set(pos[0],pos[1],pos[2]);

        this.bindMesh(this, mesh);
    }

    async loadTexture() {
        let me = this;

        new THREE.TextureLoader().load( this.src, texture=>{
            me.mesh.material = new THREE.MeshBasicMaterial( { map: texture, wireframe: false, transparent: true } );

        } );
    }

    setColor(val) {
        if (!this.is_image)
            this.mesh.material.color.set(val);
    }

    getColor() {
        if (!this.is_image)
            return this.mesh.material.color.getHex();
    }
}
