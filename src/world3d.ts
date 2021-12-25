import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
export default class World3D{
    private canvas:HTMLDivElement;
    private scene:THREE.Scene;
    private camera:THREE.PerspectiveCamera;
    private renderer:THREE.WebGLRenderer;
    private animations:any[];
    private controls:OrbitControls;
    constructor( canvas:HTMLDivElement ){
      this.canvas = canvas;
      const width = canvas?.clientWidth;
      const height =  canvas?.clientHeight;
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x020229);
      this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      this.camera.position.z = 5;
      this.renderer = new THREE.WebGLRenderer({antialias: true});
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(width, height);
      canvas.appendChild(this.renderer.domElement);
      window.addEventListener('resize', () => {
        this.onWindowResize();
      }, false);
      this.renderer.render(this.scene, this.camera);
      this.animate();
      this.animations = [];
      this.controls = new OrbitControls(this.camera,this.renderer.domElement);
      this.controls.update()
      }
      addMesh(mesh:any){
        this.scene.add(mesh);
      }
      onWindowResize() {
        this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
      }
      addAnimation(animation:any){
        this.animations.push(animation);
      }
      clearscene(){
        while(this.scene.children.length > 0){ 
          this.scene.remove(this.scene.children[0]); 
      }
      }
      animate(){
        requestAnimationFrame(() => {
          this.renderer.render(this.scene, this.camera);
          this.animate();
          this.controls.update()
          this.animations.map((animation)=>{
            animation();
          })
        });
      }
  }