

const people = [
    {
        id: 1,
        name: 'John',
        age: 30,
    },
    {
        id: 2,
        name: 'Jane',
        age: 25,
    },
    {
        id: 3,
        name: 'Jack',
        age: 20,
    },
];

const getPeople = (req, res) => {
    if (!req.query.age) {
        res.status(200).json(people);
    } else {

        // if it is there then find people who have that age
        const age = req.query.age;
        const filteredPeople = people.filter(person => person.age === +age);
        res.status(200).json(filteredPeople);
    }
}

const getById = (req, res) =>{
    const id = req.params.id;
    const person = people.find(person => person.id === +id);
    if (!person) {
        res.status(404).json({
            message: 'Person not found',
        });
    } else {
        res.status(200).json(person);
    }
}

module.exports = {
    getPeople,
    getById,
}

