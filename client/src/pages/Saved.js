import React, { Component } from 'react';
import API from '../utils/API';
import Container from '../components/Container';
import SavedRecords from '../components/SavedRecords';
// import Button from 'antd/es/button';
// import { blue } from '@ant-design/colors';
// <Button type="secondary" className="blueGold" style={{color: blue[4]}}>View Saved Books</Button>

class Saved extends Component {
    state = {
        search: '',
        books: [],
        btnTxt: "Search"
    }

    componentDidMount() {
        this.loadBooks()
    }

    loadBooks = () => {
        API.getSavedBooks().then(res => {
            console.log("FIND ALL BOOKS RES", res);
            this.setState({
                books: res.data
            })
        })
    }

    deleteBook = (id) => {
        console.log("DELETE ID: ", id);
        
        API.deleteBook(id).then(res => {
            console.log("DELETE BOOK RES: ", res);
            this.loadBooks()
        })
    }


    render() {
        console.log("SAVED BOOKS: ", this.state.books);
        
        return (
            <Container>
                {(this.state.books.length)? 
                    this.state.books.map((book, i)=>(
                        <React.Fragment key={`Fragment-${i}`}>
                            <SavedRecords key={`Save-${i}`} book={book} deleteBook={this.deleteBook} ></SavedRecords>
                        </React.Fragment>
                    ))
                : <h3>No Saved Books</h3>}
            </Container>
        )
    }
}

export default Saved;