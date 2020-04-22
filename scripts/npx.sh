# thanks to https://jbonigomes.com/publish-package-to-npx
npx create-nuxt-app $1
FUZZCO_BOILERPLATE_DIR="fuzzco-boilerplate"

# clear all directories with just a README
# https://unix.stackexchange.com/a/535381
# README_ONLY_DIRS=$(find $1 -type d -exec bash -O dotglob -c '
#     for dirpath do
#         ok=true
#         seen_files=false
#         set -- "$dirpath"/*
#         for name do
#             [ -d "$name" ] && continue  # skip dirs
#             seen_files=true
#             case "${name##*/}" in
#                 README.md) ;; # do nothing
#                 *) ok=false; break
#             esac
#         done
#
#         "$seen_files" && "$ok" && printf "%s\n" "$dirpath"
#     done' bash {} +)
#
# while read -r line; do`
#     rm -r "$line"
# done <<< "$README_ONLY_DIRS"

cd "$1"
find . -name README.md -delete -o -name Logo.vue -delete
degit "fuzzco/fuzznuxt#npx" "$FUZZCO_BOILERPLATE_DIR"

# move all dirs up a level
# (doing this instead of degit -f so we don't replace package.json)
# cp -r "$FUZZCO_BOILERPLATE_DIR/*/" ./
# TODO: fix this, not working
DIRS=$(ls -d fuzzco-boilerplate/*/)
while read -r line; do
    cp -r "$line" "${line/FUZZCO_BOILERPLATE_DIR/""}"
done <<< "$DIRS"

atom .

# install dependencies
npm i node-sass sass-loader @nuxtjs/style-resources concurrently -D
npm i @fuzzco/font-loader @nuxtjs/component-cache @nuxtjs/device auto-blur cross-fetch lodash popmotion prismic-dom prismic-javascript v-runtime-template
