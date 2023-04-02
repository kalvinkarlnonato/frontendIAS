export interface Inspection{
	id:number;
	team_id:number;
	type:string;
	datetime:Date;
	unit:string;
	deployment_of_personel:string;
	other_inspection_conducted:string;
	location:string;
	ts:number;
	ap:number;
	aa:number;
	dispatched:number;
	absent:number;
}