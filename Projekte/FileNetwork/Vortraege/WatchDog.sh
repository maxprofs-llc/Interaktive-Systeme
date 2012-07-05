#!/bin/bash

 while true; do
    if [ 'BRK_Userstudie_Ergebnisse.md' -nt 'BRK_Userstudie_Ergebnisse.lastseen' ]; then
      cp BRK_Userstudie_Ergebnisse.md BRK_Userstudie_Ergebnisse.lastseen
      make 
    fi
    sleep 1;
done
