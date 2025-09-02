import { Octokit } from '@octokit/rest';


const GetAllRepos = async (access_token) => {
    const octokit = new Octokit({
        auth: access_token,
    })

    let page = 1;
    const allRepos = [];

    while (true) {
        // TODO: Get all repos from the user
        const res = await octokit.request("GET /user/repos", {
            per_page: 100,
            page: page,
        })

        allRepos.push(...res.data);

        

        if (res.data.length < 100) {
            break;
        }
        page++;
    }


    return allRepos;
}

export {GetAllRepos}