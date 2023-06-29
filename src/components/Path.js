import Container from "react-bootstrap/Container";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import { branchCommands } from "../redux/actionsAPI/apis/branchApi";
import { commitCommands } from "../redux/actionsAPI/apis/commitApi";
import { testSetCommands } from "../redux/actionsAPI/apis/testSetApi";
import { testCommands } from "../redux/actionsAPI/apis/testApi";
import { subtestCommands } from "../redux/actionsAPI/apis/subtestApi";

function Path() {
    const [path, setPath] = useState("");
    const branchId = useSelector(state => state.branchId).branchId;
    const testSetId = useSelector(state => state.testSetId).testSetId;
    const testId = useSelector(state => state.testId).testId;
    const subTestId = useSelector(state => state.subTestId).subTestId;
    const commitId = useSelector(state => state.commitId).commitId;

    useEffect(() => {
        const checkPath = async () => {
            let localPath = "";
            if (branchId != null) {
                const branch = await branchCommands.getBranch(branchId);
                const branchName = branch.name;
                localPath += branchName;
            }
    
            if (commitId != null) {
                const commit = await commitCommands.getParticularCommit(commitId);
                const commitName = commit.name;
                localPath += " > " + commitName;
            }
    
            if (testSetId != null) {
                const testSet = await testSetCommands.getParticularTestSet(testSetId);
                const testSetName = testSet.name;
                localPath += " > " + testSetName;
            }
    
            if (testId != null) {
                const test = await testCommands.getParticularTest(testId);
                const testName = test.name;
                localPath += " > " + testName;
            }
    
            if (subTestId != null) {
                const subTest = await subtestCommands.getParticularSubtest(subTestId);
                const subTestName = subTest.name;
                localPath += " > " + subTestName;
            }
            setPath(localPath);
        }

        checkPath();
    }, [branchId, commitId, testSetId, testId, subTestId]);

    return (
        <div style={{color: "red"}}><b>Viewing Path:</b> {path}</div>

    );
}

export default Path;