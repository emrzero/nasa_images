import axios from 'axios';

const helper = {
  getData: (url) => {
    return axios.get(url).then(function(res){
      return res;
    }).catch(function(err){
      console.log(err);
    });
  }
}

export default helper;

