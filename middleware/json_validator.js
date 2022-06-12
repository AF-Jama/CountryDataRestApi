const countrySchema = {
    type: "object",
	required: ["name", "Population","Yearly_Change","Net_Population_Change","Population_Density","Land_Area","Net_Migrants","Fertilisation_rate","Median_Age","Urban_Pop_Percentage","World_Share"],
	properties: {
		Population: {
			type: "string",
			minLength: 1,
		},
		Yearly_Change: {
			type: "string",
			minLength: 1,
		},
        Net_Population_Change:{
            type:'string',
            minLength:1,
        },
        Population_Density:{
            type:'string',
            minLength:1,
        },
        Land_Area:{
            type:'string',
            minLength:1,
        },
        Net_Migrants:{
            type:'string',
            minLength:1
        },
        Fertilisation_rate:{
            type:'string',
            minLength:1,
        },
        Median_Age:{
            type:'string',
            minLength:1,
        },
        Urban_Pop_Percentage:{
            type:'string',
            minLength:1,
        },
        World_Share:{
            type:'string',
            minLength:1,
        }
	}
};




const patchCountrySchema = {
    type: "object",
	required: [],
	properties: {
		Population: {
			type: "string",
			minLength: 1,
		},
		Yearly_Change: {
			type: "string",
			minLength: 1,
		},
        Net_Population_Change:{
            type:'string',
            minLength:1,
        },
        Population_Density:{
            type:'string',
            minLength:1,
        },
        Land_Area:{
            type:'string',
            minLength:1,
        },
        Net_Migrants:{
            type:'string',
            minLength:1
        },
        Fertilisation_rate:{
            type:'string',
            minLength:1,
        },
        Median_Age:{
            type:'string',
            minLength:1,
        },
        Urban_Pop_Percentage:{
            type:'string',
            minLength:1,
        },
        World_Share:{
            type:'string',
            minLength:1,
        }
	}
}


module.exports = {
    countrySchema,
    patchCountrySchema,
}