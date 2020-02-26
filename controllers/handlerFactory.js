const tcWrapper = require('../utils/reusableTryCatchUtils');
const { ErrorHandler } = require('../utils/errorUtils');
const APIFeatures = require('../utils/apiFeaturesUtils');
const { prepareDataForDbInsertion, processReqParams } = require('../utils/dataUtils');

const groupedFunctionsObj = {
    deleteOne: (Model, options=null) => tcWrapper(async (req, res, next) => {

        const id = processReqParams(options, req)

        const doc = await Model.findById(id);

        //remove MW declared below model Scema in model file
        doc.remove();
    
        if(!doc){
            //when next receives anything it will jump directly into the global error handling MW
            return next(new ErrorHandler(404, 'No document was found with that ID'));
        }
    
        res.status(204).json(
        {
            status: 'success', 
            //when we are deleting we don't send data back we send null and status 204
            data: null
        });
        
    }), 

    updateOne: (Model, options=null) => tcWrapper( async (req, res, next) => {
        
        const id = processReqParams(options, req)

        const data = prepareDataForDbInsertion(req, null, next);

        console.log(data)

        const doc = await Model.findByIdAndUpdate(id, data, {
            new: true, //This will return the updated document, rather than the original
            runValidators: true//check for validation as specified in mongoose model
        });
    
        if(!doc){
            //when next receives anything it will jump directly into the global error handling MW
            return next(new ErrorHandler(404, 'No document was found with that ID'));
        }
    
        res.status(200).json(
            {
            status: 'success', 
            data: {
                data: doc
            }
        });
    }),

    createOne: (Model, options=null) => tcWrapper( async (req, res, next) => {

        const data = prepareDataForDbInsertion(req, null, next);

        const doc = await Model.create(data);
    
        res.status(201).json({
            status: 'success',
            data: {
                data: doc
            }
        });
    
    }),
//****THE 1ST OPTION WAS NECESSARY ONLY WHEN WE HAD NETED ROUTES */
    getOne: (Model, options=null, populate=null) => tcWrapper( async (req, res, next) => {

        const id = processReqParams(options, req)

        let query = Model.findById(id);
        if (populate) query.populate(populate);

        const doc = await query;

        if(!doc){
            //when next receives anything it will jump directly into the global error handling MW
            return next(new ErrorHandler(404, 'No document was found with that ID'));
        }

        res.status(200).json(
            {
            status: 'success', 
            data: {
                data: doc
            }
        });

    }),
    
    getAll: (Model, options=null, populate=null) => tcWrapper( async (req, res, next) => {

        const filter = processReqParams(options, req)

        const features = new APIFeatures(Model.find(filter), req.query).filter().sort().limitFields().paginate();
            
        if (populate) features.query.populate(populate);            

        // const tours = await query;
        const doc = await features.query;
    
    
        res.status(200).json(
            {
            status: 'success', 
            requestedAt: req.requestTime,
            results: doc.length,
            data: {
                data: doc
            }
        });
    
    })
}


const factory = groupedFunctionsObj;

module.exports = factory;
