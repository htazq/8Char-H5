<script setup lang="ts">
import { onPageNotFound } from '@dcloudio/uni-app';

onPageNotFound(() => {
	uni.redirectTo({
		url: '/pages/index/index'
	});
});
</script>

<style>
/* #ifdef APP-NVUE */
@import './tmui/scss/nvue.css';
/* #endif */
/* #ifndef APP-NVUE */
@import './tmui/scss/noNvue.css';
/* #endif */

/* #ifdef H5 */
body::-webkit-scrollbar,
div::-webkit-scrollbar,
*::-webkit-scrollbar {
	display: none;
}

body.pages-index-index uni-page-body,
body {
	padding-bottom: 0 !important;
}
text{
  font-family:"sans-serif";
}
/* #endif */
</style>
