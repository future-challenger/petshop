class LoginView extends React.Component {
    

    handleUsername(e) {
        this.setState({username: e.target.value});
    }

    handlePassword(e) {
        this.setState({password: e.target.value});
    }

    render() {
        return (
            <div className="loginInput">
                <input type="text" 
                    value={this.state.username} 
                    onChange={this.handleUsername} />
                <input type="text" 
                    value={this.state.password}
                    onChange={this.handlePassword} />
            </div>
        );
    }
    
    state = {
        username: '', 
        password: ''
    }
}