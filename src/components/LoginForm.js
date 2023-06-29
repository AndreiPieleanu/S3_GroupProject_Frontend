import React, { useState } from "react";

function LoginForm(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onLogin(email, password);
      }

    return (
        <div class="container">
        <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div class="card border-0 shadow rounded-3 my-5">
            <div class="card-body p-4 p-sm-5">
                <h5 class="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
                <form onSubmit={handleSubmit}>
                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} value={email}/>
                    <label for="floatingInput">Email</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password"  onChange={(e) => setPassword(e.target.value)} value={password}/>
                    <label for="floatingPassword">Password</label>
                </div>
                <div class="d-grid">
                    <button class="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Sign
                    in</button>
                </div>
                <hr class="my-4" />
                </form>
            </div>
            </div>
        </div>
        </div>
    </div>
    )
}

export default LoginForm;