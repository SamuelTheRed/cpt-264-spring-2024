var PlayerBox = React.createClass({
  getInitialState: function () {
    return { data: [] };
  },
  loadPlayersFromServer: function () {
    console.log(playerid.value);
    $.ajax({
      url: "/getplayer",
      data: {
        playerid: playerid.value,
        playerfirstname: playerfirstname.value,
        playerlastname: playerlastname.value,
        playeremail: playeremail.value,
        playerphone: playerphone.value,
        playerrewards: rewardnum.value,
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
  updateSinglePlrFromServer: function (player) {
    $.ajax({
      url: "/updatesingleplr",
      dataType: "json",
      data: player,
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
    this.loadPlayersFromServer();
    // setInterval(this.loadPlayersFromServer, this.props.pollInterval);
  },

  render: function () {
    return (
      <div>
        <h1>Update Players</h1>
        <Playerform onPlayerSubmit={this.loadPlayersFromServer} />
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
              <PlayerList data={this.state.data} />
            </table>
          </div>
          <div id="theright">
            <PlayerUpdateform onUpdateSubmit={this.updateSinglePlrFromServer} />
          </div>
        </div>
      </div>
    );
  },
});

var Playerform = React.createClass({
  getInitialState: function () {
    return {
      playerid: "",
      playerfirstname: "",
      playerlastname: "",
      playeremail: "",
      playerphone: "",
      playerrewards: "",
    };
  },
  handleOptionChange: function (e) {
    this.setState({
      selectedOption: e.target.value,
    });
  },
  handleSubmit: function (e) {
    e.preventDefault();

    var playerid = this.state.playerid.trim();
    var playerfirstname = this.state.playerfirstname.trim();
    var playerlastname = this.state.playerlastname.trim();
    var playeremail = this.state.playeremail.trim();
    var playerphone = this.state.playerphone.trim();
    var playerrewards = this.state.playerrewards.trim();

    this.props.onPlayerSubmit({
      playerid: playerid,
      playerfirstname: playerfirstname,
      playerlastname: playerlastname,
      playeremail: playeremail,
      playerphone: playerphone,
      playerrewards: playerrewards,
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
            <h2>Search Through Players</h2>
            <table>
              <tbody>
                <tr>
                  <th>Player ID</th>
                  <td>
                    <input
                      type="text"
                      name="playerid"
                      id="playerid"
                      value={this.state.playerid}
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Player First Name</th>
                  <td>
                    <input
                      name="playerfirstname"
                      id="playerfirstname"
                      value={this.state.playerfirstname}
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Player Last Name</th>
                  <td>
                    <input
                      name="playerlastname"
                      id="playerlastname"
                      value={this.state.playerlastname}
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Player Email</th>
                  <td>
                    <input
                      name="playeremail"
                      id="playeremail"
                      value={this.state.playeremail}
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Player Phone</th>
                  <td>
                    <input
                      name="playerphone"
                      id="playerphone"
                      value={this.state.playerphone}
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Player Rewards Tier</th>
                  <td>
                    <RewardsList data={this.state.data} />
                  </td>
                </tr>
              </tbody>
            </table>
            <input type="submit" value="Search Player" />
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

var PlayerUpdateform = React.createClass({
  getInitialState: function () {
    return {
      upplayerid: "",
      upplayerfirstname: "",
      upplayerlastname: "",
      upplayeremail: "",
      upplayerphone: "",
      upplayerrewards: "",
      updata: []
    };
  },
  handleUpOptionChange: function (e) {
    this.setState({
      upselectedOption: e.target.value,
    });
  },
  handleUpSubmit: function (e) {
    e.preventDefault();

    var upplayerid = upplrid.value;
    var upplayeremail = upplremail.value;
    var upplayerfirstname = upplrfirstname.value;
    var upplayerlastname = upplrlastname.value;
    var upplayerphone = upplrphone.value;
    var upplayerrewards = uprewardnum.value;

    this.props.onUpdateSubmit({
      upplayerid: upplayerid,
      upplayerfirstname: upplayerfirstname,
      upplayerlastname: upplayerlastname,
      upplayeremail: upplayeremail,
      upplayerphone: upplayerphone,
      upplayerrewards: upplayerrewards
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
                  <th>Player First Name</th>
                  <td>
                    <input
                      name="upplrfirstname"
                      id="upplrfirstname"
                      value={this.state.upplrfirstname}
                      onChange={this.state.handleUpChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Player Last Name</th>
                  <td>
                    <input
                      name="upplrlastname"
                      id="upplrlastname"
                      value={this.state.upplrlastname}
                      onChange={this.state.handleUpChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Player Email</th>
                  <td>
                    <input
                      name="upplremail"
                      id="upplremail"
                      value={this.state.upplremail}
                      onChange={this.state.handleUpChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Player Phone</th>
                  <td>
                    <input
                      name="upplrphone"
                      id="upplrphone"
                      value={this.state.upplrphone}
                      onChange={this.state.handleUpChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Player Rewards Tier</th>
                  <td>
                    <UpRewardsList data={this.state.updata} />
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <input
              type="hidden"
              name="upplrid"
              id="upplrid"
              onChange={this.handleUpChange}
            />
            <input type="submit" value="Update Player" />
          </form>
        </div>
      </div>
    );
  },
});

var PlayerList = React.createClass({
  render: function () {
    var playerNodes = this.props.data.map(function (player) {
      return (
        <Player
          key={player.dbplayer_id}
          plrid={player.dbplayer_id}
          plrfirstname={player.dbplayer_firstname}
          plrlastname={player.dbplayer_lastname}
          plremail={player.dbplayer_email}
          plrphone={player.dbplayer_phone}
          plrrewards={player.dbplayer_rewardstier}
        ></Player>
      );
    });

    //print all the nodes in the list
    return <tbody>{playerNodes}</tbody>;
  },
});

var Player = React.createClass({
  getInitialState: function () {
    return {
      upplrid: "",
      singledata: [],
    };
  },
  updateRecord: function (e) {
    e.preventDefault();
    var theupplrid = this.props.plrid;

    this.loadSinglePlr(theupplrid);
  },
  loadSinglePlr: function (theupplrid) {
    $.ajax({
      url: "/getsingleplr",
      data: {
        upplrid: theupplrid,
      },
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ singledata: data });
        console.log(this.state.singledata);
        var populatePlr = this.state.singledata.map(function (player) {
          upplrid.value = theupplrid;
          upplrfirstname.value = player.dbplayer_firstname;
          upplrlastname.value = player.dbplayer_lastname;
          upplremail.value = player.dbplayer_email;
          upplrphone.value = player.dbplayer_phone;
          uprewardnum.value = player.dbplayer_rewardstier;
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
        <td>{this.props.plrid}</td>
        <td>{this.props.plrfirstname}</td>
        <td>{this.props.plremail}</td>
        <td>
          <form onSubmit={this.updateRecord}>
            <input type="submit" value="Update Record" />
          </form>
        </td>
      </tr>
    );
  },
});

var RewardsList = React.createClass({
  render: function () {
    return (
      <select name="rewardnum" id="rewardnum">
        <option key="" value=""></option>
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

var UpRewardsList = React.createClass({
  render: function () {
    return (
      <select name="uprewardnum" id="uprewardnum">
        <option key="" value=""></option>
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
