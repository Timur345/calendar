const clock = document.getElementById("clock");
let today = new Date();

setInterval( () => {
	let now = new Date();
	let hours = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
	let minutes = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
	let seconds = now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
	clock.innerHTML = hours + ":" + minutes + ":" + seconds;
}, 1000);


let dayOfMonth = 1;

createCalendar(document.body, today.getFullYear(), today.getMonth());


function createCalendar(elem, year, m) {
	let month = new Date(year, m);
	let table = document.createElement("table");
	table.className = "calendar";


	for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
		let row = document.createElement("tr");
		table.append(row);

		if (rowIndex == 0) {
			createTheader(row);
			continue;
		} else {
			createCells(month, row, rowIndex);
		}
	}


	elem.append(table);
}


function createTheader(row) {
	let week = ["mo", "tu", "we", "th", "fr", "sa", "su"];

	for (let day of week) {
		let th = document.createElement("th");
		th.className = "day";
		th.textContent = day;
		row.append(th);
	}
}


function createCells(date, row, rowIndex) {
	let firstDay = date.getDay() == 0 ? 6 : date.getDay() - 1;
	let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();


	for (let cellIndex = 0; cellIndex < 7; cellIndex++) {
		let beforeFirstDay = rowIndex == 1 && cellIndex < firstDay;
		let afterLastDay = dayOfMonth > lastDay;

		let cell = document.createElement("td");
		row.append(cell);

		if (beforeFirstDay || afterLastDay) continue;
		cell.className = "date";
		if ( dayOfMonth === today.getDate() ) cell.classList.add("current");
		cell.textContent = dayOfMonth++;
	}
}