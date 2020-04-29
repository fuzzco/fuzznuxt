# unzip initial archive
unzip arcive.zip -d fonts-worker
rm arcive.zip

# unzip fonts from archive
for file in ./fonts-worker/*.zip
do
    unzip "$file" -d "${file}-out"
    rm "$file"
done

# move files from subdirectories to fonts dir
find ./fonts-worker -type f \( -name "*.woff" -or -name "*.woff2" -or -name "*.eot" -or -name "*.ttf" \) | while read line; do
    mv "$line" "static/fonts/$(basename "$line")"
done

# delete working directory
rm -rf fonts-worker

# TODO: add auto CSS creation?
