from graphviz import Digraph

dot = Digraph(comment="Loading and rendering a PDB file")
dot.node("A","fileReaderJS")
dot.node("B","renderPdb")
dot.node("C","renderPdbRaw")
dot.node("D","parsePDBToStructure")
dot.node("E","addPdb")
dot.node("F","rebuildScene")
dot.node("G","getView")
dot.node("H","defineRepresentation")
dot.node("I","setView")
dot.node("J","getAllAtoms")
dot.node("K","removeSolvents")
dot.node("L","getHetAtm")
dot.node("M","colorByAtom")
dot.node("N","colorMono")
dot.node("O","setHSV")
dot.node("P","getHex")
dot.node("Q","drawAtomAsSphere")
dot.node("R","drawCartoon")
dot.node("S","drawStrand")
dot.node("T","drawSmoothCurve")
dot.node("U","drawStrip")
dot.node("V","drawThinStrip")
dot.node("W","drawCartoonNucleinAcid")
dot.node("X","drawStrandNucleicAcid")
dot.node("Y","pivotCentroid")
dot.node("Z","show")
# dot.node("AA","")
# dot.node("AB","")

dot.edges([
	"AB",
	"BC",
	"CD",
	"CE",
	"EF",
	"FG",
	"FH",
	"FI",
	"HJ",
	"HK",
	"HL",
	"HM",
	"HN",
	"NO",
	"NP",
	"HQ",
	"HR",
	"HW",
	"HY",
	"HZ",
	"RS",
	"ST",
	"SU",
	"UV",
	"WX",
	"XU",
	"XT"
	])

dot.render("./pdb_trace.gv", view=True)