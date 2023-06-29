import { Container } from "react-bootstrap";
import DashboardBranchSelector from "./DashboardBranchSelector";
import { useParams } from "react-router-dom";
import DashboardCommitsTable from "./DashboardCommitsTable";
import InteractivePath from "../heatmap/InteractivePath";

export default function DashboardPage() {
    const { branchId, commitId, testSetId, testId, subtestId } = useParams();

    const checkPath = () => {
        var path = "";
        if(branchId){
            path += `Branch: ${branchId}`;
        }
        if(commitId){
            path += ` > Commit: ${commitId}`;
        }
        if(testSetId){
            path += ` > Test Set: ${testSetId}`;
        }
        if(testId){
            path += ` > Test ${testId}`;
        }
        if(subtestId){
            path += ` > Subtest ${subtestId}`;
        }
        return path;
    }
    
    return (
        <Container>
        <br/>
        <div class="row" style={{backgroundColor: '#ffeceb', marginTop: '2px', marginBottom: '2px'}}>
        <div class="col-12" style={{display: 'inline-flex'}}>
                <div style={{color: "red", fontSize: '20px'}}><b>Viewing Path:</b></div> <InteractivePath reduxMode={false} topBar={true} page={"dashboard"} branchId={branchId} commitId={commitId} testSetId={testSetId} testId={testId} subtestId={subtestId}/>
            </div>
        </div>
        <br></br>
        <div class="row">
            <div class="col-2">
                <h3>Branches:</h3>
                <DashboardBranchSelector branchId={branchId}/>
            </div>
            <div class="col-8">
                <div className="dashboard-table">
                    <DashboardCommitsTable key={branchId} branchId={branchId} commitId={commitId} testSetId={testSetId}/>
                </div>
            </div>
        </div>
        
    </Container>
    );
}