import { defineStore } from 'pinia';
import { Solar } from 'lunar-javascript';
import { ChengGuComputed,TransformWuXing } from '@/tool/utils';
import { DTS_LIST } from '@/config/book/diTianSui';
import {
	SFTK_DAYGAN_MONTH,SFTK_DAYGAN, SFTK_MONTHZHI,
} from '@/config/book/shenFengTongKao';
import { BZTY_LIST } from '@/config/book/baZiTiYao';
import {
	TYWX_DAY, TYWX_DAYGAN, TYWX_DAYGAN_TIMEZHI
} from '@/config/book/tianYuanWuXian';
import { QTBJ_LIST } from '@/config/book/qiongTongBaoJian';
import { LZXMS_LIST } from '@/config/book/liZhongXuMingShu';
import { SMTH_DAYGAN,SMTH_DAY_TIME,SMTH_MONTHZHI_DAYGAN,SMTH_MONTHZHI_DAYGANWUXING } from '@/config/book/sanMingTongHui';
import { WXJJ_DAYGAN,WXJJ_DAY_AND_TIME,WXJJ_DAY_OR_YEAR,WXJJ_DAYGANWUXING,WXJJ_MONTHZHI } from '@/config/book/wuXingJingJi';

interface GAN_ZHI {
	year: String;
	month: String;
	day: String;
	time: String;
}

export const useBookStore = defineStore('book', {
	state: () => {
		return {
			chenggu: {},
			list: []
		};
	},
	actions: {
		DealList(timestamp, gender, sect) {
			this.list = [];
			const solar = Solar.fromDate(new Date(timestamp));
			const lunar = solar.getLunar();

			const bazi = lunar.getEightChar();
			bazi.setSect(sect);

			const tiangan:GAN_ZHI = {
				year: bazi.getYearGan(),
				month: bazi.getMonthGan(),
				day: bazi.getDayGan(),
				time: bazi.getTimeGan()
			};

			const dizhi:GAN_ZHI = {
				year: bazi.getYearZhi(),
				month: bazi.getMonthZhi(),
				day: bazi.getDayZhi(),
				time: bazi.getTimeZhi()
			};

			this.chenggu = this.DEAL_TGCG(bazi.getYear(), Math.abs(lunar.getMonth()), lunar.getDay(), lunar.getTimeZhiIndex(),gender);
			this.AddItemToList(this.DEAL_DTS(tiangan));
			this.AddItemToList(this.DEAL_SFKT(tiangan,dizhi));
			this.AddItemToList(this.DEAL_BZTY(tiangan,dizhi));
			this.AddItemToList(this.DEAL_TYWX(tiangan,dizhi));
			this.AddItemToList(this.DEAL_QTBJ(tiangan,dizhi));
			this.AddItemToList(this.DEAL_LZXMS(tiangan,dizhi));
			this.AddItemToList(this.DEAL_SMTH(tiangan,dizhi));
			this.AddItemToList(this.DEAL_WXJJ(tiangan,dizhi));


		},
		AddItemToList(item){
			if(item) this.list.push(item)
		},
		// 天罡称骨
		DEAL_TGCG(y: string, m: number, d: number, t: number,gender: number):any{
			const chenggu = ChengGuComputed(y, m, d, t);
			return {
				sign: gender == 1 ? chenggu.man : chenggu.woman,
				tip: gender == 1 ? chenggu.typesMan : chenggu.typesWoman,
				note: gender == 1 ? chenggu.notesMan : chenggu.notesWoman,
				total: chenggu.total
			};
		},
		// 滴天髓
		DEAL_DTS(tiangan:GAN_ZHI ){
			return {
				title: '滴天髓',
				icon: 'tmicon-ios-water',
				content: [{ title: null, content: DTS_LIST[tiangan.day] }]
			}
		},
		// 神峰考通
		DEAL_SFKT(tiangan:GAN_ZHI ,dizhi:GAN_ZHI ){
			const list = [];

			list.push({
				title: '金不换髓歌',
				content: SFTK_DAYGAN_MONTH[tiangan.day][dizhi.month]
			});

			list.push({
				title: '十天干体象全编论',
				content: SFTK_DAYGAN[tiangan.day]
			});

			list.push({
				title: '十二支咏',
				content: SFTK_MONTHZHI[dizhi.month]
			});

			return {
				title: '神峰考通',
				icon: 'tmicon-layer-group',
				content: list
			};
		},
		// 八字提要
		DEAL_BZTY(tiangan:GAN_ZHI ,dizhi:GAN_ZHI ){
			if(BZTY_LIST[dizhi.month][tiangan.day]?.[tiangan.time+dizhi.time]){
				return {
					title: "八字提要",
					icon: 'tmicon-md-ribbon',
					content: [{title:`${dizhi.month}月${tiangan.day}日${tiangan.time+dizhi.time}时`,content:BZTY_LIST[dizhi.month][tiangan.day]?.[tiangan.time+dizhi.time]}]
				};
			}
		},
		// 天元巫咸
		DEAL_TYWX(tiangan:GAN_ZHI ,dizhi:GAN_ZHI ){
			const list = []
			list.push({
				title: '日柱',
				content: TYWX_DAY[tiangan.day+dizhi.day]
			});

			list.push({
				title: '时柱',
				content: TYWX_DAYGAN_TIMEZHI[tiangan.day][dizhi.time]
			});

			list.push({
				title: '总论',
				content: TYWX_DAYGAN[tiangan.day]
			});

			return {
				title: "天元巫咸",
				icon: 'tmicon-paper-plane',
				content: list
			};
		},
		// 穷通宝鉴
		DEAL_QTBJ(tiangan:GAN_ZHI ,dizhi:GAN_ZHI ){
			let content = "";
			for(let item of QTBJ_LIST){
				const diff = item.key.split(",");
				if(diff[1] == tiangan.day){
					if(diff[0].indexOf(dizhi.month) != -1){
						content = item.content;
						break;
					}
				}
			}

			if(content){
				return {
					title: "穷通宝鉴",
					icon: 'tmicon-ios-bookmarks',
					content: [{title:null,content:content}]
				};
			}
		},
		// 李中虚命书
		DEAL_LZXMS(tiangan:GAN_ZHI ,dizhi:GAN_ZHI){
			const list = [];
			list.push({
				title: '论年柱',
				content: LZXMS_LIST[tiangan.year + dizhi.year]
			})

			list.push({
				title: '论日柱',
				content: LZXMS_LIST[tiangan.day + dizhi.day]
			})

			return {
				title: "李中虚命书",
				icon: 'tmicon-flag-fill',
				content: list
			};
		},
		// 三命通会
		DEAL_SMTH(tiangan:GAN_ZHI ,dizhi:GAN_ZHI){
			const list = [];
			list.push({
				title: '六十甲子日时断',
				content: SMTH_DAY_TIME[tiangan.day+dizhi.day][tiangan.time+dizhi.time]
			})

			list.push({
				title: '论日干',
				content: SMTH_DAYGAN[tiangan.day]
			})

			const md_list = SMTH_MONTHZHI_DAYGAN[dizhi.month]
			for(let key in md_list){
				if(key.indexOf(tiangan.day) != -1){
					list.push({
						title: `论${dizhi.month}月，${tiangan.day}日干`,
						content:md_list[key]
					})
				}
			}

			const wx_day = TransformWuXing(tiangan.day)

			list.push({
				title: `论${dizhi.month}月，日干${wx_day}五行`,
				content: SMTH_MONTHZHI_DAYGANWUXING[dizhi.month][wx_day]
			})

			return {
				title: "三命通会",
				icon: 'tmicon-process',
				content: list
			};
		},
		// 五行精纪
		DEAL_WXJJ(tiangan:GAN_ZHI ,dizhi:GAN_ZHI){
			const list = [];
			list.push({
				title: '论年柱',
				content: WXJJ_DAY_OR_YEAR[tiangan.year+dizhi.year]
			})

			list.push({
				title: '论日柱',
				content: WXJJ_DAY_OR_YEAR[tiangan.day+dizhi.day]
			})

			for(let key in WXJJ_DAYGAN){
				if(key.indexOf(tiangan.day) != -1){
					list.push({
						title: `论日干`,
						content:WXJJ_DAYGAN[key]
					})
				}
			}

			const day_time = tiangan.day + dizhi.day + tiangan.time + dizhi.time
			if(WXJJ_DAY_AND_TIME[day_time]){
				list.push({
					title: '论年月日时胎',
					content: WXJJ_DAY_AND_TIME[day_time]
				})
			}

			list.push({
				title: `论五行`,
				content: WXJJ_DAYGANWUXING[TransformWuXing(tiangan.day)]
			})

			list.push({
				title: '论十二节气',
				content: WXJJ_MONTHZHI[dizhi.month]
			})

			return {
				title: "五行精纪",
				icon: 'tmicon-ios-star',
				content: list
			};
		},
	}
});
