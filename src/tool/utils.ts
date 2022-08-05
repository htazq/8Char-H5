import { useBaziStore } from '@/store/bazi.ts';
import { Solar } from 'lunar-javascript';
import { shishen_tiangan, shishen_dizhi } from '@/config/shishen-ganzhi.ts';
import { chenggu_year_atom, chenggu_month_atom, chenggu_day_atom, chenggu_time_atom,chenggu_result } from '@/config/chenggu.ts';

export default {
	// 获取十神
	GetShiShen(ganzhi) {
		const bazi_store = useBaziStore();

		const selfgan = bazi_store.tiangan.day;

		let gan = null;
		let zhi = null;
		if (ganzhi == '小运') {
			gan = bazi_store.tiangan.year;
			zhi = bazi_store.dizhi.year;
		} else {
			gan = ganzhi[0];
			zhi = ganzhi[1];
		}

		return this.TransformShiShen(shishen_tiangan[selfgan][gan], shishen_dizhi[selfgan][zhi]);
	},
	// 转换十神
	TransformShiShen(a, b) {
		const map = {
			正印: '印',
			正官: '官',
			劫财: '劫',
			伤官: '伤',
			正财: '财',
			七杀: '杀',
			偏印: '枭',
			比肩: '比',
			食神: '食',
			偏财: '才'
		};
		return map[a] + map[b];
	},
	// 获取五行
	Get5Elements(str, type = 't') {
		let list = [];
		let el = [];
		if (type == 't') {
			// 天干
			list = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
			el = ['木', '木', '火', '火', '土', '土', '金', '金', '水', '水'];
		} else if (type == 'd') {
			// 地支
			list = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
			el = ['水', '土', '木', '木', '土', '火', '火', '土', '金', '金', '土', '水'];
		} else if (type == 's') {
			// 生肖
			list = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
			el = ['水', '土', '木', '木', '土', '火', '火', '土', '金', '金', '土', '水'];
		}
		return el[list.indexOf(str)] || '*';
	},
	// 结构数组
	DeArray(arr, type = 'default') {
		if (type == 'canggan') {
			let str = '';
			for (let key of arr) {
				str += key + this.Get5Elements(key) + '\r\n';
			}
			return str;
		} else {
			return arr.join('\r\n');
		}
	},
	HideSecond(time) {
		const solar = Solar.fromDate(new Date(time));
		let date = solar.toYmdHms().replace(/-/g, '/');
		date = date.substr(0, date.lastIndexOf(':'));
		return date;
	},
	// 天罡称骨计算
	ChengGuComputed(y, m, d, t) {
		let total = chenggu_year_atom[y] + chenggu_month_atom[m - 1] + chenggu_day_atom[d - 1] + chenggu_time_atom[t];
		total = total.toFixed(1)
		const chinese_number = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];
		var key = '';
		if (total == 1) {
			key = '一两';
		} else {
			let _total = String(total);
			let diff = _total.split('.');
			if (diff[0] != 0) key = chinese_number[diff[0] - 1] + '两';
			if (diff[1] != 0) key += chinese_number[diff[1] - 1] + '钱';
		}
		const chenggu = chenggu_result[key]??{}
		chenggu.total = key
		return chenggu;
	},
	NumberSqual(a, b) {
		return Math.abs(a - b) < Number.EPSILON;
	}
};
