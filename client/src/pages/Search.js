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

            API.saveBook(saveProps).then(res => {
                this.setState({ books: this.state.books.filter(x => x.volumeInfo.infoLink !== res.data.link) })
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
        //While searching for books, change btn to searching
        this.setState({
            btnTxt: "Searching..."
        })

        //Filter out all saved books from the search query
        API.findBooks(this.state.search).then(res1 => {
            console.log("RES 1", res1)

            API.getSavedBooks().then(async (res2) => {
                let newState = await res1.data.filter(x => !(res2.data.map(y => y.link).includes(x.volumeInfo.infoLink)));
                this.setState({ books: newState })
            })
        }).catch(err => console.log(err))
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

                {(this.state.books.length) ?
                    this.state.books.map((book, i) => (
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