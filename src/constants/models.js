const models = {
    user: {
        image_url: null,
        name: null,
        language: null,
        points: null
    },
    
    car: {
        image_url: String,
        manufacturer: 'Mercedes-Benz',
        model: String,
        year: Number,
        doors: Number,
        type: String,
        description: String,
        fueltype: String,
        gearbox: String,
        km: Number,
        liters: Number, 
        price: Number,
        monthly_price: Number,
        seats: Number,
        location: String,
    },
    
    order: {
        user_id: null,
        car_id: null,
        starts_at: null,
        ends_at: null,
        active: null
    },

    types: [
        'SUV',
        'Sedan',
        'Coupe',
        'Hatchback',
        'Crossover',
        'Convertible',
        'Pickup',
        'Van',
        'Minivan',
        'Wagon',
    ]
}

export default models;
