(function (window) {
    'use strict';
    var App = window.App || {};

    function Payments(db) {
        this.db = db;
    }

    Payments.prototype.createPayment = function (payment) {
        console.log('Adding order for ' + payment.username);
        this.db.add(payment.username, payment);
    };

    App.Payments = Payments;
    window.App = App;
})(window);