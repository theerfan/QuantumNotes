### Confidence Intervals (Lecture 14)

Imagine we've estimated parameters $\theta_e$ from our data via an unbiased estimator. We want to know how confident we are that our estimate is correct, e.g. how likely is it that our estimate is within a certain range of the true value of the parameter?

We already know that:

$$
\lim_{N \to \infty} \mathbb{E}(\theta_e) = \theta
$$

The confidence of our confidence interval is the probability that the true value of the parameter is within the interval, i.e. the integral of our estimator function over the interval:

$$
p(\theta_1, \theta_2) = \int_{\theta_1}^{\theta_2} \mathcal{L}(\theta) d\theta 
$$

For our estimated parameters (e.g sample mean and sample variance), we can use the Central Limit Theorem to approximate the distribution of our estimator as a Gaussian. And we can use the Gaussian to calculate what probabilities we expect for different intervals.

$$
\begin{align*} 
P(\theta_e - \sigma_e, \theta_e + \sigma_e) 
&= \int_{\theta_e - \sigma_e}^{\theta_e + \sigma_e} \mathcal{L}(\theta) d\theta = 0.68 \\
\, \\
P(\theta_e - 2\sigma_e, \theta_e + 2\sigma_e)
&= \int_{\theta_e - 2\sigma_e}^{\theta_e + 2\sigma_e} \mathcal{L}(\theta) d\theta = 0.95 \\
\, \\
P(\theta_e - 5\sigma_e, \theta_e + 5\sigma_e)
&= \int_{\theta_e - 5\sigma_e}^{\theta_e + 5\sigma_e} \mathcal{L}(\theta) d\theta = 0.9999994
\end{align*}
$$

The $5\sigma$ confidence interval is the measure they use at CERN to determine if their measurements are not just random noise. (Meaning that they have a 1 in 3.5 million chance of being wrong)

### Curve Fitting

Imagine we want to fit a curve to some data. We can use the Maximum Likelihood Estimator to find the parameters of the curve that best fit the data.

$$
\begin{align*}
\mathcal{L}(\theta) 
&= \prod_{i=1}^{N} \mathcal{L}(x_i | \theta) \\ 
&= \prod_{i=1}^{N} \frac{1}{\sqrt{2\pi \sigma^2}} \exp \Big[ -\frac{(x_i - At_i)^2}{2\sigma^2} \Big] \\
\, \\
\Rightarrow \log \mathcal{L}(\theta) 
&= const - \sum_{i=1}^{N} \frac{(x_i - At_i)^2}{2\sigma^2} \\
\end{align*}
$$

With this, we define the $\chi^2$ function:

$$
\chi^2 = \sum_{i=1}^{N} \frac{(x_i - At_i)^2}{\sigma^2}
$$

Where we try to minimize the $\chi^2$ function to find $A$. This is the same as maximizing the log-likelihood function.

Another form of the $\chi^2$ function is:

$$
\chi^2 = \sum_{i=1}^{N} \frac{(O_i - E_i)^2}{E_i}
$$

Where $O_i$ is the observed value and $E_i$ is the expected value. This is used in the $\chi^2$ test for goodness of fit.

**NOTE**: This works until it doesn't. When the parameter is not linear in time, the $\chi^2$ function is not convex and the minimum is not unique. 

### Covariance & Error Propagation

[Skipped] (Lord help me if I ever need this)

Update: This one thing was in fact on the exam and I got rekt =))