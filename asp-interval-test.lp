%duration(D) :- D = 1..10.
%cost(D1 + D2) :- duration(D1), duration(D2).
% travel_cost() :- 

% parent(a,b).
% parent(b,c).

% ancestor(X,Y) :- parent(X,Y).
% ancestor(X,Y) :- parent(X,Z), ancestor(Z,Y).

% length(1..10).
% cost(1..10).

% length_cost(X,Y) :- length(X), Y=1.
% length_cost(X,Y+X) :- length_cost(X,Y), X<10.


