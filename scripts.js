$(document).ready(function() {
	// model our virus characteristics
	var virus = {
		name: "COVID-19",
		reproductionRate: 2.5, 				// 2.5
		deathRate: 0.034, 						// 3.4%
		infectionDuration: 2, 				// weeks
		incubationPeriod: 2, 					// weeks
		infectPeople: function() {
			environment.newInfections*=this.reproductionRate;
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
		},
		surviveOrDie: function() {
			environment.newDeaths = environment.newInfections * this.deathRate;
			environment.totalDeaths+=environment.newDeaths;

			environment.newSurvivors = environment.newInfections - environment.newDeaths;
			environment.totalSurvivors+=environment.newSurvivors;
		}
	};

	// model our environment where the virus is present
	var environment = {
		name: "United States of America",
		population: 330000000, 				// 330 million,
		healthyPeople: 330000000 - 1,
		newInfections: 1,
		totalInfections: 1,
		newDeaths: 0,
		totalDeaths: 0,
		newSurvivors: 0,
		totalSurvivors: 0,
		week: 0,
		incrementTime: function() {
			this.week+=2;
		}
	};

	for (var i=0;environment.healthyPeople > 0;i++) {
		environment.incrementTime();
		virus.infectPeople();
		virus.surviveOrDie();

		console.log('On week ' + Math.floor(environment.week) + ', after ' + Math.floor(environment.totalInfections) + ' total infections, there are ' + Math.floor(environment.totalDeaths) + ' total deaths and ' + Math.floor(environment.totalSurvivors) + ' total recovered survivors.');
	}

	console.table(environment);
	console.log('Healthy people: ' + environment.healthyPeople);
	console.log('Sanity check: ' + (environment.totalDeaths + environment.totalSurvivors));
});