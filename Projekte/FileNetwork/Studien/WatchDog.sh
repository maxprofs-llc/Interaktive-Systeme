#!/bin/bash

 while true; do
    if [ 'Leitfaden_Participatory_Design.mmd' -nt 'Leitfaden_Participatory_Design.lastseen' ]; then
      cp Leitfaden_Participatory_Design.mmd Leitfaden_Participatory_Design.lastseen
      make Leitfaden_Participatory_Design
    fi
    sleep 1;
done
