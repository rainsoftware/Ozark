/*
THE FOLLOWING SCRIPT IS PROPERTY OF RAINSOFTWARE's BREAKINGRAIN CYBERSECURITY & RAINSOFTWARE's DUSK & RAIN STUDIO's
REDISTRUBUTION IS STRICTLY FORBIDDEN.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.

(C) Copyright 2024 RAINSOFTWARE LLC. All rights reserved.
*/

var base_html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>bitscript access gateway</title>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <style>
    body {
      background-color: black;
      color: white;
      margin: 0;
      font-family: monospace;
      display: flex;
      height: 100vh;
      flex-direction: column;
    }
    #terminal {
      flex: 1;
      padding: 10px;
      white-space: pre-wrap; /* Allow wrapping */
      overflow-y: auto;
    }
    #input {
      border: none;
      background: none;
      color: white;
      font-family: monospace;
      font-size: 16px;
      width: 100%;
      outline: none;
    }
  </style>
</head>
<body>
  <div id="terminal"></div>
  <input id="input" autofocus />

  <script>
    const terminal = $('#terminal');

    function writeOutput(text) {
      const output = $('<div>').text(text);
      terminal.append(output);
      terminal.scrollTop(terminal[0].scrollHeight);
    }

    function handleInput(event) {
      if (event.key === 'Enter') {
        const command = $('#input').val().trim();
        $('#input').val('');

        // Write prompt and command in the same line
        writeOutput('$ ' + command);

        if (command.startsWith('http') && command.endsWith('.js')) {
          // Fetch script content via proxy
          $.get('https://cors-anywhere.herokuapp.com/' + command)
            .done(script => {
              try {
                eval(script);
                writeOutput('Script executed successfully');
              } catch (err) {
                writeOutput('Error: ' + err.message);
              }
            })
            .fail((xhr, status, error) => {
              writeOutput('Error fetching script: ' + error);
            });
        } else {
          try {
            eval(command);
            writeOutput('Command executed successfully');
          } catch (err) {
            writeOutput('Error: ' + err.message);
          }
        }

        // Write new prompt
        writeOutput('$');
        alert('secure gateway connected, VM attempting to establish 3rd security ring. . .')
      }
    }

    $('#input').keydown(handleInput);

    // Initial prompt
    writeOutput('socket.access.gateway.connect("Please click the input at the bottom of the console.") ');
    writeOutput('please navigate to (https://cors-anywhere.herokuapp.com/corsdemo) and request access to the temporary demo for scripts to run properly.');
    alert('secure gateway established.');
  </script>
</body>
</html>
`;
popup = window.open("about:blank", "", "width=800, height=400");
popup.document.write(base_html);
