import  {Octokit} from "@octokit/rest";

const GetReposCommits = async  (token, repos, username) => {

    try {
        const octokit = new Octokit({
            auth: token
        })

        const commits = await octokit.request("GET /repos/{owner}/{repo}/commits", {
            owner: username,
            repo: repos
        })

        return commits.data;
    }
    catch (e) {
        console.log("GETREPOSCOMMITS : ", e);
        return null;
    }


}

export default GetReposCommits;