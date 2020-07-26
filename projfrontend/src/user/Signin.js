import React, {useState} from "react"
import Base from "../core/Base"
import {Link} from "react-router-dom"

const Signin = () =>{

    const signinForm = () =>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        
                        
                        <div className="form-group">
                            <label className="text-light">E-Mail ID</label>
                            <input className="form-control" type="Email" />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input className="form-control" type="password" />
                        </div>
                        <button className="btn btn-success btn-block">SUBMIT</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <Base title= "Sign in page" description="A page for user to sign in!">
            {signinForm()}
        </Base>
    );
};

export default Signin;