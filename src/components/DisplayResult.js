import Container from "react-bootstrap/Container";

function DisplayResult(props) {

    function process(){
        if (props.result == true)
        {
            return "Passed";
        }
        else {
            return "Failed";
        }
    }

    const objectStyle = {
        color: "Red"
    }

    const objectStyleValid = {
        color: "Green"
    }

    const isValid = !props.result;

    return (
        <Container>
            <div style={isValid ? objectStyle : objectStyleValid}>
                {process()}
            </div>
        </Container>
        

    );
}

export default DisplayResult;