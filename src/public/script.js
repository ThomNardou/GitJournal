
document.addEventListener('DOMContentLoaded', async () => {
    const btn = document.getElementById('tokenButton');
    const text = document.getElementById('tokenText');

    const repos = await window.ipcRenderer.invoke("get-repos")
    console.log(repos);
    
    const reposList = document.getElementById('reposList'); 
    

    for (let repo of repos.data) {
        const reposDiv = document.createElement('div');
        const reposName = document.createElement('h3')
        const reposDescription = document.createElement('p')
        const reposUrl = document.createElement('a')

        reposDiv.className = 'reposDiv'
        reposName.textContent = repo.name;
        reposDescription.textContent = repo.description ? repo.description : "Il n'y a pas de description pour ce repos";
        reposUrl.textContent = "Lien vers le repos";
        reposUrl.href = repo.html_url;

        reposDiv.appendChild(reposName);
        reposDiv.appendChild(reposDescription);
        reposDiv.appendChild(reposUrl);

        reposList.appendChild(reposDiv);

    }

})