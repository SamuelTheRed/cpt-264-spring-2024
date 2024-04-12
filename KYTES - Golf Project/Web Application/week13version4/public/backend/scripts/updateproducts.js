var ProductBox = React.createClass({
  getInitialState: function () {
    return { data: [] };
  },
  // Load all product items from the database
  loadProductsFromServer: function () {
    console.log(productid.value);
    $.ajax({
      url: "/getproduct",
      // Stores the data
      data: {
        productid: productid.value,
        productname: productname.value,
        productprice: productprice.value,
        productquantity: productquantity.value,
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
  updateSinglePdcFromServer: function (product) {
    $.ajax({
      url: "/updatesinglepdc",
      dataType: "json",
      data: product,
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
    this.loadProductsFromServer();
    // setInterval(this.loadProductsFromServer, this.props.pollInterval);
  },

  render: function () {
    return (
      <div>
        <h1>Update Products</h1>
        <Productform onProductSubmit={this.loadProductsFromServer} />
        <br />
        <div id="theresults">
          <div id="theleft">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <ProductList data={this.state.data} />
            </table>
          </div>
          <div id="theright">
            <ProductUpdateform
              onUpdateSubmit={this.updateSinglePdcFromServer}
            />
          </div>
        </div>
      </div>
    );
  },
});

var Productform = React.createClass({
  getInitialState: function () {
    return {
      productname: "",
      productdescription: "",
      productprice: "",
      productquantity: "",
    };
  },
  handleOptionChange: function (e) {
    this.setState({
      selectedOption: e.target.value,
    });
  },

  handleSubmit: function (e) {
    e.preventDefault();

    var productname = this.state.productname.trim();
    var productdescription = this.state.productdescription.trim();
    var productprice = this.state.productprice.trim();
    var productquantity = this.state.productquantity.trim();

    this.props.onProductSubmit({
      productname: productname,
      productdescription: productdescription,
      productprice: productprice,
      productquantity: productquantity,
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
          <form className="form_area" onSubmit={this.handleSubmit}>
            <h2>Search Through Products</h2>
            <div className="table_area">
              <table className="form_table">
                <tbody>
                  <tr>
                    <th>Product ID</th>
                    <td>
                      <input
                        type="text"
                        name="productid"
                        id="productid"
                        value={this.state.productid}
                        onChange={this.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Product Name</th>
                    <td>
                      <input
                        type="text"
                        name="productname"
                        id="productname"
                        value={this.state.productname}
                        onChange={this.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Product Price</th>
                    <td>
                      <input
                        type="text"
                        name="productprice"
                        id="productprice"
                        value={this.state.productprice}
                        onChange={this.handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Product Quantity</th>
                    <td>
                      <input
                        type="text"
                        name="productquantity"
                        id="productquantity"
                        value={this.state.productquantity}
                        onChange={this.handleChange}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* Submit Search Button */}
              <input
                type="submit"
                className="form_submit"
                value="Search Product"
              />
            </div>
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

var ProductUpdateform = React.createClass({
  getInitialState: function () {
    return {
        upproductid: "",
        upproductname: "",
        upproductdescription: "",
        upproductprice: "",
        upproductquantity: "",
    };
  },
  handleUpOptionChange: function (e) {
    this.setState({
      upselectedOption: e.target.value,
    });
  },
  handleUpSubmit: function (e) {
    e.preventDefault();

    var upproductid = uppdcid.value;
    var upproductname = uppdcname.value;
    var upproductdescription = uppdcdescription.value;
    var upproductprice = uppdcprice.value;
    var upproductquantity = uppdcquantity.value;

    this.props.onUpdateSubmit({
        upproductid: upproductid,
        upproductname: upproductname,
        upproductdescription: upproductdescription,
        upproductprice: upproductprice,
        upproductquantity: upproductquantity,
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
                <th>Product Name</th>
                <td>
                  <input
                    type="text"
                    name="uppdcname"
                    id="uppdcname"
                    value={this.state.uppdcname}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <th>Product Description</th>
                <td>
                  <input
                    type="text"
                    name="uppdcdescription"
                    id="uppdcdescription"
                    value={this.state.uppdcdescription}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <th>Product Price</th>
                <td>
                  <input
                    type="text"
                    name="uppdcprice"
                    id="uppdcprice"
                    value={this.state.uppdcprice}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <th>Product Quantity</th>
                <td>
                  <input
                    type="text"
                    name="uppdcquantity"
                    id="uppdcquantity"
                    value={this.state.uppdcquantity}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              </tbody>
            </table>
            <br />
            <input
              type="hidden"
              name="uppdcid"
              id="uppdcid"
              onChange={this.handleUpChange}
            />
            <input type="submit" value="Update Product" />
          </form>
        </div>
      </div>
    );
  },
});

var ProductList = React.createClass({
  render: function () {
    var productNodes = this.props.data.map(function (product) {
      return (
        <Product
          key={product.dbproduct_id}
          pdcid={product.dbproduct_id}
          pdcname={product.dbproduct_name}
          pdcprice={product.dbproduct_price}
        ></Product>
      );
    });

    //print all the nodes in the list
    return <tbody>{productNodes}</tbody>;
  },
});

var Product = React.createClass({
  getInitialState: function () {
    return {
      uppdcid: "",
      singledata: [],
    };
  },
  updateRecord: function (e) {
    e.preventDefault();
    var theuppdcid = this.props.pdcid;

    this.loadSinglePdc(theuppdcid);
  },
  loadSinglePdc: function (theuppdcid) {
    $.ajax({
      url: "/getsinglepdc",
      data: {
        uppdcid: theuppdcid,
      },
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ singledata: data });
        console.log(this.state.singledata);
        var populatePdc = this.state.singledata.map(function (product) {
          uppdcid.value = theuppdcid;
          uppdcname.value = product.dbproduct_name;
          uppdcdescription.value = product.dbproduct_description;
          uppdcprice.value = product.dbproduct_price;
          uppdcquantity.value = product.dbproduct_quantity;
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
        <td>{this.props.pdcid}</td>
        <td>{this.props.pdcname}</td>
        <td>${this.props.pdcprice}</td>
        <td>
          <form onSubmit={this.updateRecord}>
            <input type="submit" value="Update Record" />
          </form>
        </td>
      </tr>
    );
  },
});

ReactDOM.render(<ProductBox />, document.getElementById("content"));
