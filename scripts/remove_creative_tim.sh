# Remove imported CreativeTim components, assets and layouts that were namespaced to CreativeTim#
# e.g.
#  <Dest Repo>/components/CreativeTim/
#
# Example Usage:
#  sh ./scripts/remove_creative_tim.sh

# shellcheck disable=SC2013

function remove_item_locally {
  local item=$1
  if [[ $item =~ /$ ]]; then
    remove_dir "$(basename "$item")"
  else
    remove_file "$item"
  fi
}

function remove_dir {
  local item=$1
  rm -rf "$THIS_REPO/$item/CreativeTim"
}

function remove_file { rm $1; }

THIS_REPO=$(pwd)
for item in  $(cat ./scripts/creative_tim_files_to_steal.txt); do
  remove_item_locally "$item"
done