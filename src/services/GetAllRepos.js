import { Octokit } from '@octokit/rest';


const GetAllRepos = async (access_token) => {
    const octokit = new Octokit({
        auth: access_token,
    })

    const res = await octokit.request("GET /user/repos")

    console.log(res)
    return res
}

export {GetAllRepos}