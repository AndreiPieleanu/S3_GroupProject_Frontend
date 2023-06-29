import {Badge, Col, ListGroup, Popover, OverlayTrigger} from "react-bootstrap";
import { branchCommands } from "../redux/actionsAPI/apis/branchApi";
import "./linksStyle.css";
import TokenManager from "../redux/AuthAPIs/TokenManager";
import {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import {connect, useDispatch, useSelector} from "react-redux";
import {
    setBranchId,
    setBranchName,
    setCurrentView,
    setCommitId,
    setTestSetId,
    setTestId,
    setSubTestId,
    setTestStepFilterCode,
    setSubtestFilterCode,
    setTestFilterCode,
    setTestSetFilterCode,
    setCommitFilterCode,
    setErrorTerm
} from "../redux/actions";
import ViewTypes from "../utils/ViewTypes";
import {Link} from "react-router-dom";

function BranchSelector({branches}) {
    const [branchResults, setBranchResults] = useState(null);
    const token = TokenManager.getAccessToken();
    const dispatch = useDispatch();
    const data = useSelector(state => state.branches);
    const branchResultCount = useSelector(state => state.branchResultCountData);

    useEffect(() => {
        if (token) {
            branchCommands.getLastVersionOfBranchWithIdAuthed().then(response => setBranchResults(response)).catch(error => console.log(error));
        }
        else {
            branchCommands.getLastVersionOfBranchWithId().then(response => setBranchResults(response)).catch(error => console.log(error));
        }
    }, []);

    if (branches.branches.isLoading === false) {
        return <div>...Loading..</div>
    }

    const popover = (
        <Popover id="popover-content">
          <Popover.Body>This is last version of this branch.</Popover.Body>
        </Popover>
      );


    function onClickBranchSelection(id, name) {
        dispatch(setBranchId(id))
        dispatch(setBranchName(name))
        dispatch(setTestStepFilterCode(null))
        dispatch(setSubTestId(null))
        dispatch(setSubtestFilterCode(null))
        dispatch(setTestId(null))
        dispatch(setTestFilterCode(null))
        dispatch(setTestSetId(null))
        dispatch(setTestSetFilterCode(null))
        dispatch(setCommitId(null))
        dispatch(setCommitFilterCode(null))
        dispatch(setErrorTerm(null))
        dispatch(setCurrentView(ViewTypes.COMMITS))
    }
    let branchSelectorItems = null;
    if (data.branches && data.branches.publicBranches) {
        branchSelectorItems = Object.keys(data.branches.publicBranches).map((branchId) => {
            const branch = data.branches.publicBranches[branchId];
            //TODO what the fuck is this? I dont remember
            //const resultCountData = branchResultCount[branchId] || {};
            //const {passCount = 0, failCount = 0} = resultCountData;
            let passCount = 0;
            let failCount=0;
            return (
                <>
                        <li key={branch.id}
                            className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">
                                    <Link className="tableLinks" onClick={() => onClickBranchSelection(branch.id, branch.name)}>
                                        {branch.name}
                                    </Link>
                                </div>
                                {branchResults?.[branch.id] ? (
                                        <OverlayTrigger trigger="hover" placement="bottom" overlay={popover}>
                                            <Badge bg="secondary">{branchResults?.[branch.id]}</Badge>
                                        </OverlayTrigger>
                                    ) : (<Badge bg="secondary">No vers.</Badge>)
                                }
                            </div>
                        </li>
                </>
            );
        });
    } else if (data.branches && data.branches.userBranches) {
        branchSelectorItems = Object.keys(data.branches.userBranches).map((branchId) => {
            const branch = data.branches.userBranches[branchId];

            return (
                <>
                
                    <li
                        className="list-group-item d-flex justify-content-between align-items-start" id="listofb" key={branch.id}>
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">
                                <Link className="tableLinks" onClick={() => onClickBranchSelection(branch.id, branch.name)}>
                                    {branch.name}
                                </Link>
                            </div>
                            {branchResults?.[branch.id] ? (
                                    <OverlayTrigger trigger="hover" placement="bottom" overlay={popover}>
                                        <Badge bg="secondary">{branchResults?.[branch.id]}</Badge>
                                    </OverlayTrigger>
                                ) : (<Badge bg="secondary">No vers.</Badge>)
                            }
                            <Badge bg="secondary" style={{marginLeft: '3px'}}>
                                {branch.user ? <div>🔒</div> : null}
                                {/* Passed: {passCount}{"\n"}Failed: {failCount} */}
                            </Badge>
                        </div>
                    </li>
                
                </>
            );
        });
    }

    return (
        <Container>
            <h3>Branches:</h3>
                <ul className="list-group mt-3">
                    {branchSelectorItems}
                </ul>
        </Container>
    );
}

export default connect(state => ({
    branches: state.branches,
    branchResultCountData: state.branchResultCountData,
    fetchBranchResultCountData: state.fetchBranchResultCountData
}))(BranchSelector);
