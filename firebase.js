   var firebaseConfig = {
    apiKey: "AIzaSyAgEDfDSLWaNglsWzgS9UX2p8S-hS2e59M",
    databaseURL: "https://tic-tac-toe-c7ec6.firebaseio.com",
    authDomain: "tic-tac-toe-c7ec6.firebaseapp.com",
    projectId: "tic-tac-toe-c7ec6",
    messagingSenderId: "566929806571",
    storageBucket: "tic-tac-toe-c7ec6.appspot.com"
};

    firebase.initializeApp(firebaseConfig);

    var dbRef = firebase.database().ref();
