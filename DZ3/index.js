const express = require('express');
const fs = require('fs');
const app = express();


app.get('/', (req, res) => {
  updateCounter('/').then(count => {
    res.send(`<h1>Корневая страница</h1>
        <p>Просмотров: ${count}</p>
        <a href="./about">Ссылка на страницу /about</a>
        `);
  });
});

app.get('/about', (req, res) => {
  updateCounter('/about').then(count => {
    res.send(`<h1>Страница About</h1>
        <p>Просмотров:: ${count}</p> 
        <a href="./">Ссылка на страницу /</a>`);
  });
});
//Для себя - Счетчик просмотров и сохранение его в файл json  
const dataFile = 'counter.json';
async function updateCounter(url) {
    let count = 0;
    try {
      const data = await fs.promises.readFile(dataFile, 'utf8');
      const counters = JSON.parse(data);
      count = counters[url] || 0;
      counters[url] = count + 1;
      await fs.promises.writeFile(dataFile, JSON.stringify(counters, null, 2));
    } catch (err) {
      if (err.code === 'ENOENT') {
        await fs.promises.writeFile(dataFile, '{}');
      } else if (err instanceof SyntaxError) {
        await fs.promises.writeFile(dataFile, '{}');
      } else {
        throw err;
      }
    }
    return count;
  }

app.listen(3000, () => {
  console.log('Server started on port 3000');
});