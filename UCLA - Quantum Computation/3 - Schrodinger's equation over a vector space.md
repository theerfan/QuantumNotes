# Something

One way to prepare states in quantum computing is to keep measuring a perturbed state, and then stop when we get to the state that we want. Then we can start doing our computations. Note that for a degenerate perturbation, any slight change might take the system to a different state.

Also, if the system is relatively unperturbed, we can keep measuring the system to keep it in its initial state. We call this the **Quantum Zeno effect**.

---

Every operator associated with an observable is a Hermitian operator. This means that it is self-adjoint, and that it has a complete set of orthogonal eigenstates. The eigenvalues of the operator are the possible values of the observable.

## Recast Schrodinger's equation over a vector space

We're going from wavefunctions to statevectors, so we want to do the following:

$$
H \psi = i \hbar \frac{\partial \psi}{\partial t} \Rightarrow \hat{H} \ket{\psi} = i \hbar \frac{\partial \ket{\psi}}{\partial t}
$$

To write the above equation, we have to choose a basis for the vector space to write the vector $\ket{\psi}$ in. \
(Here we assume an orthonormal basis) 

$$
\ket{\psi} = \sum_n^{N} a_n \ket{n}
% We can choose the eigenstates of the Hamiltonian as the basis. We can then write the Hamiltonian as a matrix:
$$

So let's plug this into the schrodinger equation, and generally assuming that the $\ket{n}$s are time-independent: \
(We'll drop the time independece assumption when working in the interaction picture)

$$
\begin{align*}
\hat{H} \ket{\psi} &= i \hbar \frac{\partial \ket{\psi}}{\partial t} = \\ 
\hat{H} \sum_n^{N} a_n \ket{n} &= i \hbar \frac{\partial}{\partial t} \sum_n^{N} a_n \ket{n} \\ 
&= i \hbar \sum_n^{N} \dot{a}_n \ket{n} 
\end{align*}
$$

Right-multiplying this by some $\bra{m}$ and making use of the orthonormality of the basis, we get:

$$
\begin{align*}
\braket{ m | \hat{H} \sum_n^{N} a_n |n} &= i \hbar \sum_n^{N} \dot{a}_n \braket{m |n} = i \hbar \dot{a}_m \\
\Rightarrow i\hbar \dot{a}_m &= \sum_n \braket{m | \hat{H} |n} a_n \\
\end{align*}
$$

Now this last line is a series of equations.

$$
\begin{align*}
\text{ for } m = 1, \\ 
\dot{a}_1 &= \braket{ 1 | \hat{H} |1} a_1 + \braket{ 1 | \hat{H} |2} a_2 + \cdots + \braket{ 1 | \hat{H} |N} a_N \\
\text{ for } m = 2, \\
\dot{a}_2 &= \braket{ 2 | \hat{H} |1} a_1 + \braket{ 2 | \hat{H} |2} a_2 + \cdots + \braket{ 2 | \hat{H} |N} a_N \\
\text{ for } m = 3, \\
\dot{a}_3 &= \braket{ 3 | \hat{H} |1} a_1 + \braket{ 3 | \hat{H} |2} a_2 + \cdots + \braket{ 3 | \hat{H} |N} a_N \\
\vdots
\end{align*}
$$

This obviously screams out a matrix equation, which constructs our hamiltonian and the entire statevector form of the schrodinger equation.

$$
\begin{align*}
\begin{pmatrix}
\braket{ 1 | \hat{H} |1} & \braket{ 1 | \hat{H} |2} & \cdots & \braket{ 1 | \hat{H} |N} \\
\braket{ 2 | \hat{H} |1} & \braket{ 2 | \hat{H} |2} & \cdots & \braket{ 2 | \hat{H} |N} \\
\vdots & \vdots & \ddots & \vdots \\
\braket{ N | \hat{H} |1} & \braket{ N | \hat{H} |2} & \cdots & \braket{ N | \hat{H} |N} \\
\end{pmatrix}
\begin{pmatrix}
a_1 \\ a_2 \\ \vdots \\ a_N
\end{pmatrix}
&= i \hbar
\begin{pmatrix}
\dot{a}_1 \\ \dot{a}_2 \\ \vdots \\ \dot{a}_N
\end{pmatrix} \\
\hat{H} \ket{\psi} &= i \hbar \frac{\partial \ket{\psi}}{\partial t}
\end{align*}
$$

And in the case where the hamiltonian is time-independent, $\hat{H} \neq f(t)$, from the time-independent schrodinger equation, $H \psi = E \psi$, we get:

$$
\begin{align*}
\begin{pmatrix}
\braket{ 1 | \hat{H} |1} & \braket{ 1 | \hat{H} 2} & \cdots & \braket{ 1 | \hat{H} |N} \\
\braket{ 2 | \hat{H} |1} & \braket{ 2 | \hat{H} |2} & \cdots & \braket{ 2 | \hat{H} |N} \\
\vdots & \vdots & \ddots & \vdots \\
\braket{ N | \hat{H} |1} & \braket{ N | \hat{H} |2} & \cdots & \braket{ N | \hat{H} |N} \\
\end{pmatrix}
\begin{pmatrix}
a_1 \\ a_2 \\ \vdots \\ a_N
\end{pmatrix}
&= E
\begin{pmatrix}
a_1 \\ a_2 \\ \vdots \\ a_N
\end{pmatrix}
\end{align*}
$$

Which is obviously an eigenvalue equation for the hamiltonian matrix. We solve it to find the eigenvalues and eigenvectors, and we use the eigenvectors as the basis for the statevector. So when solving equations, the intuition we get is that if these matrices are diagonal, we're in the "right" basis; but if we have off-diagonal elements, our eigenstates are "mixed" and we need to transform to a different basis.

## Spins in magnetic fields

[#skipped] The gist of it was using $\sigma_Z$ and $\sigma_X$ and their combinations as the hamiltonian.

## Bloch sphere

[#skipped] The gist of it was parameterzing the statevector with 2 angles, and using the Bloch sphere to visualize the statevector.

$$
\ket{\psi} = \cos(\frac{\theta}{2}) \ket{0} + \sin(\frac{\theta}{2}) e^{i \phi} \ket{1}
$$

Which means that the $\theta$ on the bloch sphere is twice the angle we really use. The $\phi$ is the same. 