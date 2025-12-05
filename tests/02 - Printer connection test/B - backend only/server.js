/**
  Developer Notes:
  ==================    
  
  Printer Connection Test - Option B: backend printing via Node.js: 
  If you click a button, does it send a command to the printer and print a basic message? 

  Problem: 
    - Browsers do not allow silent (automatic) printing due to security & privacy reasons.
    - The window.print() method always shows a print dialog and cannot be bypassed with JavaScript alone. The user must confirm the print action.

  Learnings:
    - Direct printer access requires backend or native code normally.
  
  Solution:
   - Use the OS print command lp in a node.js project to send it to the printer by running a node.js script in the backend.
   - This script creates a text file and sends it to the printer using the lp command.
   - But you need to run index.js in the terminal, not in the browser.

  ‼️ Limitations:
    - You need to have a default printer set up on your Mac for this to work.
    - Test is done with USB connected printer, not network printer.
    - There is no interaction with the browser or frontend in this example. So there is no button to click.

**/


const fs = require('fs');
//fs stands for File System. 
// This built-in Node module lets you read, write, and manage files on your computer.

const { exec } = require('child_process');
// child_process.exec lets you run a shell command (like you would in Terminal) from inside Node.js.
// Here, you're using it to run the lp command — the macOS command-line utility for sending files to a printer.

const ticketText = "🎟 Ticket\nName: John Doe\nTime: 12:30 PM\nSeat: A12";

const filePath = 'ticket.txt';

// Write text to file

fs.writeFileSync(filePath, ticketText);
//This writes the ticketText content into ticket.txt.
// The Sync means it does this synchronously — it waits for the file to finish writing before moving on.
// This line creates (or overwrites) a file called ticket.txt in the same folder where you run your script.

exec(`lp ${filePath}`, (error, stdout, stderr) => {
  // Send the file to the printer using 'lp' 
  // Runs the shell command: lp ticket.txt
  // On macOS, lp is the command to send a file to the default printer.
  // This function has a callback to handle the result of the command.
  
  // If something goes wrong (like the printer isn't connected), it logs the error and exits the function.
  if (error) {
    console.error('Print error:', error);
    return;
  }
  // Checks if there's any standard error output (even if there was no fatal error). If yes, it logs that as well.
  if (stderr) {
    console.error('Print stderr:', stderr);
    return;
  }
  // If everything worked, it logs that the print command was sent to the printer. 
  // stdout contains any output from the command, which is usually empty for lp.
  console.log('Print command sent successfully:', stdout);
});
