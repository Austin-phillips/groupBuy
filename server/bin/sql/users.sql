CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  first   VARCHAR(50),
  last    VARCHAR(50),
  phone   VARCHAR(50),
  email   VARCHAR(150) UNIQUE,
  address VARCHAR(100),
  city    VARCHAR(50),
  state   VARCHAR(50),
  zip     INT,
  company BOOLEAN,
  complete BOOLEAN DEFAULT false,
  card    VARCHAR(250)
);

INSERT INTO users(first, last, phone, email, address, city, state, zip, company, complete, card)
VALUES
('Austin', 'Phillips', '8019799538', 'phillips.austin51@gmail.com', '1485 E Hidden Valley Drive', 'Sandy', 'Utah', '84020', false, true, 'lajsdfasdfu0sdf9u90sdfasd0f9h');