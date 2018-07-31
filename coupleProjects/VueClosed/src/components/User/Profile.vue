<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                        <h3 class="red--text lighten-1--text">Email: {{user.mail}}</h3>
                        <v-spacer></v-spacer>
                        <v-btn @click="show = !show" dark class="red lighten-1">
                            <v-icon left>info</v-icon>
                            Unique key
                        </v-btn>
                        <v-tooltip bottom>
                            <h3 v-if="show" class="red--text lighten-1--text hiddenInfo" slot="activator">{{user.id}}</h3>
                            <span>Your unique user key. For send a message in support.</span>
                        </v-tooltip>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>
    import firebase from 'firebase'
    export default {
        data () {
            return {
                show: false,
            }
        },
        computed: {
            user () {
                return this.$store.getters.user
            },
        },
    }
</script>

<style>
    .hiddenInfo {
        animation: fadeAnim .3s linear;
    }
    @keyframes fadeAnim {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>