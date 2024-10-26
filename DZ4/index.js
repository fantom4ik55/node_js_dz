const express = require ('express');
const fs = require('fs').promises;
const path = require('path');


const {idSchema, usersSchema} = require('./validation/scheme');// импорт млдуль схемы с папки validation
const {checkParams, checkBody} = require('./validation/validator')// импорт модель validator с папки validation
 
const app = express(); //инцализируем приложение экспресс

let users = [];
let uniqueID = 0;

 

app.use(express.json());

const usersFile = path.join(__dirname, './save_users.json');

//загрузка из  save_users (обязательно нужно в файле save_users.json указать пустые []) ,через JSON.parse() 
async function loadUsers() {
    try {
      const data = await fs.readFile(usersFile, 'utf8');
      users = JSON.parse(data);
      uniqueID = Math.max(...users.map((user) => user.id), 0);
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;  
    }
  }
  loadUsers();  
 

//сохранение в save_users через SON.stringify() !
async function saveUsers() {
    await fs.writeFile(usersFile, JSON.stringify(users, null, 2));
  }

  

 //Все users
app.get('/users', (req, res) => {
    res.send({users});
    
});


//Получение user по id
app.get('/users/:id', checkParams(idSchema), (req, res) => {
     
    const user = users.find((user) => user.id === Number(req.params.id));

    if (user) {
        res.send({user});
    } else {
        res.status(404);
        res.send({user: 'такого пользователя не существует! Проверти номер id! '});
    }
     

});

//Создать user  + изменения в  save_users и сохранения 
app.post('/users',  checkBody(usersSchema),    (req, res) => {
    uniqueID +=1

    users.push({
       id: uniqueID,
       ...req.body
    });

    res.send({
       id: uniqueID,
    });
     saveUsers();
    
});



//Внести изменения в user + изменения в  save_users и сохранения 
app.put('/users/:id', checkParams(idSchema), checkBody(usersSchema), (req, res) => {
    
    const user = users.find((user) => user.id === Number (req.params.id));
    if (user) {
        user.last_name = req.body.last_name;
        user.first_name = req.body.first_name;
       
        user.specialization = req.body.specialization;

        res.send({user});
    } else {
        res.status(404);
        res.send({user: 'Пользователь с таким id не найден!Проверти номер id!'});
    }
    saveUsers();
});


//Удаление user + изменения в  save_users и сохранения 
app.delete('/users/:id', checkParams(idSchema), async(req, res) => {
    const user = users.find((user) => user.id === Number(req.params.id));//по

    if (user) {
       const userIndex = users.indexOf(user);
       users.splice(userIndex, 1);

        res.send({user}); 
    } else {
        res.status(404);
        res.send({user: 'Такого user не существует!Проверти номер id!'});
    }
    saveUsers();
});


//Обрабатка несуществующих роутов
app.use((req, res) => {
    res.status(404).send({
        message: 'URL not found'
    })
});


app.listen(3000);
