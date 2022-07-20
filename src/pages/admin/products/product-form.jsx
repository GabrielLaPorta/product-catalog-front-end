import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Menu from '../../../components/menu';
import Footer from '../../../components/footer';
import { Grid } from "@material-ui/core";
import './product.css'

class ProductForm extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: '',
            description: '',
            price: null,
            categoryId: null,
            image: null,
            imageUrl: null,
            categories: []
        };
  
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentWillMount() {
        await axios.get(`${process.env.REACT_APP_API_URL}/category`).then((response) => {
            const { data } = response;
            if (data) {
                this.setState({
                    categories: data,
                    categoryId: data[0].id
                });
            }
        }).catch((error) => {
            console.log(error)
        });
        if(this.props.params.id){
            axios.get(`${process.env.REACT_APP_API_URL}/product/${this.props.params.id}`,  {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('app-token'),
                }
            }).then((response) => {
                const { data } = response;
                this.setState({
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    categoryId: data.category_id,
                    imageUrl: data.image_url,
                });
            }).catch((error) => {
                console.log(error)
            })
        }
    }
  
    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.type === 'file' ? target.files[0] :target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }

    async handleSubmit(event) {
        event.preventDefault();
        let imageUrl;
        try {
            if(this.state.image){
                const formData = new FormData();
    
                formData.append("image", this.state.image, this.state.image.name);
                await axios.post(`${process.env.REACT_APP_API_URL}/product/upload-image`,formData, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('app-token'),
                        'Content-Type': 'multipart/form-data'
                    }
                }
                ).then((response) => {
                    const {data} = response;
                    if(data.imageUrl){
                        imageUrl = data.imageUrl;
                    }
                }).catch((error) => {
                    console.log(error);
                    throw error;
                });
            }
            if(this.props.params.id){
                await axios.put(`${process.env.REACT_APP_API_URL}/product/${this.props.params.id}`, {
                    name: this.state.name,
                    description: this.state.description,
                    price: this.state.price,
                    imageUrl: imageUrl ?? this.state.imageUrl,
                    categoryId: this.state.categoryId
                }, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('app-token')
                    }
                }).then((response) => {
                    this.setState({
                        name: '',
                        description: '',
                        price: null,
                        categoryId: null,
                        image: null,
                    });
                    this.props.navigate("/admin/products");
                }).catch((error) => {
                    console.log(error)
                    throw error;
                });
            } else {
                await axios.post(`${process.env.REACT_APP_API_URL}/product`, {
                    name: this.state.name,
                    description: this.state.description,
                    price: this.state.price,
                    imageUrl: imageUrl,
                    categoryId: this.state.categoryId
                }, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('app-token')
                    }
                }).then((response) => {
                    this.setState({
                        name: '',
                        description: '',
                        price: null,
                        categoryId: null,
                        image: null,
                    });
                    this.props.navigate("/admin/products");
                }).catch((error) => {
                    console.log(error)
                    throw error;
                });
            }
        } catch (error) {
            console.log(error)
        }
    }
  
    render() {
      return (
        <>
            <Menu />
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center">
                <h1>Produto</h1>
                {this.state.imageUrl && 
                    <img src={this.state.imageUrl} alt="imagem do produto" style={{height: "250px"}}/>
                }
                <br/>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Nome:
                        <input
                        name="name"
                        type="text"
                        className="Form-Field"
                        required
                        value={this.state.name}
                        onChange={this.handleInputChange} />
                    </label>
                    <br />
                    <label>
                        Descrição:
                        <input
                        name="description"
                        type="text"
                        required
                        className="Form-Field"
                        value={this.state.description}
                        onChange={this.handleInputChange} />
                    </label>
                    <br/>
                    <label>
                        Valor:
                        <input
                        name="price"
                        type="number"
                        required
                        className="Form-Field"
                        value={this.state.price}
                        onChange={this.handleInputChange} />
                    </label>
                    <br/>
                    <label>
                        Categoria:
                        <select name="categoryId" value={this.state.categoryId} onChange={this.handleInputChange} className="Form-Field" required>
                            {this.state.categories.length > 0 && 
                                this.state.categories.map((row) => (
                                    <option key={row.id} value={row.id}>{row.name}</option>
                                ))
                            }
                        </select>
                    </label>
                    {!this.state.imageUrl ?
                        <input name="image" type="file" onChange={this.handleInputChange} className="Form-Field" required/>
                        : <input name="image" type="file" onChange={this.handleInputChange} className="Form-Field"/>
                    }
                    <br/>
                    <input type="submit" value="Salvar" className="Form-Btn"/>
                </form>
            </Grid>
            <Footer/>
        </>
        
      );
    }
  }

function ProductFormWithNavigate(props) {
    let navigate = useNavigate();
    let params = useParams();
    return <ProductForm {...props} navigate={navigate} params={params}/>
}

export default ProductFormWithNavigate;