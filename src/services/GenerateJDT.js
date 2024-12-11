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
        let message = commit.commit.message.split("\n");
        let status = "Non indiqué";
        let time = "Non indiqué";
        let comment = "";

        if (message.length >= 3) {
            status = message[2].split("-")[1];
            time = message[2].split("-")[0];
        }

        let statusArray = status.split(" ");
        status = statusArray[0]

        if (statusArray.length > 1) {
            comment = statusArray.slice(1).join(" ");
        }
        else {
            status = "Non indiqué";
            comment = "Non indiqué";
        }

        ROWS.push([
            { value: commit.commit.author.name, type: String },
            { value: commit.commit.author.date, type: String },
            { value: message[0], type: String },
            { value: status, type: String },
            { value: time, type: String },
            { value: comment, type: String }
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