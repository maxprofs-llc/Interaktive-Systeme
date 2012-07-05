#!/bin/bash

 while true; do
    if [ 'FMS_StateOfTheArt.mmd' -nt 'FMS_StateOfTheArt.lastseen' ]; then
      cp FMS_StateOfTheArt.mmd FMS_StateOfTheArt.lastseen
      make
    fi
    sleep 1;
done
