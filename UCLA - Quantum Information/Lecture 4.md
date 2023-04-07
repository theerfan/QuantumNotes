# Lecture 4

## Types of Measurements

### Positive Operator Valued Measures (POVMs)

Read more [here](https://math.mit.edu/~shor/18.435/POVM-lecture.pdf)

Suppose we have a set of projectors onto subspaces $\Pi_1, \Pi_2, \dots, \Pi_k$ with the property that these subspaces are orthogonal:

$$
\Pi_i \Pi_j = \delta_{ij} \Pi_i
$$

And they span the entire space, that is:

$$
\sum_i \Pi_i = I
$$

Then there is a projective measurement associated with these subspaces which takes a quantum state $\ket{\psi}$ to the state:

$$
\frac{\Pi_i \ket{\psi}}{\sqrt{\braket{\psi | \Pi_i | \psi}}}
$$
with probability:

$$
p_i = \braket{\psi | \Pi_i | \psi}
$$


### Projective Measurements

### von Neumann Measurements