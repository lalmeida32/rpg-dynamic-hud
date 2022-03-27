import sys
import pathlib
import json

PROJECT_ROOT_PATH = sys.argv[1]
PROJECT_BUILD_OUT_DIR_NAME = sys.argv[2]
PKG_BUILD_OUT_DIR_NAME = sys.argv[3]
COLOR_ERROR = sys.argv[4]
COLOR_RESET = sys.argv[5]
PROJECT_NAME = 'rpg-dynamic-hud-server'

def errprint(msg: str) -> None:
  print(COLOR_ERROR + 'error: ' + msg + COLOR_RESET, file=sys.stderr)

# Reading package.json data

PACKAGE_JSON_SOURCE_PATH = pathlib.Path(PROJECT_ROOT_PATH).joinpath(PROJECT_NAME).joinpath('package.json')
if not PACKAGE_JSON_SOURCE_PATH.is_file():
  errprint('source package.json file not found.')
  exit(1)

package_json_data = dict()

with open(PACKAGE_JSON_SOURCE_PATH) as package_json_source_file:
  package_json_data = json.load(package_json_source_file)

# Checking integrity
useful_fields = ['name', 'version', 'license', 'dependencies']
if not all(field_name in package_json_data for field_name in useful_fields):
  errprint('some package.json field are missing')

# Removing unecessary fields
useless_fields = []
for key in package_json_data:
  if not key in useful_fields:
    useless_fields.append(key)

for key in useless_fields:
  package_json_data.pop(key)

# Adding useful fields

package_json_data['bin'] = f'{PROJECT_BUILD_OUT_DIR_NAME}/index.js'

package_json_data['scripts'] = {
  'pkgbuild': 'pkg .'
}

package_json_data['pkg'] = {
  'targets': [
    'node16-win-x64',
    'node16-linux-x64'
  ],
  'outputPath': str(pathlib.Path(PROJECT_ROOT_PATH).joinpath(PKG_BUILD_OUT_DIR_NAME))
}

# Finally writing back in build dir
PACKAGE_JSON_DEST_PATH = pathlib.Path(PROJECT_ROOT_PATH).joinpath(PKG_BUILD_OUT_DIR_NAME).joinpath(PROJECT_NAME).joinpath('package.json')

with open(PACKAGE_JSON_DEST_PATH, 'w') as package_json_dest_file:
  json.dump(package_json_data, package_json_dest_file)
