all:
	multimarkdown -t latex ./1_BRK_Konzept_zur_Requirements_Analyse.mmd > 1_BRK_Konzept_zur_Requirements_Analyse.tex
	pdflatex 1_BRK_Konzept_zur_Requirements_Analyse.tex
	#bibtex Vortragsvorlage
	#pdflatex Vortragsvorlage.tex
	pdflatex 1_BRK_Konzept_zur_Requirements_Analyse.tex
	evince 1_BRK_Konzept_zur_Requirements_Analyse.pdf 
	#rm *.aux *.log *.out *.nav *.snm  *.toc

