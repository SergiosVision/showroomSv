<template>
	<div class="t-mainInsideContainer">
		<div class="t-fullWidthContainer404">
			<div class="t-404BackgroundOverlay"></div>
			<div class="t-404Content">
				<h1 class="t-404">404</h1>
				<p class="t-404Text">Ошибка: такой страницы не существует</p>
				<router-link tag="button" to="/" type="button" class="t-btn t-moreBtn t-404ReturnBack">На главную</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'E404',
		data() {
		    return {

			}
		}
	}
</script>