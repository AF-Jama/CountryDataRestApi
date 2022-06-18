//creating schema for incoming payloads
const Joi = require('joi')

// payload country schema
const countrySchema = Joi.object({
    name:Joi.string().required(),
    Population: Joi.string().required(),
    Yearly_Change:Joi.string().required(),
    Net_Population_Change:Joi.string().required(),
    Population_Density:Joi.string().required(),
    Land_Area:Joi.string().required(),
    Net_Migrants:Joi.string().required(),
    Fertilisation_rate:Joi.string().required(),
    Median_Age:Joi.string().required(),
    Urban_Pop_Percentage:Joi.string().required(),
    World_Share:Joi.string().required()
})

// payload patch schema
const patchCountrySchema = Joi.object({
    Population:Joi.string().optional(),
    Yearly_Change:Joi.string().optional(),
    Net_Population_Change:Joi.string().optional(),
    Population_Density:Joi.string().optional(),
    Land_Area:Joi.string().optional(),
    Net_Migrants:Joi.string().optional(),
    Fertilisation_rate:Joi.string().optional(),
    Median_Age:Joi.string().optional(),
    Urban_Pop_Percentage:Joi.string().optional(),
    World_Share:Joi.string().optional()
})




module.exports = {
    countrySchema,
    patchCountrySchema
}