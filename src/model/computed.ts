import { Post, APP_API } from '@/tool/request';

export const GetDetail = data => Post('/8char/get-detail', data, APP_API);
