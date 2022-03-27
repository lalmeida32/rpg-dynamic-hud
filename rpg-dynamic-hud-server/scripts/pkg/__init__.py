import pathlib
from util.constants import COLOR_ERROR, COLOR_RESET, COLOR_SUCCESS, PROJECT_BUILD_OUT_DIR_NAME, PROJECT_ROOT_PATH, SHELL_TYPE
from scripts.pkg.util import constants


def run() -> None:
  constants.setupConstants(pathlib.Path(__file__).parent.resolve())

  from scripts.pkg.util import libs

  # libs.runPython('hello')
  # libs.runBash('hello')
  # libs.runCmd('hello')
  # libs.runPowershell('hello')

  libs.runAuto('1-build-project', PROJECT_ROOT_PATH, PROJECT_BUILD_OUT_DIR_NAME)
  libs.runAuto('2-create-pkg-build-folder', PROJECT_ROOT_PATH, constants.PKG_BUILD_OUT_DIR_NAME)
  libs.runAuto('3-copying-dist-to-pkg-build', PROJECT_ROOT_PATH, PROJECT_BUILD_OUT_DIR_NAME, constants.PKG_BUILD_OUT_DIR_NAME)
  libs.runAuto('4-copying-sample-to-pkg-build', PROJECT_ROOT_PATH, constants.PKG_ROOT_PATH, constants.PKG_BUILD_OUT_DIR_NAME)
  libs.runPython('5-generate-package-json', PROJECT_ROOT_PATH, PROJECT_BUILD_OUT_DIR_NAME, constants.PKG_BUILD_OUT_DIR_NAME, COLOR_ERROR, COLOR_RESET)
  libs.runAuto('6-install-dependencies-pkg-build', PROJECT_ROOT_PATH, constants.PKG_BUILD_OUT_DIR_NAME)
  libs.runAuto('7-run-pkg', PROJECT_ROOT_PATH, constants.PKG_BUILD_OUT_DIR_NAME)
  libs.runAuto('8-remove-unecessary-files', PROJECT_ROOT_PATH, constants.PKG_BUILD_OUT_DIR_NAME)


  input(COLOR_SUCCESS + '\nPkg script finished successfully! Press enter to continue...' + COLOR_RESET)