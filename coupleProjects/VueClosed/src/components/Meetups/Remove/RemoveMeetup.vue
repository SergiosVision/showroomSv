<template>
    <v-dialog presistent v-model="removeDialog">
        <v-btn dark class="red lighten-1" floating accent slot="activator">
            <v-icon>delete</v-icon>
        </v-btn>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title>Remove {{ meetup.title }} ?</v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-text>This action can not be undone. Are you sure?</v-card-text>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-btn dark class="green--text darken-1" flat @click="removeMeetup">Remove</v-btn>
                            <v-btn class="red--text darken-1" flat @click="removeDialog = false">Cancel</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props: ['meetupId'],
        data () {
            return {
                removeDialog: false,
            }
        },
        computed: {
            meetup () {
                return this.$store.getters.loadedMeetup(this.meetupId)
            },
        },
        methods: {
            removeMeetup () {
                this.$store.dispatch('removeMeetupThis', {
                    id: this.meetupId
                })
                this.$router.push('/meetups')
            },
        }
    }
</script>