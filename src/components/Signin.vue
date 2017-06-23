<template>
    <div class="form-inline">
        <h3>Confirm access key</h3>

        <div class="form-group">
            <p>
                Hello {{user.displayName}}
            </p>
            <br>
            <input type="password" placeholder="password" class="form-control" v-model="password">
            <br><br>
            <button class="btn btn-primary" @click="confirmPass">Confirm</button>
        </div>
        <br><br>
        <p>{{error}}</p>
        <br><br>
        <router-link to="/signup">Don't have access key ? Create it !</router-link>
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
                error: '',
                token: ''
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

            confirmPass() {
                
                let userRef = firebaseApp.database().ref().child('users/' + this.user.uid)

                // fetch(`https://auth.jumpcloud.com/authenticate`, {
                //     method: 'post',
                //     headers: {
                //         'Accept': 'application/json',
                //         'Content-Type': 'application/json',
                //         'x-api-key' : 'f1bb0f029adb8a5811424d92218566b805165406',
                //     },
                //     mode: 'no-cors',
                //     body: JSON.stringify({
                //         'username': 'ismail',
                //         'password': 'nguyen'
                //     })
                // })
                // .then(response => console.log(response))
                //.then(json => console.log(json))

                //Look for user token and match with user input
                userRef.on('value', snap => {
                    let details = []
                    snap.forEach(event => {
                        details.push(event.val())
                    })

                    let token = details[1];

                    // If user token match, go to dashboard
                    if (token == this.hash(this.password)) {
                        console.log(token)

                        this.$session.start();
                        this.$session.set('user', firebaseApp.auth().currentUser)

                        this.$router.push('dashboard')
                    }
                    else {
                        this.error = 'Wrong access key !'
                    }
                })
            }
        },
        mounted() {
            this.setUser()
        }
    }
</script>