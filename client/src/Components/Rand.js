import React from 'react';
import axios from 'axios';

import NImage from './Images'

class Rand extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
    query: "",
    results: {
      collection: {
        items: [
          {
            href: "https://images-assets.nasa.gov/image/PIA17666/collection.json",
            links: [
              {
                href: "https://images-assets.nasa.gov/image/PIA17666/PIA17666~thumb.jpg",
                rel: "preview",
                render: "image"
              }
            ],
            data: [
              {
                media_type: "image",
                keywords: [],
                date_created: "2014-01-24T16:18:31Z",
                title: "Rosetta at Comet",
                description: "Artist impression of the Rosetta orbiter at comet 67P/Churyumova-Gerasimenko. The image is not to scale.",
                nasa_id: "PIA17666",
                center: "JPL"
              }
            ]
          },
        ]
      }
    }
   };
  }
  componentWillMount () {
    this.getRandom();
  }

  handleChange(e) {
    this.setState({query: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    var self = this;
    axios({
      method: 'post',
      url: 'http://localhost:8180/search',
      data: {
        searchTerm: self.state.query
      }
    }).then(function(res){
      return res.data;
    }).then(function(r){
      self.setState({results: r})
    })
    .catch(function(err){
      console.log(err);
    });
  }

  getRandom () {
    var self = this;
    axios({
      method: 'get',
      url: 'http://localhost:8180/random'
    }).then(function(res){
      return res.data;
    }).then(function(r){
      self.setState({results: r});
    }).catch(function(err){
      console.log(err);
    });
  }

  getImageURL (nasa_id) {
    axios({
      method: 'post',
      url: 'http://localhost:8180/image',
      data: {
        nasa_id: nasa_id,
      }

    }).then(function(res){
      console.log(res);
    }).catch(function(err){
      console.log(err);
    })

  }

  

  render() {
    return (
        <div>
          <form>
            <input type="text" onChange={this.handleChange.bind(this)}/>
            <button type="submit" onClick={this.handleSubmit.bind(this)}>Search</button>
            <button type="button" onClick={this.getRandom.bind(this)}>Get Random </button>
          </form>
          <div className="results">
            {this.state.results.collection.items.map(function(el, i){
              return <NImage key={i} src={el.links[0].href} title={el.data[0].title} description={el.data[0].description} />}
            )}
          </div>
        </div>
      )
  }
}


export default Rand;