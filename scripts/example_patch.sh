#!/bin/bash

curl http://localhost:13333/examples/e1fb23fd-e32b-4e22-89d9-be95b3207c88 \
  --silent \
  -X PATCH \
  -H 'Content-Type: application/json; charset=utf-8' \
  --data-binary @- <<EOF
  {
    "name": "updated",
  }
EOF
