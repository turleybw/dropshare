#!/bin/bash

DEPLOY_DIR='../public'

rm -rf "${DEPLOY_DIR}"
mkdir -p "${DEPLOY_DIR}"

rsync -a static/ "${DEPLOY_DIR}/"

lessc style.less > style.css
mv style.css "${DEPLOY_DIR}"

jade index.jade # index.html
mv index.html "${DEPLOY_DIR}"

pakmanager build
#uglifyjs pakmanaged.js > pakmanaged.min.js
mv pakmanaged.js "${DEPLOY_DIR}"
rm pakmanaged*
