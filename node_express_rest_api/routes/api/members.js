
const { response } = require('express');
const express = require('express');
const fs = require('fs');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');


// Get all the members 
router.get('/members', (request, response) => {
    response.json(members);
});

// Get single member 

router.get('/members/:id', (request, response) => {
    if (request.params.id) {
        const found = members.some((member) => member.id === parseInt(request.params.id));
        if (found) {
            response.jsonp(members.filter((member) => member.id === parseInt(request.params.id)));
            // OR 
            // members.forEach((person)=>{
            //     if(person.id === parseInt(request.params.id)){
            //         response.json(person);
            //     } 
            // })
        } else {
            response.status(400).json({ message: `Member with id ${parseInt(request.params.id)} not found` })
        }
    } else {
        response.send(`Please provide a member id. `)
    }
});

// Create member 
router.post('/', (request, response) => {
    const newMember = {
        "id": uuid.v4(),
        "name": request.body.name,
        "email": request.body.email,
        "status": "active"
    };

    if (!newMember.name || !newMember.email) {
        return response.status(400).json({ message: `Please provide name and email!` });
    }
    members.push(newMember);
    // response.json(members);
    response.redirect('/');
});


// Update member by id
router.put('/:id', (request, response) => {
    const found = members.some((member) => member.id === parseInt(request.params.id));
   
    if (found) {
        members.forEach((member)=>{
              if(member.id === parseInt(request.params.id)) {
                  member.name = request.body.name ? request.body.name : member.name;
                  member.email = request.body.email ? request.body.email : member.email;
                  member.status = request.body.status ? request.body.status : member.status;
                  response.json({message: `Member was updatet`, member});
              } 
        })
    } else {
        response.status(400).json({ message: `Member with id ${parseInt(request.params.id)} not found` })
    }
});

// Delete the member by id

router.delete('/:id', (request, response)=>{
    const found = members.some((member) => member.id === parseInt(request.params.id));
    if (found) {
        response.json({message: `Member with id ${request.params.id} removed`, members: members.filter((member) => member.id !== parseInt(request.params.id))});
    } else {
        response.status(400).json({ message: `Member with id ${parseInt(request.params.id)} not found` })
    }
});

module.exports = router;