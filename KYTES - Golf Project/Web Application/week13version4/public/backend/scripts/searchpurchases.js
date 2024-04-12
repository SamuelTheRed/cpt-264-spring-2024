var PurchaseBox = React.createClass({
  getInitialState: function () {
    return { data: [] };
  },
  // Load all purchases items from the database
  loadPurchasesFromServer: function () {
    console.log(purchaseid.value);
    $.ajax({
      url: "/getpurchase",
      // Stores the data
      data: {
        purchaseid: purchaseid.value,
        purchaseinformation: statusnum.value,
        purchasedatetime: purchasedatetime.value,
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
  // When site is loaded, load purchases
  componentDidMount: function () {
    this.loadPurchasesFromServer();
  },

  render: function () {
    return (
      <div>
        {/* Page Title */}
        <div className="page_title">
          <h1>Purchases</h1>
        </div>
        {/* Purchase Form */}
        <Purchaseform onPurchaseSubmit={this.loadPurchasesFromServer} />
        <br />
        <div className="result_table">
          {/* Result Table */}
          <table>
            <thead>
              <tr className="result_headers">
                <th>ID</th>
                <th>Information</th>
                <th>Datetime</th>
              </tr>
            </thead>
            <PurchaseList data={this.state.data} />
          </table>
        </div>
      </div>
    );
  },
});

var Purchaseform = React.createClass({
  getInitialState: function () {
    return {
      purchaseid: "",
      purchaseinformation: "",
      purchasedatetime: "",
    };
  },
  handleSubmit: function (e) {
    e.preventDefault();

    var purchaseid = this.state.purchaseid.trim();
    var purchaseinformation = this.state.purchaseinformation.trim();
    var purchasedatetime = this.state.purchasedatetime.trim();

    this.props.onPurchaseSubmit({
      purchaseid: purchaseid,
      purchaseinformation: purchaseinformation,
      purchasedatetime: purchasedatetime,
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
        <h2>Search Through Purchases</h2>
        <table>
          <tbody>
            <tr>
              <th>Purchase ID</th>
              <td>
                <input
                  type="text"
                  name="purchaseid"
                  id="purchaseid"
                  value={this.state.purchaseid}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>Purchase Information</th>
              <td>
                <StatusList data={this.state.data}></StatusList>
              </td>
            </tr>
            <tr>
              <th>Purchase Datetime</th>
              <td>
                <input
                  name="purchasedatetime"
                  id="purchasedatetime"
                  value={this.state.purchasedatetime}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <input type="submit" value="Search Purchase" />
      </form>
    );
  },
});
var PurchaseList = React.createClass({
  render: function () {
    var purchaseNodes = this.props.data.map(function (purchase) {
      //map the data to individual
      return (
        <Purchase
          key={purchase.dborder_id}
          purid={purchase.dborder_id}
          purinformation={purchase.dbpurchase_status}
          purdatetime={purchase.dbpurchase_datetimefulfilled}
        ></Purchase>
      );
    });

    //print all the nodes in the list
    return <tbody>{purchaseNodes}</tbody>;
  },
});

var Purchase = React.createClass({
  render: function () {
    return (
      <tr>
        <td>{this.props.purid}</td>
        <td>{this.props.purinformation}</td>
        <td>{this.props.purdatetime}</td>
      </tr>
    );
  },
});
var StatusList = React.createClass({
  render: function () {
    return (
      <select name="statusnum" id="statusnum">
        <option key="0" value="">
          --
        </option>
        <option key="1" value="Pending">
          Pending
        </option>
        <option key="2" value="Fulfilled">
          Fulfilled
        </option>
        <option key="3" value="Cancelled">
          Cancelled
        </option>
      </select>
    );
  },
});
ReactDOM.render(<PurchaseBox />, document.getElementById("content"));
