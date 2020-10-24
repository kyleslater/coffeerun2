(function (window) {
    'use strict';
    var App = window.App || {};
    var db = firebase.firestore();

    class RemoteDataStore {
        constructor(url) {
            console.log('running the DataStore function');
            if (!url) {
                throw new Error('No remote URL supplied.');
            }
            this.serverURL = url;
        }
        add(key, val) {
            db.collection("orders").add({
                    coffee: val.coffee,
                    emailAddress: key,
                    flavor: val.flavor,
                    size: val.size,
                    strength: val.strength
                })
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
        }
        get(key, cb) {
            db.collection("orders").where("emailAddress", "==", key)
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        // doc.data() is never undefined for query doc snapshots
                        console.log(doc.id, " => ", doc.data());
                    });
                })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                });

        }
        getAll(cb) {
            db.collection("orders").get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                });
            });
        }
        remove(key) {
            db.collection("orders").where("emailAddress", "==", key)
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        console.log("Deleting: ", doc.id, " => ", doc.data());
                        db.collection("orders").doc(doc.id).delete().then(function() {
                            console.log("Document successfully deleted!");
                        }).catch(function(error) {
                            console.error("Error removing document: ", error);
                        });
                    });
                })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                });
        }
    }
    App.RemoteDataStore = RemoteDataStore;
    window.App = App;

})(window);