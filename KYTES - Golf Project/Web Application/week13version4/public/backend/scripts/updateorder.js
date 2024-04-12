var OrderBox = React.createClass({
  getInitialState: function () {
    return { data: [] };
  },
  loadOrdersFromServer: function () {
    console.log(orderid.value);
    $.ajax({
      url: "/getorder",
      orddata: {
        orderid: orderid.value,
        orderdatetime: orderdatetime.value,
        orderplayer: orderplayer.value,
        orderuser: orderuser.value,
      },
      dataType: "json",
      cache: false,
      success: function (orddata) {
        this.setState({ orddata: orddata });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  },
  updateSingleEmpFromServer: function (order) {
    $.ajax({
      url: "/updatesingleord",
      dataType: "json",
      data: order,
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
    this.loadOrdersFromServer();
    // setInterval(this.loadOrdersFromServer, this.props.pollInterval);
  },

  render: function () {
    return (
      <div>
        <h1>Update Orders</h1>
        <Orderform onOrderSubmit={this.loadOrdersFromServer} />
        <br />
        <div id="theresults">
          <div id="theleft">
            <table>
              <thead>
                <tr>
                  <th>Key</th>
                  <th>ID</th>
                  <th>Date Time</th>
                  <th>Player</th>
                  <th>User</th>
                </tr>
              </thead>
              <OrderList data={this.state.data} />
            </table>
          </div>
          <div id="theright">
            <OrderUpdateform onUpdateSubmit={this.updateSingleEmpFromServer} />
          </div>
        </div>
      </div>
    );
  },
});

var Orderform = React.createClass({
  getInitialState: function () {
    return {
      orderkey: "",
      orderid: "",
      orderdatetime: "",
      orderplayer: "",
      orderuser: "",
    };
  },
  handleOptionChange: function (e) {
    this.setState({
      selectedOption: e.target.value,
    });
  },
  handleSubmit: function (e) {
    e.preventDefault();

    var orderid = this.state.orderid.trim();
    var orderdatetime = this.state.orderdatetime.trim();
    var orderplayer = this.state.orderplayer.trim();
    var orderuser = this.state.orderuser.trim();

    this.props.onOrderSubmit({
      orderid: orderid,
      orderdatetime: orderdatetime,
      orderplayer: orderplayer,
      orderuser: orderuser,
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
            <h2>Search Through Orders</h2>
            <table>
              <tbody>
                <tr>
                  <th>Order ID</th>
                  <td>
                    <input
                      type="text"
                      name="orderid"
                      id="orderid"
                      value={this.state.orderid}
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Order Date Time</th>
                  <td>
                    <input
                      name="orderdatetime"
                      id="orderdatetime"
                      value={this.state.orderdatetime}
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Order Player</th>
                  <td>
                    <input
                      name="orderplayer"
                      id="orderplayer"
                      value={this.state.orderplayer}
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Order User</th>
                  <td>
                    <input
                      name="orderuser"
                      id="orderuser"
                      value={this.state.orderuser}
                      onChange={this.handleChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <input type="submit" value="Search Order" />
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

var OrderUpdateform = React.createClass({
  getInitialState: function () {
    return {
      uporderkey: "",
      uporderid: "",
      uporderdate: "",
      uporderplayer: "",
      uporderuser: "",
    };
  },
  handleUpOptionChange: function (e) {
    this.setState({
      upselectedOption: e.target.value,
    });
  },
  handleUpSubmit: function (e) {
    e.preventDefault();

    var uporderkey = upordkey.value;
    var uporderid = upordid.value;
    var uporderplayer = upordplayer.value;
    var uporderdate = uporddate.value;
    var uporderuser = uporduser.value;

    this.props.onUpdateSubmit({
      uporderkey: uporderkey,
      uporderid: uporderid,
      uporderdate: uporderdate,
      uporderplayer: uporderplayer,
      uporderuser: uporderuser,
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
                  <th>Order ID</th>
                  <td>
                    <input
                      type="text"
                      name="upordid"
                      id="upordid"
                      value={this.state.upordid}
                      onChange={this.state.handleUpChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Order Date</th>
                  <td>
                    <input
                      name="uporddate"
                      id="uporddate"
                      value={this.state.uporddate}
                      onChange={this.state.handleUpChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Order Player</th>
                  <td>
                    <input
                      name="upordplayer"
                      id="upordplayer"
                      value={this.state.upordplayer}
                      onChange={this.state.handleUpChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Order User</th>
                  <td>
                    <input
                      name="uporduser"
                      id="uporduser"
                      value={this.state.uporduser}
                      onChange={this.state.handleUpChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <input
              type="hidden"
              name="upordkey"
              id="upordkey"
              onChange={this.handleUpChange}
            />
            <input type="submit" value="Update Order" />
          </form>
        </div>
      </div>
    );
  },
});

var OrderList = React.createClass({
  render: function () {
    var orderNodes = this.props.data.map(function (order) {
      return (
        <Order
          key={order.dborder_id}
          ordkey={order.dborder_id}
          ordid={order.dborder_id}
          orddate={order.dborder_datetime}
          ordplayer={order.dbplayer_id}
        ></Order>
      );
    });

    //print all the nodes in the list
    return <tbody>{orderNodes}</tbody>;
  },
});

var Order = React.createClass({
  getInitialState: function () {
    return {
      upordkey: "",
      singledata: [],
    };
  },
  updateRecord: function (e) {
    e.preventDefault();
    var theupordkey = this.props.ordkey;

    this.loadSingleEmp(theupordkey);
  },
  loadSingleEmp: function (theupordkey) {
    $.ajax({
      url: "/getsingleord",
      data: {
        upordkey: theupordkey,
      },
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ singledata: data });
        console.log(this.state.singledata);
        var populateEmp = this.state.singledata.map(function (order) {
          upordkey.value = theupordkey;
          upordplayer.value = order.dbplayer_id;
          upordid.value = order.dborder_id;
          uporduser.value = order.dbuser_id;
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
        <td>{this.props.ordkey}</td>
        <td>{this.props.ordid}</td>
        <td>{this.props.orddate}</td>
        <td>{this.props.ordplayer}</td>
        <td>
          <form onSubmit={this.updateRecord}>
            <input type="submit" value="Update Record" />
          </form>
        </td>
      </tr>
    );
  },
});

ReactDOM.render(<OrderBox />, document.getElementById("content"));
