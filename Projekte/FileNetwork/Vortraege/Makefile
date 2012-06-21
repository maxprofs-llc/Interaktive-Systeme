all:
	multimarkdown -t latex ./BRK_Prototyp.mmd > BRK_Prototyp.tex
	pdflatex BRK_Prototyp.tex
	# bibtex BRK_Prototyp
	# pdflatex BRK_Prototyp.mmd.tex
	pdflatex BRK_Prototyp.tex
	evince BRK_Prototyp.pdf 
	#rm *.aux *.log *.out *.nav *.snm  *.toc


