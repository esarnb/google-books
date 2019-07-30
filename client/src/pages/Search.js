import React, { Component } from 'react';
import API from '../utils/API';
import Container from '../components/Container';
import Input from '../components/Input';
import FormBtn from '../components/FormBtn';
import Records from '../components/Records';

// import Button from 'antd/es/button';
// import { blue } from '@ant-design/colors';
// <Button type="secondary" className="blueGold" style={{color: blue[4]}}>View Saved Books</Button>

class Search extends Component {
    state = {
        search: '',
        books: [],
        btnTxt: "Search"
    }

    saveBook = (bookData) => {
        if (bookData.book) {
            let saveProps = {
                title: bookData.book.title,
                authors: bookData.book.authors,
                image: bookData.book.imageLinks.smallThumbnail,
                description: bookData.book.description,
                link: bookData.book.infoLink,
            }
            
            
            console.log("BOOK DATA", bookData.book);
            API.saveBook(saveProps).then(res => {
                console.log("SAVED BOOK RES: ", res);
                console.log("SATE BOOK: ", this.state.books);
                this.setState({books: this.state.books.filter(x => x.volumeInfo.infoLink !== res.data.link)})
            })
        }
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

        API.findBooks(this.state.search).then(res => this.setState({
            books: res.data,
            btnTxt: "Search"
        }))
        .catch(err => console.log(err)) 
    }

    render() {
        return (
            <Container>
                <form>
                    <Input
                        value={this.state.search}
                        onChange={this.handleInputChange}
                        name='search'
                        placeholder="Enter a book title"
                    />

                    <FormBtn onClick={this.handleFormSubmit}>
                        {this.state.btnTxt}
                    </FormBtn>
                </form>

                {(this.state.books.length)? 
                    this.state.books.map((book, i)=>(
                        <React.Fragment key={`Fragment-${i}`}>
                            <Records key={`Record-${i}`} book={book.volumeInfo} saveBook={this.saveBook} ></Records>
                        </React.Fragment>
                    ))
                : <h3>No Saved Books</h3>}
            </Container>
        )
    }
}

export default Search;