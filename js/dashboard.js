$(".owl-carousel").owlCarousel({
	items: 1,
	//margin: 10,
	loop: true,

	/* autoplay: true,
    autoplayTimeout: 5000, */
	nav: false,
	//bắt buộc là dấu nháy đơn
	/* navText: [
        '<i class="fas fa-angle-left"></i>',
        '<i class="fas fa-angle-right"></i>',
    ], */
	dots: true,
});

const all_currencies_api =
	"https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json";
const getAllCurrencies = () => {
	$.get(all_currencies_api, (data) => {
		Object.keys(data).forEach((key) => {
			//console.log(key, data[key]);
			const latest_price_usd = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${key}/usd.json`;
			$.get(latest_price_usd, (price) => {
				//console.log(price.usd)
				$(".all-currencies").append(`<li class ="flex j-between a-center">
                    <span>
                        <a class ="currency-code-a" href="#">
                            <span class=" currency-key-tag">${key.toUpperCase()}</span>: 
							<span class="currency-name-tag" >${data[key]}</span>
                        </a>  
                    </span>
                 </li>`);
			});
			$(".list-input").append(`<li>${key.toUpperCase()}</li>`);
			$(".list-output").append(`<li>${key.toUpperCase()}</li>`);
		});
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
		let inputVal = +inputValue;
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
$(".convert-click").click(function (e) {
	//console.log("hello");
	e.preventDefault();
	/* const breed = $(".dog-breeds").text()
    fetchData(breed); */
	const inputCurrency = $(".currency-type-input").text().toLowerCase();
	const outputCurrency = $(".currency-type-output").text().toLowerCase();
	const inputValue = $(".input-value").val();
	convertCurrency(inputCurrency, outputCurrency, inputValue);
});

getAllCurrencies();

//--------------------------Chart Function----------------------------------//

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

const renderChart = (currencyKey) => {
	let yes_price_data = "";
	let curr_name = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json";

	const today = new Date();
	const yesterday = new Date(today);
	const day_before = new Date(yesterday);
	const day_before1 = new Date(yesterday);
	const day_before2 = new Date(yesterday);
	const day_before3 = new Date(yesterday);
	const day_before4 = new Date(yesterday);

	// Setting date for last 7 days
	yesterday.setDate(yesterday.getDate() - 1);
	day_before.setDate(day_before.getDate() - 2);
	day_before1.setDate(day_before1.getDate() - 3);
	day_before2.setDate(day_before2.getDate() - 4);
	day_before3.setDate(day_before3.getDate() - 5);
	day_before4.setDate(day_before4.getDate() - 6);

	//Changing Date to String to Convert into right format
	today.toDateString();
	yesterday.toDateString();
	day_before.toDateString();
	day_before1.toDateString();
	day_before2.toDateString();
	day_before3.toDateString();
	day_before4.toDateString();

	//Changing date to right format 2022-22-01
	let todays_date = formatDate(today);
	let yesterday_date = formatDate(yesterday);
	let day_before_yes = formatDate(day_before);
	let day_before_yes1 = formatDate(day_before1);
	let day_before_yes2 = formatDate(day_before2);
	let day_before_yes3 = formatDate(day_before3);
	let day_before_yes4 = formatDate(day_before4);
	/* 	console.log(
		todays_date,
		yesterday_date,
		day_before_yes,
		day_before_yes1,
		day_before_yes2,
		day_before_yes3,
		day_before_yes4
	); */
	let today_price_url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${todays_date}/currencies/usd.json`;
	let yes_price_url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${yesterday_date}/currencies/usd.json`;
	let day_before_url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${day_before_yes}/currencies/usd.json`;
	let day_before_url1 = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${day_before_yes1}/currencies/usd.json`;
	let day_before_url2 = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${day_before_yes2}/currencies/usd.json`;
	let day_before_url3 = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${day_before_yes3}/currencies/usd.json`;
	let day_before_url4 = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${day_before_yes4}/currencies/usd.json`;

	// Todays Price
	async function get_price(curr) {
		let response = await fetch(curr);
		let data = await response.json();
		return data;
	}
	//Yesterdays Price
	async function yesterdays_price(yes_price) {
		let response = await fetch(yes_price);
		let data = await response.json();
		//console.log(data);
		return data;
	}

	async function get_data() {
		//console.log(currencyKey);
		get_names = await get_price(curr_name);

		// Fetching Currency data for last 7 days
		todays_price = await get_price(today_price_url);
		//console.log(todays_price);
		yes_price_data = await yesterdays_price(yes_price_url);
		yes_price_data1 = await yesterdays_price(day_before_url);
		yes_price_data2 = await yesterdays_price(day_before_url1);
		yes_price_data3 = await yesterdays_price(day_before_url2);
		yes_price_data4 = await yesterdays_price(day_before_url3);
		yes_price_data5 = await yesterdays_price(day_before_url4);

		// getting the use USD in an Array
		let data0 = todays_price.usd;
		let data1 = yes_price_data.usd;
		//console.log(data1);
		let data2 = yes_price_data1.usd;
		let data3 = yes_price_data2.usd;
		let data4 = yes_price_data3.usd;
		let data5 = yes_price_data4.usd;
		let data6 = yes_price_data5.usd;

		let line_chart = document.getElementById("lineChart");

		let arrayData = [
			data6[currencyKey],
			data5[currencyKey],
			data4[currencyKey],
			data3[currencyKey],
			data2[currencyKey],
			data1[currencyKey],
			data0[currencyKey],
		];

		let labels = [
			day_before_yes4,
			day_before_yes3,
			day_before_yes2,
			day_before_yes1,
			day_before_yes,
			yesterday_date,
			todays_date,
		];
		let borderColor = [
			"rgba(255,99,132,1)",
			"rgba(54, 162, 235, 1)",
			"rgba(255, 206, 86, 1)",
			"rgba(75, 192, 192, 1)",
			"rgba(153, 102, 255, 1)",
			"rgba(255, 159, 64, 1)",
			"rgba(255,99,132,1)",
			"rgba(54, 162, 235, 1)",
			"rgba(255, 206, 86, 1)",
			"rgba(75, 192, 192, 1)",
			"rgba(153, 102, 255, 1)",
			"rgba(255, 159, 64, 1)",
		];

		let myChart = new Chart(line_chart, {
			type: "line",
			maintainAspectRatio: false,
			responsive: true,
			responsiveAnimationDuration: 2,

			data: {
				labels: labels,
				datasets: [
					{
						label: currencyKey.toUpperCase(),
						data: arrayData,
						borderColor: borderColor,
						borderWidth: 1,
					},
				],
			},
		});
	}

	get_data();
};
currencyKey = "ada";
renderChart(currencyKey);
$(document).on("click", ".currency-key-tag", function (event) {
	//e.preventDefault();
	/* console.log("clickkkkk");
	console.log(event.target.className); */
	$("canvas#lineChart").remove();
	$("div.right-lower").append(
		'<canvas id="lineChart" class="animated fadeIn" height="150"></canvas>'
	);
	let currencyKey = $(this).text().toLowerCase();
	

	let myKey = $(this).prev().text().toLowerCase();
	//console.log(currencyKey);
	console.log(myKey);

	renderChart(currencyKey);
});
$(document).on("click", ".currency-name-tag", function (event) {
	//e.preventDefault();
	/* console.log("clickkkkk");
	console.log(event.target.className); */
	$("canvas#lineChart").remove();
	$("div.right-lower").append(
		'<canvas id="lineChart" class="animated fadeIn" height="150"></canvas>'
	);
	
	let currencyKey = $(this).prev().text().toLowerCase();

	renderChart(currencyKey);
});

//--------------------------Gainers and Loosers----------------------------------//

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
			/* console.log(data); */
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
	datetoDOM("A Yesterday's Date  :: " + yesterday_date);


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
		/* console.log(price_data);
		console.log(yes_price_data); */
		let data1 = price_data.usd;
		let data2 = yes_price_data.usd;
		let difference = [];
		/* console.log(data1);
		console.log(data2); */

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

		/* console.log(typeof parseFloat(day1[0])); */
		for (let i = 0; i < day1.length; ++i) {
			let increase = 0;
			let decrease = 0;
			//console.log(day1[i]);
			//console.log(day2[i]);
			//console.log(typeof day2[i]);
			diff = (day1[i] - day2[i]).toPrecision(6);
			if (diff > 0) {
				increase = ((diff / day2[i]) * 100).toPrecision(9);
				difference.push(increase);
			} else {
				decrease = ((diff / day1[i]) * 100).toPrecision(9);
				-Math.abs(decrease);
				difference.push(decrease);
			}
			/* console.log(" percentage " + increase);
			console.log(" percentage " + decrease); */
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
		for (let keys = Object.keys(sortable), i = 0, end = 7; i < end; ++i) {
			let key = keys[i],
				value = sortable[key];
			//console.log(key, value);
			ToptoDOM(key.toUpperCase(), value + " %");
		}
		const sortable1 = Object.entries(sorted_price)
			.sort(([, a], [, b]) => b - a)
			.reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
		/* console.log(sortable1); */
		for (let keys = Object.keys(sortable1), i = 0, end = 7; i < end; ++i) {
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

const top_5_week = () => {
	let app = document.querySelector(".date_week");
	let yes_price_data = "";
	let price_data = "";
	let curr_name = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json";
	let curr_price_url =
		"https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json";

	fetch(curr_name) // Getting Currency Name
		.then((response) => response.json())
		.then((data) => {
			/* console.log(data); */
		});

	const today = new Date();
	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 7);
	today.toDateString();
	yesterday.toDateString();
	let todays_date = formatDate(today);
	let yesterday_date = formatDate(yesterday);
	// Adding Date to DOM
	$(".date_week").append(`
		<div class="Current_dates">
			<h5>Today's Date     :: ${todays_date}</h5>
		</div>
		<div class="Current_dates">
			<h5>A Week Ago Date  :: ${yesterday_date}</h5>
		</div>
	`);
	/* console.log("TODAYS DATE " + todays_date);
	console.log("Last Week DATE " + yesterday_date); */
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
		/* console.log(price_data);
		console.log(yes_price_data); */
		let data1 = price_data.usd;
		let data2 = yes_price_data.usd;
		let difference = [];
		/* console.log(data1);
		console.log(data2); */

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

		/* console.log(typeof parseFloat(day1[0])); */
		for (let i = 0; i < day1.length; ++i) {
			let increase = 0;
			let decrease = 0;
			//console.log(day1[i]);
			//console.log(day2[i]);
			//console.log(typeof day2[i]);
			diff = (day1[i] - day2[i]).toPrecision(6);
			if (diff > 0) {
				increase = ((diff / day2[i]) * 100).toPrecision(9);
				difference.push(increase);
			} else {
				decrease = ((diff / day1[i]) * 100).toPrecision(9);
				-Math.abs(decrease);
				difference.push(decrease);
			}
			/* console.log(" percentage " + increase);
			console.log(" percentage " + decrease); */
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
		let gainers = document.querySelector(".Top_gainer_week");
		let loosers = document.querySelector(".Top_looser_week");
		const ToptoDOM = (key, value) => {
			if (key && value) {
				$(".Top_looser_week").append(`
					<li class="top">${key} :    ${value}</li>
				`);
			}
		};
		const ToptoDOM1 = (key, value) => {
			if (key && value) {
				$(".Top_gainer_week").append(`
					<li class="top">${key} :    ${value}</li>
				`);
			}
		};
		for (let keys = Object.keys(sortable), i = 0, end = 7; i < end; ++i) {
			let key = keys[i],
				value = sortable[key];
			//console.log(key, value);
			ToptoDOM(key.toUpperCase(), value + " %");
		}
		const sortable1 = Object.entries(sorted_price)
			.sort(([, a], [, b]) => b - a)
			.reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
		/* console.log(sortable1); */
		for (let keys = Object.keys(sortable1), i = 0, end = 7; i < end; ++i) {
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

const top_5_month = () => {
	let app = document.querySelector(".date_month");
	let yes_price_data = "";
	let price_data = "";
	let curr_name = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json";
	let curr_price_url =
		"https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json";

	fetch(curr_name)
		.then((response) => response.json())
		.then((data) => {});
	const today = new Date();
	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 30);
	today.toDateString();
	yesterday.toDateString();
	let todays_date = formatDate(today);
	let yesterday_date = formatDate(yesterday);
	// Adding Date to DOM
	$(".date_month").append(`
		<div class="Current_dates">
			<h5>Today's Date     :: ${todays_date}</h5>
		</div>
		<div class="Current_dates">
			<h5>A Month Ago Date  :: ${yesterday_date}</h5>
		</div>
	`);

	let yes_price_url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${yesterday_date}/currencies/usd.json`;

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

		let data1 = price_data.usd;
		let data2 = yes_price_data.usd;
		let difference = [];

		let curr = [];
		let day1 = [];
		let day2 = [];
		for (const each in data1) {
			curr.push(`${each}`);
			day1.push(Number(`${data1[each]}`));
		}
		let diff = "3.14";
		for (const each in data2) {
			day2.push(Number(`${data2[each]}`));
		}

		for (let i = 0; i < day1.length; ++i) {
			let increase = 0;
			let decrease = 0;

			diff = (day1[i] - day2[i]).toPrecision(6);
			if (diff > 0) {
				increase = ((diff / day2[i]) * 100).toPrecision(9);
				difference.push(increase);
			} else {
				decrease = ((diff / day1[i]) * 100).toPrecision(9);
				-Math.abs(decrease);
				difference.push(decrease);
			}
		}

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
		let gainers = document.querySelector(".Top_gainer_month");
		let loosers = document.querySelector(".Top_looser_month");
		const ToptoDOM = (key, value) => {
			if (key && value) {
				$(".Top_looser_month").append(`
					<li class="top">${key} :    ${value}</li>
				`);
			}
		};
		const ToptoDOM1 = (key, value) => {
			if (key && value) {
				$(".Top_gainer_month").append(`
					<li class="top">${key} :    ${value}</li>
				`);
			}
		};
		for (let keys = Object.keys(sortable), i = 0, end = 7; i < end; ++i) {
			let key = keys[i],
				value = sortable[key];
			//console.log(key, value);
			ToptoDOM(key.toUpperCase(), value + " %");
		}
		const sortable1 = Object.entries(sorted_price)
			.sort(([, a], [, b]) => b - a)
			.reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

		for (let keys = Object.keys(sortable1), i = 0, end = 7; i < end; ++i) {
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

const top_5_year = () => {
	let app = document.querySelector(".date_year");
	let yes_price_data = "";
	let price_data = "";
	let curr_name = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json";
	let curr_price_url =
		"https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json";

	fetch(curr_name) // Getting Currency Name
		.then((response) => response.json())
		.then((data) => {
			/* console.log(data); */
		});

	const today = new Date();
	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 60);
	today.toDateString();
	yesterday.toDateString();
	let todays_date = formatDate(today);
	let yesterday_date = formatDate(yesterday);
	console.log(yesterday_date);
	// Adding Date to DOM
	$(".date_year").append(`
		<div class="Current_dates">
			<h5>Today's Date     :: ${todays_date}</h5>
		</div>
		<div class="Current_dates">
			<h5>2 Months Ago Date  :: ${yesterday_date}</h5>
		</div>
	`);
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

		/* console.log(typeof parseFloat(day1[0])); */
		for (let i = 0; i < day1.length; ++i) {
			let increase = 0;
			let decrease = 0;
			//console.log(day1[i]);
			//console.log(day2[i]);
			//console.log(typeof day2[i]);
			diff = (day1[i] - day2[i]).toPrecision(6);
			if (diff > 0) {
				increase = ((diff / day2[i]) * 100).toPrecision(9);
				difference.push(increase);
			} else {
				decrease = ((diff / day1[i]) * 100).toPrecision(9);
				-Math.abs(decrease);
				difference.push(decrease);
			}
			//console.log(" percentage " + increase);
			//console.log(" percentage " + decrease);
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
		let gainers = document.querySelector(".Top_gainer_year");
		let loosers = document.querySelector(".Top_looser_year");
		const ToptoDOM = (key, value) => {
			if (key && value) {
				$(".Top_looser_year").append(`
					<li class="top">${key} :    ${value}</li>
				`);
			}
		};
		const ToptoDOM1 = (key, value) => {
			if (key && value) {
				$(".Top_gainer_year").append(`
					<li class="top">${key} :    ${value}</li>
				`);
			}
		};
		for (let keys = Object.keys(sortable), i = 0, end = 7; i < end; ++i) {
			let key = keys[i],
				value = sortable[key];
			//console.log(key, value);
			ToptoDOM(key.toUpperCase(), value + " %");
		}
		const sortable1 = Object.entries(sorted_price)
			.sort(([, a], [, b]) => b - a)
			.reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
		/* console.log(sortable1); */
		for (let keys = Object.keys(sortable1), i = 0, end = 7; i < end; ++i) {
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

top_5_week();
top_5_curr();
top_5_month();
top_5_year();
