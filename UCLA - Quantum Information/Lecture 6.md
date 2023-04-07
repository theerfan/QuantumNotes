# Lecture 6

## Bosonic Codes

In a QHO:
$$
\ket{0} \mapsto \frac{\ket{0}_L + \ket{4}_L}{\sqrt{2}} \\
\, \\
\ket{1} \mapsto \ket{2}_L
$$

## Knill-Laflamme conditions

Our coded states are:

$$
\omega \in \{ \ket{0}_L, \ket{1}_L \} \\
$$

And our Kraus operators are:
$$
K = \{ K_i \}
$$

The Knill-Laflamme conditions are:

$$
\braket{\omega_k | K_i^{\dagger} K_j | \omega_l} = \delta_{kl} C_{ij}
$$

Which means:

$$
\braket{0_L | K_i^{\dagger} K_j | 0_L} = C_{ij} = \braket{1_L | K_i^{\dagger} K_j | 1_L} \\
\, \\
\braket{0_L | K_i^{\dagger} K_j | 1_L} = 0 = \braket{1_L | K_i^{\dagger} K_j | 0_L} 
$$

(Basically, states should not be mixed by the Kraus operators.)

## Stabilizers