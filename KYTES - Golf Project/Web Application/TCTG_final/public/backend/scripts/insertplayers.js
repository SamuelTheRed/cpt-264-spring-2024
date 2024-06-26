var PlayerBox = React.createClass({
  // Get Login Status
  getInitialState: function () {
    return { data: [], viewthepage: "" };
  },
  // Check Status
  loadAllowLogin: function () {
    $.ajax({
      url: "/getloggedin",
      dataType: "json",
      cache: false,
      success: function (datalog) {
        this.setState({ data: datalog });
        this.setState({ viewthepage: this.state.data[0].dbuser_role });
        console.log("Logged in:" + this.state.viewthepage);
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  },
  // On load run function
  componentDidMount: function () {
    this.loadAllowLogin();
  },
  handlePlayerSubmit: function (player) {
    $.ajax({
      url: "/player",
      dataType: "json",
      type: "POST",
      data: player,
      success: function (data) {
        this.setState({ data: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
        alert(err.toString());
      }.bind(this),
    });
    window.location.reload(true);
  },
  render: function () {
    if (this.state.viewthepage != "Manager") {
      console.log("This: " + this.state.viewthepage);
      return <div>You do not have access to this page</div>;
    } else {
      return (
        <div className="PlayerBox">
          <h1>Players</h1>
          <Playerform onPlayerSubmit={this.handlePlayerSubmit} />
        </div>
      );
    }
  },
});

var Playerform = React.createClass({
  getInitialState: function () {
    return {
      playerfirstnameSS: "",
      playerlastnameSS: "",
      playeremailSS: "",
      playerphoneSS: "",
      playerrewardsSS: "",
      playerpwSS: "",
      playerpw2SS: "",
    };
  },
  handleSubmit: function (e) {
    e.preventDefault();

    var playerfirstnameSS = this.state.playerfirstnameSS.trim();
    var playerlastnameSS = this.state.playerlastnameSS.trim();
    var playeremailSS = this.state.playeremailSS.trim();
    var playerphoneSS = this.state.playerphoneSS.trim();
    var playerrewardsSS = rewardnum.value;
    var playerpwSS = this.state.playerpwSS.trim();
    var playerpw2SS = this.state.playerpw2SS.trim();

    if (!this.validateEmail(playeremailSS)) {
      console.log("Bad Email " + this.validateEmail(playeremailSS));
      alert("Bad Email");
      return;
    }
    if (!this.validatePhone(playerphoneSS)) {
      console.log("Bad Phone Number " + this.validatePhone(playerphoneSS));
      alert("Bad Phone Number");
      return;
    }
    if (
      !playerfirstnameSS ||
      !playerlastnameSS ||
      !playeremailSS ||
      !playerphoneSS ||
      playerpwSS.length < 6
    ) {
      console.log("Field Missing");
      alert("Field Missing");
      return;
    }
    if (playerpwSS != playerpw2SS) {
      alert("Passwords do not match!!!");
      return;
    }

    this.props.onPlayerSubmit({
      playerfirstnameSS: playerfirstnameSS,
      playerlastnameSS: playerlastnameSS,
      playeremailSS: playeremailSS,
      playerphoneSS: playerphoneSS,
      playerrewardsSS: playerrewardsSS,
      playerpwSS: playerpwSS,
    });
  },
  validateEmail: function (value) {
    var re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
  },
  validateDollars: function (value) {
    var regex = /^\$?[0-9]+(\.[0-9][0-9])?$/;
    return regex.test(value);
  },
  validatePhone: function (value) {
    var regex = /\(?([0-9]{10})$/;
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
      <form className="PlayerForm" onSubmit={this.handleSubmit}>
        <h2>Insert Player</h2>
        <table>
          <tbody>
            <tr>
              <th>Player First Name</th>
              <td>
                <TextInput
                  value={this.state.playerfirstnameSS}
                  uniqueName="playerfirstname"
                  textArea={false}
                  required={true}
                  minCharacters={3}
                  validate={this.commonValidate}
                  onChange={this.setValue.bind(this, "playerfirstnameSS")}
                  errorMessage="Player Name is invalid"
                  emptyMessage="Player Name is Required"
                />
              </td>
            </tr>
            <tr>
              <th>Player Last Name</th>
              <td>
                <TextInput
                  value={this.state.playerlastnameSS}
                  uniqueName="playerlastname"
                  textArea={false}
                  required={true}
                  minCharacters={2}
                  validate={this.commonValidate}
                  onChange={this.setValue.bind(this, "playerlastnameSS")}
                  errorMessage="Invalid Player Last Name"
                  emptyMessage="Player Last Name is Required"
                />
              </td>
            </tr>
            <tr>
              <th>Player Email</th>
              <td>
                <TextInput
                  value={this.state.playeremailSS}
                  uniqueName="playeremail"
                  textArea={false}
                  required={true}
                  minCharacters={3}
                  validate={this.commonValidate}
                  onChange={this.setValue.bind(this, "playeremailSS")}
                  errorMessage="Player Email is invalid"
                />
              </td>
            </tr>
            <tr>
              <th>Player Phone</th>
              <td>
                <TextInput
                  value={this.state.playerphoneSS}
                  uniqueName="playerphone"
                  textArea={false}
                  required={true}
                  minCharacters={3}
                  validate={this.commonValidate}
                  onChange={this.setValue.bind(this, "playerphoneSS")}
                  errorMessage="Player Phone is invalid"
                />
              </td>
            </tr>
            <tr>
              <th>Player Rewards Tier</th>
              <td>
                <RewardsList data={this.state.data} />
              </td>
            </tr>
            <tr>
              <th>Player Password</th>
              <td>
                <TextInput
                  inputType="password"
                  value={this.state.playerpwSS}
                  uniqueName="playerpw"
                  textArea={false}
                  required={true}
                  minCharacters={6}
                  validate={this.commonValidate}
                  onChange={this.setValue.bind(this, "playerpwSS")}
                  errorMessage="Password is incorrect"
                  emptyMessage="Password is required"
                />
              </td>
            </tr>
            <tr>
              <th>Player Password Confirm</th>
              <td>
                <TextInput
                  inputType="password"
                  value={this.state.playerpw2SS}
                  uniqueName="playerpw2"
                  textArea={false}
                  required={true}
                  minCharacters={6}
                  validate={this.commonValidate}
                  onChange={this.setValue.bind(this, "playerpw2SS")}
                  errorMessage="Password is incorrect"
                  emptyMessage="Password is required"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="Insert Player" />
      </form>
    );
  },
});

var InputError = React.createClass({
  getInitialState: function () {
    return {
      message: "Input is invalid",
    };
  },
  render: function () {
    var errorClass = classNames(this.props.className, {
      error_container: true,
      visible: this.props.visible,
      invisible: !this.props.visible,
    });

    return <td> {this.props.errorMessage} </td>;
  },
});

var TextInput = React.createClass({
  getInitialState: function () {
    return {
      isEmpty: true,
      value: null,
      valid: false,
      errorMessage: "",
      errorVisible: false,
    };
  },

  handleChange: function (event) {
    this.validation(event.target.value);

    if (this.props.onChange) {
      this.props.onChange(event);
    }
  },

  validation: function (value, valid) {
    if (typeof valid === "undefined") {
      valid = true;
    }

    var message = "";
    var errorVisible = false;

    if (!valid) {
      message = this.props.errorMessage;
      valid = false;
      errorVisible = true;
    } else if (this.props.required && jQuery.isEmptyObject(value)) {
      message = this.props.emptyMessage;
      valid = false;
      errorVisible = true;
    } else if (value.length < this.props.minCharacters) {
      message = this.props.errorMessage;
      valid = false;
      errorVisible = true;
    }

    this.setState({
      value: value,
      isEmpty: jQuery.isEmptyObject(value),
      valid: valid,
      errorMessage: message,
      errorVisible: errorVisible,
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
            className={"input input-" + this.props.uniqueName}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            value={this.props.value}
          />

          <InputError
            visible={this.state.errorVisible}
            errorMessage={this.state.errorMessage}
          />
        </div>
      );
    } else {
      return (
        <div className={this.props.uniqueName}>
          <input
            type={this.props.inputType}
            name={this.props.uniqueName}
            id={this.props.uniqueName}
            placeholder={this.props.text}
            className={"input input-" + this.props.uniqueName}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            value={this.props.value}
          />

          <InputError
            visible={this.state.errorVisible}
            errorMessage={this.state.errorMessage}
          />
        </div>
      );
    }
  },
});

var RewardsList = React.createClass({
  render: function () {
    return (
      <select name="rewardnum" id="rewardnum">
        <option key="1" value="Standard">
          Standard
        </option>
        <option key="2" value="Plus">
          Plus
        </option>
        <option key="3" value="Premium">
          Premium
        </option>
      </select>
    );
  },
});

ReactDOM.render(<PlayerBox />, document.getElementById("content"));
