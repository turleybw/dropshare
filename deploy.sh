#!/usr/bin/env bash

npm install

pushd browser
./deploy.sh
popd
