# Vector spaces and Bra-ket notation

## Vector spaces
[#skipped]

A **Hilbert Space** is a _complete_ vector space with an inner product.

## Bra-ket notation
[#skipped]

## Spin
[#skipped]

## Denumerable and countable sets
Countable sets are sets that can be put into a one-to-one correspondence with the integers. \
Denumerable sets are sets that can **NOT** be put into a one-to-one correspondence with the natural numbers.
(i.e. denumerable sets are not countable)

An example of an denumerable sets is the position. 
In a 3D space, $\vec{x}_i = (x_i, y_i, z_i)$, could be any position in space, but it isn't the same thing as $\ket{\vec{x}_i}$, which is a ket describing the position of a particle, and it is denumerable; i.e. it means that the particle is "localized" at $\vec{x}_i$.

$$
\ket{\vec{x}_i} = \begin{pmatrix} x_1 \\ x_2 \\ \vdots \end{pmatrix} \neq \vec{x}_i \\
\, \\
\ket{\vec{x}_i + \vec{x}_j} \text{ is a superposition of being in } \vec{x}_i \text{ and } \vec{x}_j \\
\, \\
\text{But, } \vec{x}_i + \vec{x}_j \text{ is just a vector made of adding } \vec{x}_i \text{ and } \vec{x}_j \\
\, \\
\vec{x}_i \cdot \vec{x}_j = |x_i||x_j| \cos(\theta) \\
\, \\
\text{But, } \braket{ \vec{x}_i | \vec{x}_j } = \delta(\vec{x_j} - \vec{x_j})  \\
$$

But we also know that a particle is never really localized at a single point, so we can write the statevector as:

$$
\ket{\psi} = \int d \vec{x} \, p(\vec{x}) \ket{\vec{x}}
$$

Which is a continous sum (Superposition) of all the possible state you could've weighted by some probability of being in each one.

So this thing might be like a Gaussian centered at some point $\vec{x}_1$.

Therefore we have:

$$
\braket{ \vec{x} | \psi } = \int d \vec{x} \, p(\vec{x}) \braket {\vec{x} | \vec{x} }= \int d \vec{x} \, p(\vec{x}) = p(\vec{x})
$$

And we can get the wavefunction by operating on the statevector written in the $\vec{x}$ basis with the $\ket{\vec{x}}$ basis:

$$
\psi(\vec{x}) = \braket{ \vec{x} | \psi (\vec{x}) }
$$


## Measurement and expectation values with statevectors

We define a projection operator $P$ and do the following:

$$
\ket{\psi} = \sum_k c_k \ket{k} 
$$
Where the set of $\ket{k}$ s are complete and orthonormal.
$$
\hat{P}_i = |i\rangle \langle i| \\
\, \\
\hat{P}_i \ket{\psi} = \sum_k c_k \ket{i} \braket{ i | k} = \sum_k c_k \ket{i} \delta_{ik} = c_i \ket{i} \\
$$

So the act of measurement becomes:

$$
\ket{\psi} \rightarrow \frac{\hat{P}_i}{\sqrt{\langle \psi | \hat{P}_i \ket{ \psi }}} \ket{\psi}
$$

### Observables

[To be proven later], Every observable has some complete basis that they can be written in.

$$
\hat{O} = \sum_i o_i |o_i\rangle \langle o_i|
$$

The expectation value of an observable is:

$$
\braket{ \psi | \hat{O} | \psi } = \sum_i o_i \braket{ \psi | o_i } \braket{ o_i \ket{ \psi }} = \sum_i o_i c_i^* c_i = \sum_i |c_i|^2 o_i
$$

### Uncertainty of measurement

The uncertainty of measuring an observable $\hat{O}$ is given by:

$$
\sigma_{\hat{O}} = \sqrt{\braket{ \psi | \hat{O}^2 | \psi } - \braket{ \psi | \hat{O} | \psi}^2}
$$