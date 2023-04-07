# Evolution Operator

## Case 2 - Time-dependent Hamiltonian

---

### Case 2.1: $H$ is time-dependent but $[\hat{H}(t_1), \hat{H}(t_2)] = 0$ for all $t_1, t_2$ 

We assume that the hamiltonian is time-indepdendent over a small time interval $\Delta t$ anywhere in our entire time interval, which means that for each interval of $\Delta t$, the evolution operator has the same $\hat{U} = e^{-i \frac{\hat{H}}{\hbar} t}$ form as before; so we break down the entire time interval $[t_0, t]$ into $N$ sections of $\Delta t$. ($N \Delta t = t - t_0$) \
(But notice that the hamiltonian for each interval is different, so the evolution operator is different for each interval.) \
Now the evolution operator is given by:

$$
\begin{align*}
\hat{U} &= e^{-i \frac{\hat{H}(t_0 + (N-1) \Delta t)}{\hbar} \Delta t} \cdots  e^{-i \frac{\hat{H}(t_0 + \Delta t)}{\hbar} \Delta t} e^{-i \frac{\hat{H}(t_0)}{\hbar} \Delta t} \\
&\stackrel{*}{=} e^{-i \sum^N_{n=0} \frac{\hat{H}(t_0 + n \Delta t)}{\hbar} \Delta t} \\

\Rightarrow &\lim_{\Delta t \to 0} \hat{U}  = e^{-i \int^{t}_{t_0} \frac{\hat{H}(t')}{\hbar} dt'} \\
\end{align*}
$$

Now, the equality that we have marked with a star is NOT true in general, in fact, for two matrices $\hat{A}$ and $\hat{B}$, we have:

$$
e^{\hat{A}} e^{\hat{B}} =  e^{\hat{A} + \hat{B} + \frac{1}{2} [\hat{A}, \hat{B}] + \frac{1}{12} [\hat{A}, [\hat{A}, \hat{B}]] - \frac{1}{12} [\hat{B}, [\hat{A}, \hat{B}]] + \cdots}
$$

Which is called the **Baker-Campbell-Hausdorff (BCH) formula**.

In some cases, if we're lucky, even though $\hat{A}, \hat{B}$ don't commute, they do commute with their commutator and the series truncates, but if $\hat{A}, \hat{B}$  _do_ commute, then the $*$-marked equality is true. 

So to repeat ourselves, for this case our evolution operator is given by:

$$
\hat{U} = e^{-i \int^{t}_{t_0} \frac{\hat{H}(t')}{\hbar} dt'}
$$

Note that if $H$ is actually time-independent, then the evolution operator we get it just the same as the one we got in **Case 1**.

For example,

$$
\hat{H} = \mu_B B_z f(t) \hat{\sigma}_z
$$

is time-dependent, but it commutes with itself at all times because $\hat{\sigma}_z$ is a diagonal matrix.

Most of the time, these hamiltonians are boring and don't do anything interesting, so we move over to:

---

### Case 2.2: $H$ is time-dependent and $[\hat{H}(t_1), \hat{H}(t_2)] \neq 0$ for some $t_1, t_2$

To solve for this case, we directly integrate the Schrodinger equation:

$$
\begin{align*}
\int_{t_0}^{t} i \hbar \frac{d\hat{U}(t'; t_0)}{dt'} dt' &= \int_{t_0}^{t} \hat{H}\hat{U}(t'; t_0) dt' \\
\rightarrow \hat{U}(t; t_0) - \hat{U}(t_0, t_0) &= \frac{-i}{\hbar} \int_{t_0}^{t} \hat{H}(t') \hat{U}(t'; t_0) dt' \\
\hat{U}(t; t_0) - \hat{I} &= \frac{-i}{\hbar} \int_{t_0}^{t} \hat{H}(t') \hat{U}(t', t_0) dt' \\
\rightarrow \hat{U}(t; t_0) &= \hat{I} + \frac{-i}{\hbar} \int_{t_0}^{t} \hat{H}(t') \hat{U}(t'; t_0) dt'
\end{align*}
$$

So now, we have a DE for $\hat{U}(t, t_0)$, which has an integral of itself as a term; what we do here is put the equation for $\hat{U}(t, t_0)$ back into its RHS and repeat it ad infinitum until to get a series form:

$$
\hat{U}(t, t_0) = \hat{I} + \frac{-i}{\hbar} \int_{t_0}^{t} \hat{H}(t') \hat{U}(t'; t_0) dt' + (\frac{-i}{\hbar})^2 \int_{t_0}^{t} \int_{t_0}^{t_1'} \hat{H}(t') \hat{H}(t'') dt' dt''  + \cdots
$$

This is called the **Dyson series**.

But there's a much better (and more recent) way to solve this DE and it's called the **Magnus Expansion**.

(We're putting this in terms of unitary evolution and hamiltonians but Magnus figured it out for a more general case of differential equations.)

Magnus figured out that for our Schroedinger equation $\frac{d}{dt} \hat{U} = (-i \frac{\hat{H}}{\hbar}) \hat{U}$, we can write the solution as:

$$
\hat{U}(t, t_0) = e^{\Omega(t; t_0)} \\
\Omega(t; t_0) \sum_{k=1}^{\infty} \Omega_k
$$

Where the $\Omega_k$ are polynomials in $\hat{H}$:

$$
\Omega_1 = \frac{-i}{\hbar} \int_{t_0}^t \hat{H}(t') dt' \\
\Omega_2 = \frac{1}{2} (\frac{-i}{\hbar})^2 \int_{t_0}^t \int_{t_0}^{t_1} [\hat{H}(t_1), \hat{H}(t_2)] dt_2 dt_1 \\
\Omega_3 = \frac{1}{6} (\frac{-i}{\hbar})^3 \int_{t_0}^t \int_{t_0}^{t_1} \int_{t_0}^{t_2} \Big[ \big[\hat{H}(t_1), [\hat{H}(t_2), \hat{H}(t_3)] \big] + \big[\hat{H}(t_3), [\hat{H}(t_2), \hat{H}(t_1)] \big] \Big] dt_3 dt_2 dt_1 \\
\vdots
$$

This encapsulates everything we've talked about so far; for example, if it's time independent, all of the commutator terms are $0$, and we only get the first term, which also being time-independent, is just the same as the one we got in **Case 1**. ($\hat{H}t$)

It also has another advantage over the dyson series, which is that the Dyson formula for $\hat{U}$ is not unitary unless we formally go to $\infty$, and whenever we truncate, we'd need to do some re-normalization to patch that up. With the Magnus expansion however, we can truncate at any point and still get a unitary operator.


---

## Interaction Picture

When dealing with problems where our hamiltonian can be written as a sum of two parts, one of which is time-independent and the other is time-dependent, we can use the **interaction picture** to solve for the evolution operator.

The idea is that we can write our hamiltonian as:

$$
\hat{H} = \hat{H}_0 + \hat{V}
$$

Where $\hat{H}_0$ is time-independent and $\hat{V} = f(t)$ is our "interaction".

To solve for this, we want to separate the evolution due to $\hat{H}_0$ and $\hat{V}$, so what we do is write our state ket as:

$$
\ket{\psi(t)} = \hat{U}_0(t) \ket{\psi_I \small( t \small) }
$$

Where $\hat{U}_0(t) = e^{-i \frac{\hat{H}_0}{\hbar} t}$ is the evolution operator due to $\hat{H}_0$ and $\ket{\psi_I(t)}$ is our Interaction Ket. \
We're basically putting 
1. The time-evolution due to $\hat{H}_0$ into $\hat{U}_0$
2. The time-evolution due to the interaction part into $\ket{\psi_I \small( t \small)}$.

(These are actually $\hat{U}(t; t_0)$ and $e^{-i \frac{\hat{H}_0}{\hbar} (t-t_0)}$, but we assume $t_0=0$ for simplicity and write them without $t_0$)

Now, let's write the Schrodinger equation in the interaction picture:

$$
\begin{align*}
i \hbar \frac{d}{dt} \ket{\psi \small( t \small)} &= \hat{H} \ket{\psi \small(t \small)} \\
= i \hbar \frac{d \big(\hat{U}_0 \ket{\psi_I \small( t \small)} \big)}{dt} &= \hat{H} \hat{U}_0 \ket{\psi_I \small( t \small)} \\
= i \hbar \frac{d \hat{U}_0}{dt} \ket{\psi_I\small( t \small)} + i \hbar \hat{U}_0 \frac{d \ket{\psi_I \small( t \small)}}{dt} &= \hat{H} \hat{U}_0 \ket{\psi_I \small(t \small)} \\
\text{Multiplying by right with a } &U_0^{\dagger}, \text{ and rearranging:} \\
\rightarrow i \hbar \frac{d \ket{\psi_I \small( t \small)}}{dt} &= \Big( \hat{U}_0^{\dagger} \hat{H} \hat{U}_0 - i \hbar \hat{U}^{\dagger}_0 \frac{d \hat{U}_0}{dt} \Big) \ket{\psi_I\small( t \small)} \\
= i \hbar \frac{d \ket{\psi_I \small( t \small)}}{dt} &= \hat{H}_I \ket{\psi_I \small( t \small)}
\end{align*}
$$

Now, let's expand these terms and write them out:

$$
\begin{align*}
\hat{U}^{\dagger}_0 \hat{H} \hat{U}_0 &= \hat{U}^{\dagger}_0 \hat{H}_0  \hat{U}_0 + \hat{U}^{\dagger}_0 \hat{V} \hat{U}_0 \\
&= \hat{H}_0 + \hat{U}^{\dagger}_0 \hat{V} \hat{U}_0 \\
\end{align*}
$$

And:

$$
\begin{align*}
\frac{d \hat{U}_0}{dt} &= \frac{d}{dt} e^{-i \frac{\hat{H}_0}{\hbar} t} \\
&= -i \frac{\hat{H}_0}{\hbar} e^{-i \frac{\hat{H}_0}{\hbar} t} \\ 
&= -i \frac{\hat{H}_0}{\hbar} \hat{U}_0 \\
\end{align*}
$$

Which means:
$$
\begin{align*}
- i \hbar \hat{U}^{\dagger}_0 \frac{d \hat{U}_0}{dt} &= -i \hbar \hat{U}^{\dagger}_0 \frac{-i \hat{H}_0}{\hbar} \hat{U}_0 \\
&= -\hat{U}^{\dagger}_0 \hat{H}_0 \hat{U}_0 \\
\text{Since } \hat{U}_0 \text{ commutes with } &\hat{H}_0, \\
&= -\hat{H}_0
\end{align*}
$$

Therefore,
$$
\begin{align*}
\rightarrow \hat{U}^{\dagger}_0 \hat{H} \hat{U}_0 &= \hat{H}_0 + \hat{U}^{\dagger}_0 \hat{V} \hat{U}_0 - \hat{H}_0 \\
&= \hat{U}^{\dagger}_0 \hat{V} \hat{U}_0 \\
\, \\
H_I &= \hat{U}^{\dagger}_0 \hat{V} \hat{U}_0
\end{align*}
$$


So now, we can write our Schrodinger equation in the interaction picture as:

$$
\begin{align*}
i \hbar \frac{d \ket{\psi_I \small( t \small)}}{dt} &= \hat{H}_I \ket{\psi_I \small( t \small)} \\
&= \hat{U}^{\dagger}_0 \hat{V} \hat{U}_0 \ket{\psi_I \small( t \small)} \\
\end{align*}
$$

--- 

Sidenote 1: \
For a general unitary transform $\hat{U}$, we can write:

$$
\ket{\psi} = \hat{U} \ket{\psi_U} \\
\, \\
i \hbar \frac{d \ket{\psi_U}}{dt} = \hat{H}_U \ket{\psi_U} \\
\, \\
\hat{H}_U = \hat{U}^{\dagger} \hat{H} \hat{U} - i \hbar \hat{U}^{\dagger} \frac{d \hat{U}}{dt}
$$

---

Sidenote 2: \
For a diagonal matrix $B$:

$$
B = \begin{pmatrix}
b_{1} & 0 & \cdots & 0 \\
0 & b_{2} & \cdots & 0 \\ 
\vdots & \vdots & \ddots & \vdots \\
0 & 0 & \cdots & b_{n}
\end{pmatrix} 
$$

Then its exponential can be obtained by exponentiating each entry on the main diagonal:

$$
e^{B} = 
\begin{pmatrix}
e^{b_{1}} & 0 & \cdots & 0 \\
0 & e^{b_{2}} & \cdots & 0 \\
\vdots & \vdots & \ddots & \vdots \\
0 & 0 & \cdots & e^{b_{n}}
\end{pmatrix}

$$

---

Now, let's use our new tools to solve for a hamiltonian we've seen before, namely:

$$
\frac{\hat{H}}{\hbar} = \frac{\omega_0}{2} \hat{\sigma}_z + \frac{\Omega}{2} \big( e^{i \omega t + \phi}+ e^{-i \omega t + \phi} \big)  \hat{\sigma}_x 
$$

We write our $U_0$ as:

$$
\begin{align*}
\hat{U}_0 &= e^{-i \frac{\hat{H}_0}{\hbar} t} \\
&= e^{-i \frac{\omega_0}{2} \hat{\sigma}_z t} \\
&= e^{-i \frac{\omega_0}{2} t} |0\rangle \langle 0| + e^{i \frac{\omega_0}{2} t} |1\rangle \langle 1| \\
\end{align*}
$$

So our interaction picture hamiltonian is:

$$
\begin{align*}

\frac{\hat{H}_I}{\hbar} &= \hat{U}^{\dagger}_0 \hat{V} \hat{U}_0 \\

&= \big( e^{i \frac{\omega_0}{2} t} |0\rangle \langle 0| + e^{-i \frac{\omega_0}{2} t} |1\rangle \langle 1| \big) \big(  \frac{\Omega}{2} \big( e^{i (\omega t + \phi)}+ e^{-i( \omega t + \phi)} \big)  \hat{\sigma}_x \big) \big( e^{-i \frac{\omega_0}{2} t} |0\rangle \langle 0| + e^{i \frac{\omega_0}{2} t} |1\rangle \langle 1| \big) \\

&= \frac{\Omega}{2} e^{i \omega_0 t} \big( e^{i (\omega t + \phi)}  + e^{-i (\omega t + \phi)} \big) |0\rangle \langle 1 | + \frac{\Omega}{2} e^{-i \omega_0 t} \big( e^{i (\omega t + \phi)} + e^{-i (\omega t + \phi)} \big) |1\rangle \langle 0 | \\

&\stackrel{RWA}{=} \frac{\Omega}{2} e^{-i ((\omega - \omega_0) t + \phi)} |0\rangle \langle 1 | + \frac{\Omega}{2} e^{i ((\omega - \omega_0) t + \phi)} |1\rangle \langle 0 | \\

&= \frac{\Omega}{2} e^{-i (\delta t + \phi)} \hat{\sigma}_{+} + \frac{\Omega}{2} e^{i (\delta t + \phi)} \hat{\sigma}_{-} \\

\end{align*}
$$


Let's for a second assume that $\delta = \phi = 0$, then we'll get:

$$
\frac{\hat{H}_I}{\hbar} = \frac{\Omega}{2} \hat{\sigma}_{+} + \frac{\Omega}{2} \hat{\sigma}_{-} = \Omega \hat{\sigma}_{x}
$$

Since this is totally time-independent, our interaction evolution operator becomes:

$$
\begin{align*}
\hat{U}_I &= e^{-i \frac{\hat{H}_I}{\hbar} t} \\
&= e^{-i \frac{\Omega}{2} \hat{\sigma}_{x} t} \\
&= \cos(\frac{\Omega t}{2}) \hat{I} - i \sin(\frac{\Omega t}{2}) \hat{\sigma}_{x} \\
\end{align*}
$$

And we can easily apply this to any state (say, $\ket{0}$) to get:

$$
\hat{U}_I \ket{0} = \cos(\frac{\Omega t}{2}) \ket{0} - i \sin(\frac{\Omega t}{2}) \ket{1}
$$