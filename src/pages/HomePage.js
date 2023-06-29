import React from "react"
import UserAPI from "../redux/AuthAPIs/UserAPI";
import { useState, useEffect } from "react"
import TokenManager from "../redux/AuthAPIs/TokenManager";
import { Container, Row, Col } from "react-bootstrap";

function HomePage() {

    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        getUserDetails();
      }, []);

    // Function to get user object from backend that can be used in every page
    const getUserDetails = () => {
        const claims = TokenManager.getClaims();

        if (claims?.userId) {
            UserAPI.getUser(claims.userId)
            .then(user => setUserDetails(user))
            .catch(error => console.error(error));
        }
    }

    if (userDetails != null) {
        console.log(userDetails);
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col xs="auto">
                        <br></br>
                        <h1>Welcome, {userDetails.foundUser.email}</h1>
                        <div>You are correctly logged in!</div>
                        <div>Your User ID is: {userDetails.foundUser.id}</div>
                    </Col>
                </Row>
                    
                    
            </Container>
            
        )
    }



    return (
        <div>HOMEPAGE!</div>
    )
}
export default HomePage;