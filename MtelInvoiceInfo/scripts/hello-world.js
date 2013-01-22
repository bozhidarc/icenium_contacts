// JavaScript Document

// Wait for PhoneGap to load
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
function onDeviceReady() {
    var myApp = new MtelInvoiceInfoApp();
}

function MtelInvoiceInfoApp () {
    this.createPieChart();
}

MtelInvoiceInfoApp.prototype.getCallDurations = function () {
    var i,
        groupedContacts = {};
    
    for (i=0; i < dummyContacts.length; i++) {
         var number = dummyContacts[i][0];
         var duration = dummyContacts[i][1];
        
        if (!(number in groupedContacts)) {
            groupedContacts[number] = duration;
        }
        
        groupedContacts[number] += duration;
    }
    
    return groupedContacts;
};

MtelInvoiceInfoApp.prototype.getPhoneContact = function (number) {
    var options = new ContactFindOptions();
    
    options.filter=number;
    return navigator.contacts.find(['phones'], function (contacts) {console.log(contacts);}, function (contactError) {}, options);
};

MtelInvoiceInfoApp.prototype.getChartSeries = function () {
    var numberDurationTimes = this.getCallDurations();
    var contacts = [];
    var i;
    
    for (number in numberDurationTimes) {
        var contact = this.getPhoneContact(number);
        if (!contact) {
             continue;   
        }
        contacts.push({category: contact.displayName, value: numberDurationTimes[number]});
        $('<div>' + contact.displayName + ', ' + numberDurationTimes[number]).appendTo('#myLog');
    }
    
    return contacts;
};

MtelInvoiceInfoApp.prototype.createPieChart = function () {
    $('#myPieChart').kendoChart({
        series: this.getChartSeries()
    });
};