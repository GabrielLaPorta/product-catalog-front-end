import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
            categories: []
        };
  
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.navigate = useNavigate;
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
            }).catch((error) => {
                console.log(error)
                throw error;
            });
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
                    <input name="image" type="file" onChange={this.handleInputChange} className="Form-Field" required/>
                    <br/>
                    <input type="submit" value="Salvar" className="Form-Btn"/>
                </form>
            </Grid>
            <Footer/>
        </>
        
      );
    }
  }

export default ProductForm;