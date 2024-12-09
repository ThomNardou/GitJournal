import { Octokit } from '@octokit/rest';


const GetAllRepos = async (access_token) => {
    const octokit = new Octokit({
        auth: access_token,
    })

    // TODO: Get all repos from the user
    const res = await octokit.request("GET /user/repos", {
        per_page: 100
    })

    return res
}

export {GetAllRepos}