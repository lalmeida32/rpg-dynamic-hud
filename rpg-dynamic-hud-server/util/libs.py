import os
from util.constants import SHELL_TYPE

def clearTerminal() -> None:
  os.system('clear' if SHELL_TYPE == 'bash' else 'cls')