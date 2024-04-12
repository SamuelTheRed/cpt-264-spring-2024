var UserBox = React.createClass({
  getInitialState: function () {
    return { data: [] };
  },
  loadUsersFromServer: function () {
    console.log(userid.value);
    $.ajax({
      url: "/getuser",
      data: {
        userid: userid.value,
        userfirstname: userfirstname.value,
        userlastname: userlastname.value,
        useremail: useremail.value,
        userphone: userphone.value,
        userrole: rolenum.value,
      },
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ data: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  },
  componentDidMount: function () {
    this.loadUsersFromServer();
  },

  render: function () {
    return (
      <div>
        <h1>Users</h1>
        <Userform onUserSubmit={this.loadUsersFromServer} />
        <br />
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role Tier</th>
            </tr>
          </thead>
          <UserList data={this.state.data} />
        </table>
      </div>
    );
  },
});

var Userform = React.createClass({
  getInitialState: function () {
    return {
      userid: "",
      userfirstname: "",
      userlastname: "",
      useremail: "",
      userphone: "",
      userrole: "",
    };
  },
  handleSubmit: function (e) {
    e.preventDefault();

    var userid = this.state.userid.trim();
    var userfirstname = this.state.userfirstname.trim();
    var userlastname = this.state.userlastname.trim();
    var useremail = this.state.useremail.trim();
    var userphone = this.state.userphone.trim();
    var userrole = rolenum.value;

    this.props.onUserSubmit({
      userid: userid,
      userfirstname: userfirstname,
      userlastname: userlastname,
      useremail: useremail,
      userphone: userphone,
      userrole: userrole,
    });
  },
  handleChange: function (event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  },
  render: function () {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Search Through Users</h2>
        <table>
          <tbody>
            <tr>
              <th>User ID</th>
              <td>
                <input
                  type="text"
                  name="userid"
                  id="userid"
                  value={this.state.userid}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>User First Name</th>
              <td>
                <input
                  name="userfirstname"
                  id="userfirstname"
                  value={this.state.userfirstname}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>User Last Name</th>
              <td>
                <input
                  name="userlastname"
                  id="userlastname"
                  value={this.state.userlastname}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>User Email</th>
              <td>
                <input
                  name="useremail"
                  id="useremail"
                  value={this.state.useremail}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>User Phone</th>
              <td>
                <input
                  name="userphone"
                  id="userphone"
                  value={this.state.userphone}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>User Role Tier</th>
              <td>
                <RolesList data={this.state.data} />
              </td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="Search User" />
      </form>
    );
  },
});
var UserList = React.createClass({
  render: function () {
    var userNodes = this.props.data.map(function (user) {
      //map the data to individual
      return (
        <User
          key={user.dbuser_id}
          usrid={user.dbuser_id}
          usrfirstname={user.dbuser_firstname}
          usrlastname={user.dbuser_lastname}
          usremail={user.dbuser_email}
          usrphone={user.dbuser_phone}
          usrrole={user.dbuser_role}
        ></User>
      );
    });

    //print all the nodes in the list
    return <tbody>{userNodes}</tbody>;
  },
});

var User = React.createClass({
  render: function () {
    return (
      <tr>
        <td>{this.props.usrid}</td>
        <td>{this.props.usrfirstname}</td>
        <td>{this.props.usrlastname}</td>
        <td>{this.props.usremail}</td>
        <td>{this.props.usrphone}</td>
        <td>{this.props.usrrole}</td>
      </tr>
    );
  },
});

var RolesList = React.createClass({
  render: function () {
    return (
      <select name="rolenum" id="rolenum">
        <option key="0" value="">
          --
        </option>
        <option key="1" value="Manager">
          Manager
        </option>
        <option key="2" value="Front-Desk">
          Front-Desk
        </option>
        <option key="3" value="Assistant">
          Assistant
        </option>
      </select>
    );
  },
});

ReactDOM.render(<UserBox />, document.getElementById("content"));
