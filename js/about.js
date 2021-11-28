let backgroundColors = [
	"rgba(54, 162, 235, 0.8)",
	"rgba(255, 206, 86, 0.8)",
	"rgba(255, 99, 132, 0.8)",
	"rgba(75, 192, 192, 0.8)",
	"rgba(153, 102, 255, 0.8)",
	"rgba(255, 159, 64, 0.8)",
	"rgba(199, 199, 199, 0.8)",
	"rgba(83, 102, 255, 0.8)",
	"rgba(40, 159, 64, 0.8)",
	"rgba(210, 199, 199, 0.8)",
	"rgba(78, 52, 199, 0.8)",
];
let borderColors = [
	"rgba(54, 162, 235, 1)",
	"rgba(255, 206, 86, 1)",
	"rgba(255, 99, 132, 1)",
	"rgba(75, 192, 192, 1)",
	"rgba(153, 102, 255, 1)",
	"rgba(255, 159, 64, 1)",
	"rgba(159, 159, 159, 1)",
	"rgba(83, 102, 255, 1)",
	"rgba(40, 159, 64, 1)",
	"rgba(210, 199, 199, 1)",
	"rgba(78, 52, 199, 1)",
];
let renderChart = () => {
	let donutChart = document.getElementById("chart");

	new Chart(donutChart, {
		type: "pie",
		hoverBorderWidth: 10,
		data: {
			labels: ["JavaScript", "HTML", "SCSS", "CSS", "JQuery"],
			datasets: [
				{
					label: "Tech used",
					data: [31.1, 23.8, 25.7, 3.2, 16.2],
					backgroundColor: backgroundColors,
					borderColor: borderColors,
					borderWidth: 1,
				},
			],
		},
	});
};
renderChart();
