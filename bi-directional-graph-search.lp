% problem instance facts:

% starting node N=a
% start(a).
% change atom number value in 'distance' fact predicate to change graph search distance D.
% search distance D=4

node(a;b;c;d).
distance(D) :- D = #count { X : node(X) }.

edge(a,b).
edge(a,c).
edge(a,d).

edge(b,a).
edge(b,c).
edge(b,d).

edge(c,a).
edge(c,b).
edge(c,d).

edge(d,a).
edge(d,b).
edge(d,c).

% make edge bi-directional/symmetric
edge(X,Y) :- edge(Y,X).

% distance and cost
travel_cost(1,1).
travel_cost(2,3).
travel_cost(3,6).
travel_cost(4,10).
travel_cost(5,15).


% generate:
0 { on(X,T) : node(X) } 1 :- T == 1..D, distance(D).

% define:
% auxilary predicate
n_of_results(N) :- N = #count { X,T : on(X,T) }.
total(N) :- N = #sum { T : on(_,T) }.
duplicates(X) :- on(X,T), on(Y,T2), X==Y, T!=T2.

% filter: out candidate models i'm not interested in
% :- not on(a,1). % always start search from node 'a'
:- on(X,_), duplicates(X).

:- not edge(X,Y), on(X,T), on(Y,T+1).
%:- on(_,T), on(_,T2), T==T2+1.
% distance D, cost D. 
:- not travel_cost(D,C), n_of_results(D), total(C).

% display:
#show on/2.
#show n_of_results/1.
#show total/1.