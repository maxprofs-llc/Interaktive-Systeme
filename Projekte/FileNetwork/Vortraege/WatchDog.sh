#!/bin/bash

 while true; do
    if [ '1_BRK_Konzept_zur_Requirements_Analyse.mmd' -nt '1_BRK_Konzept_zur_Requirements_Analyse.lastseen' ]; then
      cp 1_BRK_Konzept_zur_Requirements_Analyse.mmd 1_BRK_Konzept_zur_Requirements_Analyse.lastseen
      make 
    fi
    sleep 1;
done
