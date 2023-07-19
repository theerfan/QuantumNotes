Based on [Mitarai et al](https://arxiv.org/abs/1803.00745), [Schuld et al](https://arxiv.org/abs/1811.11184), [Crooks](https://arxiv.org/abs/1905.13311) and [Wierichs et al](https://quantum-journal.org/papers/q-2022-03-30-677/).


Framework: We're working with parameterized quantum circuits here.

## Mitarai section C.
We consider the case input data $x$ is one dimensional, it's easy to generalize to multi-dimensional case.
We have a input state density matrix corresponding to this input data $x$:
$$
\rho_{in}(x) = \ket{\psi_{in}(x)}\bra{\psi_{in}(x)}
$$

We can expand this input state using the following set of Pauli operators:
$$
\{P_k\} = \{ I, X, Y, Z\}^{\otimes N}
$$
and with $a_k(x)$ being the expansion coefficients:
$$
\rho_{in}(x) = \sum_{k} a_k(x) P_k 
$$

We apply a parameterized unitary transformation $U(\theta)$ to the input state to create the output state, which can be expanded in the same way with $\{P_k\}$, but this time the expansion coefficients are functions of the input data $x$ and the parameters $\theta$: $\{b_k(x, \theta)\}$.

Now, let $u_{ij}(\theta)$ be such that:
$$
b_{m}(x, \theta) = \sum_{k} u_{mk}(\theta) a_k(x)
$$
(Meaning that the new coefficients are linear combinations of the old coefficients, under unitary constraints imposed by $U(\theta)$.)

When the function we're trying to learn f(x) is an _analytical function_, we can show that QCL is able to approximate it by considering a simple case with an input state created by single-qubit rotations. (The tensor product structure of quantum systems becomes important here)

---

**Sidenote**: \
An analytical function is a function that is locally given by a convergent power series. In other words, around every point in its domain, the function can be represented by a power series that converges to the function's value within a certain radius.

---

Let us consider a state of $N$ qubits:

$$
\rho_{in}(x) = \frac{1}{2^{N}} \bigotimes_{i=1}^{N} \Big[ I + x X_i + \sqrt{1 - x^2} Z_i \Big]
$$

This state can be generated for any $x \in [-1, 1]$ with single qubit rotations, namely, $\prod_{i=1}^{N} R_{i}^{Y} (\sin^{-1}x)$, where $R_{i}^{Y}(\phi)$ is the rotation of $i$-th qubit around the $Y$ axis with angle $\phi$.

The state given by the above equation has higher order terms up to the $N$-th order with respect to $x$. Therefore, an arbitrary unitary transformation on this state can provide us with an arbitrary $N$-th order polynomial as expectation value of an observable. (Everything here is Taylor expansions :)))) ) \
Terms like $x \sqrt{1 - x^2}$ can enhance its ability to approximate a function.

An important thing to notice in this example is that the highest order term $x^N$ is attached to the observable $X^{\otimes N}$. \
To extract $x^N$ from that $\rho_{in}(x)$, you'd need to transfer the nonlocal observable $X^{\otimes N}$ to a single-qubit observable using entangling gates such as $CNOT$s. Entangling nonlocal operations are the key ingredient of the nonlinearity of an output. (Swap the coefficients of the different Pauli operators so you can move the $x^N$ term to a term with a single-qubit observable)

The above argument can be readily generalized to the case of multi-dimensional input data:

Assume that we're given a $d$-dimensional data $\mathbf{x} = \{x_1, \cdots, x_d\}$ and want higher terms up to the $n_k$-th ($k = 1, \cdots, d$) order for each data. Then, we can encode this data into a $N = \sum_{k} n_k$-qubit state as follows:

$$
\rho_{in}(\mathbf{x}) = \frac{1}{2^N} \bigotimes_{k=1}^{d} \Big( \bigotimes_{i=1}^{n_k} \Big[ I + x_k X_i + \sqrt{1 - x^2_k} Z_i \Big] \Big)
$$

(Different $n_k$'s for different $k$'s are allowed.)

These input states automatically have an exponentially number of independent functions as the coefficient set of the Pauli expansionrf. The tensor product structure of a quantum system readily "calculates" the products such as $x_1 x_2$.

## Mitarai section C.