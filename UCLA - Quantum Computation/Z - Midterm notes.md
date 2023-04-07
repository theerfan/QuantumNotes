# The big picture

Zero Hamiltonian $\Rightarrow I$ unitary time evolution

But a hamiltonian cannot be zero because that implies no energy difference between state $\ket{\psi}$ and $\ket{\psi'}$ energy levels.

$$
\hat{H} = \frac{\omega_0}{2} \hat{\sigma}_z + \Omega \cos(\omega t) \hat{\sigma}_x
$$

There are some things to consider:
- We can't turn off the $\sigma_z$ hamiltonian.
- No $\hat{\sigma}_y$ term.
- But, we can adjust $\Omega, \omega, \phi, t$.

To do the following:

$$
\hat{H} \xRightarrow{\text{lots of stuff}} \hat{U}_R
$$

We need to do:

1. Move to the interaction picture.
2. Do the rotating wave approximation.
3. Move to the rotating frame.

## Review of Rotating Frame

$$
|\psi\rangle = M |\psi_m\rangle
$$
Where $M$ is a unitary operator.

Putting it inside Schrodinger's equation:

$$
i \hbar \frac{d}{dt} |\psi_m \rangle = \hat{H_m} |\psi_m\rangle
$$

$$
H_m = M^{\dagger} H M - i M^{\dagger} \frac{d}{dt} M
$$

### Interaction Picture

First we have this hamiltonian, which is the hamiltonian in the lab frame:

$$
H = H_0 + V(t)
$$

The interaction hamiltonian becomes:

$$
H_I = U_0^{\dagger} V(t) U_0
$$

Where $U_0^\dagger = M = e^{-i H_0 t}$.

From our hamiltonian, 

$$
\hat{H} = \frac{\omega_0}{2} \hat{\sigma}_z + \Omega \cos(\omega t) \hat{\sigma}_x
$$

$U_0$ becomes:

$$
U_0 = \begin{pmatrix}
e^{-i \omega_0 t / 2} & 0 \\
0 & e^{i \omega_0 t / 2}
\end{pmatrix} = R_z(\omega_0 t )
$$

Switching from the interaction picture to the rotating frame:

$$
T = \begin{pmatrix}
e^{-i \delta t / 2} & 0 \\
0 & e^{i \delta t / 2}
\end{pmatrix} = R_z(\delta t)
$$

The total effect becomes:

$$
R = T U_0 = R_z((\omega_0 + \delta) t) = R_z(\omega t)
$$

Where $\delta = \omega - \omega_0$.

The hamiltonian in the rotating frame becomes:

$$
H_R = \frac{1}{2} \begin{pmatrix}
-\delta & \Omega e^{-i \phi} \\
\Omega e^{i \phi} & \delta
\end{pmatrix}
$$

$$
\hat{U}_R = e^{-i \hat{H}_R t}
$$