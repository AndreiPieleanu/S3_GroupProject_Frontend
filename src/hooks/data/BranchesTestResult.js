
//props = branch ID
function BranchesTestResults(props) {
    /*const [branches, setBranches] = (null);
    // filter based on branch id if props are not null (i.e. nothing is selected)
    //TODO messy, to be cleaned up. need a better props checker and filter.
   const filteredBranches = branches || branches.filter((obj)=>obj.id === props.id);
    const results = [];
    // iterate through each branch
    filteredBranches.forEach((branch) => {

        // initialize counts for this branch
        let passCount = 0;
        let failCount = 0;
        let otherCount = 0;

        branch.test_sets.forEach((testSet) => {

            testSet.tests.forEach((test) => {

                if (test.result === 1) {
                    passCount++;
                } else if (test.result === 0) {
                    failCount++;
                } else {
                    otherCount++;
                }

            });
        });
        //create results array. meant to be used by chart and such.
        //TODO add more types of test. make it so it can be expanded
        results.push({
            branchId: branch.id,
            branchName: branch.name,
            passedTests: passCount,
            failedTests: failCount,
            otherTests: otherCount,
        });
    });
    return [results];*/
}

export default BranchesTestResults;
