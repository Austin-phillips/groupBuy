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
  "lastFour"   INT,
  admin        BOOLEAN DEFAULT false,
  company      BOOLEAN DEFAULT false,
  complete     BOOLEAN DEFAULT false,
  image        VARCHAR(250) DEFAULT 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
);

INSERT INTO users(first, last, phone, email, "addressOne", city, state, zip, company, complete, admin)
VALUES
('Austin', 'Phillips', '8019799538', 'phillips.austin51@gmail.com', '1485 E Hidden Valley Drive', 'Sandy', 'Utah', '84020', false, true, true);