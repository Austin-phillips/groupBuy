CREATE TABLE companies(
  id SERIAL PRIMARY KEY,
  name   VARCHAR(50),
  logo    VARCHAR(200)
);

INSERT INTO companies(name, logo)
VALUES('Stance', 'https://as;lkfjas;dlf.com'),
('Owlet', 'https://as;ldasdgfsafgfjas;dlf.com'),
('Fawn Design', 'https://as;lassagaksjdfhaoas;dlf.com');