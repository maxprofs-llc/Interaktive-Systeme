#!/bin/bash

 while true; do
    if [ 'BRK_Prototyp.mmd' -nt 'BRK_Prototyp.lastseen' ]; then
      cp BRK_Prototyp.mmd BRK_Prototyp.lastseen
      make
    fi
    sleep 1;
done
