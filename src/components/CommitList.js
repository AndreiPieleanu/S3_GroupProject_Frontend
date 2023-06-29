import Container from "react-bootstrap/Container";
import Table from 'react-bootstrap/Table';
import "./linksStyle.css";
import {connect, useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchBranchData} from "../redux/actionsAPI/fetchBranchData";
import {setCommitId, setCommitName, setCurrentView} from "../redux/actions";
import {Link} from "react-router-dom";
import ViewTypes from "../utils/ViewTypes";
import AutoRefresh from "./AutoRefresh";
import {fetchCommitsResult} from "../redux/actionsAPI/fetchByResult/fetchCommitsByResult";
import {fetchCommitsByVersion} from "../redux/actionsAPI/fetchByError/fetchCommitsByVersion";
import {fetchCommitsByErrorType} from "../redux/actionsAPI/fetchByError/fetchCommitsByErrorType";
import { commitCommands } from "../redux/actionsAPI/apis/commitApi";
import { useState } from "react";

function CommitList({branchData, fetchBranchData,fetchCommitsResult,fetchCommitsByVersion,fetchCommitsByErrorType}) {
    const branchName = useSelector((state) => state.branchName)
    const branchIdState = useSelector((state) => state.branchId);
    const filterCode = useSelector((state) => state.filterCommitCode)
    const commitFilterState = useSelector((state) => state.commitsResult)
    const commitsByVersion= useSelector((state)=>state.commitsByVersion)
    const isFilteredVersion = useSelector((state)=>state.selectedCommitVersion)
    const errorFilterCode = useSelector((state)=>state.errorTerm)
    const errorFilteredData = useSelector((state)=>state.commitsError)
    const [count, setCount] = useState(null);

    console.log(errorFilterCode)
    const dispatch = useDispatch();
    let searchTerms;
    useEffect(() => {
        if (branchIdState) {
            fetchBranchData(branchIdState.branchId);
        }
        else if (filterCode) {
            fetchCommitsResult(filterCode.filterCommitCode, branchIdState.branchId)
        }
        else if(isFilteredVersion){
            fetchCommitsByVersion(branchIdState.branchId,searchTerms)
        }
        else if(errorFilterCode.errorTerm){
            fetchCommitsByErrorType(branchIdState.branchId,errorFilterCode)
        }

        fetchCount();
    }, [branchIdState, filterCode,isFilteredVersion,errorFilterCode]);

    useEffect(() => {
        fetchCount();
    }, []);


    const fetchCount = async () => {
        console.log("brancIdState", branchIdState.branchId);
         await commitCommands.getTestSetsNumberOfCommitsInBranchWithId(branchIdState.branchId)
           .then(response => setCount(response));
    }

    function onClickTestSetSelection(id,name) {
        dispatch(setCommitId(id))
        dispatch(setCommitName(name))
        dispatch(setCurrentView(ViewTypes.TEST_SET))
    }
    console.log(errorFilterCode,filterCode,isFilteredVersion)
    if (filterCode.filterCommitCode) {
        branchData = commitFilterState
    }
    else if(isFilteredVersion.commitVersion){
        branchData = commitsByVersion
    }
    else if(errorFilterCode.errorTerm){
        branchData = errorFilteredData
    }
    let commitItems = null;
    if (branchData && branchData.branchData && branchData.isLoading == false && branchData.branchData.commits)
        commitItems = Object.keys(branchData.branchData.commits).map((commitId) => {
                const commit = branchData.branchData.commits[commitId];
                const dateString = commit.versionDate
                const dateOnly = dateString.substr(0, 10);
                return <tr>
                    <td>{commit.version}</td>
                    <td>{dateOnly}</td>
                    <td><Link className="tableLinks" onClick={() => onClickTestSetSelection(commitId,commit.name)}>{commit.name}</Link>
                    </td>
                    <td>{count ? <span>{count[commitId]}</span> : null}</td>
                </tr>;
            }
        )


    return (
        <Container>
            <h3>Branch <b>{branchName.branchName}</b>:</h3>
            {branchData ?
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Version</th>
                        <th>Build Date</th>
                        <th>Commit Name</th>
                        <th>Number of TestSets</th>
                    </tr>
                    </thead>
                    <tbody>
                    <AutoRefresh  refreshInterval={5000} fetchAction={()=>fetchBranchData(branchIdState.branchId)}>
                        {commitItems}
                    </AutoRefresh>
                    </tbody>
                </Table>
                :
                <div>Loading test sets...</div>
            }
        </Container>
    )
        ;
}

const mapStateToProps = state => {
    return {
        branchData: state.branchData

    };
};
const mapDispatchToProps = dispatch => ({
    fetchBranchData: branchIdState => dispatch(fetchBranchData(branchIdState)),
    fetchCommitsResult:(code,branchId)=>dispatch(fetchCommitsResult(code,branchId)),
    fetchCommitsByVersion:(branchId,code)=>dispatch(fetchCommitsByVersion(branchId,code)),
    fetchCommitsByErrorType:(branchId,code)=>dispatch(fetchCommitsByErrorType(branchId,code)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CommitList);