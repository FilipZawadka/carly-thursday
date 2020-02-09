import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { login } from "../redux/actions";
import { SERVER_ADDRESS } from 'constants';

class PageLogin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null
    };

    this.loginHandler = this.loginHandler.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  componentDidUpdate() {
    if (this.props.admin !== null && this.props.admin !== undefined) {
      this.props.history.push("/list");
    }
  }

  onUsernameChange(e) {
    this.setState({ username: e.target.value });
  }
  onPasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  loginHandler(e) {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);

  }


  render() {

    return (
      <div align="center">
        <h2>Login</h2>

        <form onSubmit={e => this.loginHandler(e)}>
          <input type="text" placeholder="Username" onChange={this.onUsernameChange} />
          <br />
          <br />
          <input type="password" placeholder="Password" onChange={this.onPasswordChange} />
          <br />
          <br />
          <button type="submit">
            Login
                    </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state /* , ownProps */) => {
  return {
    admin: state.admin,
    loading_error: state.loading_error
  };
};

const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(login(username, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PageLogin));