const { exec } = require('child_process')

exec('sudo hexo server -p 80',(error, stdout, stderr) => {
  if(error){
    console.log(`exec error: ${error}`)
    return
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
})
