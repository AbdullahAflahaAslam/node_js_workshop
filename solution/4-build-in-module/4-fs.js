// TODO: import file system module from node
const FS = require('fs')
const PATH = require('path')

// TODO: Read All file in current directory
const currentPath = PATH.resolve(__dirname)
const ls = FS.readdirSync(currentPath, "utf8")
ls.forEach(item => console.log(item))

// TODO: Read note.txt if file not exist create it
const filename = 'note.txt'
const filePath = `${currentPath}/${filename}`
if (!FS.existsSync(filePath)) {
  FS.writeFileSync(filePath, 'This note from file.', 'utf8')
} else {
  const notes = FS.readFileSync(filePath, 'utf8')
  console.log(notes)
}