<template>
    <v-dialog width="350px" presistent v-model="editDialog">
        <v-btn dark class="red lighten-1" floating accent slot="activator">
            <v-icon>edit</v-icon>
        </v-btn>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title>Edit Meetup</v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-text>
                            <v-text-field
                            name="title"
                            label="Title"
                            id="title"
                            required
                            v-model="editedTitle"
                            >
                            </v-text-field>
                            <v-text-field
                                    name="location"
                                    label="Location"
                                    id="location"
                                    required
                                    v-model="editedLocation"
                            >
                            </v-text-field>
                            <v-text-field
                                    name="description"
                                    label="Description"
                                    multi-line
                                    id="description"
                                    required
                                    v-model="editedDescription"
                            >
                            </v-text-field>
                        </v-card-text>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-btn flat dark class="red lighten-1" @click="onSaveChanges">Save</v-btn>
                            <v-btn flat dark class="red lighten-1" @click="editDialog = false">Cancel</v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>


<script>
    export default {
        props: ['meetup'],
        data () {
            return {
                editDialog: false,
                editedTitle: this.meetup.title,
                editedLocation: this.meetup.location,
                editedDescription: this.meetup.description
            }
        },
        methods: {
            onSaveChanges () {
                if (this.editedTitle.trim() === '' || this.editedDescription.trim() === '' || this.editedLocation.trim() === '') {
                    return
                }
                this.editDialog = false
                this.$store.dispatch('updateMeetupData',  {
                    id: this.meetup.id,
                    title: this.editedTitle,
                    location: this.editedLocation,
                    description: this.editedDescription,
                })
            }
        }
    }
</script>