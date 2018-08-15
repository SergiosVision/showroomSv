<template>
    <router-link tag="div" :to="{name: 'NewsInside', params: {slug: news.title}}" class="t-newsCard" :class="{'t-newsCardSmall': $route.path === '/'}">
        <div class="t-newsCardImgWrapper">
            <img :src="news.img" :alt="news.title">
            <div class="t-newsCardTitleInsideImgWrapper">
                <h4>{{ news.title }}</h4>
            </div>
        </div>
        <div class="t-newsCardInfo">
            <div class="t-newsCardMainBigDate">
                <div class="t-newsCardDate">
                    <svg width="16" height="18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.444 8.1H3.556v1.8h8.888V8.1zm1.778-6.3h-.889V0h-1.777v1.8H4.444V0H2.667v1.8h-.89C.792 1.8.01 2.61.01 3.6L0 16.2c0 .99.791 1.8 1.778 1.8h12.444C15.2 18 16 17.19 16 16.2V3.6c0-.99-.8-1.8-1.778-1.8zm0 14.4H1.778V6.3h12.444v9.9zm-4.444-4.5H3.556v1.8h6.222v-1.8z" fill="#000"/></svg>
                    <span>{{ news.date }}</span>
                </div>
            </div>
            <div class="t-newsCardTitleAndDescription">
                <div class="t-newsCardTitleMain">
                    <h4>{{ news.title }}</h4>
                </div>
                <div class="t-newsCardDescriptionMain">
                    <p>{{ news.prevDescription }}</p>
                </div>
            </div>
            <div class="t-newsCardDateAndReadMore">
                <div class="t-newsCardDate">
                    <svg width="16" height="18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.444 8.1H3.556v1.8h8.888V8.1zm1.778-6.3h-.889V0h-1.777v1.8H4.444V0H2.667v1.8h-.89C.792 1.8.01 2.61.01 3.6L0 16.2c0 .99.791 1.8 1.778 1.8h12.444C15.2 18 16 17.19 16 16.2V3.6c0-.99-.8-1.8-1.778-1.8zm0 14.4H1.778V6.3h12.444v9.9zm-4.444-4.5H3.556v1.8h6.222v-1.8z" fill="#000"/></svg>
                    <span>{{ news.date }}</span>
                </div>
                <div class="t-newsCardReadMore">
                    <svg width="20" height="13" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity=".8" d="M19 5.714H7.545C1 5.714 1 12 1 12m18-6.286L11.636 1M19 5.714l-7.364 4.715" stroke="#2574CF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    <span>Подробнее</span>
                </div>
            </div>
        </div>
    </router-link>
</template>



<script>
    export default {
        props: ['news'],
    }
</script>

<style>

</style>