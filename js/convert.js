const all_currencies_api = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json"
const getAllCurrencies = () => {  
    $.get(all_currencies_api, data => {  
        Object.keys(data).forEach(key => {
            //console.log(key, data[key]);
            const latest_price_usd =`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${key}/usd.json`
            $.get(latest_price_usd, price =>{
                //console.log(price.usd)
                //render currencies in the left position
                $(".all-currencies").append(`<li class ="flex j-between a-center">
                 <span> <span class="currency-key">${key.toUpperCase()}</span>: <span>${data[key]}</span> </span>
                 <span>${price.usd.toFixed(6)}</span>
                 </li>`)
            })

            //render currencies in the right-lower position
            $(".list-input").append(`<li>${data[key]}</li>`)
            $(".list-output").append(`<li>${data[key]}</li>`)
            
            
        });
        $(".currency-type-input").text(data[Object.keys(data)[159]])
        $(".currency-type-output").text(data[Object.keys(data)[159]])
        
    });
}
//handle click li - select a specific breed
$(document).on("click", ".list-input li", function () {
    const val = $(this).text()
    $(".currency-type-input").text(val)
    $(".list-input").fadeOut(100);
});
//select breeds 
$(".currency-type-input").click(function (e) { 
    e.preventDefault();
    $(".list-input").slideToggle();
});
//handle click li - select a specific breed
$(document).on("click", ".list-output li", function () {
    const val = $(this).text()
    $(".currency-type-output").text(val)
    $(".list-output").fadeOut(100);
});
//select breeds 
$(".currency-type-output").click(function (e) { 
    e.preventDefault();
    $(".list-output").slideToggle();
});


$("button").click(function (e) { 
    //console.log("hello");
    e.preventDefault();
    /* const breed = $(".dog-breeds").text()
    fetchData(breed); */
});
getAllCurrencies();

