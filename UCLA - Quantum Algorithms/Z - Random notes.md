## Trace of a density matrix

The trace of a density matrix $Tr(\rho)$  is always $1$, no matter if the state is pure or mixed.

Because we can write density matrices in terms of their eigenvectors and eigenvalues:

$$
\rho = \sum_i p_i |v_i\rangle\langle v_i|
$$

We also know that if this is normalized, then $\sum_i p_i = 1$. \
(Obviously, because there is _something_, the sum of the probabilities of all the states must be $1$.)

So we can write:

$$
\begin{align*}
Tr(\rho) &= \sum_i p_i Tr(|v_i\rangle\langle v_i|) \\
&= \sum_i 1 \times p_i = 1 \\
&= \sum_i p_i \\
&= 1
\end{align*}
$$