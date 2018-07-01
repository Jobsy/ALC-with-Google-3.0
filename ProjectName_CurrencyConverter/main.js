
function loadcurrencies() {

    const dropdown = $('#from');

    dropdown.empty();

    dropdown.append('<option selected="true" disabled>Choose Currency</option>');
    dropdown.prop('selectedIndex', 0);

    const url = 'https://free.currencyconverterapi.com/api/v5/currencies?q=';

    // Populate dropdown with list of currencies
    $.getJSON(url, data => {
        $.each(data, (key, entry) => {
            $.each(entry, (key2, entry2) => {
                dropdown.append($('<option></option>').attr('value', entry2.id).text(entry2.currencyName));
            })
        })
    });


    const dropdown2 = $('#to');

    dropdown2.empty();

    dropdown2.append('<option selected="true" disabled>Choose Currency</option>');
    dropdown2.prop('selectedIndex', 0);



    // Populate dropdown with list of currencies
    $.getJSON(url, data => {
        $.each(data, (key, entry) => {
            $.each(entry, (key2, entry2) => {
                dropdown2.append($('<option></option>').attr('value', entry2.id).text(entry2.currencyName));
            })
        })
    });
}


function convertCurrency(amount, fromCurrency, toCurrency) {

    amount = document.getElementById('amount').value;
    fromCurrency = document.getElementById('from').value;
    toCurrency = document.getElementById('to').value;
    const query = `${fromCurrency}_${toCurrency}`;

    const finalResult = $('#result');
    finalResult.empty();

    const url = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=ultra&apiKey=`;

    $.getJSON(url, data => {

        let body = '';
        let newVal = '';

        $.each(data, (i, val) => {
            body += data;
            newVal += val;

            if (newVal) {
                const total = val * amount;
                result = (Math.round((total * 100) / 100)).toFixed(2);

                finalResult.append($('<span></span>').text(result));

            }
        });
    });
}







// function loadcurrencies() {

//     let dropdown = $('#from');

//     dropdown.empty();

//     dropdown.append('<option selected="true" disabled>Choose Currency</option>');
//     dropdown.prop('selectedIndex', 0);

//     const url = 'https://free.currencyconverterapi.com/api/v5/currencies?q=';

//     // Populate dropdown with list of currencies
//     $.getJSON(url, function (data) {
//         $.each(data, function (key, entry) {
//             $.each(entry, function (key2, entry2) {
//                 dropdown.append($('<option></option>').attr('value', entry2.id).text(entry2.currencyName));
//             })
//         })
//     });


//     let dropdown2 = $('#to');

//     dropdown2.empty();

//     dropdown2.append('<option selected="true" disabled>Choose Currency</option>');
//     dropdown2.prop('selectedIndex', 0);



//     // Populate dropdown with list of currencies
//     $.getJSON(url, function (data) {
//         $.each(data, function (key, entry) {
//             $.each(entry, function (key2, entry2) {
//                 dropdown2.append($('<option></option>').attr('value', entry2.id).text(entry2.currencyName));
//             })
//         })
//     });
// }


// function convertCurrency(amount, fromCurrency, toCurrency) {

//     amount = document.getElementById('amount').value;
//     fromCurrency = document.getElementById('from').value;
//     toCurrency = document.getElementById('to').value;
//     var query = fromCurrency + '_' + toCurrency;

//     let finalResult = $('#result');
//     finalResult.empty();

//     var url = 'https://free.currencyconverterapi.com/api/v5/convert?q='
//         + query + '&compact=ultra&apiKey=';

//     $.getJSON(url, function (data) {

//         var body = '';
//         var newVal = '';

//         $.each(data, function (i, val) {
//             body += data;
//             newVal += val;
//             console.log(newVal);
//             if (newVal) {
//                 var total = val * amount;
//                 result = (Math.round((total * 100) / 100)).toFixed(2);

//                 finalResult.append($('<span></span>').text(result));

//             }
//         });
//     });
// }