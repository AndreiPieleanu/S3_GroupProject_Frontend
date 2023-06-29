import React, {useEffect, useState} from "react";
import BranchSelector from "../components/BranchSelector";
import Path from "../components/Path";
import Container from "react-bootstrap/Container";
import {connect, useSelector} from "react-redux";
import {fetchBranches} from "../redux/actionsAPI/fetchBranches";
import TestSetsList from "../components/TestSetsList";
import ViewTypes from "../utils/ViewTypes";
import TestsList from "../components/TestsList";
import SubTestsList from "../components/SubTestsList";
import TestSteps from "../components/TestStepsList";
import ReportLibraryStatistics from "../components/ReportLibraryStatistics";
import FilterBar from "../components/FilterBar";
import CommitList from "../components/CommitList";
import TokenManager from "../redux/AuthAPIs/TokenManager";
import InteractivePath from "../components/heatmap/InteractivePath";
import { Tab, Nav } from "react-bootstrap"
import SearchBar from "../components/SearchBar";
import NewFilterBar from "../components/NewFilterBar";


function ReportLibraryPage({branches, currentView, fetchBranches, fetchBranchData}) {
    const branchState = useSelector(state => state.branches)
    const currentViewState = useSelector(state => state.currentView)
    const branchId = useSelector(state => state.branchId)
    console.log(branchId.branchId)
    const [view, setView] = useState(null);
    useEffect(() => {
        handleViewTypeChange()
    }, [currentView]);
    useEffect(() => {
        fetchBranches();
    }, []);


    // Stuff for the Tab Control on the right hand side of the page
    const [activeKey, setActiveKey] = useState('component1');
    const handleTabSelect = (key) => {
        setActiveKey(key);
      };
    const activeLinkStyle = {
        backgroundColor: 'red',
        color: 'white'
      };

    function handleViewTypeChange() {
        if (currentView.currentView === ViewTypes.BRANCHES) {
            setView(
                <div>
                    <br></br>
                    <div>Select a branch to see its commits</div>
                </div>)
        } else if (currentView.currentView === ViewTypes.TEST_SET) {
            setView(
                <div>
                    <TestSetsList/>
                </div>)
        } else if (currentView.currentView === ViewTypes.TEST) {
            setView(
                <div>
                    <TestsList/>
                </div>)
        } else if (currentView.currentView === ViewTypes.SUBTEST) {
            setView(
                <div>
                    <SubTestsList/>
                </div>)
        } else if (currentView.currentView === ViewTypes.TEST_STEP) {
            setView(
                <div>
                    {<TestSteps/>}
                </div>)
        } else if (currentView.currentView === ViewTypes.COMMITS) {
            setView(
                <div>
                    {
                        <CommitList/>}
                </div>)
        } else {
            setView(null);
        }
    }

    return (
        <Container>
            <br/>
            <div class="row" style={{backgroundColor: '#ffeceb', marginTop: '2px', marginBottom: '2px'}}>
                <div class="col-12" style={{display: 'inline-flex'}}>
                    <div style={{color: "red", fontSize: '20px'}}><b>Viewing Path:</b> </div><InteractivePath reduxMode={true} topBar={true}/>
                    {/* <Path selectedBranch={branches.valueOf()}/> */}
                </div>
            </div>
            <br></br>
            <div class="row">
                <div class="col-2">
                    {/*   <AutoRefresh refreshInterval={5000} fetchAction={()=>fetchBranches()}>
                        <BranchSelector/></AutoRefresh>*/}
                    <BranchSelector/>
                </div>
                <div class="col-8">
                    {view}
                </div>

                <div className="col-2" style={{backgroundColor: '#ffeceb', marginTop: '2px', marginBottom: '2px'}}>
                    <Tab.Container activeKey={activeKey} onSelect={handleTabSelect}>
                        <br></br>

                        <Nav variant="tabs">

                            <Nav.Item>
                                <Nav.Link eventKey="component1" style={activeKey === 'component1' ? activeLinkStyle : {color:"red"}}>Filter By</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="component2" style={activeKey === 'component2' ? activeLinkStyle : {color: "red"}}>Path</Nav.Link>
                            </Nav.Item>
                        </Nav>

                        <Tab.Content>
                            <Tab.Pane eventKey="component1">
                                <br></br>
                                <SearchBar/>
                                <NewFilterBar/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="component2">
                                <br></br>
                                <InteractivePath reduxMode={true} topBar={false} />
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>

                    {/* <div style={{color: "red"}}><b>Interactive Viewing Path:</b> </div> <br></br><InteractivePath reduxMode={true} topBar={false}/> */}
                </div>
            </div>
        </Container>
    );
}

const mapStateToProps = state => {
    return {
        branches: state.branches,
        currentView: state.currentView,
    };
};
const mapDispatchToProps = dispatch => ({
    fetchBranches: (refresh) => dispatch(fetchBranches(refresh)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportLibraryPage);