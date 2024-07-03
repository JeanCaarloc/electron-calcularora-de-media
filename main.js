const { app, BrowserWindow, Menu } = require('electron/main')
const path = require('node:path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


const template = [
  {label:'Arquivo',
      submenu:[
          {label: 'Sair', click: ()=> app.quit(), accelerator: 'Alt+f4'} //definindo um evento click para fechar o app, definindo alt+f4 como atalho
      ]
  },
  {label:'Exibir',
      submenu: [
          {label: 'Recarregar', role: 'reload'}, //função para recarregar a página
          {label: 'Ferramentas Do Desenvolvedor', role: 'toggleDevTools'}, //abre ferramentas avançadas
          {type: 'separator'}, //separa linhas
          {label: '+', role: 'zoomin'}, //aplicar zoom
          {label: '-', role: 'zoomout'}, //reduzir zoom
          {label: 'Zoom padrão', role: 'resetZoom'} //restaurar zoom ao inicial
      ]
  },
  {label: 'Ajuda', 
      submenu: [
          {label: 'Documentação', click: ()=> shell.openExternal('https://www.electronjs.org/docs/latest/api/shell')}, //chama um evento para abrir um link externo
          {type: 'separator'},
          {label: 'Sobre', click: ()=> janelasobre()}
      ]      
  }
]