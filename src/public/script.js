document.addEventListener('DOMContentLoaded', async () => {
    const btn = document.getElementById('tokenButton');
    const text = document.getElementById('tokenText');
    const reposList = document.getElementById('reposList');

    const repos = await window.ipcRenderer.invoke("get-repos")


    for (let repo of repos.data) {
        const reposDiv = document.createElement('div');
        const reposName = document.createElement('h3')
        const reposDescription = document.createElement('p')
        const reposUrl = document.createElement('a')
        const generateJDT = document.createElement('button')

        reposDiv.className = 'reposDiv'
        reposName.textContent = repo.name;
        reposDescription.textContent = repo.description ? repo.description : "Il n'y a pas de description pour ce repos";
        reposUrl.textContent = "Lien vers le repos";
        reposUrl.href = repo.html_url;

        generateJDT.textContent = "Générer le JDT";
        generateJDT.addEventListener('click', () => {
            const obj = {
                name: repo.name,
                owner: repo.owner.login
            }
            window.ipcRenderer.invoke("get-commits", obj)
        })

        reposDiv.appendChild(reposName);
        reposDiv.appendChild(reposDescription);
        reposDiv.appendChild(reposUrl);
        reposDiv.appendChild(generateJDT);

        reposList.appendChild(reposDiv);

    }

})