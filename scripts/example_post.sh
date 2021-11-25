#!/bin/bash

curl http://localhost:13333/examples \
  --silent \
  -X POST \
  -H 'Content-Type: application/json; charset=utf-8' \
  --data-binary @- <<EOF
  {
    "email": "test@example.com",
    "name": "test",
    "detail": "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest"
  }
EOF
