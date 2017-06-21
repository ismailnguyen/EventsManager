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
        <p>{{error.message}}</p>
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
                error: {
                    message: ''
                }
            }
        },
        methods: {
            setUser() {
                this.user = firebaseApp.auth().currentUser;

                this.email = firebaseApp.auth().currentUser.email;
            },
            signUp() {
                firebaseApp.auth().createUserWithEmailAndPassword(this.email, this.password)
                    .catch(error => {
                        this.error = error
                    })
            }
        },
        mounted() {
            this.setUser()
        }
    }
</script>