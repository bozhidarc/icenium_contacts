// JavaScript Document

// Wait for PhoneGap to load
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
function onDeviceReady() {
    new MtelInvoiceInfoApp();
}

function MtelInvoiceInfoApp () {
    this._createContacts();
    this._findContacts();
}

MtelInvoiceInfoApp.prototype._findContacts = function () {
    var options = new ContactFindOptions();
    options.filter="Doug";
    options.multiple=true; 
    var fields = ["name", "displayName"];
    navigator.contacts.find(fields, onSuccess, onError, options);
    
    function onSuccess(contacts) {
        console.log(contacts);
    };
    
    function onError(contactError) {
        alert('onError!');
    };
};