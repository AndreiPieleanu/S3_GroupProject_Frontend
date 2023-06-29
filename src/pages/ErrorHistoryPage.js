import React from "react"
import SmallPiechart from "../components/cidashboard/SmallPiechart";
import { Link } from "react-router-dom";
import UserAPI from "../redux/AuthAPIs/UserAPI";
import { useState, useEffect } from "react";
import TokenManager from "../redux/AuthAPIs/TokenManager";
import { Container, Row, Col, Table } from "react-bootstrap";
import { TestResultColors } from "../utils/colorConstants";
import { branchCommands } from "../redux/actionsAPI/apis/branchApi";

function ErrorHistoryPage() {

    // Comment
    const [commitErrorList, setCommitErrorList] = useState(null);
    const [pieChartData, setPiechartData] = useState([]);

    useEffect(() => {
        getcommitErrorList();
      }, []);

    // Function to get user object from backend that can be used in every page
    const getcommitErrorList = async () => {
        if (TokenManager.getAccessToken()) {
            branchCommands.getCommitErrorsAuthed()
                .then(commitList => setCommitErrorList(commitList))
                .catch(error => console.error(error));

            let totalNumberOfPassedCommits;
            let totalNumberOfCommits;

            await branchCommands.getStatsAuthed().then(response => {totalNumberOfCommits = response.total; totalNumberOfPassedCommits = response.passed})
            

            const data = 
            [
                { title: 'Passed', value: totalNumberOfPassedCommits, color: TestResultColors[1], labelColor: '#FFFFFF', additionalInfo: 'Total of Passing Commits'},
                { title: 'Failed', value: totalNumberOfCommits - totalNumberOfPassedCommits, color: TestResultColors[2], labelColor: '#FFFFFF', additionalInfo: 'Total of Failing Commits'}
            ];
            setPiechartData(data);

        } else {
            branchCommands.getCommitErrors()
                .then(commitList => setCommitErrorList(commitList))
                .catch(error => console.error(error));

            let totalNumberOfPassedCommits;
            let totalNumberOfCommits;

            await branchCommands.getStats().then(response => {totalNumberOfCommits = response.total; totalNumberOfPassedCommits = response.passed})
            

            const data = 
            [
                { title: 'Passed', value: totalNumberOfPassedCommits, color: TestResultColors[1], labelColor: '#FFFFFF', additionalInfo: 'Total of Passing Commits'},
                { title: 'Failed', value: totalNumberOfCommits - totalNumberOfPassedCommits, color: TestResultColors[2], labelColor: '#FFFFFF', additionalInfo: 'Total of Failing Commits'}
            ];
            setPiechartData(data);
        }
    }

    

    if (commitErrorList != null) {
        return (
            <Container>
                <br></br>
                <div class="row">
                    <div class="col-8">
                        <h3>Branches with last commit that fails:</h3>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Branch</th>
                                    <th>Last Version</th>
                                    <th>Failed Since Version</th>
                                    <th>Commit Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Object.values(commitErrorList).map(item => {
                                        return (
                                            <tr>
                                                <td><Link className="tableLinks" to={`/heatmap/branches/${item.branch.id}`}>{item.branch.name}</Link></td>
                                                <td><Link className="tableLinks" to={`/heatmap/branches/${item.branch.id}/commits/${item.lastCommit.id}`}>{item.lastCommit.version}</Link></td>
                                                <td><Link className="tableLinks" to={`/heatmap/branches/${item.branch.id}/commits/${item.errorStartCommit.id}`}>{item.errorStartCommit.version}</Link></td>
                                                <td>{item.lastCommit.name}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </div>
                    <div class="col-4" style={{textAlign:'right'}}>
                        <h3>Passing vs Failing Commits:</h3>
                        <br></br>
                        <div style={{ float: 'right' , justifyContent: 'flex-end', width:'100%'}} >
                            <SmallPiechart dataToDisplay={pieChartData} />
                        </div>
                        
                    </div>
                </div>
                
            </Container>
            
        )
    }



    return (
        <div>Loading...</div>
    )
}
export default ErrorHistoryPage;