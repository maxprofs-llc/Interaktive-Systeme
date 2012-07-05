#!/bin/bash

 while true; do
    if [ 'BRK_Konzept_zur_Requirements_Analyse.md' -nt 'BRK_Konzept_zur_Requirements_Analyse.lastseen' ]; then
      cp BRK_Konzept_zur_Requirements_Analyse.md BRK_Konzept_zur_Requirements_Analyse.lastseen
      make 
    fi
    sleep 1;
done
