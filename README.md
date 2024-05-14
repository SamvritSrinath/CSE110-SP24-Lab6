Samvrit Srinath and Jessica Qu's Submission of **Lab 6** For CSE110 Spring 2024


## Part 1

### Question 1: Recipe Automated Tests

1. We would run our *automated tests* **within a Github Action that runs whenever code is pushed**. This is because we want to make sure whatever code we are pushing is working as expected and does not break any existing functionality. While we could trust the developer to run the tests locally(and in fact highly encouraged on the developers part), **at no point in the pipeline** would we want to modify the code without running the tests, as this could potentially lead to unshippable code and unnoticed bugs. Within a Github Action, whenever a Developer tries to push code, the tests would run automatically, and if they fail, the developer and any other members of the team would be notified immediately. This would allow the team to quickly identify and fix any issues that may have been introduced and promotes transparency amongst the team members. With this check in place, this would minimize the chances of bugs being introduced into the codebase and would ensure that the code is always in a working state.

### Question 2: E2E Test for a Function?

No you would not use an End to End test to see if a function is returning the correct output. This is better suited for a **unit test** as the function is small and can be isolated. An End to End Test is better suited for testing the entire application and its flow from start to finish. This would include testing the application by providing external inputs and expected user interactions, and would be more comprehensive than just testing a single function.






