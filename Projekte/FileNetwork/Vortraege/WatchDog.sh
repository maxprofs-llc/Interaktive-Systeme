#!/bin/bash

 while true; do
    if [ 'BRK_Reflection_Guidelines.mmd' -nt 'BRK_Reflection_Guidelines.lastseen' ]; then
      cp BRK_Reflection_Guidelines.mmd BRK_Reflection_Guidelines.lastseen
      make
    fi
    sleep 1;
done
