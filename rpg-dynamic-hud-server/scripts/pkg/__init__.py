import pathlib
from src.constants import COLOR_RESET, COLOR_SUCCESS, PROJECT_BUILD_OUT_DIR_NAME, PROJECT_ROOT_PATH, SHELL_TYPE
from scripts.pkg.src import constants


def run() -> None:
  constants.setupConstants(pathlib.Path(__file__).parent.resolve())

  from scripts.pkg.src import lib

  # lib.runPython('hello')
  # lib.runBash('hello')
  # lib.runCmd('hello')
  # lib.runPowershell('hello')

  lib.runAuto('1-build-project', PROJECT_ROOT_PATH, PROJECT_BUILD_OUT_DIR_NAME)
  lib.runAuto('2-create-pkg-build-folder', PROJECT_ROOT_PATH, constants.PKG_BUILD_OUT_DIR_NAME)

  input(COLOR_SUCCESS + '\nPkg script finished successfully! Press enter to continue...' + COLOR_RESET)