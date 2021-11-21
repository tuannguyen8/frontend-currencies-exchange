const all_currencies_api = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json"
const getAllCurrencies = () => {  
    $.get(all_currencies_api, data => {  
        Object.keys(data).forEach(key => {
            //console.log(key, data[key]);
            const latest_price_usd =`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${key}/usd.json`
            $.get(latest_price_usd, price =>{
                console.log(price.usd)
                $(".all-currencies").append(`<li class ="flex j-between a-center">
                 <span> <span class="currency-key">${key.toUpperCase()}</span>: <span>${data[key]}</span> </span>
                 <span>${price.usd.toFixed(6)}</span>
                 </li>`)
            })

            
        });
        
    });
}
getAllCurrencies();