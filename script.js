function displayRepositories() {
	var output = document.getElementById("repositories");
	//get the data
	var httpRequest = new XMLHttpRequest();
	httpRequest.open("GET", "https://api.github.com/users/yourWaifu/repos?sort=pushed", true);
	httpRequest.responseType = "json";
	httpRequest.onload = function() {
		if (this.status !== 200) {
			console.log("Failed to retrieve up to date repository data")
			return;
		}
		var replacement = document.createElement('tbody');
		tbody = document.getElementById("repositories-tbody")
		tbody.parentNode.replaceChild(replacement, tbody);
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
				link.innerHTML = "<i class=\"fab fa-github\"></i>";
				githubLinkCell.appendChild(link);
			}
		}
	}
	httpRequest.send();
}

window.onload = displayRepositories;