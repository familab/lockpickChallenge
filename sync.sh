#!/bin/bash

set +e
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

rsync -avz --exclude 'node_modules' $DIR/ pi@192.168.11.124:/opt/server
