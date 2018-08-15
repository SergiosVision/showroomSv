<template>
    <div class="t-carouselCard">
        <div class="t-carouselCardImgWrapper">
            <img :src="data.photo" :alt="data.name" v-if="data.photo !== ''">
            <img src="/images/defaultPhoto.jpg" v-else>
        </div>
        <div class="t-carouselCardInfo">
            <div class="t-carouselCardName">
                <h3>{{ data.name }}</h3>
            </div>
            <div class="t-carouselCardProfession">
                <span>{{ data.profession }}</span>
            </div>
            <div class="t-carouselCardNumber">
                <span>{{ data.phone }}</span>
            </div>
            <div class="t-carouselCardEmail">
                <span>{{ data.mail }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['data']
}
</script>
