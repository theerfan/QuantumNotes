## Photon scattering (Lecture 3)

## Optical Bloch Equations

Starting from the Lindblad master equation:

$$
\rho = \sum_i K_i \rho K_i^\dagger \rightarrow \rho(t + \delta t)
$$

We get:

$$
\begin{align*}
i \hbar \frac{\partial \rho}{\partial t} &= [H, \rho] + \sum_{i > 0} L_i \rho L_i^{\dagger} - \frac{1}{2} (\sum_{i>0} L_i^{\dagger} L_i \rho + \rho \sum_{i>0} L_i^{\dagger} L_i) \\
&= [H, \rho] + \mathcal{L}(\rho)
\end{align*}
$$

As only $\ket{0}$ can spontaneously emit a photon, $\ket{1}$ is the ground state of the system, the $K_0$ operator is the no-jump operator, and $K_1$ is the jump operator \
Using the Kraus operators for photon scattering: 

$$
\begin{align*}
K_0 &= \braket{0 | U_{SE} | 0} = \ket{1}\bra{1} + \sqrt{1 - p} \ket{0}\bra{0} \\
K_1 &= \braket{1 | U_{SE} | 0} = \sqrt{p} \ket{1}\bra{0}
\end{align*}
$$

So we get:

$$
K_i = \sqrt{\frac{\delta t}{\hbar}} L_i \quad ; \quad i > 0
$$

and 

$$
L_i = \sqrt{\hbar \frac{p}{\delta t}} \sigma_{-}
$$

Rewriting $\frac{p}{\delta t} = \Gamma$, we say:

$$
L_i = \sqrt{\hbar \Gamma} \sigma_{-}
$$

Which gives:

$$
\rho_{t} = -i [\frac{H}{\hbar}, \rho] + \frac{1}{\hbar} \mathcal{L}(\rho)
$$

Using the identities:

$$
\begin{align*}
L_i = \sqrt{\hbar \Gamma} \sigma_{-} &= \sqrt{\hbar \Gamma} \ket{1}\bra{0} \\
L_i^{\dagger} = \sqrt{\hbar \Gamma} \sigma_{+} &= \sqrt{\hbar \Gamma} \ket{0}\bra{1} 
\end{align*}
$$

And remembering that:

$$
\begin{align*} 
\rho 
&= \ket{0}\bra{0} \rho_{00} + \ket{0}\bra{1} \rho_{01} + \ket{1}\bra{0} \rho_{10} + \ket{1}\bra{1} \rho_{11} \\
&=  \begin{pmatrix}
\rho_{00} & \rho_{01} \\
\rho_{10} & \rho_{11}
\end{pmatrix}
\end{align*}

$$

We get:

$$
L_i \rho L_i^{\dagger} = \hbar \Gamma \sigma_{-} \rho \sigma_{+} = \hbar \Gamma \ket{1} \braket{0 | \rho | 0} \bra{1} = \hbar \Gamma \rho_{00} \ket{1}\bra{1}
$$

Also,

$$
\begin{align*} 
\frac{-1}{2\hbar} (\sum_{i>0} L_i^{\dagger} L_i ) \rho 
&= \frac{- \Gamma}{2} \sigma_{+} \sigma_{-} \rho \\
&= \frac{- \Gamma}{2}  \ket{0} \braket{1 | 1} \bra{0} \rho \\
&= \frac{- \Gamma}{2}  \ket{0}  \bra{0} \rho \\
&= \frac{- \Gamma}{2} (\rho_{00} \ket{0}\bra{0} + \rho_{01} \ket{0}\bra{1})
\end{align*}
$$

And,

$$
\begin{align*} 
\frac{-1}{2\hbar} \rho (\sum_{i>0} L_i^{\dagger} L_i ) 
&= \frac{- \Gamma}{2} \rho \sigma_{+} \sigma_{-} \\
&= \frac{- \Gamma}{2} \rho \ket{0} \braket{1 | 1} \bra{0} \\
&= \frac{- \Gamma}{2} \rho \ket{0} \bra{0} \\
&= \frac{- \Gamma}{2} (\rho_{00} \ket{0}\bra{0} + \rho_{10} \ket{1}\bra{0})
\end{align*}
$$

We get to calculating $\mathcal{L}(\rho)$:

$$
\begin{align*}
\frac{1}{\hbar} \mathcal{L}(\rho)
&= \Gamma \rho_{00} \ket{1}\bra{1} - \frac{ \Gamma}{2} \big( \rho_{00} \ket{0}\bra{0} + \rho_{01} \ket{0}\bra{1} \big) - \frac{\Gamma}{2} \big(\rho_{00} \ket{0}\bra{0} + \rho_{10} \ket{1}\bra{0} \big) \\
&= \Gamma \rho_{00} \ket{1}\bra{1} - \Gamma \rho_{00} \ket{0}\bra{0} - \frac{\Gamma}{2} \big( \rho_{01} \ket{0}\bra{1} + \rho_{10} \ket{1}\bra{0} \big) \\
&= 
\begin{pmatrix}
-\Gamma \rho_{00} & -\frac{\Gamma}{2} \rho_{01} \\
-\frac{\Gamma}{2} \rho_{10} & \Gamma \rho_{00}
\end{pmatrix}
=
\begin{pmatrix}
\dot{\rho}_{00} & \dot{\rho}_{01} \\
\dot{\rho}_{10} & \dot{\rho}_{11}
\end{pmatrix}
\end{align*}
$$

Using the Hamiltonian:

$$
\frac{H}{\hbar} = \frac{-\delta}{2} \sigma_{Z} + \frac{\Omega}{2} \sigma_{X}
$$

We want to calculate the commutator of it with the density matrix: (writing $\frac{H}{\hbar} = H$)

$$
\begin{align*}
H \rho &= \frac{-\delta}{2} \sigma_{Z} \rho + \frac{\Omega}{2} \sigma_{X} \rho \\
&= \frac{\delta}{2} \begin{pmatrix}
-\rho_{00} & -\rho_{01} \\
\rho_{10} & \rho_{11}
\end{pmatrix} + \frac{\Omega}{2} \begin{pmatrix}
\rho_{10} & \rho_{11} \\
\rho_{00} & -\rho_{01}
\end{pmatrix} \\
\end{align*}
$$

$$
\begin{align*}
\rho H &= -\frac{\delta}{2} \rho \sigma_{Z} + \frac{\Omega}{2} \rho \sigma_{X} \\
&= \frac{\delta}{2} \begin{pmatrix}
-\rho_{00} & \rho_{01} \\
-\rho_{10} & \rho_{11}
\end{pmatrix} + \frac{\Omega}{2} \begin{pmatrix}
\rho_{01} & \rho_{00} \\
\rho_{11} & \rho_{10}
\end{pmatrix} \\
\end{align*}
$$

So we have:

$$
H \rho - \rho H = \frac{\delta}{2} \begin{pmatrix}
0 & -2\rho_{01} \\
2\rho_{10} & 0
\end{pmatrix} + \frac{\Omega}{2} \begin{pmatrix}
\rho_{10} - \rho_{01} & \rho_{11} - \rho_{00} \\
\rho_{00} - \rho_{11} & \rho_{01} - \rho_{10}
\end{pmatrix}
$$

And finally we get:

$$
\begin{align*}
-i [H, \rho] + \frac{1}{\hbar} \mathcal{L}(\rho) &= 

i \delta \begin{pmatrix}
0 & \rho_{01} \\
-\rho_{10} & 0
\end{pmatrix} \\

&+ \frac{i \Omega}{2} \begin{pmatrix}
\rho_{01} - \rho_{10} & \rho_{00} - \rho_{11} \\
\rho_{11} - \rho_{00} & \rho_{10} - \rho_{01}
\end{pmatrix} \\

&+ \begin{pmatrix}
-\Gamma \rho_{00} & -\frac{\Gamma}{2} \rho_{01} \\
-\frac{\Gamma}{2} \rho_{10} & \Gamma \rho_{00}
\end{pmatrix}
\end{align*}
$$

And therefore we get the **Optical Bloch Equations**:

$$
\dot{\rho_{00}} = \frac{i \Omega}{2} (\rho_{01} - \rho_{10}) - \Gamma \rho_{00} \\
\, \\
\dot{\rho_{01}} = (i \delta - \frac{\Gamma}{2}) \rho_{01} +  \frac{i \Omega}{2} (\rho_{00} - \rho_{11}) \\
\, \\
\dot{\rho_{10}} = (- i \delta - \frac{\Gamma}{2}) \rho_{10} + \frac{i \Omega}{2} (\rho_{11} - \rho_{00}) \\
\, \\
\dot{\rho_{11}} = \frac{i \Omega}{2} (\rho_{10} - \rho_{01}) + \Gamma \rho_{00}
$$
