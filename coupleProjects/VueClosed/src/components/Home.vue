<template>
    <v-container>
        <v-layout row wrap class="mt-2">
            <v-flex xs12 sm6 class="text-xs-center text-sm-right">
                <v-btn dark large router to="/meetups" class="red lighten-1">Explore Meetups</v-btn>
            </v-flex>
            <v-flex xs12 sm6 class="text-xs-center text-sm-left">
                <v-btn dark large router to="/meetup/add" class="red lighten-1">Organize Meetup</v-btn>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="mt-3 mb-3">
            <v-flex xs12 class="text-xs-center">
                <h2 class="red--text lighten-1--text">Join our awesome meetups!</h2>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs12 class="text-xs-center">
                <v-progress-circular indeterminate color="red"
                :width="7"
                :size="70"
                v-if="loading"></v-progress-circular>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="mt-2" v-if="!loading">
            <v-flex xs12>
                <v-carousel>
                    <v-carousel-item v-for="meetup in meetups" :src="meetup.imageurl" :key="meetup.id">
                        <div class="title" style="cursor: pointer;" @click="onLoadMeetup(meetup.id)">{{meetup.title}}</div>
                    </v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="mt-5 mb-3 grey grey lighten-5">
            <v-flex xs12 class="text-xs-center cardItem">
                <h2 class="mb-3">Simple Text</h2>
                <p>Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris. Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium. Qui animated corpse, cricket bat max brucks terribilem incessu zomby. The voodoo sacerdos flesh eater, suscitat mortuos comedere carnem virus. Zonbi tattered for solum oculi eorum defunctis go lum cerebro. Nescio brains an Undead zombies. Sicut malus putrid voodoo horror. Nigh tofth eliv ingdead.

                    Cum horribilem walking dead resurgere de crazed sepulcris creaturis, zombie sicut de grave feeding iride et serpens. Pestilentia, shaun ofthe dead scythe animated corpses ipsa screams. Pestilentia est plague haec decaying ambulabat mortuos. Sicut zeder apathetic malus voodoo. Aenean a dolor plan et terror soulless vulnerum contagium accedunt, mortui iam vivam unlife. Qui tardius moveri, brid eof reanimator sed in magna copia sint terribiles undeath legionis. Alii missing oculis aliorum sicut serpere crabs nostram. Putridi braindead odores kill and infect, aere implent left four dead.

                    Lucio fulci tremor est dark vivos magna. Expansis creepy arm yof darkness ulnis witchcraft missing carnem armis Kirkman Moore and Adlard caeruleum in locis. Romero morbo Congress amarus in auras. Nihil horum sagittis tincidunt, zombie slack-jawed gelida survival portenta. The unleashed virus est, et iam zombie mortui ambulabunt super terram. Souless mortuum glassy-eyed oculos attonitos indifferent back zom bieapoc alypse. An hoc dead snow braaaiiiins sociopathic incipere Clairvius Narcisse, an ante? Is bello mundi z?</p>
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>
    export default {
        computed: {
          meetups () {
              return this.$store.getters.featuredMeetups
          },
          loading () {
              return this.$store.getters.loading
          }
        },
        methods: {
            onLoadMeetup (id) {
                this.$router.push('/meetups/' + id)
            }
        }
    }
</script>

<style scoped>
    .title {
        position: absolute;
        bottom: 50px;
        background-color: rgba(0,0,0,.5);
        color: #fff;
        font-size: 2em;
        padding: 25px;
        left: 50%;
        transform: translate(-50%);
    }

    .cardItem {
        padding: 30px;
        box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
    }
    .cardItem h2 {
        text-transform: uppercase;
    }
    .cardItem p {
        line-height: 30px;
    }
</style>