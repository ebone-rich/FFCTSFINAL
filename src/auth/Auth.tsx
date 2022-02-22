import React from "react";
import Signup from "./Signup";
//import Login from "./Login";
import { Container, Row, Col } from "reactstrap";

type Props = {
    // tokenUpdate: string;
    tokenUpdate: () => void
    clearToken: () => void
    toggleFunc: () => void
}

type State = {
    hasError: boolean,
    toggle: boolean,
}

class Auth extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { 
            hasError: false,
            toggle: false
         };
    }

    static getDerivedStateFromError(error: any) {
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        console.log(error, errorInfo);
    }

    toggleFunc = () => {
        this.setState({
            toggle: !this.state.toggle
        })
    }

    render() {
        console.log('Auth render')
        // if (this.state.hasError) {
        //     return <h1>Ooops! no fur babies here.</h1>;
        // }
        return (
            <Container className="splash">
                <Row>
                    <Col>
                        {/* {this.state.toggle ?
                        <Login updateToken={this.props.tokenUpdate} toggleFunc={this.toggleFunc} /> */}
                       
                        <Signup updateToken={this.props.tokenUpdate} toggleFunc={this.toggleFunc} /> 
                    </Col>
                </Row>

            </Container>

        )
    }
};
export default Auth;