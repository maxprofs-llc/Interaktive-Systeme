#!/bin/bash

 while true; do
    if [ 'Leitfaden_User_Study.mmd' -nt 'Leitfaden_User_Study.lastseen' ]; then
      cp Leitfaden_User_Study.mmd Leitfaden_User_Study.lastseen
      make Leitfaden_User_Study
    fi
    sleep 1;
done
