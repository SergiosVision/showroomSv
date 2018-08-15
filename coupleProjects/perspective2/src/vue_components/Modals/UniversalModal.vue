<template>
    <transition name="mainFade">
        <div class="t-mainDialogWrapper">
            <div @click="$router.push(redirect)" class="t-dialogOverlay"></div>
            <div class="t-mainDialog">
                <svg v-if="showEl" @click="$router.push(redirect)" class="t-mainDialogClose" width="21" height="21" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.086 10.5L.543 19.042l1.416 1.414 8.541-8.541 8.541 8.541 1.416-1.414-8.543-8.542 8.541-8.541L19.041.545 10.5 9.085 1.959.545.545 1.959l8.54 8.541z" fill="#fff"/></svg>
                <div v-if="!showEl" @click="$router.push(redirect)" class="t-mobileCloseNews">
                    <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 4.28571C16 4.28571 10.9305 4.28571 5.81818 4.28571C0 4.28571 0 10 0 10M16 4.28571L9.45455 0M16 4.28571L9.45455 8.57143" transform="translate(17 1) scale(-1 1)" stroke="#383838"/></svg>
                    <span>Назад</span>
                </div>
                <div class="t-mainDialogHeader">
                    <div class="t-mainDialogMainImg">
                        <img :src="dialogInfo.img" :alt="dialogInfo.title">
                    </div>
                </div>
                <div class="t-mainDialogBody">
                    <div class="t-mainDialogDateAndTag">
                        <div class="t-mainDialogTag">
                            <span v-if="dialogInfo.tag !== ''">{{ dialogInfo.tag }}</span>
                        </div>
                        <div v-if="dialogInfo.date !== ''" class="t-mainDialogDate">
                            <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.444 8.1H3.556v1.8h8.888V8.1zm1.778-6.3h-.889V0h-1.777v1.8H4.444V0H2.667v1.8h-.89C.792 1.8.01 2.61.01 3.6L0 16.2c0 .99.791 1.8 1.778 1.8h12.444C15.2 18 16 17.19 16 16.2V3.6c0-.99-.8-1.8-1.778-1.8zm0 14.4H1.778V6.3h12.444v9.9zm-4.444-4.5H3.556v1.8h6.222v-1.8z" fill="#000"/></svg>
                            <span>{{ dialogInfo.date }}</span>
                        </div>
                    </div>
                    <div class="t-mainDialogTitleWrapper">
                        <h1>{{ dialogInfo.title }}</h1>
                    </div>
                    <div class="t-mainDialogOutputContentWrapper">
                        <div class="t-mainDialogOutputContent" v-html="dialogInfo.content"></div>
                    </div>
                </div>
                <div class="t-mainDialogFooter">

                    <main-sharing :dialogInfo="dialogInfo"></main-sharing>

                    <div v-if="!showEl" @click="$router.push(redirect)" class="t-mobileCloseNews">
                        <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 4.28571C16 4.28571 10.9305 4.28571 5.81818 4.28571C0 4.28571 0 10 0 10M16 4.28571L9.45455 0M16 4.28571L9.45455 8.57143" transform="translate(17 1) scale(-1 1)" stroke="#383838"/></svg>
                        <span>Назад</span>
                    </div>

                </div>
            </div>
        </div>
    </transition>
</template>



<script>
    export default {
        data() {
            return {
                currentRote: window.location.href,
                showEl: true,
                renderThis: false
            }
        },
        props: ['redirect', 'dialogInfo'],
        methods: {
            buttonShow() {
                window.innerWidth > 767 ? this.showEl = true : this.showEl = false;
            }
        },
        mounted() {
            window.innerWidth > 767 ? this.showEl = true : this.showEl = false;
            window.addEventListener('resize', this.buttonShow, false);
//            console.log(this.redirect);
        },
    }
</script>

<style>

</style>