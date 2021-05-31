const dbClient = require('../database');
dbClient.query("CREATE TABLE players(id SERIAL PRIMARY KEY, name varchar(255), position varchar(255), clubname varchar(255), avatar varchar(255))");