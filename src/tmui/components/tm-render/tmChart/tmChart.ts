import type {CRenderGraph,CRenderTypes,CRenderGraphsConfig} from "@/tmui/components/tm-render/interface"
import {
	fade,
	toHex,
	toRgb,
	darken,
	lighten,
	getOpacity,
	getRgbValue,
	getRgbaValue,
	getColorFromRgbValue
} from "@/tmui/components/tm-render/crender/index"
import  { baseConfig } from "./lib/baseConfig"
import type { chartBaseConfig,PIE } from "./interface"
import colors  from "./lib/colors"
import {pieDraw}  from "./lib/pie"
export class tmCharts {
	render:CRenderTypes|null = null;
	private config:chartBaseConfig
	constructor(render:CRenderTypes,config:chartBaseConfig=baseConfig){
		this.config = {...baseConfig,...config}
		if(!render){
			console.error("请提供tmRender渲染引擎!")
			return;
		}
		this.render = render;
		return this;
	}
	
	pie(selfConfig:PIE.basePie=baseConfig.pie){
		return new pieDraw(this.render,{...this.config.pie,...selfConfig})
	}
	
}
