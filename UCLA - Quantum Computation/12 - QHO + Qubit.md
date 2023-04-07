# Quantum Harmonic Oscillators + Qubits = Quantum Computers

## Composite Systems

### Tensor Products

[You know the deal. #skipped]


## Cavity/Circuit Quantum Electrodynamics (QED)

Imagine we have a cavity with an atom placed inside of it, where the atom can be either in the ground state $|1\rangle$ or the excited state $|0\rangle$, and there's light trapped inside this cavity.
Say the angular frequency splitting between the two states is $\omega_0$ and the cavity is oscillating at angular frequency $\omega$. If $\delta = \omega - \omega_0 \approx 0$, then the excitation is kind of delocalized, meaning that the atom at its ground state could absorb the cavity and become excited, and also when in its excited state, it could emit a photon and go back to the ground state. 

(There could be other light modes inside the cavity as well, but we're only concerned with the one that's resonant with the atom.)

As you can see, this situation is obviously a QHO (cavity) plus a qubit (atom). The Hamiltonian for the (**uncoupled**) system is:

$$
\begin{align*}
H_{SYS} &= \frac{\omega_0}{2} \hat{\sigma}_Z \otimes \hat{I}_{QHO} + \hat{I}_{Qubit} \otimes \omega (\hat{a}^\dagger \hat{a} + \frac{1}{2}) \\
&= \frac{\omega_0}{2} \hat{\sigma}_Z + \omega (\hat{a}^\dagger \hat{a} + \frac{1}{2})
\end{align*}
$$

(We could omit the identities, if we're careful about the dimesnion of our operators.)


Now, to derive the coupling (**interaction**) part, we would need about 2 weeks of boring math, so let's just give a glimpse of the derivation here (to see where it comes from)

$$
\hat{H}_{COUP} = - \vec{d} \cdot \vec{E} = d_0 \hat{\sigma}_X = d_0 \hat{\sigma}_X E_0 (\hat{a} + \hat{a}^\dagger)
$$

We just need to note that it's coming from the interaction of the electric field of the light with the atom's electric dipole moment.

At last, we will write the final form of the interaction part of Hamiltonian:

$$
\hat{H}_{COUP} = \frac{g}{2} \hat{\sigma}_X (\hat{a} + \hat{a}^\dagger)
$$

Where $g = 2d_0 E_0$ is the coupling constant (whose full calculation isn't really important here).

You see that here we have two operators instead of one, which is because this is Quantum Electrodynamics, which means that we're quantizing the electromagnetic field. This is in contrast to our previous examples, where the photons only acted as parameters in our state which we could change, but here we treat them as an actual part of the quantum system.


So the **total hamiltonian** which is composed of the system hamiltonian and the interaction hamiltonian is:

$$
\begin{align*}
\hat{H}_{TOT} &= \hat{H}_{SYS} + \hat{H}_{COUP} \\ 
&= \frac{\omega_0}{2} \hat{\sigma}_Z + \omega (\hat{a}^\dagger \hat{a} + \frac{1}{2}) + \frac{g}{2} \hat{\sigma}_X (\hat{a} + \hat{a}^\dagger)
\end{align*}
$$

(A factor of $\hbar$ has been omitted in our hamiltonians here.)

Now, we want to analyze the behaviour of this hamiltonian, but it's really hard to exponentiate that entire thing, so we need to make one more approximation, but let's first analyze what the coupling part of our hamiltonian does.

$$
\begin{align*}
\hat{\sigma}_X(\hat{a} + \hat{a}^\dagger) &= (\hat{\sigma}^{+} + \hat{\sigma}^{-}) (\hat{a} + \hat{a}^\dagger) \\
&= \hat{\sigma}^{+} \hat{a} + \hat{\sigma}^{+}  \hat{a}^\dagger + \hat{\sigma}^{-} \hat{a} + \hat{\sigma}^{-} \hat{a}^\dagger
\end{align*}
$$

Where $\hat{\sigma}^{+} = |0\rangle \langle 1|$ and $\hat{\sigma}^{-} = |1\rangle \langle 0|$. (Raises and lowers the qubit state.)

The first term, $\hat{\sigma}^{+} \hat{a}$, is raising the qubit's state by absorbing a photon. \
The second term, $\hat{\sigma}^{+} \hat{a}^\dagger$, is raising the qubit's state _while_ emitting a photon! \
The third term, $\hat{\sigma}^{-} \hat{a}$, is lowering the qubit's state _while_ absorbing a photon! \
The fourth term, $\hat{\sigma}^{-} \hat{a}^\dagger$, is lowering the qubit's state by emitting a photon.

We see that the second and third terms really don't make sense because they do not conserve energy, so let's see if we can eliminate them after exponentiating the hamiltonian.


As always, taking the hamiltonian to the **Interaction Picture**, we say:

$$
\hat{H}_0 = \frac{\omega_0}{2} \hat{\sigma}_Z + \omega (\hat{a}^\dagger \hat{a} + \frac{1}{2})
$$

Which gives us:

$$
\hat{U}_I = e^{-i \hat{H}_0 t} = e^{-i \frac{\omega_0}{2} \hat{\sigma}_Z t} e^{-i \omega (\hat{a}^\dagger \hat{a} + \frac{1}{2}) t}
$$

And we get:

$$
\begin{align*}
\hat{H}_{INT} &= U_I^\dagger \hat{H}_{COUP} U_I \\
&= \frac{g}{2} \big( e^{i \frac{\omega_0}{2} \hat{\sigma}_Z t} \hat{\sigma}_X e^{-i \frac{\omega_0}{2} \hat{\sigma}_Z t} \big) \big( e^{i \omega (\hat{a}^\dagger \hat{a} + \frac{1}{2}) t} (\hat{a} + \hat{a}^\dagger) e^{-i \omega (\hat{a}^\dagger \hat{a} + \frac{1}{2}) t} \big) \\
&= \frac{g}{2} \big( \hat{\sigma}^{+} e^{i \omega_0 t} + \hat{\sigma}_{-} e^{-i \omega_0 t} \big) \big( \hat{a} e^{-i \omega t} + \hat{a}^\dagger e^{i \omega t} \big) \\
&= \frac{g}{2} \big( \hat{\sigma}^{+} \hat{a} e^{i (\omega_0 - \omega) t} + \hat{\sigma}^{+} \hat{a}^\dagger e^{i (\omega_0 + \omega) t} + \hat{\sigma}^{-} \hat{a} e^{-i (\omega_0 + \omega) t} + \hat{\sigma}^{-} \hat{a}^\dagger e^{-i (\omega_0 - \omega) t} \big) \\
&\stackrel{RWA}{=} \frac{g}{2} \big( \hat{\sigma}^{+} \hat{a} + \hat{\sigma}^{-} \hat{a}^\dagger \big) \\
\end{align*}
$$

In the second line, we rearranged the terms easily because we knew that $\hat{\sigma}_X$ (and its exponential) and $\hat{a} + \hat{a}^\dagger$ (and their exponentials commute) with each other. (Meaning that their order doesn't matter.)

In the same line, we have also used the following identities (that can be easily proven by writing the Taylor series form of the exponentials):

$$
\begin{align*}
e^{i \omega (\hat{a}^\dagger \hat{a} + \frac{1}{2}) t} \hat{a} e^{-i \omega (\hat{a}^\dagger \hat{a} + \frac{1}{2}) t} &= \hat{a} e^{-i \omega t} \\
\, \\
e^{i \omega (\hat{a}^\dagger \hat{a} + \frac{1}{2}) t} \hat{a}^\dagger e^{-i \omega (\hat{a}^\dagger \hat{a} + \frac{1}{2}) t} &= \hat{a}^\dagger e^{i \omega t}
\end{align*}
$$


In the final line, we use the Rotating Wave Approximation, in the sense that because we know that $\omega_0 \approx \omega$, the terms which have $\omega_0 - \omega \approx 0$ in their exponentials are time independent (they stay), and the terms which have $\omega_0 + \omega \approx 2 \omega$ in their exponentials are too quick to oscillate to have any effect on the system (they go away).

So, putting this hamiltonian back in the lab frame, we will see that our _effective total hamiltonian_ becomes:

$$
H_{TOT}^{eff} = \frac{\omega_0}{2} \hat{\sigma}_Z + \omega (\hat{a}^\dagger \hat{a} + \frac{1}{2}) + \frac{g}{2} (\hat{\sigma}^{+} \hat{a} + \hat{\sigma}^{-} \hat{a}^\dagger)
$$

We call this hamiltonian the **Jaynes-Cummings Hamiltonian**.

---
Some useful reading on the IBM transmon circuitry and the Jaynes-Cummings Hamiltonian:

https://qiskit.org/textbook/ch-quantum-hardware/transmon-physics.html