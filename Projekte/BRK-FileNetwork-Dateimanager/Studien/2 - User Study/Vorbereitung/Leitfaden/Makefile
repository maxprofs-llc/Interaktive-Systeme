all:
	pandoc -N --template=mytemplate.tex --variable mainfont=Georgia --variable sansfont=Arial --variable monofont="Bitstream Vera Sans Mono" --variable fontsize=12pt Leitfaden_User_Study.md --latex-engine=xelatex -o Leitfaden_User_Study.tex
	pdflatex Leitfaden_User_Study.tex
	pdflatex Leitfaden_User_Study.tex
	evince Leitfaden_User_Study.pdf
	rm *.aux *.log *.out
