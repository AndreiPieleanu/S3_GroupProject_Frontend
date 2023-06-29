import {useEffect, useRef} from "react";
import "./ReportLibraryStatistics.css";
import Container from "react-bootstrap/Container";

function ReportLibraryStatistics(props) {

    //TODO decouple chart code in another component & hook
    const pieChartRef = useRef(null);
    const results = [];
    //handle branch change
    if (props !== null) {
        //results.push(BranchesTestResult(props));

    } else {
        //results.push(BranchesTestResult());


    }

    useEffect(() => {/*
        const pieChart = new Chart(pieChartRef.current, {
            type: 'pie',
            data: {
                labels: ['Pass', 'Fail', 'Other'],
                datasets: [
                    {
                        label: 'Test Results',
                        data: [0, 0, 0],
                        backgroundColor: ['green', 'red', 'blue'],
                    },
                ],
            },
        });
        console.log(JSON.stringify(results));

        /*const data = results[0][0].map((result) => result.passedTests + result.failedTests + result.otherTests);
        pieChart.data.datasets[0].data = data;
        pieChart.update();
        return () => {
            pieChart.destroy();
        };
    */
    }, []);


    return (
        <Container style={{display: "flex", flexDirection: "row"}}>
            <div style={{width: "150px", height: "150px", marginRight: "10px"}}>
                <canvas ref={pieChartRef}/>
            </div>

            <div style={{marginRight: "10px"}}>pass fail etc</div>

            <div style={{width: "500px", height: "150px"}}></div>
        </Container>

    );
}


export default ReportLibraryStatistics;