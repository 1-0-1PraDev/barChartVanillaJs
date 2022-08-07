let highestVal;
let url = "data.json";
let chartsCont = document.querySelector(".charts");

fetch(url)
	.then((res) => {
		return res.json();
	})
	.then((data) => {
		// find the highest value from data received
		highestVal = data.reduce((acc, current) => {
			return acc > current.amount ? acc : current.amount;
		}, 0);

		// add fadein effect 
		document.querySelectorAll(".fade-in").forEach((ele, ind) => {
			setTimeout(() => {
				ele.style.opacity = 1;
				ele.style.transform = `translateY(0)`;		
			}, (ind + 1) * 100);
		});


		// create charts
		data.forEach((ele, ind) => {
			chartsCont.appendChild(createChart(ele));	
		})

		// add data to chartbar
		document.querySelectorAll(".chart-bar").forEach((chartBar, ind) => {
			setTimeout(() => {
				let val = chartBar.getAttribute('data-value');
				let percent = (val / highestVal) * 100;
				chartBar.style.height = `${percent}%`;
				chartBar.style.opacity = 1;
				chartBar.style.transition = `height ${(percent * 0.5) / 100}s ease-out, opacity ${(percent * 0.5) / 100}s ease-out`;
			}, (ind + 1) * 100);
		});

	})
	.catch((err) => {
		console.error(err);
		return;
	})


function createChart(chartObj){
	let divEle = document.createElement("div");
	
	divEle.classList.add("chart");
	divEle.innerHTML = `
		<div class="chart-bar" data-value="${chartObj.amount}"></div>
		<div class="label-text align-center">${chartObj.day}</div>
	`;

	return divEle;
}