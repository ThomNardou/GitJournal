import  {Octokit} from "@octokit/rest";

const GetReposCommits = async  (token, repos, username) => {
    const octokit = new Octokit({
        auth: token
    })

    const commits = await octokit.request("GET /repos/{owner}/{repo}/commits", {
        owner: username,
        repo: repos
    })

    return commits.data


}

export default GetReposCommits;