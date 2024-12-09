import writeXlsxFile from "write-excel-file/node";
import * as os from "node:os";

const generateJDT = async (commitList, reposName) => {
    const HEADER_ROW = [
        {
            value: "Author",
            type: String
        },
        {
            value: "Date",
            type: String
        },
        {
            value: "Message",
            type: String
        },
        {
            value: "Status",
            type: String
        },
        {
            value: "temps passé",
            type: String
        }
    ]

    const ROWS = []

    for (let commit of commitList) {
        let message = commit.commit.message.split("\n");
        let status = "Non indiqué";
        let time = "Non indiqué";

        if (message.length >= 3) {
            status = message[2].split("-")[1];
            time = message[2].split("-")[0];
        }

        ROWS.push([
            { value: commit.commit.author.name, type: String },
            { value: commit.commit.author.date, type: String },
            { value: message[0], type: String },
            { value: status, type: String },
            { value: time, type: String }
        ]);
    }

    const DATA = [HEADER_ROW, ...ROWS]

    const user = os.userInfo().username;

    await writeXlsxFile(DATA, { filePath: `C:\\Users\\${user}\\Documents\\${reposName}-JDT.xlsx` })



};

export default generateJDT;