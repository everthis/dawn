#!/usr/bin/env bash
DIRECTORY="node_modules"
packagePath="/home/fis/npm/lib/node_modules/fis-msprd-"
cipluginsConfig=".ciplugins"
# packagePath="/home/users/hejie03/idev-projects/coin/fis-msprd-"
currentPwd=${PWD}
echo $currentPwd
cipluginsFile=$currentPwd/$cipluginsConfig
echo $cipluginsFile
if [ ! -f $cipluginsFile ]; then
    echo ".ciplugins File not found!"
    exit 1
fi
if [ -d "$DIRECTORY" ]; then
  # Control will enter here if $DIRECTORY exists.
  rm -rf $currentPwd/$DIRECTORY
fi
mkdir $DIRECTORY && cd $DIRECTORY
localModule=''
targetModule=''
while IFS='' read -r line || [[ -n "$line" ]]; do
    IFS=':' read -ra ADDR <<< "$line"
    for i in "${!ADDR[@]}"; do
        if [ "$i" == 0 ]; then
        	localModule="${ADDR[$i]}"
        	echo "$localModule"
        fi
        if [ "$i" == 1 ]; then
        	targetModule="${ADDR[$i]}"
        	echo "$targetModule"
        fi
    done
    ln -s $packagePath$targetModule $localModule
done < "$cipluginsFile"
