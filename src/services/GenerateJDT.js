import writeXlsxFile from "write-excel-file/node";
import * as os from "node:os";

const generateJDT = async (commitList, reposName) => {
    const HEADER_ROW = [
        {
            value: "Author",
            type: String,
            fontWeight: 'bold'
        },
        {
            value: "Date",
            type: String,
            fontWeight: 'bold'
        },
        {
            value: "Message",
            type: String,
            fontWeight: 'bold'
        },
        {
            value: "Status",
            type: String,
            fontWeight: 'bold'
        },
        {
            value: "temps passé",
            type: String,
            fontWeight: 'bold'
        },
        {
            value: "Commentaire",
            type: String,
            fontWeight: 'bold'
        }
    ]

    const ROWS = []

    for (let commit of commitList) {

        // console.log(commit);
        let commitName = "";
        let commitDescription = "";
        let JDTInfos = "";
        let workComment = "";
        let message = commit.commit.message.split("\n");

        let workInfos = {
            time: "",
            status: "",
            issue: "",
        }

        console.log("message : ", message);

        if (message.length > 1) {
            commitName = message[0];
            commitDescription = message[2];
        }
        else {
            commitName = message[0];
            workInfos.time = "Non indiqué";
            workInfos.status = "Non indiqué";
            workInfos.issue = "Non indiqué";
        }

        if (commitDescription) {
            const jdts = commitDescription.split(" ");
            if (jdts.length > 1) {
                JDTInfos = jdts[0];
                workComment = jdts.slice(1).join(" ") ? jdts.slice(1).join(" ") : "Non indiqué";
                workInfos.time = JDTInfos.split("-")[0];
                workInfos.status = JDTInfos.split("-")[1];
                workInfos.issue = JDTInfos.split("-")[2] ? JDTInfos.split("-")[2] : "Non indiqué";
            }
        }

        // let statusArray = status.split(" ");
        // status = statusArray[0]
        //
        // if (statusArray.length > 1) {
        //     comment = statusArray.slice(1).join(" ");
        // }
        // else {
        //     status = "Non indiqué";
        //     comment = "Non indiqué";
        // }

        ROWS.push([
            { value: commit.commit.author.name, type: String },
            { value: commit.commit.author.date, type: String },
            { value: commitName, type: String },
            { value: workInfos.status, type: String },
            { value: workInfos.status, type: String },
            { value: workComment, type: String }
        ]);
    }

    const DATA = [HEADER_ROW, ...ROWS]

    const user = os.userInfo().username;

    try {
        await writeXlsxFile(DATA, { filePath: `C:\\Users\\${user}\\Documents\\${reposName}-JDT.xlsx` })
        return true;
    }
    catch (e) {
        console.log("GENERATEJDT : ", e);
        return false;
    }




};

export default generateJDT;