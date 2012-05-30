Leitfaden_Participatory_Design:
	multimarkdown -t latex ./Leitfaden_Participatory_Design.mmd >Leitfaden_Participatory_Design.tex
	sed 's/PAGEBREAK/\\pagebreak/g' Leitfaden_Participatory_Design.tex >Leitfaden_Participatory_Design2.tex
	mv Leitfaden_Participatory_Design2.tex Leitfaden_Participatory_Design.tex
	#pdflatex Kapitel_1_Problemanalyse.tex
	#bibtex Kapitel_1_Problemanalyse
	pdflatex Leitfaden_Participatory_Design.tex
	pdflatex Leitfaden_Participatory_Design.tex
	evince Leitfaden_Participatory_Design.pdf &
	rm *.glo *.idx *.ist *.log *.out *.brf 

all: Leitfaden_Participatory_Design
