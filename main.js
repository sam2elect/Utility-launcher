const electron = require('electron');
const path = require('path');
const url = require('url');

process.env.NODE_ENV = 'development';

const {app, BrowserWindow,Menu} = electron;

let mainWindow;

// Listen for app to be ready
app.on('ready', function(){
    // Create new window
    mainWindow = new BrowserWindow({});
    // Load html in window
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'mainWindow.html'),
      protocol: 'file:',
      slashes:true
    }));
    // Quit app when closed
    mainWindow.on('closed', function(){
      app.quit();
    });
  
    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu);
  });

  function NotePadWindow(){
    var child = require('child_process').execFile;
    var executablePath = "notepad.exe";
    
    child(executablePath, function(err, data) {
        if(err){
           console.error(err);
           return;
        }
     
        console.log(data.toString());
    });
}
function PaintWindow(){
    var child = require('child_process').execFile;
    var executablePath = "mspaint.exe";
    
    child(executablePath, function(err, data) {
        if(err){
           console.error(err);
           return;
        }
     
        console.log(data.toString());
    });
}

const mainMenuTemplate=[
    {
        label:'File',
        submenu:[
            {
                label:'NotePad',
                click(){
                    accelerator:process.platform == 'darwin' ? 'Command+N' : 'Ctrl+N',
                   NotePadWindow();
                  }
             },
         {
            label:'Paint',
            click(){
                accelerator:process.platform == 'darwin' ? 'Command+p' : 'Ctrl+p',
                PaintWindow();
            }
         },
         
         {
             label:'Quit',
             accelerator:process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
             click(){
                 app.quit();
             }
         }
        ]
    }
];
// If OSX, add empty object to menu
if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
  }
// Add developer tools option if in dev
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
      label: 'Developer Tools',
      submenu:[
        {
          role: 'reload'
        },
        {
          label: 'Toggle DevTools',
          accelerator:process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
          click(item, focusedWindow){
            focusedWindow.toggleDevTools();
          }
        }
      ]
    });
  }