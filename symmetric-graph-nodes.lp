node(a;b).
edge(a,b).
% make edges symmetrical
edge(X,Y) :- edge(Y,X).
#show edge/2.
