var UserBox = React.createClass({ // --v
    handleUserSubmit: function (user) {

        $.ajax({
            url: '/user',
            dataType: 'json',
            type: 'POST',
            data: user,
            success: function (data) {
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }, // --^
    render: function () {
        return (
            <div className="UserBox">
                <h1>Users</h1>
                <Userform onUserSubmit={this.handleUserSubmit}/>
            </div>
        );
    }
});

var Userform = React.createClass({
    getInitialState: function () {
        return {
            username: "",
            useraddress: "",
            userzip: "",
            customecredit: "",
            useremail: ""
        };
    },
    // --v
    handleSubmit: function (e) {
        
        e.preventDefault();

        var username = this.state.username.trim();
        var useraddress = this.state.useraddress.trim();
        var userzip = this.state.userzip.trim();
        var usercredit = this.state.usercredit;
        var useremail = this.state.useremail.trim();

        if (!this.validateEmail(useremail)) {
            console.log("Bad Email " + this.validateEmail(useremail));
            return;
        }
        if (isNaN(usercredit)) {
            console.log("Not a number " + usercredit);
            return;
        }

        if (!username || !useremail || !usercredit) {
            console.log("Field Missing");
            return;
        }

        this.props.onUserSubmit({
            username: username,
            useraddress: useraddress,
            userzip: userzip,
            usercredit: usercredit,
            useremail: useremail
        });

    }, // --^
    validateEmail: function (value) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(value);
    },
    validateDollars: function (value) {
        var regex = /^\$?[0-9]+(\.[0-9][0-9])?$/;
        return regex.test(value);
    },
    commonValidate: function () {
        return true;
    },
    setValue: function (field, event) {
        var object = {};
        object[field] = event.target.value;
        this.setState(object);
    },
    render: function () {

        return (
            <form className="userForm" onSubmit={this.handleSubmit}>
                <h2>Users</h2>
                <table>
                    <tbody>
                        <tr>
                            <th>User Name</th>
                            <td>
                <TextInput
                    value={this.state.username}
                    uniqueName="username"
                    textArea={false}
                    required={true}
                    minCharacters={6}
                    validate={this.commonValidate}
                    onChange={this.setValue.bind(this, 'username')}
                    errorMessage="User Name is invalid"
                    emptyMessage="User Name is required" />
                            </td>
                        </tr>
                        <tr>
                            <th>User Address</th>
                            <td>
                <TextInput
                    value={this.state.useraddress}
                    uniqueName="useraddress"
                    textArea={false}
                    required={false}
                    minCharacters={6}
                    validate={this.commonValidate}
                    onChange={this.setValue.bind(this, 'useraddress')}
                    errorMessage="User Address is invalid" />
                            </td>
                        </tr>
                        <tr>
                            <th>User Zip</th>
                            <td>

                <TextInput
                    value={this.state.userzip}
                    uniqueName="userzip"
                    textArea={false}
                    required={false}
                    validate={this.commonValidate}
                    onChange={this.setValue.bind(this, 'userzip')}
                    errorMessage=""
                    emptyMessage="" />
                            </td>
                        </tr>
                        <tr>
                            <th>User Credit Limit</th>
                            <td>

                <TextInput
                    value={this.state.usercredit}
                    uniqueName="usercredit"
                    textArea={false}
                    required={false}
                    validate={this.validateDollars}
                    onChange={this.setValue.bind(this, 'usercredit')}
                    errorMessage="Did not enter a dollar value"
                    emptyMessage="" />
                            </td>
                        </tr>
                        <tr>
                            <th>User E-Mail</th>
                            <td>
              

                <TextInput
                    value={this.state.useremail}
                    uniqueName="useremail"
                    textArea={false}
                    required={true}
                    validate={this.validateEmail}
                    onChange={this.setValue.bind(this, 'useremail')}
                    errorMessage="Invalid E-Mail Address"
                    emptyMessage="E-Mail Address is Required" />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <input type="submit" value="Insert User" />
               
            </form>
        );
    }
});

var InputError = React.createClass({
    getInitialState: function () {
        return {
            message: 'Input is invalid'
        };
    },
    render: function () {
        var errorClass = classNames(this.props.className, {
            'error_container': true,
            'visible': this.props.visible,
            'invisible': !this.props.visible
        });

        return (
                <td> {this.props.errorMessage} </td>
        )
    }
});

var TextInput = React.createClass({
    getInitialState: function () {
        return {
            isEmpty: true,
            value: null,
            valid: false,
            errorMessage: "",
            errorVisible: false
        };
    },

    handleChange: function (event) {
        this.validation(event.target.value);

        if (this.props.onChange) {
            this.props.onChange(event);
        }
    },

    validation: function (value, valid) {
        if (typeof valid === 'undefined') {
            valid = true;
        }

        var message = "";
        var errorVisible = false;

        if (!valid) {
            message = this.props.errorMessage;
            valid = false;
            errorVisible = true;
        }
        else if (this.props.required && jQuery.isEmptyObject(value)) {
            message = this.props.emptyMessage;
            valid = false;
            errorVisible = true;
        }
        else if (value.length < this.props.minCharacters) {
            message = this.props.errorMessage;
            valid = false;
            errorVisible = true;
        }

        this.setState({
            value: value,
            isEmpty: jQuery.isEmptyObject(value),
            valid: valid,
            errorMessage: message,
            errorVisible: errorVisible
        });

    },

    handleBlur: function (event) {
        var valid = this.props.validate(event.target.value);
        this.validation(event.target.value, valid);
    },
    render: function () {
        if (this.props.textArea) {
            return (
                <div className={this.props.uniqueName}>
                    <textarea
                        placeholder={this.props.text}
                        className={'input input-' + this.props.uniqueName}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        value={this.props.value} />

                    <InputError
                        visible={this.state.errorVisible}
                        errorMessage={this.state.errorMessage} />
                </div>
            );
        } else {
            return (
                <div className={this.props.uniqueName}>
                    <input // --v
                        name={this.props.uniqueName}
                        id={this.props.uniqueName} // --^
                        placeholder={this.props.text}
                        className={'input input-' + this.props.uniqueName}
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        value={this.props.value} />

                    <InputError
                        visible={this.state.errorVisible}
                        errorMessage={this.state.errorMessage} />
                </div>
            );
        }
    }
});

ReactDOM.render(
    <UserBox />,
    document.getElementById('content')
);
