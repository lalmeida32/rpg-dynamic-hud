from logging import root
from pathlib import Path

# Runtime
PKG_ROOT_PATH = None

# Really constant
PKG_BUILD_OUT_DIR_NAME = 'pkg-build'


def setupConstants(root_path : Path) -> None:
  global PKG_ROOT_PATH

  PKG_ROOT_PATH = root_path