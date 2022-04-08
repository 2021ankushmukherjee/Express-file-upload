const express = require("express");
const upload = require("express-fileupload");

const app = express();

app.use(upload());

app.get("/", (req, res) => {

    res.status(200).sendFile(__dirname + "/index.html");
});

app.post("/", async (req, res) => {
    
    if (req.files) {
        // console.log(req.files);
        const file = req.files.file;

        // for define selected file type
        const ext = file.name.split('.');
        console.log(ext);
        //ext.pop();
        
       console.log(ext[1]);

        if(ext[1]!=="jpg" && ext[1]!=="jpeg"){

            return res.status(400).json({message: "Please upload jpeg only"});
        }
        

        const fileName = await file.name;

        await file.mv("./uploads/" + fileName, (err) => {

            if (err) {
                res.send(err);
            }
            else {
                res.send("file uploaded");
            }



        });
    }
});


app.listen(5000, () => {

    console.log("server is connected succesfully");
});
