CREATE TABLE IF NOT EXISTS `Caixa` (
  `Caixa_id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `Caixa_name` VARCHAR(45) NOT NULL,
  `Caixa_created_date` DATETIME);

INSERT or IGNORE INTO `Caixa`(Caixa_id,Caixa_name) VALUES (1,'Ionic Academy');