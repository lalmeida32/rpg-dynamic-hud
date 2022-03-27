import os
from util.constants import COLOR_RESET, COLOR_PARTIAL, SHELL_TYPE
from scripts.pkg.util import constants

def createRunner(ext: str, folder_name: str, command: str):
  def runner(filename: str, *args: str):

    path = constants.PKG_ROOT_PATH.joinpath(folder_name).joinpath(filename + ext)
    complete_command = command + ('' if command == '' else ' ') + f'{path} {" ".join(str(i) for i in args)}'

    print(f'\n{complete_command}')
    result = os.system(complete_command)
    if result != 0:
      exit()
    print(COLOR_PARTIAL + 'Command executed successfully!' + COLOR_RESET)

  return runner

runBash = createRunner('.sh', 'bash', 'sh')
runCmd = createRunner('.cmd', 'cmd', '')
runPowershell = createRunner('.ps1', 'powershell', 'powershell -executionpolicy remotesigned -File')
runPython = createRunner('.py', 'python', 'python')


runAuto = {
  'bash': runBash,
  'cmd': runCmd,
  'powershell': runPowershell,
}[SHELL_TYPE]