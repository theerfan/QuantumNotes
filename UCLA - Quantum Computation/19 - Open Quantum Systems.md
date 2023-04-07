# Open Quantum Systems (Learning to Forget)


## Reduced Density Matrix

### Partial Trace

Let $A$ and $B$ be two subspaces making up the composite system described by the density operator $\rho_{AB}$. The partial trace of $\rho_{AB}$ over the $B$ subsystem is defined as:

$$
\begin{align*}
Tr_B [\rho_{AB}] &= \sum_j (I_A \otimes \bra{j}_B) \rho_{AB} (I_A \otimes \ket{j}_B) \\
&= \rho_A
\end{align*}
$$

Where $\{ \ket{j} \}$ is any orthonormal basis for the Hilbert space $\mathcal{H}_B$ of subsystem $B$. \ 
This gives us a reduced density matrix $\rho_A$ for the subsystem $A$, which means that we're throwing away information about the state of the $B$ subsystem.

### Derivation:

Let's start with trying to measure an observable on only one of the subsystems. For example, let's say we want to measure the observable $A$ on the $A$ subsystem.

$$
\begin{align*}
[\hat{M}_A] &= Tr[\hat{\rho}_{AB} \hat{M}_A \otimes \hat{I}_B] \\
&= \sum_i p_i \braket{\psi_i | \hat{M}_A  \otimes \hat{I}_B | \psi_i} \\
\end{align*}
$$

Now, Using a complete basis for both subspaces,  $\ket{\alpha}_A, \ket{\beta}_B$, we insert two identity operators by summing over all possible combinations of  $\ket{\alpha}_A, \ket{\beta}_B$:

$$
\begin{align*}
[\hat{M}_A] &= \sum_{i, \alpha, \beta, \alpha', \beta'} p_i \bra{\psi_i} \overbrace{(\ket{\alpha} \ket{\beta} \bra{\beta} \bra{\alpha})}^{\hat{I}} (\hat{M}_A \otimes \hat{I}_B) \overbrace{(\ket{\alpha'} \ket{\beta'} \bra{\beta'} \bra{\alpha'})}^{\hat{I}} \ket{\psi_i} \\
& \text{Since} \braket{\alpha | \psi_i} \text{ is just a scalar, we can move it} \\
&= \sum_{\alpha, \beta, \alpha', \beta'} (\bra{\beta'} \bra{\alpha'}) \overbrace{ \sum_i p_i \ket{\psi_i} \bra{\psi_i}}^{\hat{\rho}} (\hat{M}_A \otimes \hat{I}_B) (\ket{\alpha} \ket{\beta}) \underbrace{\bra{\beta} \braket{\alpha | \hat{M}_A \otimes \hat{I}_B | \alpha'} \ket{\beta'} }_{\delta_{\beta \beta'}} \\
&= \sum_{\alpha, \beta, \alpha'} \bra{\beta} \braket{\alpha | \hat{\rho} | \alpha} \ket{\beta} \braket{\alpha | \hat{M}_A  | \alpha'} \\
& \text{Now, we swap the order of the subsystems because we can} \\
&= \sum_{\underline{\alpha}, \beta, \alpha'} \bra{\alpha'} \braket{\beta | \hat{\rho} | \beta} \overbrace{(\ket{\alpha} \bra{\alpha})}^{\hat{I}} \hat{M}_A  \ket{\alpha'} \\
&= \sum_{\beta, \alpha'} \bra{\alpha'} \braket{\beta | \hat{\rho} | \beta} \hat{M}_A  \ket{\alpha'}
\end{align*}
$$

Where we denote the reduced density matrix as $\hat{\rho}_A$:


$$
\begin{align*}
\hat{\rho}_A &= \sum_{\beta} \braket{\beta | \hat{\rho} | \beta} \\
&= Tr_B [\hat{\rho}_{AB}]
\end{align*}
$$

Which also means that:

$$
\begin{align*}
[\hat{M}_A ] &= Tr_B [\hat{\rho}_{AB} \hat{M}_A \otimes \hat{I}_B] \\
&= Tr [\hat{\rho}_A \hat{M}_A]
\end{align*}
$$

Also we can use this to easily derive that the reduced density matrix for either of the subsystems in the $\ket{\phi^{+}}= \frac{1}{\sqrt{2}} (\ket{00} + \ket{11}$ bell state is:

$$
\hat{\rho}_A = \hat{\rho}_B = \frac{1}{2} \ket{0} \bra{0} + \ket{1} \bra{1}
$$

Which is the maximally mixed state, meaning that we can't describe the state of any of the subsystems without knowing the state of the other subsystem. (Our knowledge of the state of one subsystem is completely erased by the other subsystem, the maximally mixed state gives us no information about the state of the system).

## Quantum Channels

### Kraus Operators

A quantum channel is a map from one quantum state to another. It is represented by a set of Kraus operators $\{ \hat{K}_i \}$, which are linear operators that satisfy the following conditions:

$$
\begin{align*}
\hat{K}_i \hat{K}_j^{\dagger} &= \delta_{ij} \hat{I} \\
\hat{K}_i^{\dagger} \hat{K}_j &= \delta_{ij} \hat{I}
\end{align*}
$$

Where $\hat{I}$ is the identity operator. \
The Kraus operators are also called the "effect operators" of the channel. \
The channel is represented by the following equation:

$$
\hat{\rho}' = \sum_i \hat{K}_i \hat{\rho} \hat{K}_i^{\dagger}
$$

Where $\hat{\rho}'$ is the state of the system after the channel has acted on it.

### Derivation:

Let's start with a system where at $t=0$, the state of the **S**ystem and the state of the **E**nvironment are completely entangled.

$$
\hat{\rho}_{SE} (t=0) = \hat{\rho}_{S} (t=0) \otimes \hat{\rho}_{E} (t=0)
$$

We can describe the evolution of this system by using the following equation:

$$
\hat{\rho}_{SE} (t) = \hat{U} \hat{\rho}_{SE} (t=0) \hat{U}^{\dagger}
$$

Why? (reasoning by analogy) Because considering a system in a pure state, we can say:

$$
\begin{align*}
\hat{\rho}(t) &= \sum_i p_i \ket{\psi_i(t)} \bra{\psi_i(t)} \\
&= \sum_i p_i \hat{U} \ket{\psi_i(0)} \bra{\psi_i(0)}  \hat{U}^{\dagger} \\
&= \hat{U} \hat{\rho}(0) \hat{U}^{\dagger}
\end{align*}
$$

Let's assume that at $t=0$, the environment is in a pure state $\ket{e_0}$, which means that the density matrix of the environment is $\hat{\rho}_{E} (t=0) = \ket{e_0} \bra{e_0}$.

Which means that the density matrix of the system and the environment at time $t$ is:

$$
\hat{\rho}_{SE} (t) = \hat{U} \ket{e_0} (\hat{\rho}_S(t=0)) \bra{e_0} \hat{U}^{\dagger}
$$

We can get the density matrix of the system at time $t$ by tracing out the environment:

$$
\begin{align*}
\hat{\rho}_S (t) &= Tr_E [\hat{\rho}_{SE} (t)] \\
&= \sum_{e} \overbrace{\braket{e | \hat{U}_{SE} | e_0}}^{\hat{K}_e} (\hat{\rho}_S(t=0)) \overbrace{\braket{e_0 | \hat{U}_{SE}^{\dagger} | e}}^{\hat{K}^{\dagger}_e} \\
&= \sum_e \hat{K}_e \hat{\rho}_S(t=0) \hat{K}^{\dagger}_e
\end{align*}
$$

This is called the **Quantum Channel** or the **Operator Sum** description which is characterized by the Kraus operators $\{ \hat{K}_e \}$.

For example, (omitting derivation), for the Jaynes-Cummings model, the Kraus operators are:

$$
\begin{align*}
\hat{K}_0 &= \braket{0_E | \hat{U}_{SE} | 0_E}  \\
&= \ket{1} \bra{1} + \cos(\frac{\Omega t}{2}) \ket{0} \bra{0} \\
& \text{ And, } \\
\hat{K}_1 &= \braket{1_E | \hat{U}_{SE} | 0_E} \\
&= - i\sin(\frac{\Omega t}{2}) \ket{1} \bra{0}
\end{align*}
$$

[#skipped the rest because I'm bored and its repetitive]