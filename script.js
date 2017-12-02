function displayRepositories() {
	var output = document.getElementById("repositories");
	//get the data
	var httpRequest = new XMLHttpRequest();
	httpRequest.open("GET", "https://api.github.com/users/yourWaifu/repos?sort=pushed", true);
	httpRequest.responseType = "json";
	httpRequest.onload = function() {
		document.getElementById("loading repositories").remove(); //remove loading element
		if (this.status !== 200) {
			output.innerHTML = "<p>Error: Could not load repositories from Github. The status code " + status + " was returned</p>";
			return;
		}
		repositoryCount = this.response.length;
		for (var i = 0; i < repositoryCount; ++i) {
			let repo = this.response[i];
			if(repo.fork == false) {
				//create row and cells
				let row             = output.insertRow (-1);
				var nameCell        = row   .insertCell( 0);
				let descriptionCell = row   .insertCell( 1);
				var githubLinkCell  = row   .insertCell( 2);
				
				//fill in the cells
				if (repo.homepage) {
					let link = document.createElement("a");
					link.setAttribute("href", repo.homepage);
					link.innerHTML = repo.name;
					nameCell.appendChild(link);
				} else {
				nameCell.innerHTML = repo.name; //remember to parse the name and remove the - and make them capitalized
				}
				
				if (repo.description)
					descriptionCell.innerHTML = repo.description;
				
				let link = document.createElement("a");
				link.setAttribute("href", repo.html_url);
				link.innerHTML = "<i class=\"fa fa-github\" aria-hidden=\"true\"></i>";
				githubLinkCell.appendChild(link);
			}
		}
	}
	httpRequest.send();
}

window.onload = displayRepositories;