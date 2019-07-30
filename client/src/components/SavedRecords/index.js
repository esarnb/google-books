import React from 'react'
import Button from 'antd/es/button';
import "./style.css";

function Saved(props) {
    console.log("SAVED PROPS", props.book);
    
    const {title, authors, description, image, infoLink, _id} = props.book;
    console.log("THE TITLE: ", title);
    console.log(_id);
    
    
    return(
        <span>
            <div className="floatLeft">
                <img src={image} alt={title}/>
                <br/>
            </div>
                <Button key="ViewBtnComponent" data-bookid={_id} className="btn View" type="primary"><a href={infoLink} target="_blank" rel="noopener noreferrer">View</a></Button>   
                <Button key="SaveBtnComponent" data-bookid={_id} className="btn Save" type="primary" onClick={() => props.deleteBook(_id)}>Delete</Button>
            <div>
                <p>Title: {title ? title : "N/A"}</p>
                <p>Authors: {authors ? authors.join(", ") : "N/A"}</p>
                <p>Description: {description ? description : "N/A"}</p>
            </div>

            <hr/><br/>
        </span>
    )
}

export default Saved