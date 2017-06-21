<template>
    <div>
        <h4>Add an event <input type="checkbox" v-model="showForm"></h4>

        <div class="form" v-if="showForm">
            <div class="form-group">
                <label>Title</label>
                <input type="text" class="form-control" v-model="event.title">
            </div>

            <div class="form-group">
                <label>Description</label>
                <input type="text" class="form-control" v-model="event.description">
            </div>

            <div class="form-group">
                <label>Date</label>
                <input type="date" class="form-control" v-model="event.date">
            </div>

            <div class="form-group">
                <label>Location</label>
                <input type="text" class="form-control" v-model="event.location">
            </div>

            <button class="btn-sm btn-primary" @click="addEvent">Submit</button>

        </div>
    </div>
</template>

<script>
    import { eventsRef } from '../firebaseApp'

    export default {
        data() {
            return {
                event: {
                    title: '',
                    description: '',
                    date: '',
                    location: '',
                    email: ''
                },
                showForm: false
            }
        },
        methods: {
            encrypt(decrypted) {
                let token = 'ABCDEF123456'

                return sjcl.encrypt(token, decrypted)
            },

            addEvent() {
                this.event.email = this.$store.state.user.email;

                // Encrypt event with user's token as encryption password

                let encryptedEvent = {
                    title: this.encrypt(this.event.title),
                    description: this.encrypt(this.event.description),
                    date: this.encrypt(this.event.date),
                    location: this.encrypt(this.event.location),
                    email: this.encrypt(this.event.email),
                };

                eventsRef.push(encryptedEvent)
            }
        }
    } 
</script>