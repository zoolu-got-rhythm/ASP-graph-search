% problem instance facts:

% starting node N=a
start(a).
% change atom number value in 'distance' fact predicate to change graph search distance D.
% search distance D=4
distance(4).

node(a;b;c;d).
% currently a directed graph, to make it non-directed make edge symmetric.
edge(a,b).
edge(b,c).
edge(b,d).
edge(d,c).

% generate:
1 { on(X,T) : node(X) } 1 :- T = 1..D, distance(D).

% define:
% auxilary predicate
duplicates(X) :- on(X,T), on(Y,T2), X==Y, T!=T2.

% filter: out candidate models i'm not interested in
:- not on(X,1), start(X). % always start search from node 'a'
:- on(X,_), duplicates(X).
:- not edge(X,Y), on(X,T), on(Y,T+1).

% display:
#show on/2.
