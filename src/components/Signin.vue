<template>
    <div class="form-inline">
        <h3>Confirm access key</h3>

        <div class="form-group">
            <p>
                Hello {{user.displayName}}
            </p>
            <br/>
            <input type="password" placeholder="password" class="form-control" v-model="password">
            <br/><br/>
            <button class="btn btn-primary" @click="confirmPass">Confirm</button>
        </div>
        <br/><br/>
        <p>{{error}}</p>
        <br/><br/>
        <router-link to="/signup">Don't have access key ? Create it !</router-link>
    </div>
</template>


<script>
    import { firebaseApp } from '../firebaseApp'
    import { usersRef } from '../firebaseApp'
    
    export default {
        data() {
            return {
                user: {},
                email: '',
                password: '',
                error: ''
            }
        },
        methods: {
            setUser() {
                this.user = firebaseApp.auth().currentUser;

                this.email = firebaseApp.auth().currentUser.email;
            },

            confirmPass() {
                
                usersRef.push()

                this.$session.start();
                this.$session.set('user', firebaseApp.auth().currentUser)

                this.$router.push('dashboard')
            }
        },
        mounted() {
            this.setUser()
        }
    }
</script>