# ASP graph search of distance D
<img src="./diagram_of_directed_graph_structure.png" alt="screenshot"/>

## how to run
clingo programName.lp 0

## goals
ideally want word results to come in lazily (evaluation) in real-time as a stream, 
oppose to waiting for each seperate part (clingo sub-process for e.g.) of the overall program to finish before - 
starting execution of the next one. 
