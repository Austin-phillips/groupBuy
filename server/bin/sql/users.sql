CREATE TABLE users(
  id SERIAL    PRIMARY KEY,
  first        VARCHAR(50),
  last         VARCHAR(50),
  phone        VARCHAR(50),
  email        VARCHAR(150) UNIQUE,
  "addressOne" VARCHAR(100),
  "addressTwo" VARCHAR(100),
  city         VARCHAR(50),
  state        VARCHAR(50),
  zip          INT,
  card         VARCHAR(250),
  admin        BOOLEAN DEFAULT false,
  company      BOOLEAN,
  "companyId"  INT,
  complete     BOOLEAN DEFAULT false
);

INSERT INTO users(first, last, phone, email, "addressOne", city, state, zip, card, company, "companyId", complete)
VALUES
('Austin', 'Phillips', '8019799538', 'phillips.austin51@gmail.com', '1485 E Hidden Valley Drive', 'Sandy', 'Utah', '84020', 'lajsdfasdfu0sdf9u90sdfasd0f9h', true, 13, true);