CREATE TABLE `person` (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `firstname` VARCHAR(255) NOT NULL,
  `lastname` VARCHAR(255) NOT NULL,
  `birthdate` DATE NOT NULL,
  `rep_subject` VARCHAR(255) NOT NULL,
  `country_id` INT NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `email` VARCHAR(70) NOT NULL UNIQUE,
  `company` VARCHAR(70) NULL,
  `position` VARCHAR(100) NULL,
  `about` TEXT NULL,
  `photo` VARCHAR(255) NULL,
  CONSTRAINT country_person_fk
  FOREIGN KEY (country_id)  REFERENCES country (id)
  );
