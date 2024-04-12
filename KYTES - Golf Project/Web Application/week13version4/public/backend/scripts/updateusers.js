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
  updateSingleUsrFromServer: function (user) {
    $.ajax({
      url: "/updatesingleusr",
      dataType: "json",
      data: user,
      type: "POST",
      cache: false,
      success: function (upsingledata) {
        this.setState({ upsingledata: upsingledata });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
    window.location.reload(true);
  },
  componentDidMount: function () {
    this.loadUsersFromServer();
    // setInterval(this.loadUsersFromServer, this.props.pollInterval);
  },

  render: function () {
    return (
      <div>
        <h1>Update Users</h1>
        <Userform onUserSubmit={this.loadUsersFromServer} />
        <br />
        <div id="theresults">
          <div id="theleft">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Email</th>
                  <th></th>
                </tr>
              </thead>
              <UserList data={this.state.data} />
            </table>
          </div>
          <div id="theright">
            <UserUpdateform onUpdateSubmit={this.updateSingleUsrFromServer} />
          </div>
        </div>
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
  handleOptionChange: function (e) {
    this.setState({
      selectedOption: e.target.value,
    });
  },
  handleSubmit: function (e) {
    e.preventDefault();

    var userid = this.state.userid.trim();
    var userfirstname = this.state.userfirstname.trim();
    var userlastname = this.state.userlastname.trim();
    var useremail = this.state.useremail.trim();
    var userphone = this.state.userphone.trim();
    var userrole = this.state.userrole.trim();

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
      <div>
        <div id="theform">
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
                  <th>User Roles Tier</th>
                  <td>
                    <RolesList data={this.state.data} />
                  </td>
                </tr>
              </tbody>
            </table>
            <input type="submit" value="Search User" />
          </form>
        </div>
        <div>
          <br />
          <form onSubmit={this.getInitialState}>
            <input type="submit" value="Clear Form" />
          </form>
        </div>
      </div>
    );
  },
});

var UserUpdateform = React.createClass({
  getInitialState: function () {
    return {
      upuserid: "",
      upuserfirstname: "",
      upuserlastname: "",
      upuseremail: "",
      upuserphone: "",
      upuserrole: "",
      updata: [],
    };
  },
  handleUpOptionChange: function (e) {
    this.setState({
      upselectedOption: e.target.value,
    });
  },
  handleUpSubmit: function (e) {
    e.preventDefault();

    var upuserid = upusrid.value;
    var upuseremail = upusremail.value;
    var upuserfirstname = upusrfirstname.value;
    var upuserlastname = upusrlastname.value;
    var upuserphone = upusrphone.value;
    var upuserrole = uprolenum.value;

    this.props.onUpdateSubmit({
      upuserid: upuserid,
      upuserfirstname: upuserfirstname,
      upuserlastname: upuserlastname,
      upuseremail: upuseremail,
      upuserphone: upuserphone,
      upuserrole: upuserrole,
    });
  },
  handleUpChange: function (event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  },
  render: function () {
    return (
      <div>
        <div id="theform">
          <form onSubmit={this.handleUpSubmit}>
            <table>
              <tbody>
                <tr>
                  <th>User First Name</th>
                  <td>
                    <input
                      name="upusrfirstname"
                      id="upusrfirstname"
                      value={this.state.upusrfirstname}
                      onChange={this.state.handleUpChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>User Last Name</th>
                  <td>
                    <input
                      name="upusrlastname"
                      id="upusrlastname"
                      value={this.state.upusrlastname}
                      onChange={this.state.handleUpChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>User Email</th>
                  <td>
                    <input
                      name="upusremail"
                      id="upusremail"
                      value={this.state.upusremail}
                      onChange={this.state.handleUpChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>User Phone</th>
                  <td>
                    <input
                      name="upusrphone"
                      id="upusrphone"
                      value={this.state.upusrphone}
                      onChange={this.state.handleUpChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>User Roles Tier</th>
                  <td>
                    <UpRolesList data={this.state.updata} />
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <input
              type="hidden"
              name="upusrid"
              id="upusrid"
              onChange={this.handleUpChange}
            />
            <input type="submit" value="Update User" />
          </form>
        </div>
      </div>
    );
  },
});

var UserList = React.createClass({
  render: function () {
    var userNodes = this.props.data.map(function (user) {
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
  getInitialState: function () {
    return {
      upusrid: "",
      singledata: [],
    };
  },
  updateRecord: function (e) {
    e.preventDefault();
    var theupusrid = this.props.usrid;

    this.loadSingleUsr(theupusrid);
  },
  loadSingleUsr: function (theupusrid) {
    $.ajax({
      url: "/getsingleusr",
      data: {
        upusrid: theupusrid,
      },
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ singledata: data });
        console.log(this.state.singledata);
        var populateUsr = this.state.singledata.map(function (user) {
          upusrid.value = theupusrid;
          upusrfirstname.value = user.dbuser_firstname;
          upusrlastname.value = user.dbuser_lastname;
          upusremail.value = user.dbuser_email;
          upusrphone.value = user.dbuser_phone;
          uprolenum.value = user.dbuser_role;
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  },

  render: function () {
    return (
      <tr>
        <td>{this.props.usrid}</td>
        <td>{this.props.usrfirstname}</td>
        <td>{this.props.usremail}</td>
        <td>
          <form onSubmit={this.updateRecord}>
            <input type="submit" value="Update Record" />
          </form>
        </td>
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
var UpRolesList = React.createClass({
  render: function () {
    return (
      <select name="uprolenum" id="uprolenum">
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
