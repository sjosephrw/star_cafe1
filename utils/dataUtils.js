const axios = require('axios');

const { ErrorHandler } = require('./errorUtils');

//https://stackoverflow.com/questions/54055935/my-call-async-await-returns-a-promise-pending-in-my-actions
const locationIQAPIRequest = async (APITOKEN, data, cb) => {//the cb function will be the next object from req, res, next

    try {

        const res = await axios(`https://us1.locationiq.com/v1/search.php?key=${APITOKEN}&q=${encodeURI(data)}&format=json`, { mode : 'cors' });            
        console.log(res);
        return [parseFloat(res.data[0].lon), parseFloat(res.data[0].lat)]; 

    } catch (err) {
        //the cb function will be the next object from req, res, next
        cb(new ErrorHandler(500 `Failed to connect to LocationIQ API 🌩`))
    }

} 


exports.prepareDataForDbInsertion = (req, APITOKEN=null, next) => {

  console.log(req.body)

    if (req.body.collection === 'slideshow'){

      return req.body;

    } else if (req.body.collection === 'menu'){

      return req.body;

//https://stackoverflow.com/questions/455338/how-do-i-check-if-an-object-has-a-key-in-javascript
    } else if (req.body.collection === 'category'){

      return req.body;
    
    } else if (req.body.collection === 'product'){

      return req.body;

    } else {

      return req.body;

    }

}
//****************THIS WAS NECESSARY ONLY WHEN WE WERE USING NESTED ROUTES */
exports.processReqParams = (options, req) => {
  
  let id = null;
  let filter = {};

    if (options === 'Delete category'){
      id = req.params.categoryId;

    } else if (options === 'Update category'){
      id = req.params.categoryId;

    } else if (options === 'Get category'){
      id = req.params.categoryId;

    } else if (options === 'Get categories'){
      
      filter.menu = req.params.id;   
      return filter;
      
    } else if (options === 'Delete product'){
      id = req.params.productId;

    } else if (options === 'Update product'){
      id = req.params.productId;

    } else if (options === 'Get product'){
      id = req.params.productId;

    } else if (options === 'Get products'){
      
      filter.category = req.params.categoryId;   
      return filter;

    } else {
      id = req.params.id;
    }

    return id;    
  

  
}
