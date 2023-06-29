import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ViewTypes from "../../utils/ViewTypes";
import {setBranchId, setBranchName, setCommitId, setTestSetId, setTestId, setSubTestId, setCurrentView} from "../../redux/actions";
import { Link } from "react-router-dom";
import { branchCommands } from "../../redux/actionsAPI/apis/branchApi";
import { commitCommands } from "../../redux/actionsAPI/apis/commitApi";
import { testSetCommands } from "../../redux/actionsAPI/apis/testSetApi";
import { testCommands } from "../../redux/actionsAPI/apis/testApi";
import { subtestCommands } from "../../redux/actionsAPI/apis/subtestApi";

// TO USE THIS COMPONENT YOU MUST PASS TWO PROPERTIES TO IT:
// reduxMode, topBar & page
// reduxMode should be true if you are using this component in parallel with a redux component
// topBar should be true if you want this component to render all in one line
// page should be for example "heatmap" or "dashboard" it is used in the links url so it must match urls


function InteractivePath(props) {
  // This stuff is retrieved from the redux state
  const reduxBranchId = useSelector(state => state.branchId).branchId;
  const reduxTestSetId = useSelector(state => state.testSetId).testSetId;
  const reduxTestId = useSelector(state => state.testId).testId;
  const reduxSubTestId = useSelector(state => state.subTestId).subTestId;
  const reduxCommitId = useSelector(state => state.commitId).commitId;
  const dispatch = useDispatch();

  // This stores all the HTML that is then rendered
  const [pathContent, setPathContent] = useState(null);

  // Initiating the variables to store the IDs
  let branchId;
  let commitId;
  let testSetId;
  let testId;
  let subtestId;

  // If this component is used with redux, it should fetch from the state while,
  // if it is used normally, it will get the IDs from the props
  if (props.reduxMode === true) {
    branchId = reduxBranchId;
    commitId = reduxCommitId;
    testSetId = reduxTestSetId;
    testId = reduxTestId;
    subtestId= reduxSubTestId;
  } else {
    branchId = props.branchId;
    commitId = props.commitId;
    testSetId = props.testSetId;
    testId = props.testId;
    subtestId= props.subtestId;
  }

  // These are redux functions to set the views (in Report Library Page)
  function onClickBranchSelection(id, name) {
    dispatch(setBranchId(id))
    dispatch(setBranchName(name))
    dispatch(setCommitId(null))
    dispatch(setTestSetId(null))
    dispatch(setTestId(null))
    dispatch(setSubTestId(null))
    dispatch(setCurrentView(ViewTypes.COMMITS))
  }

  function onClickCommitSetSelection(id) {
    dispatch(setCommitId(id))
    dispatch(setTestSetId(null))
    dispatch(setTestId(null))
    dispatch(setSubTestId(null))
    dispatch(setCurrentView(ViewTypes.TEST_SET))
  }

  function onClickTestSetSelection(id) {
    dispatch(setTestSetId(id))
    dispatch(setTestId(null))
    dispatch(setSubTestId(null))
    dispatch(setCurrentView(ViewTypes.TEST))
  }

  function onClickTestSelection(id) {
    dispatch(setTestId(id))
    dispatch(setSubTestId(null))
    dispatch(setCurrentView(ViewTypes.SUBTEST))
  }

  function onClickSubTestSelection(id) {
    dispatch(setSubTestId(id))
    dispatch(setCurrentView(ViewTypes.TEST_STEP))
  }



  useEffect(() => {
    const checkPath = async () => {

      let branchName = "";
      let commitVersion = "";
      let testSetName = "";
      let testName = "";
      let subtestName = "";

      if (!branchId) {
        setPathContent(
          <div style={{margin: '0 0 0 5px', color: 'red', fontSize: '20px'}}>No Path</div>
        )
      }

      if (branchId) {
        const branch = await branchCommands.getBranch(branchId);
        branchName = branch.name;
        if (props.reduxMode === false && props.topBar === false) {
          setPathContent(
            <div style={{fontSize:"16px"}}>
                <div style={{color: 'blue'}}>Branch:</div> <Link style={{color: 'red'}} to={`/${props.page}/branches/${props.branchId}`}> {branchName} </Link> 
            </div>
          );
        } else if (props.reduxMode === false && props.topBar === true) {
          setPathContent(
            <div>
                <Link style={{color: 'red', display: 'inline-block', margin: "0 5px"}} to={`/${props.page}/branches/${props.branchId}`}> {branchName} </Link> 
            </div>
          );
        } else if (props.reduxMode === true && props.topBar === false) {
          setPathContent(
            <div style={{fontSize:"16px"}}>
                <div style={{color: 'blue'}}>Branch:</div> <Link style={{color: 'red'}} onClick={() => onClickBranchSelection(branchId, branchName)}> {branchName} </Link> 
            </div>
          );
        } else if (props.reduxMode === true && props.topBar === true) {
          setPathContent(
            <div>
                <Link style={{color: 'red', display: 'inline-block', margin: "0 5px"}} onClick={() => onClickBranchSelection(branchId, branchName)}> {branchName} </Link> 
            </div>
          );
        }
        
      } 
      if (commitId) {
        const commit = await commitCommands.getParticularCommit(commitId);
        commitVersion = commit.version; // WILL HAVE TO CHANGE TO commit.version
        if (props.reduxMode === false && props.topBar === false) {
          setPathContent(
            <div style={{fontSize:"16px"}}>
              <div style={{color: 'blue'}}>Branch:</div> <Link style={{color: 'red'}} to={`/${props.page}/branches/${branchId}`}> {branchName} </Link> 
              <div style={{color: 'black'}}><b>↓</b></div> 
              <div style={{color: 'blue'}}>Commit:</div> <Link style={{color: 'red'}} to={`/${props.page}/branches/${branchId}/commits/${commitId}`}> {commitVersion} </Link>
            </div>
          );
        } else if (props.reduxMode === false && props.topBar === true) {
          setPathContent(
            <div>
              <Link style={{color: 'red', display: 'inline-block', margin: "0 5px"}} to={`/${props.page}/branches/${branchId}`}> {branchName} </Link> 
              <div style={{color: 'black', display: 'inline-block', margin: "0 5px"}}><b>&gt;</b></div> 
              <Link style={{color: 'red', display: 'inline-block', margin: "0 5px"}} to={`/${props.page}/branches/${branchId}/commits/${commitId}`}> {commitVersion} </Link>
            </div>
          );
        } else if (props.reduxMode === true && props.topBar === false) {
          setPathContent(
            <div style={{fontSize:"16px"}}>
              <div style={{color: 'blue'}}>Branch:</div> <Link style={{color: 'red'}} onClick={() => onClickBranchSelection(branchId, branchName)}> {branchName} </Link> 
              <div style={{color: 'black'}}><b>↓</b></div> 
              <div style={{color: 'blue'}}>Commit:</div> <Link style={{color: 'red'}} onClick={() => onClickCommitSetSelection(commitId)}> {commitVersion} </Link>
            </div>
          );
        } else if (props.reduxMode === true && props.topBar === true) {
          setPathContent(
            <div>
              <Link style={{color: 'red', display: 'inline-block', margin: "0 5px"}} onClick={() => onClickBranchSelection(branchId, branchName)}> {branchName} </Link> 
              <div style={{color: 'black', display: 'inline-block', margin: "0 5px"}}><b>&gt;</b></div> 
              <Link style={{color: 'red', display: 'inline-block', margin: "0 5px"}} onClick={() => onClickCommitSetSelection(commitId)}> {commitVersion} </Link>
            </div>
          );
        }
        
      } 
      if (testSetId) {
        const testSet = await testSetCommands.getParticularTestSet(testSetId);
        testSetName = testSet.name;
        if (props.reduxMode === false && props.topBar === false) {
          setPathContent(
            <div style={{fontSize:"16px"}}>
              <div style={{color: 'blue'}}>Branch:</div> <Link style={{color: 'red'}} to={`/${props.page}/branches/${branchId}`}> {branchName} </Link> 
              <div style={{color: 'black'}}><b>↓</b></div> 
              <div style={{color: 'blue'}}>Commit:</div> <Link style={{color: 'red'}} to={`/${props.page}/branches/${branchId}/commits/${commitId}`}> {commitVersion} </Link>
              <div style={{color: 'black'}}><b>↓</b></div> 
              <div style={{color: 'blue'}}>TestSet:</div> <Link style={{color: 'red'}} to={`/${props.page}/branches/${branchId}/commits/${commitId}/test-sets/${testSetId}`}> {testSetName} </Link>
            </div>
          );
        } else if (props.reduxMode === false && props.topBar === true) {
          setPathContent(
            <div>
              <Link style={{color: 'red', display: 'inline-block', margin: "0 5px"}} to={`/${props.page}/branches/${branchId}`}> {branchName} </Link> 
              <div style={{color: 'black', display: 'inline-block', margin: "0 5px"}}><b>&gt;</b></div> 
              <Link style={{color: 'red', display: 'inline-block', margin: "0 5px"}} to={`/${props.page}/branches/${branchId}/commits/${commitId}`}> {commitVersion} </Link>
              <div style={{color: 'black', display: 'inline-block', margin: "0 5px"}}><b>&gt;</b></div> 
              <Link style={{color: 'red', display: 'inline-block', margin: "0 5px"}} to={`/${props.page}/branches/${branchId}/commits/${commitId}/test-sets/${testSetId}`}> {testSetName} </Link>
            </div>
          );
        } else if (props.reduxMode === true && props.topBar === false) {
          setPathContent(
            <div style={{fontSize:"16px"}}>
              <div style={{color: 'blue'}}>Branch:</div> <Link style={{color: 'red'}} onClick={() => onClickBranchSelection(branchId, branchName)}> {branchName} </Link> 
              <div style={{color: 'black'}}><b>↓</b></div> 
              <div style={{color: 'blue'}}>Commit:</div> <Link style={{color: 'red'}} onClick={() => onClickCommitSetSelection(commitId)}> {commitVersion} </Link>
              <div style={{color: 'black'}}><b>↓</b></div> 
              <div style={{color: 'blue'}}>TestSet:</div> <Link style={{color: 'red'}} onClick={() => onClickTestSetSelection(testSetId)}> {testSetName} </Link>
            </div>
          );
        } else if (props.reduxMode === true && props.topBar === true) {
          setPathContent(
            <div>
              <Link style={{color: 'red', display: 'inline-block', margin: "0 5px"}} onClick={() => onClickBranchSelection(branchId, branchName)}> {branchName} </Link> 
              <div style={{color: 'black', display: 'inline-block', margin: "0 5px"}}><b>&gt;</b></div> 
              <Link style={{color: 'red', display: 'inline-block', margin: "0 5px"}} onClick={() => onClickCommitSetSelection(commitId)}> {commitVersion} </Link>
              <div style={{color: 'black', display: 'inline-block', margin: "0 5px"}}><b>&gt;</b></div> 
              <Link style={{color: 'red', display: 'inline-block', margin: "0 5px"}} onClick={() => onClickTestSetSelection(testSetId)}> {testSetName} </Link>
            </div>
          );
        }
        
      } 
      if (testId) {
        const test = await testCommands.getParticularTest(testId);
        testName = test.name;
        if (props.reduxMode === false && props.topBar === false) {
          setPathContent(
            <div style={{fontSize:"16px"}}>
              <div style={{color: 'blue'}}>Branch:</div> <Link style={{color: 'red'}} to={`/${props.page}/branches/${branchId}`}> {branchName} </Link> 
              <div style={{color: 'black'}}><b>↓</b></div> 
              <div style={{color: 'blue'}}>Commit:</div> <Link style={{color: 'red'}} to={`/${props.page}/branches/${branchId}/commits/${commitId}`}> {commitVersion} </Link>
              <div style={{color: 'black'}}><b>↓</b></div> 
              <div style={{color: 'blue'}}>TestSet:</div> <Link style={{color: 'red'}} to={`/${props.page}/branches/${branchId}/commits/${commitId}/test-sets/${testSetId}`}> {testSetName} </Link>
              <div style={{color: 'black'}}><b>↓</b></div> 
              <div style={{color: 'blue'}}>Test:</div> <Link style={{color: 'red', wordBreak: 'break-all'}} to={`/${props.page}/branches/${branchId}/commits/${commitId}/test-sets/${testSetId}/test/${testId}`}> {testName} </Link>
            </div>
          );
          } if (props.reduxMode === false && props.topBar === true) {
            setPathContent(
              <div>
                <Link style={{color: 'red', display: 'inline-block', margin: "0 5px"}} to={`/${props.page}/branches/${branchId}`}> {branchName} </Link> 
                <div style={{color: 'black', display: 'inline-block', margin: "0 5px"}}><b>&gt;</b></div> 
                <Link style={{color: 'red', display: 'inline-block', margin: "0 5px"}} to={`/${props.page}/branches/${branchId}/commits/${commitId}`}> {commitVersion} </Link>
                <div style={{color: 'black', display: 'inline-block', margin: "0 5px"}}><b>&gt;</b></div> 
                <Link style={{color: 'red', display: 'inline-block', margin: "0 5px"}} to={`/${props.page}/branches/${branchId}/commits/${commitId}/test-sets/${testSetId}`}> {testSetName} </Link>
                <div style={{color: 'black', display: 'inline-block', margin: "0 5px"}}><b>&gt;</b></div> 
                <Link style={{color: 'red', display: 'inline-block', margin: "0 5px"}} to={`/${props.page}/branches/${branchId}/commits/${commitId}/test-sets/${testSetId}/test/${testId}`}> {testName} </Link>
              </div>
            );
            }else if (props.reduxMode === true && props.topBar === false) {
            setPathContent(
              <div style={{fontSize:"16px"}}>
                <div style={{color: 'blue'}}>Branch:</div> <Link style={{color: 'red'}} onClick={() => onClickBranchSelection(branchId, branchName)}> {branchName} </Link> 
                <div style={{color: 'black'}}><b>↓</b></div> 
                <div style={{color: 'blue'}}>Commit:</div> <Link style={{color: 'red'}} onClick={() => onClickCommitSetSelection(commitId)}> {commitVersion} </Link>
                <div style={{color: 'black'}}><b>↓</b></div> 
                <div style={{color: 'blue'}}>TestSet:</div> <Link style={{color: 'red'}} onClick={() => onClickTestSetSelection(testSetId)}> {testSetName} </Link>
                <div style={{color: 'black'}}><b>↓</b></div> 
                <div style={{color: 'blue'}}>Test:</div> <Link style={{color: 'red', wordBreak: 'break-all'}} onClick={() => onClickTestSelection(testId)}> {testName} </Link>
              </div>
            );
          } else if (props.reduxMode === true && props.topBar === true) {
            setPathContent(
              <div>
                <Link style={{color: 'red', display: 'inline-block', margin: "0 5px"}} onClick={() => onClickBranchSelection(branchId, branchName)}> {branchName} </Link> 
                <div style={{color: 'black', display: 'inline-block', margin: "0 5px"}}><b>&gt;</b></div> 
                <Link style={{color: 'red', display: 'inline-block', margin: "0 5px"}} onClick={() => onClickCommitSetSelection(commitId)}> {commitVersion} </Link>
                <div style={{color: 'black', display: 'inline-block', margin: "0 5px"}}><b>&gt;</b></div> 
                <Link style={{color: 'red', display: 'inline-block', margin: "0 5px"}} onClick={() => onClickTestSetSelection(testSetId)}> {testSetName} </Link>
                <div style={{color: 'black', display: 'inline-block', margin: "0 5px"}}><b>&gt;</b></div> 
                <Link style={{color: 'red', display: 'inline-block', margin: "0 5px"}} onClick={() => onClickTestSelection(testId)}> {testName} </Link>
              </div>
            );
          }
        
      } 
      if (subtestId) {
        const subtest = await subtestCommands.getParticularSubtest(subtestId);
        subtestName = subtest.name;
        if (props.reduxMode === false && props.topBar === false) {
          setPathContent(
            <div style={{fontSize:"16px"}}>
              <div style={{color: 'blue'}}>Branch:</div> <Link style={{color: 'red'}} to={`/${props.page}/branches/${branchId}`}> {branchName} </Link> 
              <div style={{color: 'black'}}><b>↓</b></div> 
              <div style={{color: 'blue'}}>Commit:</div> <Link style={{color: 'red'}} to={`/${props.page}/branches/${branchId}/commits/${commitId}`}> {commitVersion} </Link>
              <div style={{color: 'black'}}><b>↓</b></div> 
              <div style={{color: 'blue'}}>TestSet:</div> <Link style={{color: 'red'}} to={`/${props.page}/branches/${branchId}/commits/${commitId}/test-sets/${testSetId}`}> {testSetName} </Link>
              <div style={{color: 'black'}}><b>↓</b></div> 
              <div style={{color: 'blue'}}>Test:</div> <Link style={{color: 'red', wordBreak: 'break-all'}} to={`/${props.page}/branches/${branchId}/commits/${commitId}/test-sets/${testSetId}/test/${testId}`}> {testName} </Link>
              <div style={{color: 'black'}}><b>↓</b></div> 
              <div style={{color: 'blue'}}>Subtest:</div> <Link style={{color: 'red'}} to={`/${props.page}/branches/${branchId}/commits/${commitId}/test-sets/${testSetId}/test/${testId}/subtest/${subtestId}`}> {subtestName} </Link>
            </div>
          );
        } else if (props.reduxMode === false && props.topBar === true) {
          setPathContent(
            <div>
              <Link style={{color: 'red', display: 'inline-block', margin: "0 5px"}} to={`/${props.page}/branches/${branchId}`}> {branchName} </Link> 
              <div style={{color: 'black', display: 'inline-block', margin: "0 5px"}}><b>&gt;</b></div> 
              <Link style={{color: 'red', display: 'inline-block', margin: "0 5px"}} to={`/${props.page}/branches/${branchId}/commits/${commitId}`}> {commitVersion} </Link>
              <div style={{color: 'black', display: 'inline-block', margin: "0 5px"}}><b>&gt;</b></div> 
              <Link style={{color: 'red', display: 'inline-block', margin: "0 5px"}} to={`/${props.page}/branches/${branchId}/commits/${commitId}/test-sets/${testSetId}`}> {testSetName} </Link>
              <div style={{color: 'black', display: 'inline-block', margin: "0 5px"}}><b>&gt;</b></div> 
              <Link style={{color: 'red', display: 'inline-block', margin: "0 5px"}} to={`/${props.page}/branches/${branchId}/commits/${commitId}/test-sets/${testSetId}/test/${testId}`}> {testName} </Link>
              <div style={{color: 'black', display: 'inline-block', margin: "0 5px"}}><b>&gt;</b></div> 
              <Link style={{color: 'red', display: 'inline-block', margin: "0 5px"}} to={`/${props.page}/branches/${branchId}/commits/${commitId}/test-sets/${testSetId}/test/${testId}/subtest/${subtestId}`}> {subtestName} </Link>
            </div>
          );
        } else if (props.reduxMode === true && props.topBar === false) {
          setPathContent(
            <div style={{fontSize:"16px"}}>
              <div style={{color: 'blue'}}>Branch:</div> <Link style={{color: 'red'}} onClick={() => onClickBranchSelection(branchId, branchName)}> {branchName} </Link> 
              <div style={{color: 'black'}}><b>↓</b></div> 
              <div style={{color: 'blue'}}>Commit:</div> <Link style={{color: 'red'}} onClick={() => onClickCommitSetSelection(commitId)}> {commitVersion} </Link>
              <div style={{color: 'black'}}><b>↓</b></div> 
              <div style={{color: 'blue'}}>TestSet:</div> <Link style={{color: 'red'}} onClick={() => onClickTestSetSelection(testSetId)}> {testSetName} </Link>
              <div style={{color: 'black'}}><b>↓</b></div> 
              <div style={{color: 'blue'}}>Test:</div> <Link style={{color: 'red', wordBreak: 'break-all'}} onClick={() => onClickTestSelection(testId)}> {testName} </Link>
              <div style={{color: 'black'}}><b>↓</b></div> 
              <div style={{color: 'blue'}}>Subtest:</div> <Link style={{color: 'red'}} onClick={() => onClickSubTestSelection(subtestId)}> {subtestName} </Link>
            </div>
          );
        } else if (props.reduxMode === true && props.topBar === true) {
          setPathContent(
            <div>
              <Link style={{color: 'red', display: 'inline-block', margin: "0 5px"}} onClick={() => onClickBranchSelection(branchId, branchName)}> {branchName} </Link> 
              <div style={{color: 'black', display: 'inline-block', margin: "0 5px"}}><b>&gt;</b></div> 
              <Link style={{color: 'red', display: 'inline-block', margin: "0 5px"}} onClick={() => onClickCommitSetSelection(commitId)}> {commitVersion} </Link>
              <div style={{color: 'black', display: 'inline-block', margin: "0 5px"}}><b>&gt;</b></div> 
              <Link style={{color: 'red', display: 'inline-block', margin: "0 5px"}} onClick={() => onClickTestSetSelection(testSetId)}> {testSetName} </Link>
              <div style={{color: 'black', display: 'inline-block', margin: "0 5px"}}><b>&gt;</b></div> 
              <Link style={{color: 'red', display: 'inline-block', margin: "0 5px"}} onClick={() => onClickTestSelection(testId)}> {testName} </Link>
              <div style={{color: 'black', display: 'inline-block', margin: "0 5px"}}><b>&gt;</b></div> 
              <Link style={{color: 'red', display: 'inline-block', margin: "0 5px"}} onClick={() => onClickSubTestSelection(subtestId)}> {subtestName} </Link>
            </div>
          );
        }
        
      }
    };

    checkPath();
  }, [branchId, commitId, testSetId, testId, subtestId]);

  return <div style={{fontSize: '18px'}}>{pathContent}</div>;
}

export default InteractivePath;