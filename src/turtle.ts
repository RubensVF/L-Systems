
export type point = {
	x:number;
	y:number;
};

export default class Turtle{
	private _lenght:number;
	private currentPosition:point;
	private angleRotation:number;
	private currentAngle:number;
	private points: point[];
	constructor(lenght:number = 1,
				angle:number = Math.PI/2,
				initPoistion:point = {x:0.0,y:0.0},
				initAngle:number = 0,
		){
		this._lenght = lenght;
		this.angleRotation = angle;
		this.currentPosition = initPoistion; 
		this.currentAngle = initAngle;
		this.points = [this.currentPosition];
	}
	forward():void{
		const x:number = this.currentPosition.x + this._lenght*Math.cos(this.currentAngle);
		const y:number = this.currentPosition.y + this._lenght*Math.sin(this.currentAngle);
		const newposition:point = {x,y};
		this.points.push(newposition);
		this.currentPosition = newposition;
	}
	right():void{
		this.currentAngle+= this.angleRotation;
	}
	left():void{
		this.currentAngle-= this.angleRotation;
	}
	getPoints():point[] {
		return this.points;
	}	
	setLength(lenght:number){
		this._lenght = lenght;
	}
	setAngle(angle:number){
		this.angleRotation = angle;
	}
}

