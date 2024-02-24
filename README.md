Hey there!
Here is the description about our project!
We have created a visualizor for "job assignment Problem" using Branch and Bound Technique...

-------------------------------------------------------------------------------------------------------------------------------
Let's take a look at JOB ASSIGNMENT PROBLEM...
The job assignment problem deals with assigning machines to tasks, workers to jobs, soccer players to positions, and so on. The goal is to determine the optimum assignment that, for example, minimizes the total cost or maximizes the team effectiveness. The assignment problem is a fundamental problem in the area of combinatorial optimization.

Assume for example that we have four jobs that need to be executed by four workers. Because each worker has different skills, the time required to perform a job depends on the worker who is assigned to it.
The matrix below shows the time required (in minutes) for each combination of a worker and a job. The jobs are denoted by J1, J2, J3, and J4, the workers by W1, W2, W3, and W4.

```
PJ  J1	J2	J3	J4
W1	82	83	69	92
W2	77	37	49	92
W3	11	69	05	86
W4	08	09	98	23
```
Each worker should perform exactly one job and the objective is to minimize the total time required to perform all jobs.
It turns out to be optimal to assign worker 1 to job 3, worker 2 to job 2, worker 3 to job 1 and worker 4 to job 4. The total 
time required is then 69 + 37 + 11 + 23 = 140 minutes. All other assignments lead to a larger amount of time required.

---------------------------------------------------------------------------------------------------------------------------------

Now, where bruteforce takes running time of O(n!), this algorithm reduces the time complexity significantly...
