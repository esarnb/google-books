import React, { Component } from 'react';
import API from '../utils/API';
import Container from '../components/Container';
import Input from '../components/Input';
import FormBtn from '../components/FormBtn';
import Records from '../components/Records';


class Search extends Component {
    state = {
        search: '',
        books: [],
        title: '',
        image: '',
        author: '',
        description: '',
        btnTxt: "Search"
    }

    componentDidMount() {
        // this.loadBooks();
    }

    loadBooks = search => {
        API.findBooks(search).then(res => 
            this.setState({ books: res.data, title: "", author: "", image: '', description: "" })
        ).catch(err => console.log(err))
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        this.setState({
            btnTxt: "Searching..."
        })
        console.log("i love donuts", this.state.search)
    
        API.findBooks(this.state.search).then(res => this.setState({
            books: res.data,
            btnTxt: "Search"
        }))
        .catch(err => console.log(err)) 
    }

    render() {
        console.log(this.state.books)
        return (
            <Container>
                <form>
                    <Input
                        value={this.state.search}
                        onChange={this.handleInputChange}
                        name='search'
                        placeholder="Enter a book title"
                    />
                    <FormBtn
                        onClick={this.handleFormSubmit}
                    >
                        {this.state.btnTxt}
                    </FormBtn>
                </form>

                {(this.state.books.length)? 
                    this.state.books.map((book, i)=>(
                        <React.Fragment>
                            <Records key={i} book={book.volumeInfo}></Records>
                        </React.Fragment>
                    ))
                : <h3>No Saved Books</h3>}
            </Container>
        )
    }
}

export default Search;