#!/bin/bash#
# Import the CreativeTim components, assets and layouts namespacing them to CreativeTim
#  and fix any references to match the new CreativeTime namespace
#
# e.g.
#  <CT>/components/Item/Item.js
# to:
#  <Dest Repo>/components/CreativeTim/Item/Item.js
#
# Example Usage:
#  sh ./scripts/import_creative_tim.sh ~/Downloads/nextjs-material-dashboard-master

# shellcheck disable=SC2044

function usage {
  echo "sh ./scripts/import_creative_tim.sh CT_REPO"
  echo "  CT_REPO - the absolute path to the Creative Tim repo root"
}

function replace_repo { sed "s|$CT_REPO|$THIS_REPO|"; }

function add_namespace_to_filename {
  sed 's|components|components/CreativeTim|' |
  sed 's|assets|assets/CreativeTim|' |
  sed 's|layouts|layouts/CreativeTim|'
}

function add_namespaces_in_file {
  sed 's|from "components|from "components/CreativeTim|' |
  sed 's|from "assets|from "assets/CreativeTim|' |
  sed 's|from "layouts|from "layouts/CreativeTim|'
}

function copy_and_namespace_file {
  local absolute_ct_file=$1
  local dest_file
  dest_file=$(echo "$absolute_ct_file" | replace_repo | add_namespace_to_filename)
  mkdir -p "$(dirname "$dest_file")"
  cat "$absolute_ct_file" | add_namespace_to_filename > "$dest_file"
}

function files_to_steal {
  find "$CT_REPO/components" -type f
  find "$CT_REPO/assets"     -type f
  find "$CT_REPO/layouts"    -type f
}

set -xe

THIS_REPO=$(pwd)
CT_REPO=$1
if [ -z "$CT_REPO" ]; then
  echo "Missing Arg: CT_REPO"
  usage
fi

for ct_file in $(files_to_steal); do
  copy_and_namespace_file "$ct_file"
done


