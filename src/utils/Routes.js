const ROUTES = {
    HOME: '/',
    REPORT_LIBRARY: '/ReportLibrary',
    SUBTESTS: '/ReportLibrary/branches/:branchId/test-sets/:testSetId/tests/:testId/subtests',
    TESTS: '/ReportLibrary/branches/:branchId/test-sets/:testSetId/tests',
    TEST_SETS: '/ReportLibrary/branches/:branchId/test-sets',
    BRANCHES: '/ReportLibrary/branches',
    LOGIN: '/login',
    LOGOUT: '/logout',
    COMMITS: '/ReportLibrary/branches/:branchId/:commitId',
    HEATMAP: '/heatmap',
    HEATMAP_BRANCH: '/heatmap/branches/:branchId',
    HEATMAP_COMMIT: '/heatmap/branches/:branchId/commits/:commitId',
    HEATMAP_TESTSET: '/heatmap/branches/:branchId/commits/:commitId/test-sets/:testSetId',
    HEATMAP_TEST: '/heatmap/branches/:branchId/commits/:commitId/test-sets/:testSetId/test/:testId',
    HEATMAP_SUBTEST: '/heatmap/branches/:branchId/commits/:commitId/test-sets/:testSetId/test/:testId/subtest/:subtestId',
    DASHBOARD: '/dashboard', 
    DASHBOARD_BRANCH: '/dashboard/branches/:branchId',
    DASHBOARD_COMMIT: '/dashboard/branches/:branchId/commits/:commitId',
    DASHBOARD_TESTSET: '/dashboard/branches/:branchId/commits/:commitId/test-sets/:testSetId',
    DASHBOARD_TEST: '/dashboard/branches/:branchId/commits/:commitId/test-sets/:testSetId/test/:testId',
    DASHBOARD_SUBTEST: '/dashboard/branches/:branchId/commits/:commitId/test-sets/:testSetId/test/:testId/subtest/:subtestId',
    ERROR_HISTORY: 'error-history',
    PROFILE: '/profile',
};

const RouteParams = {
    SUBTESTS: (branchId, testSetId, testId) => {
        return ROUTES.SUBTESTS.replace(':branchId', branchId)
            .replace(':testSetId', testSetId)
            .replace(':testId', testId);
    },
    TESTS: (branchId, testSetId) => {
        return ROUTES.TESTS.replace(':branchId', branchId)
            .replace(':testSetId', testSetId);
    },
    TEST_SETS: (branchId) => {
        return ROUTES.TEST_SETS.replace(':branchId', branchId);
    }
};
export default ROUTES;