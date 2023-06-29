import { Container, Nav, Tab } from "react-bootstrap";
import './heatmapPage.css';
import { useParams } from "react-router-dom";
import HeatmapCommitsTable from "./HeatmapCommitsTable";
import HeatmapBranchesSelector from "./HeatmapBranchesSelector";
import { useState, useEffect } from "react";
import HeatMapTestSetsTable from "./HeatMapTestSetsTable";
import HeatMapTestTable from "./HeatMapTestTable";
import HeatmapSubtestsTable from "./HeatmapSubtestsTable";
import HeatMapTestStepsTable from "./HeatmapTestStepsTable";
import InteractivePath from "./InteractivePath";

function HeatmapPage() {
    const { branchId, commitId, testSetId, testId, subtestId } = useParams();
    const [selectedBranchName, setSelectedBranchName] = useState("");

    // Stuff for the Tab Control on the right hand side of the page
    const [activeKey, setActiveKey] = useState('component1');
    const handleTabSelect = (key) => {
        setActiveKey(key);
      };
    const activeLinkStyle = {
        backgroundColor: 'red',
        color: 'white'
      };

    useEffect(() => {
      }, [branchId, commitId, testSetId, testId, subtestId]);

    const handleView = () => {
        if (branchId == null && commitId == null && testSetId == null && testId == null && subtestId == null) {
            return(
                <div>
                    <h4>Welcome to the Heatmap Page!</h4>
                    <div>This page helps you visualize which tests failed and why.</div>
                    <div><b>Select a branch to start!</b></div>
                </div>
            )
        } else if (branchId != null && commitId == null && testSetId == null && testId == null && subtestId == null) {
            return(
                <HeatmapCommitsTable key={branchId} />
            )
        } else if (branchId != null && commitId != null && testSetId == null && testId == null && subtestId == null) {
            return(
                <div className="hm-testsets">
                    <HeatMapTestSetsTable key={`commit${commitId}`} />
                </div>
            )
        } else if (branchId != null && commitId != null && testSetId != null && testId == null && subtestId == null) {
            return(
                <div className="hm-tests">
                    <HeatMapTestTable key={`testset${testSetId}`} />
                </div>
            )
        } else if (branchId != null && commitId != null && testSetId != null && testId != null && subtestId == null) {
            return(
                <div className="hm-subtests">
                    <HeatmapSubtestsTable key={`test${testId}`} />
                </div>
            )
        } else if (branchId != null && commitId != null && testSetId != null && testId != null && subtestId != null) {
            return(
                <div className="hm-teststeps">
                    <HeatMapTestStepsTable key={`subtest${subtestId}`} />
                </div>
            )
        } 
    }
    
    return (
        <Container>
        <br/>
        <div class="row" style={{backgroundColor: '#ffeceb', marginTop: '2px', marginBottom: '2px'}}>
            <div class="col-12" style={{display: 'inline-flex'}}>
                <div style={{color: "red", fontSize: '20px'}}><b>Viewing Path:</b></div> <InteractivePath reduxMode={false} topBar={true} page={"heatmap"} branchId={branchId} commitId={commitId} testSetId={testSetId} testId={testId} subtestId={subtestId}/>
            </div>
        </div>
        <br></br>
        <div class="row">
            <div class="col-2">
                <HeatmapBranchesSelector branchId={branchId} setSelectedBranchName={setSelectedBranchName}/>
            </div>
            <div class="col-8">
                <div className="heatmap-table">
                    {handleView()}
                </div>
                {/*
                <div className="heatmap-table">
                    <HeatmapCommitsTable key={branchId} selectedBranchName={selectedBranchName} branchId={branchId} commitId={commitId} testSetId={testSetId} testId={testId} subtestId={subtestId}/> 
                </div>
                */}
            </div>
            <div class="col-2" style={{backgroundColor: '#ffeceb', marginTop: '2px', marginBottom: '2px'}}>
                <Tab.Container activeKey={activeKey} onSelect={handleTabSelect}>
                    <Nav variant="tabs">
                        <Nav.Item>
                            <Nav.Link eventKey="component1" style={activeKey === 'component1' ? activeLinkStyle : {color:"red"}}>Status Key</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="component2" style={activeKey === 'component2' ? activeLinkStyle : {color: "red"}}>Path</Nav.Link>
                        </Nav.Item>
                    </Nav>

                    <Tab.Content>
                        <Tab.Pane eventKey="component1">
                            <br></br>
                            <div className="heatmap-colors-legend">
                                <div><b>Status Code Colors:</b></div>
                                <div className='box pass'>Passed</div>
                                <div className='box fail'>Failed</div>
                                <div className='box toolDied'>Tool died</div>
                                <div className='box aborted'>Aborted job</div>
                                <div className='box noRes'>No results</div>
                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="component2">
                            <br></br>
                            <InteractivePath reduxMode={false} topBar={false} page={"heatmap"} branchId={branchId} commitId={commitId} testSetId={testSetId} testId={testId} subtestId={subtestId}/>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </div>
        </div>
        
    </Container>
    );
}
export default HeatmapPage;