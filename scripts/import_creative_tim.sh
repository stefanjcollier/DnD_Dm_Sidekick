#!/bin/bash
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

function replace_repo { sed "s:$CT_REPO:$THIS_REPO:"; }

function add_namespace_to_filename {
  sed -E 's:(components|assets|layouts):\1/CreativeTim:'
}

function add_namespaces_in_file {
  sed -E 's:from "(components|assets|layouts):from "\1/CreativeTim:'
}

function copy_and_namespace_file {
  local absolute_ct_file=$1
  local dest_file
  dest_file=$(echo "$absolute_ct_file" | replace_repo | add_namespace_to_filename)
  mkdir -p "$(dirname "$dest_file")"
  if [[ $dest_file =~ \.(jpg|jpeg|png|gif|svg)$ ]]; then
    cp "$absolute_ct_file" "$dest_file"
  else
    cat "$absolute_ct_file" | add_namespace_to_filename > "$dest_file"
  fi

}

function files_to_steal {
  local file
  for file in $(cat ./scripts/creative_tim_files_to_steal.txt); do
    find "$CT_REPO/$file" -type f
  done
}

set -ex

THIS_REPO=$(pwd)
CT_REPO=$1
if [ -z "$CT_REPO" ]; then
  echo "Missing Arg: CT_REPO"
  usage
fi

for ct_file in $(files_to_steal); do
  copy_and_namespace_file "$ct_file"
done


