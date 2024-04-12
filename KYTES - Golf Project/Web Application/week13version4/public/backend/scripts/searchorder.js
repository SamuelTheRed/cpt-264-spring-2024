var OrderBox = React.createClass({
  getInitialState: function () {
    return { orddata: [], itmdata: [] };
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
  loadOrderItemsFromServer: function () {
    console.log(orderitemid.value);
    $.ajax({
      url: "/getorderitem",
      itmdata: {
        orderitemid: orderitemid.value,
        orderitemproduct: orderitemproduct.value,
        orderitemorder: orderitemorder.value,
        orderitemquantity: orderitemquantity.value,
      },
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ itmdata: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  },
  componentDidMount: function () {
    this.loadOrdersFromServer();
    this.loadOrderItemsFromServer();
  },

  render: function () {
    return (
      <div id="theresults">
        <div id="theleft">
          <h1>Orders</h1>
          <Orderform onOrderSubmit={this.loadOrdersFromServer} />
          <br />
          <table>
            <thead>
              <tr>
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
          <h1>Orders Items</h1>
          <OrderItemform onOrderItemSubmit={this.loadOrderItemsFromServer} />
          <br />
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Order</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <OrderItemList data={this.state.itmdata} />
          </table>
        </div>
      </div>
    );
  },
});

var Orderform = React.createClass({
  getInitialState: function () {
    return {
      orderid: "",
      orderdatetime: "",
      orderplayer: "",
      orderuser: "",
    };
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
    );
  },
});
var OrderList = React.createClass({
  render: function () {
    var orderNodes = this.props.data.map(function (order) {
      //map the data to individual
      return (
        <Order
          key={order.dborder_id}
          ordid={order.dborder_id}
          orddatetime={order.dborder_datetime}
          ordplayer={order.dbplayer_lastname}
          orduser={order.dbuser_firstname}
        ></Order>
      );
    });

    //print all the nodes in the list
    return <tbody>{orderNodes}</tbody>;
  },
});
var Order = React.createClass({
  render: function () {
    return (
      <tr>
        <td>{this.props.ordid}</td>
        <td>{this.props.orddatetime}</td>
        <td>{this.props.ordplayer}</td>
        <td>{this.props.orduser}</td>
      </tr>
    );
  },
});

var OrderItemform = React.createClass({
  getInitialState: function () {
    return {
      orderitemid: "",
      orderitemproduct: "",
      orderitemorder: "",
      orderitemquantity: "",
    };
  },
  handleSubmit: function (e) {
    e.preventDefault();

    var orderitemid = this.state.orderitemid.trim();
    var orderitemproduct = this.state.orderitemproduct.trim();
    var orderitemorder = this.state.orderitemorder.trim();
    var orderitemquantity = this.state.orderitemquantity.trim();

    this.props.onOrderItemSubmit({
      orderitemid: orderitemid,
      orderitemproduct: orderitemproduct,
      orderitemorder: orderitemorder,
      orderitemquantity: orderitemquantity,
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
        <h2>Search Through OrderItems</h2>
        <table>
          <tbody>
            <tr>
              <th>OrderItem ID</th>
              <td>
                <input
                  type="text"
                  name="orderitemid"
                  id="orderitemid"
                  value={this.state.orderitemid}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>Order Item Product Name</th>
              <td>
                <input
                  name="orderitemproduct"
                  id="orderitemproduct"
                  value={this.state.orderitemproduct}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>Order ID</th>
              <td>
                <input
                  name="orderitemorder"
                  id="orderitemorder"
                  value={this.state.orderitemorder}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>Order Item Quantity</th>
              <td>
                <input
                  name="orderitemquantity"
                  id="orderitemquantity"
                  value={this.state.orderitemquantity}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="Search Order Item" />
      </form>
    );
  },
});
var OrderItemList = React.createClass({
  render: function () {
    console.log(this.props.data);
    var orderItemNodes = this.props.data.map(function (orderitem) {
      //map the data to individual
      return (
        <OrderItem
          key={orderitem.dborderitem_id}
          orditmid={orderitem.dborderitem_id}
          orditmproduct={orderitem.dbproduct_name}
          orditmorder={orderitem.dborder_id}
          orditmquantity={orderitem.dbordeeritem_quantity}
        ></OrderItem>
      );
    });

    //print all the nodes in the list
    return <tbody>{orderItemNodes}</tbody>;
  },
});
var OrderItem = React.createClass({
  render: function () {
    return (
      <tr>
        <td>{this.props.orditmid}</td>
        <td>{this.props.orditmproduct}</td>
        <td>{this.props.orditmorder}</td>
        <td>{this.props.orditmquantity}</td>
      </tr>
    );
  },
});

ReactDOM.render(<OrderBox />, document.getElementById("content"));
