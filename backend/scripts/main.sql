/* users */

INSERT INTO "public"."users"("id","username","email","password","created_at","updated_at")
VALUES
(1,E'admin',E'admin@fmdev.com.br',E'$2b$12$w7eewDf60sZaaHyIkPmlx.4tMVydThjbSHXYsmT2/Vd20FqQu/oTm',E'2020-02-28 22:58:30.533848',E'2020-02-28 22:58:30.533848');

/* lms */

INSERT INTO "public"."lms"("id","name","url","token","created_at","updated_at","version")
VALUES
(1,E'moodle',NULL,NULL,E'2020-02-28 22:52:24.485502',E'2020-02-28 22:55:54.946813',NULL),
(2,E'chamilo',NULL,NULL,E'2020-02-28 22:54:20.104673',E'2020-02-28 22:54:20.104673',NULL),
(3,E'open_edx',NULL,NULL,E'2020-02-28 22:54:48.524908',E'2020-02-28 22:54:48.524908',NULL),
(4,E'totara_learn',NULL,NULL,E'2020-02-28 22:55:14.631368',E'2020-02-28 22:55:14.631368',NULL);