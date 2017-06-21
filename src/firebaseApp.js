import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyC1b2Q4PEymWL5CD9dkNfUtCnr0nzqDc60",
    authDomain: "turnout-30bd9.firebaseapp.com",
    databaseURL: "https://turnout-30bd9.firebaseio.com",
    projectId: "turnout-30bd9",
    storageBucket: "turnout-30bd9.appspot.com",
    messagingSenderId: "759765621952"
};

export const firebaseApp = firebase.initializeApp(config)

export const eventsRef = firebaseApp.database().ref().child('events')
