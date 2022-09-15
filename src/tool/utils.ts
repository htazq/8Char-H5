import {useBaziStore} from '@/store/bazi';
import {Solar} from 'lunar-javascript';
import {shishenTiangan, shishenDizhi} from '@/config/shishen-ganzhi';
import {
    chengguYearAtom,
    chengguMonthAtom,
    chengguDayAtom,
    chengguTimeAtom,
    chengguResult
} from '@/config/book/chenggu';
import {tianganList, dizhiList, shengxiaoList} from "@/config/common"
import {wuxingLabelList} from '@/config/data/wuxing.ts';
import {wuxingToShishenList} from '@/config/data/wuxing';

// 隐藏时间内秒单位
export const HideTimeSecond = (time: any): string => {
    const solar = Solar.fromDate(new Date(time));
    let date = solar.toYmdHms().replace(/-/g, '/');
    return date.substr(0, date.lastIndexOf(':'));
}

// 天罡称骨计算
export const ChengGuComputed = (y: string, m: number, d: number, t: number): {} => {
    let total = chengguYearAtom[y] + chengguMonthAtom[m - 1] + chengguDayAtom[d - 1] + chengguTimeAtom[t];
    total = total.toFixed(1)
    const chineseNumber = ['一', '二', '三', '四', '五', '六', '七', '八', '九'];
    var key = '';
    if (total == 1) {
        key = '一两';
    } else {
        let _total = String(total);
        let diff: any = _total.split('.');
        if (diff[0] != 0) key = chineseNumber[diff[0] - 1] + '两';
        if (diff[1] != 0) key += chineseNumber[diff[1] - 1] + '钱';
    }
    const chenggu = chengguResult[key] ?? {}
    chenggu.total = key
    return chenggu;
}

// 获取十神
export const GetShiShen = (ganzhi: string): string => {
    const baziStore = useBaziStore();

    const selfgan = baziStore.tiangan.day;

    let gan = null;
    let zhi = null;
    if (ganzhi == '童限') {
        gan = baziStore.tiangan.year;
        zhi = baziStore.dizhi.year;
    } else {
        gan = ganzhi[0];
        zhi = ganzhi[1];
    }
    return TransformShiShen(shishenTiangan[selfgan][gan]) + TransformShiShen(shishenDizhi[selfgan][zhi]);
}

// 转换简写十神
export const TransformShiShen = (str: string): string => {
    const map: any = {
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
    return map[str];
}

// 转换五行
export const TransformWuXing = (str: string, type = 't') => {
    let list = [];
    let el: string[] = [];
    if (type == 't') {
        // 天干
        list = tianganList;
        el = ['木', '木', '火', '火', '土', '土', '金', '金', '水', '水'];
    } else if (type == 'd') {
        // 地支
        list = dizhiList;
        el = ['水', '土', '木', '木', '土', '火', '火', '土', '金', '金', '土', '水'];
    } else if (type == 's') {
        // 生肖
        list = shengxiaoList;
        el = ['水', '土', '木', '木', '土', '火', '火', '土', '金', '金', '土', '水'];
    }
    return el[list.indexOf(str)] || '*';
}

// 结构数组
export const DeArray = (arr: any, type = 'default', reArr = false) => {
    if (type == 'canggan') {
        let str = [];
        for (let key of arr) {
            str.push(key + TransformWuXing(key))
        }
        return reArr ? str : str.join('\r\n');
    } else {
        return reArr ? arr : arr.join('\r\n');
    }
}

// 获取生肖头像URL
export const GetChineseZodiac = sx => {
    const index = shengxiaoList.indexOf(sx);
    let path;
    if (index !== -1) {
        path = `/zodiac/${index}.svg`
    } else {
        path = `/site/logo.svg`
    }
    return `/static/icon${path}`;
}

// 计算五行个数
export const ComputedWuXing = (obj: any, type = "default") => {
    let str = obj.getYearWuXing() + obj.getMonthWuXing() + obj.getDayWuXing() + obj.getTimeWuXing()
    if (type == "all") {
        const list = [...obj.getYearHideGan(), ...obj.getMonthHideGan(), ...obj.getDayHideGan(), ...obj.getTimeHideGan()]
        for (let item of list) {
            str += TransformWuXing(item)
        }
    }
    const num = [0, 0, 0, 0, 0];
    const wuxing = str.split("")
    let rg = 0;
    for (let i = 0; i < wuxing.length; i++) {
        const index = wuxingLabelList.indexOf(wuxing[i]);
        if (i == 4) rg = index
        ++num[index]
    }
    return {
        list: num,
        total: wuxing.length,
        label: wuxingToShishenList[rg]
    };
}

// 日主天干转十神
export const TianGanToShiShen = (str: string): string[] => {
    const list = wuxingToShishenList;
    return list[wuxingLabelList.indexOf(str)];
}
