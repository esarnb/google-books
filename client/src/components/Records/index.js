import React from 'react'
import "./style.css";

function Results(props) {

    const {title, authors, description, imageLinks, infoLink} = props.book;
    console.log(props.book);
    
    return(
        <span  className="floatLeft paddingLeft">
            <div>
                <img src={imageLinks.smallThumbnail} alt={title}/>
                <br/>
                <button className ='btn view' ><a href={infoLink} rel="noopener noreferrer">View</a></button>
                <button className ='btn save' data-obj={props}>Save</button>
            </div>

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