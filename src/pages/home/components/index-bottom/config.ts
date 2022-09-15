interface friendOpts {
	icon: string;
	title: string;
	type: string;
	url?: string;
}

interface supportListOpts {
	icon: string;
	label: string;
	img: string;
}

export const friendList: friendOpts[][] = [
	[
		{
			icon: '/static/icon/git/github.gif',
			title: 'GitHub',
			type: 'route',
			url: 'https://github.com/axbug/8Char-H5'
		},
		{
			icon: '/static/icon/git/gitee.gif',
			title: 'Gitee',
			type: 'route',
			url: 'https://gitee.com/yxbug/8Char-H5'
		},
		{
			icon: '/static/icon/git/coding.gif',
			title: 'Coding',
			type: 'route',
			url: 'https://yxbug-cn.coding.net/public/yixue/8Char-H5/git/files'
		}
	],
	[
		{
			icon: '/static/icon/site/laboratory.gif',
			title: 'Web实验室',
			type: 'route',
			url: 'https://app.yxbug.cn/'
		},
		{
			icon: '/static/icon/site/logo.svg',
			title: '作者博客',
			type: 'route',
			url: 'https://blog.yxbug.cn/'
		},
		{
			icon: '/static/icon/other/support.svg',
			title: '赞助项目',
			type: 'support'
		}
	]
];

export const supportList: supportListOpts[] = [
	{
		icon: 'tmicon-weixinzhifu',
		label: '微信',
		img: '/static/icon/support/wechat.gif'
	},
	{
		icon: 'tmicon-alipay',
		label: '支付宝',
		img: '/static/icon/support/alipay.gif'
	},
	{
		icon: 'tmicon-QQ',
		label: 'QQ',
		img: '/static/icon/support/qq.gif'
	}
];

export const supportContent: string =
	'1个手艺人需要粉丝养活，希望您能成为其中之一，我将持续更新项目以回报您的支持，赞助金将用于服务器维护和公益，赞助请备注大名，未来版本将有赞助榜，感谢您的赞助与支持！';
