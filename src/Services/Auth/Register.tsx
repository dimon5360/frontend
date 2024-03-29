
import React from "react";
import { Header } from '../../Common/Components/Header/Header';
import { Button } from '../../Common/Components/Button/Button';

import { credentialValidating } from "./Validating";
import { Link } from 'react-router-dom';
import bcrypt from "bcryptjs-react";
import axios from "axios";

interface Props {

}

const PREFIX = "/api/v1/"

type State = { email: string, password: string };

class Register extends React.Component<Props, State> {
  constructor(props: Props, state: State) {
    super(props);

    this.state = state;

    this.register = this.register.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleEmail(event: React.FormEvent<HTMLInputElement>) {
    this.setState({ email: event.currentTarget.value  });
  }

  handlePassword(event: React.FormEvent<HTMLInputElement>) {
    this.setState({ password: event.currentTarget.value  });
  }

  async register() {

    const pass = this.state.password;
    const email = this.state.email;

    if (!credentialValidating(email, pass)) {
      alert("Invalid email or password")
      return
    }

    const salt = "$2a$10$izKz/96Rs.94DDYoqO9Vi.";

    axios.post(PREFIX + 'register', {
      email: this.state.email,
      password: bcrypt.hashSync(this.state.password, salt)
    })
      .then(function (response) {

        const data = response.data;

        console.log(data);
      })
      .catch(function (error) {

        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }

  render() {
    return (
      <div className="container">
        <Header />
        <div className="col-lg-12">
        <form onSubmit={this.register}>
          <div>
            <div>
              <label htmlFor="Email">Email:</label>
            </div>
            <input type="text" value={this.state.email} onChange={this.handleEmail} />
          </div>

          <div>
            <div>
              <label htmlFor="Password">Password:</label>
            </div>
            <input type="password" value={this.state.password} onChange={this.handlePassword} />
          </div>
          </form>

          <div>
            <Link to="/">
              <Button onClick={this.register}>Sign Up</Button>
            </Link>
          </div>
          <div>
            <Link to="/">
              <Button >Main</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Register