var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');
var multer = require('multer');
var upload = multer();
var bodyParser = require('body-parser');

db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, contact TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS score (id INTEGER PRIMARY KEY AUTOINCREMENT, time INTEGER, person INTEGER)");
});

module.exports = function(app, io) {
  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  /* PEOPLE */
  app.get('/db/people', function(req, res) {
    db.all("SELECT * FROM people", function(err, data) {
      if (err) {
        throw err;
      }
      res.json(data);
    });
  });

  app.post('/db/people', upload.array(), function(req, res) {
    var id = req.body.id || null;
    var name = req.body.name;
    var contact = req.body.contact;
    var gotit = req.body.gotit;

    if (!(name && gotit)) {
        res.sendStatus(400);
    } else {
      var stmt = db.prepare("INSERT INTO people (id, name, contact) VALUES(?, ?, ?)");
      stmt.run(id, name, contact);
      stmt.finalize();
      io.emit('updatePeople');
      res.sendStatus(201);
    }
  });

  app.put('/db/people/:id', upload.array(), function(req, res) {
    var oldId = req.params.id;
    var id = req.body.id;
    var name = req.body.name;
    var contact = req.body.contact;

    if (!(name && id)) {
        res.sendStatus(400);
    } else {
      var stmt = db.prepare("UPDATE people SET id=?, name=?, contact=? WHERE id=?");
      stmt.run(id, name, contact, oldId);
      stmt.finalize();
      io.emit('updatePeople');
      res.sendStatus(200);
    }
  });

  app.delete('/db/people/:id', function(req, res) {
    var id = req.params.id;

    if (!(id)) {
        res.sendStatus(400);
    } else {
      var stmt = db.prepare("DELETE FROM people WHERE id=?");
      stmt.run(id);
      stmt.finalize();
      io.emit('updatePeople');
      res.sendStatus(200);
    }
  });

  app.delete('/db/people', function(req, res) {
    var stmt = db.run("DELETE FROM people");
    io.emit('updatePeople');
    res.sendStatus(200);
  });

  /* SCORES */
  app.get('/db/score', function(req, res) {
    db.all("SELECT * FROM score", function(err, data) {
      if (err) {
        throw err;
      }
      res.json(data);
    });
  });

  app.post('/db/score', upload.array(), function(req, res) {
    var id = req.body.id || null;
    var time = req.body.time;
    var person = req.body.person;

    if (!(time && person)) {
        res.sendStatus(400);
    } else {
      var stmt = db.prepare("INSERT INTO score (id, time, person) VALUES(?, ?, ?)");
      stmt.run(id, time, person);
      stmt.finalize();
      io.emit('updateScores');
      res.sendStatus(201);
    }
  });

  app.put('/db/score/:id', upload.array(), function(req, res) {
    var oldId = req.params.id;
    var id = req.body.id;
    var time = req.body.time;
    var person = req.body.person;

    if (!(time && person)) {
        res.sendStatus(400);
    } else {
      var stmt = db.prepare("UPDATE score SET id=?, time=?, person=? WHERE id=?");
      stmt.run(id, time, person, oldId);
      stmt.finalize();
      io.emit('updateScores');
      res.sendStatus(200);
    }
  });

  app.delete('/db/score/:id', function(req, res) {
    var id = req.params.id;

    if (!(id)) {
        res.sendStatus(400);
    } else {
      var stmt = db.prepare("DELETE FROM score WHERE id=?");
      stmt.run(id);
      stmt.finalize();
      io.emit('updateScores');
      res.sendStatus(200);
    }
  });

  app.delete('/db/score', function(req, res) {
    var stmt = db.run("DELETE FROM score");
    io.emit('updateScores');
    res.sendStatus(200);
  });
}

module.exports.db = db;
