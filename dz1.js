// Урок 1. Введение в Node.js
// Напишите HTTP сервер и реализуйте два обработчика, где:
// — По URL “/” будет возвращаться страница, на которой есть гиперссылка на вторую страницу по ссылке “/about”
// — А по URL “/about” будет возвращаться страница, на которой есть гиперссылка на первую страницу “/”
// — Также реализуйте обработку несуществующих роутов (404).
// — * На каждой странице реализуйте счетчик просмотров. Значение счетчика должно увеличиваться на единицу каждый раз, когда загружается страница.

const http = require('http');

// Счетчики для страниц
let homePage  = 0;
let aboutPage  = 0;

const server = http.createServer((req, res) => {
    console.log('Запрос получен');

    if (req.url === '/') {
        homePage++;  
        res.writeHead(200, {
            'Content-Type': "text/html; charset=UTF-8",
        });
        res.end(`
            <a href="/about" style= "text-decoration: none; color:black;">Ссылка на страницу About</a>
            <h1 style="color:red;">Просмотров сраницы Home: ${homePage }</h1>
            <a href="/1">Link to 404</a>
        `);
        
    } else if (req.url === '/about') {
        aboutPage++;  
        res.writeHead(200, {
            'Content-Type': "text/html; charset=UTF-8",
        });
        res.end(`
            <a href="/">Ссылка на страницу Home</a>
            <h1 style="color:red;">Просмотров сраницы About: ${aboutPage}</h1>
            <a href="/1">Link to 404</a>
        `);
    } else {
        res.writeHead(404, {
            'Content-Type': "text/html; charset=UTF-8",
        });
        res.end(`<h1>Страница не найдена!</h1> 
            <a href="/">Ссылка на страницу Home</a>
             <a href="/about">Просмотров сраницы About</a>
            `);
        
    }
});

const port = 3000;

server.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
