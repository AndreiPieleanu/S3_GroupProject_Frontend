import {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Col, Container} from "react-bootstrap";
import {login} from "../redux/actionsAPI/login";
import {fetchCommitData} from "../redux/actionsAPI/fetchCommitData";

function Login({login}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const saveEmail = (event) => {
        setEmail(event.target.value);
    };
    let runLogin;
    const savePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = () => {
        runLogin = true
        login({email, password});

    };

    return (
        <Container>
            <Col
                className="d-flex justify-content-left border"
                style={{display: "inline-block", width: "fit-content"}}
            >
                <div className="login-parent">
                    <div className="login-welcome">
                        <h1 className="form-title">Welcome to CPP</h1>
                    </div>
                    <div className="login-tbx-username">
                        <input type="email" placeholder="Enter e-mail" onChange={saveEmail}/>
                    </div>
                    <div className="login-tbx-password">
                        <input type="password" placeholder="Enter password" onChange={savePassword}/>
                    </div>
                    <div className="login-login">
                        <button onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </Col>
        </Container>
    );
}

const mapDispatchToProps = dispatch => ({
    login: (email, password) => dispatch(login(email,password)),
});
export default connect(null, mapDispatchToProps)(Login);
