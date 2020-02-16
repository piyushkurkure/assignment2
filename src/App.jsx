class ProductTable extends React.Component {
  render() {
    const productRows = this.props.products.map(product =>
      <ProductRow key={product.id} product={product} />
    );
    return (
      <div>
        <p> Showing all available products</p> <hr/>
        <table className="bordered-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {productRows}
          </tbody>
        </table>
      </div>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    return (
      <tr>
        <td>{product.name}</td>
        <td>${product.price}</td>
        <td>{product.category}</td>
        <td><a href={product.image} target="_blank">View</a></td>
      </tr>
    );
  }
}

class ProductAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.productAdd;
    const product = {
      category: form.category.value,
      price: form.price.value.slice(1),
      name: form.name.value,
      image: form.image.value
    }
    this.props.createProduct(product);

  }
  render() {
    return (
      <section>
      <p>Add a new product to inventory</p>
      <hr />
      <form name = "productAdd" onSubmit={this.handleSubmit}>
        <div className="inputs">
          <label htmlFor="category">Category</label>
          <select name="category" id="category">
            <option value="Accessories">Accessories</option>
            <option value="Shirts">Shirts</option>
            <option value="Jeans">Jeans</option>
            <option value="Jackets">Jackets</option>
            <option value="Sweaters">Sweaters</option>
          </select>
        </div>
        <div className="inputs">
          <label htmlFor="price">Price per unit</label>
          <input type="text" id="price" defaultValue="$"/>
        </div>
        <div className="inputs">
          <label htmlFor="name">Product Name</label>
          <input type="text" id="name" />
        </div>
        <div className="inputs">
          <label htmlFor="image">Image URL</label>
          <input type="text" id="image" />
        </div>

        <button>Add Product</button>
      </form>
    </section>
      
    );
  }
}

class ProductList extends React.Component {
  constructor() {
    super();
    this.state = { products: [] };
    this.createProduct = this.createProduct.bind(this);
  }

  createProduct(product) {
    product.id = this.state.products.length + 1;
    const newProductList = this.state.products.slice();
    newProductList.push(product);
    this.setState({ products: newProductList });
  }
  render() {
    return (
      <React.Fragment>
        <h1>My Company Inventory</h1>
        <ProductTable products={this.state.products} />
        <ProductAdd createProduct={this.createProduct} />
      </React.Fragment>
    );
  }
}

const element = <ProductList />;
ReactDOM.render(element, document.getElementById('contents'));