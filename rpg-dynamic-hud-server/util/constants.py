import os
from pathlib import Path

# Runtime
PROJECT_ROOT_PATH = None

# Config
SHELL_TYPE = None
PROJECT_BUILD_OUT_DIR_NAME = 'dist'

# Really constant
COLOR_RESET = '\033[0m'
COLOR_SUCCESS = '\033[92m'
COLOR_PARTIAL = '\033[93m'
COLOR_ERROR = '\033[91m'



def setupConstants(root_path : Path) -> None:
  global PROJECT_ROOT_PATH
  global SHELL_TYPE
  global PROJECT_BUILD_OUT_DIR_NAME

  PROJECT_ROOT_PATH = root_path

  validation = {
    'SHELL_TYPE': ['bash', 'cmd', 'powershell']
  }

  import config

  if not hasattr(config, 'SHELL_TYPE'):
    print('Your config.py file must have a SHELL_TYPE variable defined.')
    exit()

  if not config.SHELL_TYPE in validation['SHELL_TYPE']:
    print(f'Your SHELL_TYPE is not valid: {config.SHELL_TYPE}')
    exit()

  nt_with_bash = config.SHELL_TYPE == 'bash' and os.name == 'nt'

  if nt_with_bash:
    print(f'It was detected that you are using Windows. Please use cmd or powershell.')
    exit()

  SHELL_TYPE = config.SHELL_TYPE

  if hasattr(config, 'PROJECT_BUILD_OUT_DIR_NAME'):
    PROJECT_BUILD_OUT_DIR_NAME = config.PROJECT_BUILD_OUT_DIR_NAME

  print(COLOR_SUCCESS + 'Configuration setup successful' + COLOR_RESET)



