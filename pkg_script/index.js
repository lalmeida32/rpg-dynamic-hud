const { execSync } = require('child_process')
const path = require('path')

const easyExec = (message, command, cwd) => {

  process.stdout.write(message + ': ')
  try {
    const stdout = execSync(command, {cwd: cwd ? cwd : __dirname, stdio: 'pipe'})
    console.log('successful')
    if (process.argv[2] === '-v')
      console.log(stdout.toString())
  }
  catch (e) {
    console.log('failed')
    console.log(e.message)
    process.exit(1)
  }
}

// Setting temp environment

easyExec(
  'Generating build directories',
  'rm -rf ./build && mkdir ./build && mkdir ./build/temp && mkdir ./build/temp/public'
)

easyExec(
  'Removing dist directories from client and server',
  'cd client && rm -rf ./dist && cd .. && cd server && rm -rf ./dist && cd ..',
  path.resolve(__dirname, '..')
)

easyExec(
  'Building client',
  'cd client && yarn run build',
  path.resolve(__dirname, '..')
)

easyExec(
  'Moving client content',
  'mv ./client/dist/* ./pkg_script/build/temp/public && rmdir ./client/dist',
  path.resolve(__dirname, '..')
)

easyExec(
  'Building server',
  'cd server && yarn run build',
  path.resolve(__dirname, '..')
)

easyExec(
  'Moving server content',
  'mv ./server/dist/* ./pkg_script/build/temp && rmdir ./server/dist',
  path.resolve(__dirname, '..')
)

easyExec(
  'Copying server package.json',
  'cp ./server/package.json ./pkg_script/build/temp',
  path.resolve(__dirname, '..')
)

// package.json adjusting

process.stdout.write('Adjust package.json: ')

const fs = require('fs')
try {
  const filePath = path.resolve(__dirname, 'build', 'temp', 'package.json')

  const raw = fs.readFileSync(filePath)
  const packageJsonData = JSON.parse(raw)
  
  delete packageJsonData.devDependencies
  
  packageJsonData.bin = 'index.js'
  packageJsonData.scripts = {
    'build': 'pkg .'
  }
  packageJsonData.devDependencies = {
    'pkg': '^5.6.0'
  }
  packageJsonData.pkg = {
    'targets': [
      'node16-win-x64',
      'node16-linux-x64'
    ],
    'assets': 'public/**/*',
    'outputPath': 'dist',
  }

  fs.writeFileSync(filePath, JSON.stringify(packageJsonData))
}
catch (e) {
  console.log('failed')
  console.log(e.message)
  process.exit(1)
}

console.log('successful')

// Running pkg and removing temp environment

easyExec(
  'Running yarn',
  'cd ./build/temp && yarn',
)


easyExec(
  'Running pkg',
  'cd ./build/temp && yarn run build',
)

easyExec(
  'Moving executables and removing temp environment',
  'mv ./build/temp/dist/* ./build && rm -r ./build/temp',
)