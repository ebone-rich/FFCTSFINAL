import React  from 'react'
import APIURL from '../helpers/environments'

type LogProps = { 
  updateToken: (e:string) => void;
  toggleFunc: () => void
};

type LogState = { 
    username: string;
    passwordhash: string;

};

class Login extends React.Component<LogProps, LogState> {
    constructor(props: LogProps ) {
  super(props);
  this.state = {
      username: "",
      passwordhash: "",
  };
}

handleSubmit= async() => {
    console.log(this.props);
    try {
        let errorCode: number | string;
        console.log(this.state.username, this.state.passwordhash);

        const login = await fetch(`${APIURL}/user/login`, {
            method: "POST",
            body: JSON.stringify({
              user: {
                username: this.state.username,
                passwordhash: this.state.passwordhash,
              },
            }),
            headers: new Headers({
              "Content-Type": "application/json",
              
    }),
})

const data = await login.json();
console.log(data);

console.log(data.sessionToken);

if (data.sessionToken !== undefined) {
  this.props.updateToken(data.sessionToken);

} else {
  return alert("User already exists");
}
} catch (error) {
console.log(error);
};
}
render(): React.ReactNode {
    return (
      <div>This is the login</div>
      
    )
}
}

export default Login;