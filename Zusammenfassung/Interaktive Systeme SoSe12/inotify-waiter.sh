#!/bin/sh

while true; do
    inotifywait -e modify -e close Zusammenfassung.* | while read file mod; do
        FILECHANGE=Zusammenfassung.md
        TARGET=Zusammenfassung.html
        #echo "Attempting to translate $FILECHANGE to $TARGET via pandoc"
	sleep 0.2
        pandoc --read=markdown $FILECHANGE --include-in-header=Zusammenfassung.css --ascii --write=html --output $TARGET
    done
done
