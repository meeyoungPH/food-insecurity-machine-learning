DROP TABLE IF EXISTS Food_Access;
DROP TABLE IF EXISTS Summary;

CREATE TABLE Food_Access (
 StateFIPS 		  VARCHAR NOT NULL,
   CensusTract         VARCHAR NOT NULL PRIMARY KEY,
   State               VARCHAR NOT NULL,
   County              VARCHAR NOT NULL,
   Urban               bigint NOT NULL,
   Pop2010             bigint NOT NULL, 
   OHU2010             bigint NOT NULL,
   PovertyRate         float8 not NULL,
   MedianFamilyIncome  float8 not NULL,
   LAhalfand10		   integer NOT NULL, 
   lapophalfshare     	float8 NOT NULL , 
   lalowihalfshare   	float8 NOT NULL,
   lakidshalfshare     float8 NOT NULL,
   laseniorshalfshare   float8 NOT NULL,
   lawhitehalfshare     float8 NOT NULL,
   lablackhalfshare     float8 NOT NULL,
   laasianhalfshare     float8 NOT NULL,
   lanhopihalfshare 	 float8 NOT NULL,
   laaianhalfshare      float8 NOT NULL,
   laomultirhalfshare   float8 NOT NULL,
   lahisphalfshare      float8 NOT NULL,
   lahunvhalfshare      float8 NOT NULL,
   lasnaphalfshare 		float8 NOT NULL,
   TractLOWI           float8 not NULL,
   TractKids           float8 not NULL,
   TractSeniors        float8 not NULL,
   TractWhite          float8 not NULL,
   TractBlack          float8 not NULL,
   TractAsian          float8 not NULL,
   TractNHOPI          float8 not NULL,
   TractAIAN           float8 not NULL,
   TractOMultir        float8 not NULL,
   TractHispanic       float8 not NULL,
   TractHUNV           float8 not NULL,
   TractSNAP           float8 not NULL,
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
   TractSNAP_PCT       float8 not NULL
);

CREATE TABLE Summary (
Jurisdiction      varchar NOT NULL,     
LAhalfand10       bigint NOT NULL,
Pop2010           bigint NOT NULL,
OHU2010           bigint NOT NULL,
TractLOWI         float8 not NULL,
TractKids         float8 not NULL,
TractSeniors      float8 not NULL,
TractWhite        float8 not NULL,
TractBlack        float8 not NULL,
TractAsian        float8 not NULL,
TractNHOPI        float8 not NULL,
TractAIAN         float8 not NULL,
TractOMultir      float8 not NULL,
TractHispanic     float8 not NULL,
TractHUNV         float8 not NULL,
TractSNAP         float8 not NULL,
LOWI_per          float8 not NULL,
Non_prod_ages_per float8 not NULL,
White_per         float8 not NULL,
Black_per         float8 not NULL,
Asian_per         float8 not NULL,
NHOPI_per         float8 not NULL,
AIAN_per          float8 not NULL,
Multi_Race_per    float8 not NULL,
Hispanic_per      float8 not NULL,
HUNV_per          float8 not NULL,
SNAP_per          float8 not NULL
);

SELECT * FROM Food_Access;
SELECT * FROM Summary;