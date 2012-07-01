#!/bin/bash

 while true; do
    if [ 'BRK_Prototyp_Studie.mmd' -nt 'BRK_Prototyp_Studie.lastseen' ]; then
      cp BRK_Prototyp_Studie.mmd BRK_Prototyp_Studie.lastseen
      make
    fi
    sleep 1;
done
