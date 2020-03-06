$(document).ready(function() {
	var newInfections;
	// model our virus characteristics
	var virus = {
		name: "COVID-19",
		reproductionRate: 2.5, 			// 2.5
		deathRate: 0.034, 						// 3.4%
		infectionDuration: 2, 				// weeks
		incubationPeriod: 2 					// weeks
		// infectPeople: function() {

		// }
	};

	// model our environment where the virus is present
	var environment = {
		name: "United States of America",
		population: 330000000, 				// 330 million,
		healthyPeople: 329999999,
		newInfections: 1,
		totalInfections: 1,
		newDeaths: 0,
		totalDeaths: 0,
		newSurvivors: 0,
		totalSurvivors: 0,
		week: 0												// week 0
	};

	for (var i=0;environment.healthyPeople > 0;i++) {
		environment.week+=2;

		environment.newInfections*=virus.reproductionRate;
		if (environment.newInfections > environment.healthyPeople) {
			environment.newInfections = environment.healthyPeople;
		}

		environment.totalInfections+=environment.newInfections;
		if (environment.totalInfections > environment.population) {
			environment.totalInfections = environment.population;
		}
		
		environment.healthyPeople-=environment.newInfections;
		if (environment.healthyPeople < 0) {
			environment.healthyPeople = 0;
		}

		environment.newDeaths = environment.newInfections * virus.deathRate;
		environment.totalDeaths+=environment.newDeaths;

		environment.newSurvivors = environment.newInfections - environment.newDeaths;
		environment.totalSurvivors+=environment.newSurvivors;
		console.log('On week ' + Math.floor(environment.week) + ', after ' + Math.floor(environment.totalInfections) + ' total infections, there are ' + Math.floor(environment.totalDeaths) + ' total deaths and ' + Math.floor(environment.totalSurvivors) + ' total recovered survivors.');
		
	}

	// console.log('On week ' + Math.floor(environment.week) + ' there are ' + Math.floor(environment.totalDeaths) + ' new deaths and ' + Math.floor(environment.totalSurvivors) + ' total recovered survivors.');
	console.table(environment);
	console.log('Healthy people: ' + environment.healthyPeople);
	console.log('Sanity check: ' + (environment.totalDeaths + environment.totalSurvivors));



	// // for (var i=0;environment.healthyPeople >= (environment.deaths + environment.totalSurvivors);i++) {
	// for (var i=0;environment.infected>0;i++) {
	// 	if (environment.week % 2 === 0) {
	// 		if (environment.healthyPeople > 0) {
	// 			// new infections
	// 			newInfections = environment.infected * virus.reproductionRate;
	// 			if (newInfections > environment.healthyPeople) { newInfections = environment.healthyPeople }
	// 			environment.infected += newInfections;
	// 			environment.weeklyInfections.push(Math.floor(newInfections));
	// 			environment.healthyPeople-=newInfections;

	// 			console.log('On week ' + (environment.week + 1));
	// 			console.log('There are ' + Math.ceil(environment.healthyPeople) + ' healthy people.');
	// 			console.log('There are ' + Math.floor(newInfections) + ' new infections for a total of ' + Math.floor(environment.infected) + ' infections.');
	// 		}
	// 		// console.log('There are ' + Math.floor(environment.healthyPeople) + ' healthy people left.');
	// 		// console.log('On week ' + (environment.week + 1) + ' there are ' + Math.floor(newInfections) + ' new infections.');
	// 		// console.log('Currently infected: ' + Math.floor(environment.infected));
	// 		// console.log(environment.weeklyInfections);
	// 		environment.week++;
			
	// 	} else {
	// 		// get better or die
	// 		var died = environment.weeklyInfections[environment.weeklyInfections.length - 2] * virus.deathRate;
	// 		var survived = environment.weeklyInfections[environment.weeklyInfections.length - 2] - died;
	// 		environment.totalSurvivors+=survived;

	// 		if (environment.infected > 0) {
	// 			environment.healthyPeople-=(died+survived+environment.infected);
				
	// 			environment.infected-=(died+survived);
				
	// 			environment.population-=died;
	// 		}

	// 		if (environment.healthyPeople < 0) { environment.healthyPeople = 0 }
	// 		if (environment.infected < 0) { environment.infected = 0 }

	// 		console.log(environment.infected);
			
			

	// 		// console.log('Died: ' + Math.floor(died) + ' | Got better: ' + Math.floor(survived));


	// 		// console.log('On week ' + (environment.week - 1) + environment.weeklyInfections[environment.weeklyInfections.length - 2] + ' new infections');
	// 		// var newDeaths = environment.infected * virus.deathRate;

	// 		console.log('On week ' + (environment.week + 1));
	// 		console.log(Math.floor(died) + ' died, while ' + Math.floor(survived) + ' got better this week.');
	// 		environment.week++;
	// 	}

		
	// 	// console.log('On week ' + environment.week + ' there are ' + Math.floor(newInfections) + ' new infections.');

		
	// 	// console.log('Infected: ' + Math.floor(environment.infected));
		
	// 	environment.deaths+=(environment.infected * virus.deathRate)
	// 	// console.log('Deaths: ' + Math.floor(environment.deaths));

	// 	console.log('-----------------');
	// }
});