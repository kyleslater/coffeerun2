(function (window) {
    'use strict';
    var FORM_SELECTOR = '[payment-form="form"]';
    var App = window.App;
    var FormHandler = App.FormHandler;
    var Payments = App.Payments;
    var DataStore = App.DataStore;
    var formHandler = new FormHandler(FORM_SELECTOR);
    var myPayments = new Payments(new DataStore());
    formHandler.addSubmitHandler(function (data) {
        myPayments.createPayment(myPayments, data);
    });
    console.log(formHandler);

})(window);