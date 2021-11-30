#!/bin/ash

if [ ! -e pkg-hash ]; then
  echo run npm ci
  npm ci
  md5sum package-lock.json > pkg-hash
fi
md5sum -c pkg-hash
ret=$?
if [ $ret != 0 ]; then
  echo run npm ci
  npm ci
  md5sum package-lock.json > pkg-hash
fi
npm run build
npm run start:debug
