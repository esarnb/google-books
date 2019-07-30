import React from 'react'
import Button from 'antd/es/button';
import "./style.css";

function Results(props) {

    const {title, authors, description, imageLinks, infoLink, id} = props.book;
    // console.log(props.book);
    
    return(
        <span>
            <div className="floatLeft">
                <img src={imageLinks.smallThumbnail} alt={title}/>
                <br/>
            </div>
                <Button key="ViewBtnComponent" data-bookid={id} className="btn View" type="primary"><a href={infoLink} target="_blank" rel="noopener noreferrer">View</a></Button>   
                <Button key="SaveBtnComponent" data-bookid={id} className="btn Save" type="primary" onClick={() => props.saveBook({...props})}>Save</Button>
                   
                {/* <Button data-bookID={id} type="Delete"/>    */}
            <div>
                <p>Title: {title ? title : "N/A"}</p>
                <p>Authors: {authors ? authors.join(", ") : "N/A"}</p>
                <p>Description: {description ? description : "N/A"}</p>
            </div>

            <hr/><br/>
        </span>
    )
}

export default Results