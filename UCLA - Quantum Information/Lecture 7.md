## Quantum Communication (Lecture 7)

### Maxwell's Equations

### Polarizers

### Optical Qubits

Last Time - We wrapped up our discussion of open quantum systems. 

Big takeaways: 

–Decoherence is untracked unitary evolution. In some sense, it is no different than not keeping track of the wind that is responsible for altering the ideal trajectory of a cannon ball– just the math makes this not so obvious. 

We treat decoherence in two ways: 1.) Kraus map: useful for thinking about different kinds of errors. Not too common in lab work. We usually use 2.) the master equation in the lab, because we have unitary an non-unitary evolution at the same time, and the ME and Linblad operators give us a way to deal with that. The connection to the Kraus map is that the collapse operators in the ME are basically modified Kraus operators. 

–Error correction – Stabilizer codes. Single Subsystem Codes. The former work on the tensor product HS of multiple objects, the latter works on the HS of a single quantum object. 

Now, a major shift in topic.






Quantum Communication 

What is a photonic qubit? Classical encryption versus quantum encryption. 

Let's talk about photons and what we can do with them. Try for an intuitive idea: 

We live in a universe with things in it. But what are those things? Who knows!!? But these things do seem to have properties, so let's talk about those. Experience, and experiment inform us about these properties. Let’s think about a balloon– all of physics is contained in this phenomenon!

Say we are out in space, and all we have to figure things out about the universe is this balloon. What does the balloon tell us? It seems to be attractive to us. It seems that the acceleration of this attraction depends on distance. Bigger balloons are also attractive. Doesn’t seem to depend on the material composition of the balloons etc. Pushing the balloons seems to push me back, bigger ones move less. So there seems to be a force between things. 

(A)
 
 Writing the equation for just the acceleration of a given balloon, we arrive at the “field” concept: Something that has a value at every point in space. Here we are dealing with a vector field, but we could also have a scalar field, like the temperature in this room. 

Evidently, things in the universe have something called mass, i.e. how strongly it responds to the gravitational field. But there is another idea of mass, i.e. how much does a thing respond to an applied force. So we have gravitational mass, and the inertial mass. These two kinds of mass seem to be equal in our universe– but there is no obvious reason why that should be the case. It is nice that they are though, for, if this is so, we arrive at the result that all masses fall toward the earth (or any fixed body) at the same rate. If this were not the case, basketball would look very different. 

So that is gravity, and the idea of a field.

Now we take the balloon and rub it on our head, and, afterwards, it sticks to our carpet. SO there seems to be another force, and it is stronger than gravity. It seems to be an inverse square law, etc. so we come to the idea of another force law, involving yet another kind of mass, the amount of which determines how strong the acceleration of these rubbed balloons will be to the carpet– we call this new kind of mass “charge”. IT turns out that this is not equal to the gravitational and inertial mass. So things can have a charge. And, as in the case of the grav. Field, associated with this force is a field. F = qE. 

(B) 
 

We also have the force equation for moving charges:

(C ) 
 

Again, the charge sets the strength of the force. 

Now, is the field real? Or is it just a conceptual/mathematical device to be used for calculating things? Who knows!? But it does describe how we will measure things, so we might a s well think of it as real. 

So what is this charge stuff that produces all these fields and effects? No one knows!!! What is mass? No one knows!! 

For electromagnetic fields, everything is summed up in Maxwell's equations. 

(D) 
 

These equations give us light. It’s not too hard if you know vector identities. Assume no charges or currents– just empty space. 

(E) 
 

It turns out that these are solved by 

(F) 
 

But what does this solution mean? 

(G) 
 

It is a wave moving at the speed of light, a wave of a propagating electric and magnetic field. 

 

These are plane waves. We get gaussian beams, for instance, if we add a diminution factor which makes the field die off as distance from the axis of propagation increases. 

We need to understand the polarization degree of freedom. The reason we went through the classical stuff, is because the way polarization is handled in QM, is the same way as here, and it is easier to use the classical description. For this, we will use Jones vectors. 

So we will be talking about how to send information using photons. Many ways to do it. One simple way to understand is by using polarization. 

IN the classical picture, if E is pointing in x, or in y, or anywhere in the x-y plane and still be transverse we have:

(I)
 

Why the delta thing? The fields transverse in x and y do not necessarily have to have the same phase, so the extra factor is to create that if we want or need it. 

This is basically a qubit. 

In general, the electric field has three components: the oscillating part, the amplitude part, and the polarization part. For many things, the oscillation part is inconsequential, we don’t need to keep track of it. Unless we are interfereign or something, we can ignore, but the polarization part is usually the important part. 

So, the Jones vectors represent the polarization part:

(J)
 

We use the symbol phi to increase the chances of confusing students. 

We will be talking about using jones vectors to encode and transmit information. 

Notation: 

(K)
 

What is delta? Let's look at when the delta is non-zero. Say we have a = b but delta = pi/2 

(L)
 

So it makes it easy to deal with phase changes to use the exponential form and just take the real part after. 

Lets plot the result: 

(M)
 

We can treat the evolution of the polarization state with matrices. 

Etc. 

Quantum Communication

So, we have EM radiation, polarization etc. You can guess how we might communicate with polarization of the field. Just let H be 0 and V be 1 etc. But is this really correct? This is a classical picture. Is there a difference between quantum and classical light? Why start with the Maxwell equations which are classical? THe answer is cool. You have probably noticed that Maxwell's equations predict things that look pretty quantum- waves, superposition of waves, polarization, which kind of feels like qubits etc. The reason is that the correct quantum treatment gives you Maxwell's equations in certain limits. But, because the photons are massless, the classical things are quantum like (??). For ex: the SE gives you back F=ma in certain limits. If you have mass, you get acceleration– Ehrenfest bullshit or whatever. BUt if there is no mass, you get Maxwell's equations. So the classical theory of light had to turn out kind of quantum. Just an idea. 

BUt, important things to know: Quantum versus classical light, is summed up in the double slit experiment. You can predict what will happen with maxwell's equations, get all your boundary conditions etc. right. But, you can also eyeball it: You get interference. 


[These are all Ian's notes, I just copied them.]
(Definitely need to watch the lecture :))