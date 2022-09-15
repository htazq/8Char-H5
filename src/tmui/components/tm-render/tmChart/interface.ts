import type { CRenderTypes,CRenderGraph,GraphShapeTypes,CRenderGraphsConfig} from "../interface"

export interface tmChartsType {
	render:CRenderTypes|null,
	pie:(selfConfig?:PIE.basePie)=>pieDrawType
}
export interface pieDrawType{
	setConfig:(config?:PIE.basePie)=>pieDrawType,
	setData:(data:Array<PIE.dataItemType>)=>pieDrawType,
	chart:()=>void,
}
// 图表基础配置表.
export interface chartBaseConfig {
	pie?:PIE.basePie
	,[key:string]:any
}

export namespace PIE {
	export interface basePie {
		legend?:{
			show?:boolean,
			textSize?:number,
		},
		label?:{
			show?:boolean,
			textSize?:number,
			lineWidth?:number,
			formart?:(item:PIE.dataItemType)=>string
		}
		,[key:string]:any
	}
	export interface dataItemType{
		name:string,
		value:number,
		color?:string,
		_zhanbi?:number,
		startzhanbi?:number,
		endzhanbi?:number,
		opts?:CRenderGraphsConfig
		formart?:(item:dataItemType)=>string;
	}
	export interface labelOpts{
		name:string,
		x:number,
		y:number,
	}
}