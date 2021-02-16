# make sure degit and prettier are installed
if ! [ -x "$(command -v degit)" ]; then
    echo "Fuzznuxt requires degit. Run 'npm install -g degit' to install, then try again."
    exit 1
fi

if ! [ -x "$(command -v prettier)" ]; then
    echo "Fuzznuxt requires prettier. Run 'npm install -g prettier' to install, then try again."
    exit 1
fi

# thanks to https://jbonigomes.com/publish-package-to-npx
npx create-nuxt-app $1
FUZZCO_BOILERPLATE_DIR="fuzzco-boilerplate"

# clear all directories with just a README
# https://unix.stackexchange.com/a/535381
README_ONLY_DIRS=$(find $1 -type d -exec bash -O dotglob -c '
    for dirpath do
        ok=true
        seen_files=false
        set -- "$dirpath"/*
        for name do
            [ -d "$name" ] && continue  # skip dirs
            seen_files=true
            case "${name##*/}" in
                README.md) ;; # do nothing
                *) ok=false; break
            esac
        done

        "$seen_files" && "$ok" && printf "%s\n" "$dirpath"
    done' bash {} +)

while read -r line; do
    rm -r "$line"
done <<< "$README_ONLY_DIRS"

# delete unnecessary files
find $1 -name "README*" -delete -o -name Logo.vue -delete -o -name index.vue -delete

# copy package.json
ORIGINAL_PACKAGE_JSON="$(cat "$1/package.json")"

# degit boilerplate
degit "fuzzco/fuzznuxt" "$1" --force

# replace boilerplate package.json
echo $ORIGINAL_PACKAGE_JSON > "$1/package.json"
prettier --write "$1/package.json"

cd "$1"

# open atom if we have it
if [ -x "$(command -v atom)" ]; then
    atom .
fi

# install dependencies
npm i node-sass sass-loader@10 @nuxtjs/style-resources concurrently @babel/core -D
npm i dotenv fitvids hammerjs js-cookie @fuzzco/font-loader @nuxtjs/component-cache @nuxtjs/device auto-blur cross-fetch lodash popmotion prismic-dom prismic-javascript @nuxtjs/prismic imagesloaded v-runtime-template zenscroll

# one final install to make sure everything is ready
npm i
