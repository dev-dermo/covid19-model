$(document).ready(function() {
	// model our virus characteristics
	var intervalId;

	var virus = {
		name: "COVID-19",
		reproductionRate: 2.5, 				// 2.5
		deathRate: 0.034, 						// 3.4%
		incubationPeriod: 2, 					// weeks
		dampener: 1,									// rate of infection rate decline
		populationCoverageCap: 0.4,
		infectPeople: function() {
			environment.newInfections*=this.reproductionRate;
			if (environment.newInfections > environment.healthyPeople) {
				environment.newInfections = environment.healthyPeople;
				this.stopInterval();
			}

			environment.totalInfections+=environment.newInfections;
			if (environment.totalInfections > environment.population) {
				environment.totalInfections = environment.population;
				this.stopInterval();
			}

			environment.healthyPeople-=environment.newInfections;
			if (environment.healthyPeople < 0) {
				environment.healthyPeople = 0;
				this.stopInterval();
			}

			var popCovCap = environment.population * virus.populationCoverageCap;
			if (environment.totalInfections > popCovCap) {
				// virus.reproductionRate = 0;
				// virus.deathRate = 0;
				environment.totalInfections = popCovCap;
				// alert(Math.floor(environment.totalInfections * virus.deathRate));
				environment.totalDeaths = Math.floor(environment.totalInfections * virus.deathRate);
				environment.totalSurvivors = environment.totalInfections - environment.totalDeaths;
				updatePage();

				this.stopInterval();
				// alert('Pop cap reached');
			}
		},
		surviveOrDie: function() {
			environment.newDeaths = environment.newInfections * this.deathRate;
			environment.totalDeaths+=environment.newDeaths;

			environment.newSurvivors = environment.newInfections - environment.newDeaths;
			environment.totalSurvivors+=environment.newSurvivors;
		},
		stopInterval: function() {
			clearInterval(intervalId);
		}
	};

	// model our environment where the virus is present
	var environment = {
		name: "United States of America",
		population: 330000000, 				// 330 million,
		healthyPeople: 0,
		newInfections: 1,
		totalInfections: 1,
		newDeaths: 0,
		totalDeaths: 0,
		newSurvivors: 0,
		totalSurvivors: 0,
		week: 0,
		incrementTime: function() {
			this.week+=virus.incubationPeriod;
		}
	};
	environment.healthyPeople = environment.population - 1;


	$('#reproduction-rate').val(virus.reproductionRate);
	$('#death-rate').val(virus.deathRate);
	$('#reproduction-cycle').val(virus.incubationPeriod);
	$('#dampener').val(virus.dampener);
	$('#population-coverage-cap').val(virus.populationCoverageCap);
	$('#population').val(environment.population);
	$('#healthy-people').text(environment.healthyPeople);

	$('input').on('change', function() {
		virus.reproductionRate = parseFloat($('#reproduction-rate').val());
		virus.deathRate = parseFloat($('#death-rate').val());
		virus.incubationPeriod = parseFloat($('#reproduction-cycle').val());
		virus.dampener = parseFloat($('#dampener').val());
		environment.population = parseFloat($('#population').val());
		environment.healthyPeople = environment.population - 1;
		$('#healthy-people').text(environment.healthyPeople);
	});

	$('#start').on('click', function() {
		intervalId = setInterval(updatePage, 500);
	});

	console.log('On week ' + Math.floor(environment.week) + ', after ' + Math.floor(environment.totalInfections) + ' total infections, there are ' + Math.floor(environment.totalDeaths) + ' total deaths and ' + Math.floor(environment.totalSurvivors) + ' total recovered survivors.');

	function updatePage() {
		environment.incrementTime();
		virus.infectPeople();
		virus.surviveOrDie();

		console.log('On week ' + Math.floor(environment.week) + ', after ' + Math.floor(environment.totalInfections) + ' total infections, there are ' + Math.floor(environment.totalDeaths) + ' total deaths and ' + Math.floor(environment.totalSurvivors) + ' total recovered survivors.');

		$('#total-deaths').text(Math.floor(environment.totalDeaths));
		$('#week').text(Math.floor(environment.week));
		$('#total-infections').text(Math.floor(environment.totalInfections));
		$('#total-recovered').text(Math.floor(environment.totalSurvivors));
		$('#healthy-people').text(Math.floor(environment.healthyPeople));

		for (var i=0;i<(Math.floor(environment.totalDeaths / 10000));i++) {
			$('.icons').append('<i class="fa fa-users" aria-hidden="true"></i>');
		}

		virus.reproductionRate *= virus.dampener;
	}


	

	// console.table(environment);
	// console.log('Healthy people: ' + environment.healthyPeople);
	// console.log('Sanity check: ' + (environment.totalDeaths + environment.totalSurvivors));
});