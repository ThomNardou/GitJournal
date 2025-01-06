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

        const commitArray = commit.commit.message.split("\n");

        const commitTitle = commitArray[0];
        const commitDescription = commitArray[2] ? commitArray[2] : null;

        if (!commitDescription) {
            ROWS.push([
                {value: commit.commit.author.name, type: String},
                {value: commit.commit.author.date, type: String},
                {value: commitTitle, type: String},
                {value: "Non indiqué", type: String},
                {value: "Non indiqué", type: String},
                {value: "Non Indiqué", type: String}
            ])
        }
        else {

            let splitDescription = commitDescription.split(" ");
            let infosPart = splitDescription[0].split("-");
            let commentPart = splitDescription.slice(1).join(" ").toString();

            if (commitArray.length > 3) {
                infosPart = commitArray[2] ? commitArray[2].split("-") : "Non indiqué";
                commentPart = commitArray[4] ? commitArray[4] : "Non indiqué";

                console.log("commitArray : ", commitArray);
                console.log("infosPart : ", infosPart);
                console.log("commentPart : ", commentPart);
            }




            ROWS.push([
                {value: commit.commit.author.name, type: String},
                {value: commit.commit.author.date, type: String},
                {value: commitTitle, type: String},
                {value: infosPart[1] ? infosPart[1] : "Non indiqué", type: String},
                {value: infosPart[0] ? infosPart[0] : "Non indiqué", type: String},
                {value: commentPart ? commentPart : "Non indiqué", type: String}
            ])
        }
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