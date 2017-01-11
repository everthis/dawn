#!/usr/bin/env bash
# bash <(curl -s http://mywebsite.com/myscript.txt)
DIRECTORY="node_modules"
NPM_BIN_DIR=".bin"
packagePath="/home/fis/npm/lib/node_modules/fis-msprd-"

npmBinPath="/home/fis/npm/bin/"
npmPackagePath="/home/fis/npm/lib/node_modules/"

# packagePath="/home/users/hejie03/idev-projects/coin/fis-msprd-"
currentPwd=${PWD}
cipluginsFile="$(pwd)/.ciplugins"
NODE_MODULES_PATH="$(pwd)/node_modules"

if [ -d "$NODE_MODULES_PATH" ]; then
  # Control will enter here if $DIRECTORY exists.
  rm -rf $NODE_MODULES_PATH
fi
mkdir $DIRECTORY && cd $DIRECTORY
localModule=''
targetModule=''
while IFS='' read -r line || [[ -n "$line" ]]; do
    IFS=':' read -ra ADDR <<< "$line"
    for i in "${!ADDR[@]}"; do
        if [ "$i" == 0 ]; then
            localModule="${ADDR[$i]}"
        fi
        if [ "$i" == 1 ]; then
            targetModule="${ADDR[$i]}"
        fi
    done
    ln -s $packagePath$targetModule $localModule
done < "$cipluginsFile"


if [ -d "$DIRECTORY/$NPM_BIN_DIR" ]; then
  # Control will enter here if $DIRECTORY exists.
  rm -rf $currentPwd/$DIRECTORY/$NPM_BIN_DIR
fi

output=$(tr '\n' '&' < $cipluginsFile | curl --get --data "@-" http://cp01-rdqa-dev098.cp01.baidu.com:8456/packages_bin)

filecontent=(`echo "$output"`)
mkdir -p .bin
cd .bin
for t in "${filecontent[@]}"
do
IFS=':' read -r -a array <<< "$t"
prefixedBin="${array[0]}"
originalBin="${array[1]}"
ln -s $npmBinPath$prefixedBin $originalBin
done

cd $currentPwd
