var Pet = require('../models/pet');

var postPets = function(req, res) {
    var pet = new Pet();
    pet.name = req.body.name;
    pet.type = req.body.type;
    pet.quantity = req.body.quantity;

    pet.save(function (err) {
        if (err) {
            res.json({message: 'error', data: err});
            return;
        }

        res.json({message: 'done', data: pet});
    });
};

var getPets = function(req, res) {
    Pet.find(function (err, pets) {
        if (err) {
            res.json({message: 'error', data: err});
            return;
        }

        res.json({message: 'done', data: pets});
    });
};

var getPet = function(req, res) {
    Pet.findById(req.params.pet_id, function (err, pet) {
        if (err) {
            res.json({message: 'error', data: err});
            return;
        }
        res.json({message: 'done', data: pet});
    });
};

var updatePet = function(req, res) {
    Pet.findById(req.params.pet_id, function(err, pet) {
        if (err) {
            res.json({message: 'error', data: err});
            return;
        }

        pet.quantity = req.params.quantity;

        pet.save(function (err) {
            if (err) {
                res.json({message: 'error', data: err});
                return;
            }

            res.json({message: 'done', data: pet});
        });
    });
};

var deletePet = function(req, res) {
    Pet.findByIdAndRemove(req.params.pet_id, function(err) {
        if (err) {
            res.json({message: 'error', data: err});
            return;
        }

        res.json({message: 'done', data: {}});
    });
}

module.exports = {
    postPets: postPets,
    getPets: getPets,
    getPet: getPet,
    updatePet: updatePet,
    deletePet: deletePet
};