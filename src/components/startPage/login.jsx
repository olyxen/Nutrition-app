import React from 'react';
import './login.css'


function Login(){
    return (
        <mdb-tabset>
        <div class="text-center h-100 login">
            <form class="form-signin ">
                <img class="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"></img>
                <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label for="inputEmail" class="sr-only">Email address</label>
                <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus=""></input>
                <label for="inputPassword" class="sr-only">Password</label>
                <input type="password" id="inputPassword" class="form-control" placeholder="Password" required=""></input>
                <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                <p class="mt-5 mb-3 text-muted">© 2020</p>
            </form>
        </div>
        </mdb-tabset>
    )
}
export default Login;