Leitfaden_User_Study:
	multimarkdown -t latex ./Leitfaden_User_Study.mmd >Leitfaden_User_Study.tex
	sed 's/PAGEBREAK/\\pagebreak/g' Leitfaden_User_Study.tex >Leitfaden_User_Study2.tex
	mv Leitfaden_User_Study2.tex Leitfaden_User_Study.tex
	#pdflatex Kapitel_1_Problemanalyse.tex
	#bibtex Kapitel_1_Problemanalyse
	pdflatex Leitfaden_User_Study.tex
	pdflatex Leitfaden_User_Study.tex
	evince Leitfaden_User_Study.pdf 
	#rm *.glo *.idx *.ist *.log *.out *.brf

all: Leitfaden_User_Study
