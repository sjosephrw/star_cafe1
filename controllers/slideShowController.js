//models
const SlideShow = require('../models/slideShowModel');

//controllers
const factory = require('./handlerFactory');

exports.getAllSlides = factory.getAll(SlideShow);

exports.createSlide = factory.createOne(SlideShow);

exports.getSlide = factory.getOne(SlideShow);

exports.updateSlide = factory.updateOne(SlideShow);

exports.deleteSlide = factory.deleteOne(SlideShow);




