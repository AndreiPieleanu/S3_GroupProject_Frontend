import React, {useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from "./pages/HomePage";
import ReportLibraryPage from "./pages/ReportLibraryPage";
import ROUTES from "./utils/Routes";
import EndPoints from "./utils/EndPoints";
import NavigationBar from "./components/NavigationBar";
import {useDispatch, useSelector} from "react-redux";
import {fetchBranchData} from "./redux/actionsAPI/fetchBranchData";
import {fetchBranches} from "./redux/actionsAPI/fetchBranches";
import LoginPage from "./pages/LoginPage";
import Logout from "./components/Logout";
import HeatmapPage from "./components/heatmap/HeatmapPage";
import DashboardPage from "./components/cidashboard/DashboardPage";
import ErrorHistoryPage from "./pages/ErrorHistoryPage"; 
import ProfilePage from "./components/profile/ProfilePage";

function App() {
    const branchId = useSelector(state => state.branchId);
    const testSetId = useSelector(state => state.testSetId);
    const testId = useSelector(state => state.testId);

    document.title = 'CPP Testing';
    //TODO GARBAGE EndPoints!!!!!!!!! SUPPOSED TO BE ALL PUBLIC BRANCHES + PRIVATE BRANCHES OF LOGGED USER.
    return (

        <BrowserRouter>
            <NavigationBar/>
            <Routes>
                <Route path={ROUTES.HOME} element={<ReportLibraryPage/>}/>
                <Route path={ROUTES.REPORT_LIBRARY} element={<ReportLibraryPage/>}/>
                <Route path={ROUTES.BRANCHES} element={<ReportLibraryPage/>}/>
                <Route path={ROUTES.COMMITS} element={<ReportLibraryPage/>}/>
                <Route path={ROUTES.TEST_SETS.replace(':branchId', branchId)}
                       element={<ReportLibraryPage/>}/>
                <Route path={ROUTES.TESTS.replace(':branchId', branchId).replace(':testSetId', testSetId)}
                       element={<ReportLibraryPage/>}/>
                <Route
                    path={ROUTES.SUBTESTS.replace(':branchId', branchId).replace(':testSetId', testSetId).replace(':testId', testId)}
                    element={<ReportLibraryPage/>}/>
                <Route path={ROUTES.LOGIN} element={<LoginPage/>}/>
                <Route path={ROUTES.LOGOUT} element={<Logout/>}/>
                <Route path={ROUTES.HEATMAP} element={<HeatmapPage/>}/>
                <Route path={ROUTES.HEATMAP_BRANCH} element={<HeatmapPage/>}/>
                <Route path={ROUTES.HEATMAP_COMMIT} element={<HeatmapPage/>}/>
                <Route path={ROUTES.HEATMAP_TESTSET} element={<HeatmapPage/>}/>
                <Route path={ROUTES.HEATMAP_TEST} element={<HeatmapPage/>}/>
                <Route path={ROUTES.HEATMAP_SUBTEST} element={<HeatmapPage/>}/>

                <Route path={ROUTES.DASHBOARD} element={<DashboardPage/>}/>
                <Route path={ROUTES.DASHBOARD_BRANCH} element={<DashboardPage/>}/>
                <Route path={ROUTES.DASHBOARD_COMMIT} element={<DashboardPage/>}/>
                <Route path={ROUTES.DASHBOARD_TESTSET} element={<DashboardPage/>}/>
                <Route path={ROUTES.DASHBOARD_TEST} element={<DashboardPage/>}/>
                <Route path={ROUTES.DASHBOARD_SUBTEST} element={<DashboardPage/>}/>
                <Route path={ROUTES.ERROR_HISTORY} element={<ErrorHistoryPage />}/>

                <Route path={ROUTES.PROFILE} element={<ProfilePage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

