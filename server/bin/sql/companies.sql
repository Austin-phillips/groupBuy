CREATE TABLE companies(
  "companyId" INT,
  name        VARCHAR(50),
  logo        VARCHAR(200),
  FOREIGN KEY ("companyId") REFERENCES users(id),
  UNIQUE ("companyId")
);

INSERT INTO companies("companyId", name, logo)
VALUES(1, 'Stance', 'https://as;lkfjas;dlf.com');