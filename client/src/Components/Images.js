import React from 'react';

class NImage extends React.Component {
  render() {
    return (
      <div className="image-container">
        <h4 className="title">{this.props.title}</h4>
        <img src={this.props.src} alt="something"/>
        <p>{this.props.description}</p>
        <hr/>
      </div>
      )
  }
  
}

export default NImage;