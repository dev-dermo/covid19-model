$(document).ready(function() {
	// model our virus characteristics
	var virus = {
		name: "COVID-19",
		reproductionRate: 0.025, 			// 2.5%
		deathRate: 0.034, 						// 3.4%
		infectionDuration: 2, 				// weeks
		incubationPeriod: 2, 					// weeks
	};

	// model our environment where the virus is present
	var environment = {
		name: "United States of America",
		population: 330000000, 				// 330 million
		peopleInfected: 1,						// patient 0
		deaths: 0,
		survivors: 0,
		week: 0,											// week 0

	};

	
});