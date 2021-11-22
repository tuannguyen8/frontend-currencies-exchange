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
                        <a href="#">
                            <span class="currency-key">${key.toUpperCase()}</span>: <span>${
					data[key]
				}</span>
                        
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

getAllCurrencies();

// Bar chart skeleton
let bar_chart = document.getElementById("myChart");
let myChart = new Chart(bar_chart, {
	type: "bar",
	data: {
		labels: [
			"2015-01",
			"2015-02",
			"2015-03",
			"2015-04",
			"2015-05",
			"2015-06",
			"2015-07",
			"2015-08",
			"2015-09",
			"2015-10",
			"2015-11",
			"2015-12",
		],
		datasets: [
			{
				label: "Currency Price Change",
				data: [12, 19, 3, 5, 2, 3, 20, 3, 5, 6, 2, 1],
				backgroundColor: [
					"rgba(255, 99, 132, 0.2)",
					"rgba(54, 162, 235, 0.2)",
					"rgba(255, 206, 86, 0.2)",
					"rgba(75, 192, 192, 0.2)",
					"rgba(153, 102, 255, 0.2)",
					"rgba(255, 159, 64, 0.2)",
					"rgba(255, 99, 132, 0.2)",
					"rgba(54, 162, 235, 0.2)",
					"rgba(255, 206, 86, 0.2)",
					"rgba(75, 192, 192, 0.2)",
					"rgba(153, 102, 255, 0.2)",
					"rgba(255, 159, 64, 0.2)",
				],
				borderColor: [
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
				],
				borderWidth: 1,
			},
		],
	},
});
myChart();
