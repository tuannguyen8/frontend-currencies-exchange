const all_currencies_api =
	"https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json";
const getAllCurrencies = () => {
	$.get(all_currencies_api, (data) => {
		Object.keys(data).forEach((key) => {
			//console.log(key, data[key]);
			const latest_price_usd = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${key}/usd.json`;
			$.get(latest_price_usd, (price) => {
				//console.log(price.usd)
				//render currencies in the left position
				$(".all-currencies").append(`<li class ="flex j-between a-center">
                 <span> <span class="currency-key">${key.toUpperCase()}</span>: <span>${
					data[key]
				}</span> </span>
                 <span>${price.usd.toFixed(6)}</span>
                 </li>`);
			});

			//render currencies list in the right-lower position
			/* $(".list-input").append(`<li>${data[key]}</li>`)
            $(".list-output").append(`<li>${data[key]}</li>`) */
			$(".list-input").append(`<li>${key.toUpperCase()}</li>`);
			$(".list-output").append(`<li>${key.toUpperCase()}</li>`);
		});
		//Make default value for the currency-list-input and currency-list-input
		//in the right lower position as USD
		/* $(".currency-type-input").text(data[Object.keys(data)[159]])
        $(".currency-type-output").text(data[Object.keys(data)[159]]) */
		$(".currency-type-input").text(Object.keys(data)[159].toUpperCase());
		$(".currency-type-output").text(Object.keys(data)[159].toUpperCase());
	});
};
//handle click li - select a specific breed
$(document).on("click", ".list-input li", function () {
	const val = $(this).text();
	$(".currency-type-input").text(val);
	$(".list-input").fadeOut(100);
});
//select breeds
$(".currency-type-input").click(function (e) {
	e.preventDefault();
	$(".list-input").slideToggle();
});
//handle click li - select a specific breed
$(document).on("click", ".list-output li", function () {
	const val = $(this).text();
	$(".currency-type-output").text(val);
	$(".list-output").fadeOut(100);
});
//select breeds
$(".currency-type-output").click(function (e) {
	e.preventDefault();
	$(".list-output").slideToggle();
});

const convertCurrency = (inputCurrency, outputCurrency, inputValue) => {
	const ratio_api = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${inputCurrency}/${outputCurrency}.json`;
	$.get(ratio_api, (price) => {
		//console.log(price.date)
		let ratio = price[Object.keys(price)[1]];
		let value = inputValue * ratio;
		let inputVal = +inputValue; //convert to number
		let formattedValue = value.toLocaleString("en-US");
		let formattedInputValue = inputVal.toLocaleString("en-US");
		$(".result").remove();
		$(".converted-result").append(`
            <div class = "result">
                <span>Result: </span>
                <span class="value-input">${formattedInputValue}</span>
                <span class="currency-code-input">${inputCurrency.toUpperCase()}</span>
                <span> = </span>
                <span class="value-output">${formattedValue}</span>
                <span class="cunrrency-code-ouput">${outputCurrency.toUpperCase()}</span>
            </div>
        `);
	});
};
$("button").click(function (e) {
	//console.log("hello");
	e.preventDefault();
	/* const breed = $(".dog-breeds").text()
    fetchData(breed); */
	const inputCurrency = $(".currency-type-input").text().toLowerCase();
	const outputCurrency = $(".currency-type-output").text().toLowerCase();
	const inputValue = $(".input-value").val();
	convertCurrency(inputCurrency, outputCurrency, inputValue);
});

// Top 5 currencies from the day

// Format Date to year-month-date
function formatDate(date) {
	let d = new Date(date),
		month = "" + (d.getMonth() + 1),
		day = "" + d.getDate(),
		year = d.getFullYear();
	if (month.length < 2) month = "0" + month;
	if (day.length < 2) day = "0" + day;
	return [year, month, day].join("-");
}
const top_5_curr = () => {
	let app = document.querySelector(".right-upper");
	let yes_price_data = "";
	let price_data = "";
	let curr_name = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json";
	let curr_price_url =
		"https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json";

	fetch(curr_name) // Getting Currency Name
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
		});

	const today = new Date();
	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);
	today.toDateString();
	yesterday.toDateString();
	let todays_date = formatDate(today);
	let yesterday_date = formatDate(yesterday);
	// Adding Date to DOM
	const datetoDOM = (date) => {
		let element = document.createElement("div");
		element.classList.add("Current_dates");
		let name = document.createElement("h5");
		name.textContent = date;
		element.append(name);
		app.append(element);
	};
	datetoDOM("Today's Date     :: " + todays_date);
	datetoDOM("Yesterday's Date :: " + yesterday_date);
	console.log("TODAYS DATE " + todays_date);
	console.log("Yesterdays DATE " + yesterday_date);
	let yes_price_url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${yesterday_date}/currencies/usd.json`;
	// Todays Price
	async function get_price(curr_price) {
		let response = await fetch(curr_price);
		let data = await response.json();
		return data;
	}
	//Yesterdays Price
	async function yesterdays_price(yes_price) {
		let response = await fetch(yes_price);
		let data = await response.json();
		return data;
	}
	async function get_data() {
		price_data = await get_price(curr_price_url);
		yes_price_data = await yesterdays_price(yes_price_url);
		console.log(price_data);
		console.log(yes_price_data);
	}
	get_data();

	//console.log("Todays Date :: " + curr_date);
};

top_5_curr();
getAllCurrencies();
