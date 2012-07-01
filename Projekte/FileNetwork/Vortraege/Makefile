all:
	multimarkdown -t latex ./BRK_Prototyp_Studie.mmd > BRK_Prototyp_Studie.tex
	pdflatex BRK_Prototyp_Studie.tex
	# bibtex BRK_Prototyp
	# pdflatex BRK_Prototyp.mmd.tex
	pdflatex BRK_Prototyp_Studie.tex
	evince BRK_Prototyp_Studie.pdf 
	#rm *.aux *.log *.out *.nav *.snm  *.toc


