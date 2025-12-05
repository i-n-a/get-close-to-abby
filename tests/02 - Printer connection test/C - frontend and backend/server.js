require('dotenv').config();
const isDevelopment = (process.env.NODE_ENV === 'development');
const express = require('express');
const app = express();
const fs = require('fs'); // fs is the Node.js File System module, used to read and write files on the server.
const { exec } = require('child_process'); // exec is a Node.js function that allows you to run shell commands from your Node.js code. child_process.exec is used to run the lp command to print files.
const http = require('http');
const https = require('https');

let options = {};
if (isDevelopment) {
  options = {
    key: fs.readFileSync('./localhost.key'),
    cert: fs.readFileSync('./localhost.crt')
  };
}

const server = isDevelopment
  ? https.createServer(options, app)
  : http.createServer(app);

const port = process.env.PORT || 3000;

server.listen(port, () => {
 console.log(`App listening on port ${port}!`);
});

app.use(express.json());
app.use(express.static('public'));

app.post('/print-ticket', (req, res) => {
  // You could customize ticketText from req.body here

  const ticketText = `🎟 Ticket
  Name: John Doe
  Time: 12:30 PM
  Seat: A12`;

  const filePath = 'ticket.txt';

  fs.writeFileSync(filePath, ticketText);

  exec(`lp ${filePath}`, (error, stdout, stderr) => {
    if (error) {
      console.error('Print error:', error);
      return res.status(500).json({ message: 'Print error', error });
    }
    if (stderr) {
      console.error('Print stderr:', stderr);
      return res.status(500).json({ message: 'Print stderr', stderr });
    }
    console.log('Print command sent successfully:', stdout);
    return res.json({ message: 'Print job sent successfully' });
  });
});


