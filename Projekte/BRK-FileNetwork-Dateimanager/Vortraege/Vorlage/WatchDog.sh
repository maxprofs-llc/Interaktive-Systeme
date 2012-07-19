#!/bin/bash

 while true; do
    if [ 'Vortragsvorlage.mmd' -nt 'Vortragsvorlage.lastseen' ]; then
      cp Vortragsvorlage.mmd Vortragsvorlage.lastseen
      make
    fi
    sleep 1;
done
