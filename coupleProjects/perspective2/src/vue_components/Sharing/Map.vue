<template>
    <div class="t-smallMapHolder">
        <transition name="mainFade">
            <div v-if="loadingState" class="t-loadingStateMap"><span>Загрузка...</span></div>
        </transition>
        <div class="t-yaMapHolder" :id="'t-yandexMap_' + index"></div>
    </div>
</template>



<script>
    export default {
        props: ['index', 'companyData'],
        data() {
            return {
                loadingState: false
            }
        },
        computed: {

        },
        mounted() {
            ymaps.ready(res => res)
                .then(res => {
                    this.loadingState = true;
                    res.geocode(this.companyData.address).then(resInside => {
                        const myMap = new res.Map('t-yandexMap_' + this.index, {
                            center: resInside.geoObjects.get(0).geometry.getCoordinates(),
                            zoom : 15,
                            controls: []
                        });
                        const myPlacemark = new res.Placemark(myMap.getCenter(), {
                            balloonContentBody: [
                                '<address>',
                                '<strong>'+ this.companyData.name +'</strong>',
                                '<br/>',
                                '<span>Адрес: <span>'+ this.companyData.address +'</span></span>',
                                '<br/>',
                                '<span>E-mail: <span>'+ this.companyData.mail +'</span></span>',
                                '<br/>',
                                '<span>Телефон: <span>'+ this.companyData.phone +'</span></span>',
                                '<br/>',
                                '</address>'
                            ].join(''),

                            preset: 'islands#redDotIcon'
                        });
                        myMap.geoObjects.add(myPlacemark);
                        if (!(myMap.behaviors.isEnabled('drag'))) {
                            myMap.behaviors.enable('drag');
                        }
                        myMap.behaviors.disable('scrollZoom');
                    }).then(() => this.loadingState = false,
                        error => {
                            console.log(`Error Map Loading - ${error}`);
                            this.loadingState = false;
                        }
                    );
                })
        }
    }
</script>

<style>

</style>