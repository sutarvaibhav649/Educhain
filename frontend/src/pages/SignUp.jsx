const SignUp = ()=>{
    return(
        <>
            <div className="form-container">
                <div className="left-form">
                    <h1>Welcome</h1>
                    <p>
                        To get update and stay connected with us
                    </p>
                    <a href="login">
                        <button>Sign In</button>
                    </a>
                </div>
                <div className="right-form">
                    <div className="header">
                        <h3>Create an Account</h3>
                        <div className="logos">
                            <div className="google">
                                <img src="./src/assets/google-new.png" alt="" />
                            </div>
                            <div className="linkedIn">
                                 <img src="./src/assets/linkedIn-new.png" alt="" />
                            </div>
                            <div className="instagram">
                                 <img src="./src/assets/insta-new.png" alt="" />
                            </div>
                        </div>
                    </div>
                    <p>Or use yor email</p>
                    <form>
                    <input type="email" placeholder="email" name="email" id="email" required />
                    <div className="name">
                        <input type="text" placeholder="First Name" name="firstName" id="firstName"  required/>
                        <input type="text" placeholder="Last Name" name="lastName"  id="lastName" required/>
                    </div>
                    <input type="password" placeholder="Password" name="password" id="password" required/>
                    <div className="btn">
                        <button type="submit">Sign Up</button>
                    </div>
                </form>
                </div>
                
            </div>
        </>
    );
}


export default SignUp;