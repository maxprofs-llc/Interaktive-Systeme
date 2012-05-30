all:
	multimarkdown -t latex ./BRK_Methodisches_Vorgehen_zur_Entwicklung_des_Strukturdesigns.mmd > BRK_Methodisches_Vorgehen_zur_Entwicklung_des_Strukturdesigns.tex
	pdflatex BRK_Methodisches_Vorgehen_zur_Entwicklung_des_Strukturdesigns.tex
	# bibtex BRK_Methodisches_Vorgehen_zur_Entwicklung_des_Strukturdesigns
	# pdflatex BRK_Methodisches_Vorgehen_zur_Entwicklung_des_Strukturdesigns.tex
	pdflatex BRK_Methodisches_Vorgehen_zur_Entwicklung_des_Strukturdesigns.tex
	evince BRK_Methodisches_Vorgehen_zur_Entwicklung_des_Strukturdesigns.pdf 
	rm *.aux *.log *.out *.nav *.snm  *.toc


