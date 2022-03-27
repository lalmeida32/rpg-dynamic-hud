import pathlib
from util import constants

root_path = pathlib.Path(__file__).parent.resolve()

if not root_path.joinpath('config.py').is_file():
  print(f'You must create a config.py file in this folder: {root_path}')
  exit()

constants.setupConstants(root_path)

# ----------------------------------

from util.libs import clearTerminal

import scripts.pkg

while True:
  clearTerminal()
  print('Options:')
  print('[1] pkg script')
  print('[x] exit')
  option = input('\nChoose: ')

  if len(option) == 0:
    continue

  if option[0] == '1':
    scripts.pkg.run()

  if option[0] == 'x':
    clearTerminal()
    break

