import * as THREE from 'three'
import Turtle from "./turtle";
import World3D from "./world3d";
import LSystem from 'lindenmayer';

document.getElementById("add-rules")?.addEventListener("click",()=>{
    const rules = document.getElementById("rules");
    if(rules!=null){
        const newRule:HTMLDivElement = document.createElement('div');
        newRule.classList.add('flex');
        newRule.classList.add('mt-3');
        newRule.innerHTML = '<input type="text" class="bg-gray-900 text-gray-400 w-1/6 h-7 p-2 rounded-lg variable" maxlength="1"> = '+
                            '<input type="text" class="bg-gray-900 text-gray-400 w-4/6 h-7 p-2 rounded-lg rule">'+
                            '<button class="bg-red-900 rounded-full w-1/6 text-center ml-2 border-2 border-gray-600 hover:bg-red-700  cursor-pointer delete-rule" onclick="deleteRule(event)">x</button>';
        rules.appendChild(newRule);
        }       
},false);


document.getElementById("generate")?.addEventListener("click",()=>{
    //const x0 = (document.getElementById("x0") as HTMLInputElement).value;
    //const y0 = (document.getElementById("y0") as HTMLInputElement).value;
    const length:number = Number((document.getElementById("lineLength") as HTMLInputElement).value);
    //const iniAngle = (document.getElementById("iniAngle") as HTMLInputElement).value;
    const angle:number = Number((document.getElementById("rotAngle") as HTMLInputElement).value);
    const iterations:number = Number((document.getElementById("iteraitions") as HTMLInputElement).value);
    const axiom = (document.getElementById("axiom") as HTMLInputElement).value;
    const variable = (document.getElementsByClassName("variable") as unknown as HTMLInputElement[]);
    const rule = (document.getElementsByClassName("rule") as unknown as HTMLInputElement[]);
    let productions:any = {};
    for(let i=0;i<variable.length;i++){
        productions[variable[i].value] = rule[i].value;
    }
    const fractalpoints = drawFractal({length,angle,axiom,productions,iterations});
    const points:THREE.Vector3[] = [];
    fractalpoints.map(e => {
      points.push(new THREE.Vector3(e.x, e.y, 0.0))
    })

    const material = new THREE.LineBasicMaterial({
      color: 0xffffff,
      linewidth: 1,
      linecap: 'round', //ignored by WebGLRenderer
      linejoin: 'round' //ignored by WebGLRenderer
    });

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const line = new THREE.Line(geometry, material);

    world3d.clearscene();
    world3d.addMesh(line);
    },false);

const canvas:any = document.getElementById("canvas");

let world3d:any;
world3d = new World3D(canvas);

const turtle = new Turtle();

for(let i=0; i<4;i++){
    turtle.forward();
    turtle.right();
  }

const points:THREE.Vector3[] = [];
const pointsTurtle = turtle.getPoints();
pointsTurtle.map(e => {
  points.push(new THREE.Vector3(e.x, e.y, 0.0))
})

const material = new THREE.LineBasicMaterial({
  color: 0xffff00,
  linewidth: 1,
  linecap: 'round', //ignored by WebGLRenderer
  linejoin: 'round' //ignored by WebGLRenderer
});

const geometry = new THREE.BufferGeometry().setFromPoints(points);

const line = new THREE.Line(geometry, material);

world3d.addMesh(line);

function drawFractal({ length, angle, axiom, productions ,iterations}: { length: number; angle: number; axiom: string; productions: any; iterations:number; }){
	const turtle = new Turtle();
	turtle.setLength(length);
	turtle.setAngle( angle *(Math.PI/180) );
	let kochcurve = new LSystem({
		axiom,
		productions
  });

  let result = kochcurve.iterate(iterations);
  result = result.split('');
  result.map((e:string)=>{
      if(e.match(/[A-Z]/i)){
        turtle.forward()
        return;
      }else if(e === '+'){
          turtle.left()
          return;
      }
      else if(e === '-'){
        turtle.right();
        return ;  
      }else{
          return;
      }
  });
  return turtle.getPoints();
  }