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
	let app = document.querySelector(".dates");
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
	yesterday.setDate(yesterday.getDate() - 3);
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
	datetoDOM("A Week Ago Date  :: " + yesterday_date);
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
		let data1 = price_data.usd;
		let data2 = yes_price_data.usd;
		let difference = [];
		console.log(data1);
		console.log(data2);

		// Finding the TOP PRICE MOVERS!!
		let curr = [];
		let day1 = [];
		let day2 = [];
		for (const each in data1) {
			curr.push(`${each}`);
			day1.push(Number(`${data1[each]}`));
		}
		let diff = "3.14";
		//console.log(Number(diff) +1);
		//console.log(typeof diff);
		for (const each in data2) {
			day2.push(Number(`${data2[each]}`));
		}

		console.log(typeof parseFloat(day1[0]));
		for (let i = 0; i < day1.length; ++i) {
			let increase = 0;
			let decrease = 0;
			//console.log(day1[i]);
			//console.log(day2[i]);
			//console.log(typeof day2[i]);
			diff = (day1[i] - day2[i]).toPrecision(6);
			if (diff > 0) {
				increase = ((diff % day2[i]) * 100).toPrecision(9);
				difference.push(increase);
			} else {
				decrease = ((diff % day1[i]) * 100).toPrecision(9);
				-Math.abs(decrease);
				difference.push(decrease);
			}
			console.log(" percentage " + increase);
			console.log(" percentage " + decrease);
			//console.log(i);
			//difference.push(diff);
		}
		//console.log(difference);

		//Sorting the Array Object to find Top and Bottom Gainers
		var sorted_price = {};
		for (var i = 0; i < curr.length; i++) {
			sorted_price[curr[i]] = difference[i];
		}
		//console.log(sorted_price);
		const sortable = Object.entries(sorted_price)
			.sort(([, a], [, b]) => a - b)
			.reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
		//console.log(sortable);
		// Adding
		let gainers = document.querySelector(".Top_gainer");
		let loosers = document.querySelector(".Top_loosers");
		const ToptoDOM = (key, value) => {
			if (key && value) {
				let element = document.createElement("li");
				element.classList.add("top");
				let name = document.createElement("h5");
				let price = document.createElement("h5");
				name = key;
				price = value;
				element.append(name + " :   ");
				element.append(price);
				loosers.append(element);
			}
		};
		const ToptoDOM1 = (key, value) => {
			if (key && value) {
				let element = document.createElement("li");
				element.classList.add("top");
				let name = document.createElement("h5");
				let price = document.createElement("h5");
				name = key;
				price = value;
				element.append(name + " :   ");
				element.append(price);
				gainers.append(element);
			}
		};
		for (let keys = Object.keys(sortable), i = 0, end = 8; i < end; ++i) {
			let key = keys[i],
				value = sortable[key];
			//console.log(key, value);
			ToptoDOM(key.toUpperCase(), value + " %");
		}
		const sortable1 = Object.entries(sorted_price)
			.sort(([, a], [, b]) => b - a)
			.reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
		console.log(sortable1);
		for (let keys = Object.keys(sortable1), i = 0, end = 8; i < end; ++i) {
			let key = keys[i],
				value = sortable1[key];
			//console.log(key, value);
			ToptoDOM1(key.toUpperCase(), " + " + value + " %");
		}
		ToptoDOM(sortable);
		ToptoDOM1(sortable);
	}
	get_data();
};

top_5_curr();
getAllCurrencies();
