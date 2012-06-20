all:
	multimarkdown -t latex ./BRK_Reflection_Guidelines.mmd > BRK_Reflection_Guidelines.tex
	pdflatex BRK_Reflection_Guidelines.tex
	# bibtex BRK_Methodisches_Vorgehen_zur_Entwicklung_des_Strukturdesigns
	# pdflatex BRK_Methodisches_Vorgehen_zur_Entwicklung_des_Strukturdesigns.tex
	pdflatex BRK_Reflection_Guidelines.tex
	evince BRK_Reflection_Guidelines.pdf 
	rm *.aux *.log *.out *.nav *.snm  *.toc


