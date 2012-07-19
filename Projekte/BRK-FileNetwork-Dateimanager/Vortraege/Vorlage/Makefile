all:
	multimarkdown -t latex ./Vortragsvorlage.mmd > Vortragsvorlage.tex
	pdflatex Vortragsvorlage.tex
	bibtex Vortragsvorlage
	pdflatex Vortragsvorlage.tex
	pdflatex Vortragsvorlage.tex
	evince Vortragsvorlage.pdf
	rm *.aux *.log *.out *.nav *.snm  *.toc
