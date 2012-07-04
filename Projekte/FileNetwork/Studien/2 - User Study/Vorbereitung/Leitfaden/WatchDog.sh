#!/bin/bash

 while true; do
    if [ 'Leitfaden_User_Study.md' -nt 'Leitfaden_User_Study.lastseen' ]; then
      cp Leitfaden_User_Study.md Leitfaden_User_Study.lastseen
      make 
    fi
    sleep 1;
done
