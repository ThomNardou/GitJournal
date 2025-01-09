document.addEventListener('DOMContentLoaded', async () => {
    const btn = document.getElementById('tokenButton');
    const text = document.getElementById('tokenText');
    const reposList = document.getElementById('reposList');

    const repos = await window.ipcRenderer.invoke("get-repos")


    for (let repo of repos.data) {
        const reposDiv = document.createElement('div');
        const reposName = document.createElement('h2')
        const reposDescription = document.createElement('p')
        const generateJDT = document.createElement('button')
        const status = document.createElement('p')

        reposDiv.className = 'reposDiv'
        reposName.textContent = repo.name;
        reposDescription.textContent = repo.description ? repo.description : "Il n'y a pas de description pour ce repos";
        status.textContent = ""
        status.style.display = 'none'

        generateJDT.textContent = "Générer le JDT";
        generateJDT.addEventListener('click', async () => {
            status.style.display = 'block'
            status.textContent = "Génération en cours..."
            const obj = {
                name: repo.name,
                owner: repo.owner.login
            }
            status.textContent = await window.ipcRenderer.invoke("get-commits", obj);

            setInterval(() => {
                status.textContent = ""
                status.style.display = 'none'
            }, 3000)

        })

        reposDiv.appendChild(reposName);
        reposDiv.appendChild(reposDescription);
        reposDiv.appendChild(generateJDT);
        reposDiv.appendChild(status);

        reposList.appendChild(reposDiv);

    }

})