DROP TABLE IF EXISTS Food_Access_1;
DROP TABLE IF EXISTS Food_Access_2;
DROP TABLE IF EXISTS Food_Access_3;
DROP TABLE IF EXISTS State CASCADE;

CREATE TABLE State (
   StateFIPS           VARCHAR NOT NULL PRIMARY KEY,
   State               VARCHAR NOT NULL
   );  

CREATE TABLE Food_Access_1 (
   CensusTract         VARCHAR NOT NULL PRIMARY KEY,
   StateFIPS 		     VARCHAR NOT NULL,
   State               VARCHAR NOT NULL,
   County              VARCHAR NOT NULL,
   Urban               int NOT NULL,
   Pop2010             int NOT NULL, 
   OHU2010             int NOT NULL,
   PovertyRate         float8 not NULL,
   MedianFamilyIncome  float8 not NULL,
   LAhalfand10		     integer NOT NULL, 
   TractLOWI           int not NULL,
   TractKids           int not NULL,
   TractSeniors        int not NULL,
   TractWhite          int not NULL,
   TractBlack          int not NULL,
   TractAsian          int not NULL,
   TractNHOPI          int not NULL,
   TractAIAN           int not NULL,
   TractOMultir        int not NULL,
   TractHispanic       int not NULL,
   TractHUNV           int not NULL,
   TractSNAP           int not NULL,
   TractLOWI_PCT       float8 not NULL,
   TractKids_PCT       float8 not NULL,
   TractSeniors_PCT    float8 not NULL,
   TractWhite_PCT      float8 not NULL,
   TractBlack_PCT      float8 not NULL,
   TractAsian_PCT      float8 not NULL,
   TractNHOPI_PCT      float8 not NULL,
   TractAIAN_PCT       float8 not NULL,
   TractOMultir_PCT    float8 not NULL,
   TractHispanic_PCT   float8 not NULL,
   TractHUNV_PCT       float8 not NULL,
   TractSNAP_PCT       float8 not NULL,
   FOREIGN KEY (StateFIPS) REFERENCES State(StateFIPS)
);

CREATE TABLE Food_Access_2 (
   CensusTract         VARCHAR NOT NULL PRIMARY KEY,
   StateFIPS 		     VARCHAR NOT NULL,
   State               VARCHAR NOT NULL,
   County              VARCHAR NOT NULL,
   Urban               int NOT NULL,
   Pop2010             int NOT NULL, 
   OHU2010             int NOT NULL,
   PovertyRate         float8 not NULL,
   MedianFamilyIncome  float8 not NULL,
   LAhalfand10		     integer NOT NULL, 
   lapophalfshare      float8 not NULL,
   lalowihalfshare     float8 not NULL,
   lakidshalfshare     float8 not NULL,
   laseniorshalfshare  float8 not NULL,
   lawhitehalfshare    float8 not NULL,
   lablackhalfshare    float8 not NULL,
   laasianhalfshare    float8 not NULL,
   lanhopihalfshare    float8 not NULL,
   laaianhalfshare     float8 not NULL,
   laomultirhalfshare  float8 not NULL,
   lahisphalfshare     float8 not NULL,
   lahunvhalfshare     float8 not NULL,
   lasnaphalfshare     float8 not NULL, 
   lapop10share        float8 not NULL,
   lalowi10share       float8 not NULL,
   lakids10share       float8 not NULL,
   laseniors10share    float8 not NULL,
   lawhite10share      float8 not NULL,
   lablack10share      float8 not NULL,
   laasian10share      float8 not NULL,
   lanhopi10share      float8 not NULL,
   laaian10share       float8 not NULL,
   laomultir10share    float8 not NULL,
   lahisp10share       float8 not NULL,
   lahunv10share       float8 not NULL,
   lasnap10share       float8 not NULL, 
   TractLOWI           int not NULL,
   TractKids           int not NULL,
   TractSeniors        int not NULL,
   TractWhite          int not NULL,
   TractBlack          int not NULL,
   TractAsian          int not NULL,
   TractNHOPI          int not NULL,
   TractAIAN           int not NULL,
   TractOMultir        int not NULL,
   TractHispanic       int not NULL,
   TractHUNV           int not NULL,
   TractSNAP           int not NULL,
   TractLOWI_PCT       float8 not NULL,
   TractKids_PCT       float8 not NULL,
   TractSeniors_PCT    float8 not NULL,
   TractWhite_PCT      float8 not NULL,
   TractBlack_PCT      float8 not NULL,
   TractAsian_PCT      float8 not NULL,
   TractNHOPI_PCT      float8 not NULL,
   TractAIAN_PCT       float8 not NULL,
   TractOMultir_PCT    float8 not NULL,
   TractHispanic_PCT   float8 not NULL,
   TractHUNV_PCT       float8 not NULL,
   TractSNAP_PCT       float8 not NULL,
   FOREIGN KEY (StateFIPS) REFERENCES State(StateFIPS)
);

CREATE TABLE Food_Access_3 (
   CensusTract         VARCHAR NOT NULL PRIMARY KEY,
   StateFIPS 		     VARCHAR NOT NULL,
   State               VARCHAR NOT NULL,
   County              VARCHAR NOT NULL,
   Urban               int NOT NULL,
   Pop2010             int NOT NULL, 
   OHU2010             int NOT NULL,
   PovertyRate         float8 not NULL,
   MedianFamilyIncome  float8 not NULL,
   LAhalfand10		     integer NOT NULL, 
   lapophalfshare      float8 not NULL,
   lalowihalfshare     float8 not NULL,
   lakidshalfshare     float8 not NULL,
   laseniorshalfshare  float8 not NULL,
   lawhitehalfshare    float8 not NULL,
   lablackhalfshare    float8 not NULL,
   laasianhalfshare    float8 not NULL,
   lanhopihalfshare    float8 not NULL,
   laaianhalfshare     float8 not NULL,
   laomultirhalfshare  float8 not NULL,
   lahisphalfshare     float8 not NULL,
   lahunvhalfshare     float8 not NULL,
   lasnaphalfshare     float8 not NULL,  
   TractLOWI           int not NULL,
   TractKids           int not NULL,
   TractSeniors        int not NULL,
   TractWhite          int not NULL,
   TractBlack          int not NULL,
   TractAsian          int not NULL,
   TractNHOPI          int not NULL,
   TractAIAN           int not NULL,
   TractOMultir        int not NULL,
   TractHispanic       int not NULL,
   TractHUNV           int not NULL,
   TractSNAP           int not NULL,
   TractLOWI_PCT       float8 not NULL,
   TractKids_PCT       float8 not NULL,
   TractSeniors_PCT    float8 not NULL,
   TractWhite_PCT      float8 not NULL,
   TractBlack_PCT      float8 not NULL,
   TractAsian_PCT      float8 not NULL,
   TractNHOPI_PCT      float8 not NULL,
   TractAIAN_PCT       float8 not NULL,
   TractOMultir_PCT    float8 not NULL,
   TractHispanic_PCT   float8 not NULL,
   TractHUNV_PCT       float8 not NULL,
   TractSNAP_PCT       float8 not NULL,
   FOREIGN KEY (StateFIPS) REFERENCES State(StateFIPS)
);

SELECT * FROM Food_Access_1;
SELECT * FROM Food_Access_2;
SELECT * FROM Food_Access_3;
SELECT * FROM State;