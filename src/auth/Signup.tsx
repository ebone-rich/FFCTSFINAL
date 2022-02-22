import React from "react";
import APIURL from "../helpers/environments";
import { Form, FormGroup, Label, Input, Button, FormFeedback, FormText, List
} from "reactstrap";

type Props = {
    update?: (newToken: string) => void,
    toggleFunc: () => void,
    updateToken?: (e:string) => void;
}

type State = {
    username: string,
    password: string,
    admin: boolean,
    message: string,
    isSignUp: boolean,
    isPasswordValid: boolean
}

class Signup extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            admin: false,
            message: '',
            isSignUp: true,
            isPasswordValid: false

        }
    }
    loginOrSignUp = () => {
        this.setState({isSignUp: !this.state.isSignUp});
    }

    handleSubmit = () => {
        console.log('signup handle submit')
        let errorCode: number | string

        console.log(this.state.username, this.state.admin, this.state.password)
        fetch(`http://localhost:4000/user/register`, {
            mode: 'no-cors',
            method: "POST",
            body: JSON.stringify({ users: { username: this.state.username, admin: this.state.admin, password: this.state.password } }),
            headers: new Headers({
                "Content-Type": "application/json",
            }),
        })
            .then((response) => {
                console.log(`fetch successful ${response}`);
                errorCode = response.status;
                console.log(errorCode);
                if (errorCode === 409) {
                    this.setState({ message: 'Username already in use' });
                    console.log(this.state.message);
                } else if (errorCode === 500) {
                    this.setState({ message: 'Failed to register user' });
                    console.log(this.state.message);
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                console.log(this.props.update);
                this.props.update && this.props.update(data.sessionToken);
            })
    };

    validPassword = (value:string) => {
        console.log('valid password');
        return (
            value.length > 8 &&
            value.match(/[A-Z]/) !== null &&
            value.match(/[a-z]/) !== null &&
            value.match(/[0-9]/) !== null
        );
    }

    render() {
        console.log('signup render')
        const {isSignUp, username, password, message} = this.state;
        return (
            <div>
                <Form inline onSubmit={e => { e.preventDefault(); this.handleSubmit() }} id='splashForm'>
                    <h2> FurFriend Finder </h2>
                    <Label>{isSignUp ? 'SignUp' : 'Login'}</Label>
                    <FormGroup >
                        <Input
                            bsSize="lg"
                            type="text"
                            placeholder="Username"
                            onChange={(e) => this.setState({ username: e.target.value })}
                            value={username}
                            name='username'
                        />
                    </FormGroup>
                    <br />
                    <FormGroup >
                        <Input
                            bsSize="lg"
                            type="password"
                            placeholder="Password"
                            onChange={(e) => {
                                this.setState({ password: e.target.value, isPasswordValid:this.validPassword(e.target.value) })
                            }}
                            value={password}
                            name='password'
                        />
                        <br />
                        <FormText>
                            <List type="unstyled" id="passwordReq">
                                <li>Password Requirements:</li>
                                <li>At least 8 characters</li>
                                <li>A mixture of both uppercase and lowercase letters.</li>
                                <li> A mixture of letters and numbers.</li>
                            </List>
                        </FormText>
                        <FormFeedback>
                            {" "}
                            {message !== "" ? <p className="message">{message}</p> : ""}
                        </FormFeedback>

                    </FormGroup>
                    <Button id="Btns" onClick={this.loginOrSignUp}>{isSignUp ? 'Go to Login' : 'Go to Sign Up'}</Button>
                    <Button id="Btns" type="submit" disabled={this.state.isPasswordValid===false}>Submit</Button>

                </Form>
            </div>
        )
    }

}

export default Signup;