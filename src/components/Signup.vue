<template>
    <div class="form-inline">
        <h3>Create access key</h3>

        <div class="form-group">
            <p>
                Hello {{user.displayName}}
            </p>
            <br/>
            <input type="password" placeholder="Access key" class="form-control" v-model="password">
            <br/><br/>
            <button class="btn btn-primary" @click="signUp">Create</button>
        </div>
        <br/><br/>
        <p>{{error}}</p>
        <br/><br/>
        <router-link to="/signin">Already have access key ? Sign in</router-link>
    </div>
</template>


<script>
    import { firebaseApp } from '../firebaseApp'
    
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
            hash(password) {
                return sha256(password);
            },

            signUp() {
                
                if (this.password.length < 6) {
                    this.error = '6 caractères minimum !'
                    return;
                }

                let userRef = firebaseApp.database().ref().child('users/')

                userRef.child(this.user.uid).set({
                    email: this.email,
                    token: this.hash(this.password)
                })
                
                this.$router.push('/signin')
            }
        },
        mounted() {
            this.setUser()
        }
    }
</script>