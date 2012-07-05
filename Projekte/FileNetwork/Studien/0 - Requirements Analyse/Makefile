all:
	multimarkdown -t latex ./FMS_StateOfTheArt.mmd >FMS_StateOfTheArt.tex
	sed 's/PAGEBREAK/\\pagebreak/g' FMS_StateOfTheArt.tex >FMS_StateOfTheArt_2.tex
	mv FMS_StateOfTheArt_2.tex FMS_StateOfTheArt.tex
	pdflatex FMS_StateOfTheArt.tex
	pdflatex FMS_StateOfTheArt.tex
	evince FMS_StateOfTheArt.pdf 
	rm *.aux *.glo *.idx *.ist *.log *.out *.tex
