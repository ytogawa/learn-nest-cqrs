#!/bin/bash

curl http://localhost:13333/examples/9654ab55-0454-4daa-896f-fd55d0ad136a \
  --silent \
  -X PATCH \
  -H 'Content-Type: application/json; charset=utf-8' \
  --data-binary @- <<EOF
  {
    "name": "updated"
  }
EOF
