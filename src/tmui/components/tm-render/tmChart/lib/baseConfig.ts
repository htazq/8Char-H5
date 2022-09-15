import type { chartBaseConfig,PIE } from "../interface"
export const baseConfig = {
	pie:{
		legend:{
			show:false,
			textSize:11,
		},
		label:{
			show:true,
			textSize:11,
			lineWidth:2,
			_zhanbi:0,
			formart:(el:PIE.dataItemType)=>{
				return ""
			}
		}
	}
}