<template>
    <div>
        <h3>Events Dashboard</h3>

        <button class="btn btn-danger btn-sm signout-btn" @click="signOut">Sign Out</button>

        <hr>
        <AddEvent />
        <hr>

        <div class="col-md-12">
            <EventItem v-for="(event, index) in this.$store.state.events" key="index" :event="event" />
        </div>

    </div>
</template>

<script>
    import { firebaseApp, eventsRef } from '../firebaseApp'
    import AddEvent from './AddEvent.vue'
    import EventItem from './EventItem.vue'

    export default {
        methods: {
            signOut() {
                this.$store.dispatch('signOut')
                firebaseApp.auth().signOut()
                this.$session.destroy();
            },
            decrypt(encrypted) {
                let token = sha256('32TéERGOJ!geie02GRZO')

                return sjcl.decrypt(token, encrypted)
            }
        },
        components: {
            AddEvent,
            EventItem
        },
        created() {
            if (!this.$session.exists()) {
                this.$router.push('/signin')
            } 
        },
        mounted() {
            
            eventsRef.on('value', snap => {
                let events = []
                snap.forEach(event => {
                    let val = event.val();

                    let decryptedEvent = {
                        title: this.decrypt(val.title),
                        description: this.decrypt(val.description),
                        date: this.decrypt(val.date),
                        location: this.decrypt(val.location),
                        email: this.decrypt(val.email),
                    }

                    events.push(decryptedEvent)
                })
                
                this.$store.dispatch('setEvents', events)
            })
        }
    }
</script>