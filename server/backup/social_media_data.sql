--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.profiles (id, gender, avatar, wallpaper, birthday, "maritalStatus", job, address, education, workplace, bio) VALUES ('8ff63004-4b0a-4fce-8eff-eaf683226ef8', 'other', 'https://firebasestorage.googleapis.com/v0/b/social-media-duc82.appspot.com/o/avatars%2Fpepe.png?alt=media&token=50d3d84d-c797-45a3-b68c-4cbd766bd316', NULL, '2024-08-04', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.profiles (id, gender, avatar, wallpaper, birthday, "maritalStatus", job, address, education, workplace, bio) VALUES ('e5cf8970-8bd4-4039-82af-beb23f111c86', 'male', 'https://firebasestorage.googleapis.com/v0/b/social-media-duc82.appspot.com/o/avatars%2Fpepe.png?alt=media&token=50d3d84d-c797-45a3-b68c-4cbd766bd316', NULL, '2024-08-04', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.profiles (id, gender, avatar, wallpaper, birthday, "maritalStatus", job, address, education, workplace, bio) VALUES ('e4b56eb9-e303-49b5-85aa-3e382bc22804', 'male', 'https://firebasestorage.googleapis.com/v0/b/social-media-duc82.appspot.com/o/avatars%2Fpepe.png?alt=media&token=50d3d84d-c797-45a3-b68c-4cbd766bd316', NULL, '2024-08-04', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.profiles (id, gender, avatar, wallpaper, birthday, "maritalStatus", job, address, education, workplace, bio) VALUES ('c9bcfbfd-c92b-456e-a9dd-aaa1c6308c22', 'male', 'https://firebasestorage.googleapis.com/v0/b/social-media-duc82.appspot.com/o/avatars%2Fpepe.png?alt=media&token=50d3d84d-c797-45a3-b68c-4cbd766bd316', NULL, '2024-08-04', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.profiles (id, gender, avatar, wallpaper, birthday, "maritalStatus", job, address, education, workplace, bio) VALUES ('23a10af3-1a99-4edd-b80d-d35cee46fd89', 'female', 'https://firebasestorage.googleapis.com/v0/b/social-media-duc82.appspot.com/o/avatars%2Fpepe.png?alt=media&token=50d3d84d-c797-45a3-b68c-4cbd766bd316', NULL, '2024-08-04', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.profiles (id, gender, avatar, wallpaper, birthday, "maritalStatus", job, address, education, workplace, bio) VALUES ('e7a60d1a-a0e8-484a-a55a-cf1775fc9fc8', 'male', 'https://firebasestorage.googleapis.com/v0/b/social-media-duc82.appspot.com/o/avatars%2Fduccdht123%40gmail.com?alt=media&token=628df7b3-e9fb-4076-b9fe-0412208d5912', NULL, '2003-02-08', 'single', 'IT', 'Ha Noi', 'Nguyen Trai University', NULL, NULL);


--
-- Data for Name: tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (id, email, "emailVerified", password, role, "createdAt", "profileId", "tokenId", "bannedAt", "deletedAt", "offlineAt", "firstName", "lastName", username) VALUES ('35e6f6d9-b240-4cc7-995a-ac93a0439daa', 'avpyk@gmail.com', '2024-08-04 22:29:10.981+07', '$2b$10$KzPwuoGchfnBwxpf15KyouhIN3EsowHetzkLz2rcIufuWXWyLb59K', 'user', '2024-08-04 22:29:10.989854+07', 'e4b56eb9-e303-49b5-85aa-3e382bc22804', NULL, NULL, NULL, NULL, 'Avpyk', 'Rxyce', 'avpyk');
INSERT INTO public.users (id, email, "emailVerified", password, role, "createdAt", "profileId", "tokenId", "bannedAt", "deletedAt", "offlineAt", "firstName", "lastName", username) VALUES ('1a5baa62-1219-487d-9986-b8116e38b0b5', 'xeqtn@gmail.com', '2024-08-04 22:29:11.169+07', '$2b$10$NCQ.L.stM8eSLQzEtI2cj.glWP.7KfGQsolkjOqTdVVmQ3.WKDpfm', 'user', '2024-08-04 22:29:11.177378+07', 'c9bcfbfd-c92b-456e-a9dd-aaa1c6308c22', NULL, NULL, NULL, NULL, 'Xeqtn', 'Qsrfm', 'xeqtn');
INSERT INTO public.users (id, email, "emailVerified", password, role, "createdAt", "profileId", "tokenId", "bannedAt", "deletedAt", "offlineAt", "firstName", "lastName", username) VALUES ('06f6a9c2-8b49-4b69-8b8b-8e7323d4906f', 'ljpxm@gmail.com', '2024-08-04 22:29:11.295+07', '$2b$10$i3FkmT/T0zfaMTPIhbUyPOu8AmayHsBKK0.JJNYqs/rXmLO4BDTgG', 'user', '2024-08-04 22:29:11.3035+07', '23a10af3-1a99-4edd-b80d-d35cee46fd89', NULL, NULL, NULL, NULL, 'Ljpxm', 'Zydud', 'ljpxm');
INSERT INTO public.users (id, email, "emailVerified", password, role, "createdAt", "profileId", "tokenId", "bannedAt", "deletedAt", "offlineAt", "firstName", "lastName", username) VALUES ('324d6263-515c-42b7-a830-fe8261802c6b', 'duccdht123@gmail.com', '2024-08-04 22:32:40.089+07', '$2b$10$sxMHeQVZt6d3TuKmB2k4muwSZbgHjm8uLYAqfIJhEGZG2EELQqQdi', 'user', '2024-08-04 22:31:27.970615+07', 'e7a60d1a-a0e8-484a-a55a-cf1775fc9fc8', NULL, NULL, NULL, '2024-08-07 21:42:38.13+07', 'Duc', 'Dang', 'duccdht123');
INSERT INTO public.users (id, email, "emailVerified", password, role, "createdAt", "profileId", "tokenId", "bannedAt", "deletedAt", "offlineAt", "firstName", "lastName", username) VALUES ('e1834f5c-f1e9-4841-9c70-326b1d3fd98c', 'utsbi@gmail.com', '2024-08-04 22:29:10.87+07', '$2b$10$kao1VX3KIaMYnBKwi4sfvOKhVOUz2xtpTJn9YN6PdcAjb2KMULId.', 'user', '2024-08-04 22:29:10.879599+07', 'e5cf8970-8bd4-4039-82af-beb23f111c86', NULL, NULL, NULL, '2024-08-05 12:26:26.993+07', 'Utsbi', 'Vtshy', 'utsbi');
INSERT INTO public.users (id, email, "emailVerified", password, role, "createdAt", "profileId", "tokenId", "bannedAt", "deletedAt", "offlineAt", "firstName", "lastName", username) VALUES ('8503aaeb-74ab-4261-9f7e-e3d2f5f7bcc8', 'rbfdi@gmail.com', '2024-08-04 22:29:10.756+07', '$2b$10$ucbbl3IGsgs549KcQ6e0Zu1g3x9Y0DXblIbmol3W3mkjVP1HRDPP6', 'user', '2024-08-04 22:29:10.768741+07', '8ff63004-4b0a-4fce-8eff-eaf683226ef8', NULL, NULL, NULL, '2024-08-07 11:08:42.305+07', 'Rbfdi', 'Jfdge', 'rbfdi');


--
-- Data for Name: blocked_users; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: blog_comments; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: blog_tags; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: blogs; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.posts (id, content, access, "isStory", "deletedAt", "createdAt", "userId") VALUES ('19945788-4f5e-4b67-99db-755fdea7c93b', 'What''s up everybody', 'public', false, NULL, '2024-08-04 22:35:35.28352+07', '324d6263-515c-42b7-a830-fe8261802c6b');


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: comments_likes_users; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: conversations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.conversations (id, name, image, "isGroup", "deletedAt", "createdAt") VALUES ('817ec0bc-c0d3-4753-a344-fe291619d4c0', NULL, NULL, false, NULL, '2024-08-05 11:27:47.811725+07');
INSERT INTO public.conversations (id, name, image, "isGroup", "deletedAt", "createdAt") VALUES ('55cad651-6681-42d5-8827-49fe0e0536f9', NULL, NULL, false, NULL, '2024-08-05 12:11:26.954389+07');


--
-- Data for Name: conversation_members; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.conversation_members (id, role, "createdAt", "conversationId", "userId", "deletedAt") VALUES ('10544de0-0734-498b-89da-65f3a4df2a54', 'admin', '2024-08-05 11:27:47.811725+07', '817ec0bc-c0d3-4753-a344-fe291619d4c0', '324d6263-515c-42b7-a830-fe8261802c6b', NULL);
INSERT INTO public.conversation_members (id, role, "createdAt", "conversationId", "userId", "deletedAt") VALUES ('a6f095bd-0a3b-4654-abf3-2b3bdd7f263c', 'member', '2024-08-05 11:27:47.811725+07', '817ec0bc-c0d3-4753-a344-fe291619d4c0', '8503aaeb-74ab-4261-9f7e-e3d2f5f7bcc8', NULL);
INSERT INTO public.conversation_members (id, role, "createdAt", "conversationId", "userId", "deletedAt") VALUES ('57447280-7e3b-4e8d-a986-d70e221271b5', 'admin', '2024-08-05 12:11:26.954389+07', '55cad651-6681-42d5-8827-49fe0e0536f9', '8503aaeb-74ab-4261-9f7e-e3d2f5f7bcc8', '2024-08-08 19:24:59.704551+07');
INSERT INTO public.conversation_members (id, role, "createdAt", "conversationId", "userId", "deletedAt") VALUES ('dc947303-df76-4e57-b9c7-cd9570667644', 'member', '2024-08-05 12:11:26.954389+07', '55cad651-6681-42d5-8827-49fe0e0536f9', 'e1834f5c-f1e9-4841-9c70-326b1d3fd98c', '2024-08-08 19:24:59.704551+07');


--
-- Data for Name: friends; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.friends (id, status, "createdAt", "userId", "friendId") VALUES ('2ba21360-c0d7-4809-aa31-7a7a58392333', 'pending', '2024-08-04 22:37:09.546828+07', '324d6263-515c-42b7-a830-fe8261802c6b', '8503aaeb-74ab-4261-9f7e-e3d2f5f7bcc8');


--
-- Data for Name: groups; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: group_members; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.messages (id, content, "deletedAt", "createdAt", "conversationId", "userId") VALUES ('f6ce8288-a6ac-4e4f-be5d-83a2714cf20f', 'duoc chua', NULL, '2024-08-07 12:26:52.045337+07', '817ec0bc-c0d3-4753-a344-fe291619d4c0', '324d6263-515c-42b7-a830-fe8261802c6b');
INSERT INTO public.messages (id, content, "deletedAt", "createdAt", "conversationId", "userId") VALUES ('94fe8583-7b31-4ac7-823f-4c614cf24653', '', NULL, '2024-08-07 12:26:56.865585+07', '817ec0bc-c0d3-4753-a344-fe291619d4c0', '324d6263-515c-42b7-a830-fe8261802c6b');
INSERT INTO public.messages (id, content, "deletedAt", "createdAt", "conversationId", "userId") VALUES ('270126f2-eb73-4da2-b93a-98c184a899ef', 'hallo', NULL, '2024-08-07 12:38:57.869331+07', '817ec0bc-c0d3-4753-a344-fe291619d4c0', '324d6263-515c-42b7-a830-fe8261802c6b');
INSERT INTO public.messages (id, content, "deletedAt", "createdAt", "conversationId", "userId") VALUES ('9744fbd1-9d21-41e7-b400-fd8a8f3e1928', 'ua alo 123', NULL, '2024-08-07 12:44:53.399473+07', '817ec0bc-c0d3-4753-a344-fe291619d4c0', '324d6263-515c-42b7-a830-fe8261802c6b');
INSERT INTO public.messages (id, content, "deletedAt", "createdAt", "conversationId", "userId") VALUES ('60e17948-e2ae-4c64-9cb3-c38350081689', '456', NULL, '2024-08-07 12:44:55.181159+07', '817ec0bc-c0d3-4753-a344-fe291619d4c0', '324d6263-515c-42b7-a830-fe8261802c6b');
INSERT INTO public.messages (id, content, "deletedAt", "createdAt", "conversationId", "userId") VALUES ('8e77fec4-3e75-412f-90dc-9cae3ded529a', '', NULL, '2024-08-07 12:45:00.116326+07', '817ec0bc-c0d3-4753-a344-fe291619d4c0', '324d6263-515c-42b7-a830-fe8261802c6b');
INSERT INTO public.messages (id, content, "deletedAt", "createdAt", "conversationId", "userId") VALUES ('0a148200-e9e5-48cb-858a-c6e7184580a3', '', NULL, '2024-08-07 12:45:36.998465+07', '817ec0bc-c0d3-4753-a344-fe291619d4c0', '324d6263-515c-42b7-a830-fe8261802c6b');


--
-- Data for Name: message_files; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.message_files (id, url, type, "messageId") VALUES ('8d86b74c-64db-443a-a604-eb27fdb3032e', 'https://firebasestorage.googleapis.com/v0/b/social-media-duc82.appspot.com/o/messages%2FGV7BoC3V4.jpeg?alt=media&token=add6dfcf-34e8-429f-8d0e-3b79df9e9609', 'image', '94fe8583-7b31-4ac7-823f-4c614cf24653');
INSERT INTO public.message_files (id, url, type, "messageId") VALUES ('c474623b-38d8-4d10-bd75-c17a5cede425', 'https://firebasestorage.googleapis.com/v0/b/social-media-duc82.appspot.com/o/messages%2FOIP.jfif?alt=media&token=b9b42e75-9fbc-4928-b421-9a4b2300cc98', 'image', '94fe8583-7b31-4ac7-823f-4c614cf24653');
INSERT INTO public.message_files (id, url, type, "messageId") VALUES ('5648f0ea-c1bb-4b8c-846a-f9d11e155a68', 'https://firebasestorage.googleapis.com/v0/b/social-media-duc82.appspot.com/o/messages%2FGV7BoC3V4.jpeg?alt=media&token=e737b376-e173-4795-8251-54df5bc3fa7e', 'image', '8e77fec4-3e75-412f-90dc-9cae3ded529a');
INSERT INTO public.message_files (id, url, type, "messageId") VALUES ('7780a69c-b5e1-4a66-9516-ba580d57e245', 'https://firebasestorage.googleapis.com/v0/b/social-media-duc82.appspot.com/o/messages%2FOIP.jfif?alt=media&token=e7e03be3-8046-4858-8acd-b20b4e1d4cb2', 'image', '8e77fec4-3e75-412f-90dc-9cae3ded529a');
INSERT INTO public.message_files (id, url, type, "messageId") VALUES ('c608198d-0641-4a97-b243-1ecb5f65386e', 'https://firebasestorage.googleapis.com/v0/b/social-media-duc82.appspot.com/o/messages%2Fbanh-chuoi-hap.webp?alt=media&token=bae526c8-4afd-43e2-b55c-3ac9bb06a733', 'image', '0a148200-e9e5-48cb-858a-c6e7184580a3');
INSERT INTO public.message_files (id, url, type, "messageId") VALUES ('0e4148eb-eff3-4388-a12e-7c52e334560a', 'https://firebasestorage.googleapis.com/v0/b/social-media-duc82.appspot.com/o/messages%2Fba-roi-chien-mam-ngo.webp?alt=media&token=4935ecef-de58-428a-bb3a-e611996eae21', 'image', '0a148200-e9e5-48cb-858a-c6e7184580a3');
INSERT INTO public.message_files (id, url, type, "messageId") VALUES ('aae5165b-6471-485f-b739-d4b069c97b81', 'https://firebasestorage.googleapis.com/v0/b/social-media-duc82.appspot.com/o/messages%2Fba-roi-chien-mam-ngo_2.webp?alt=media&token=501f0639-f916-4cc3-af38-82370a325e93', 'image', '0a148200-e9e5-48cb-858a-c6e7184580a3');
INSERT INTO public.message_files (id, url, type, "messageId") VALUES ('6e0eb460-5970-4f6d-816d-b09e1755e92d', 'https://firebasestorage.googleapis.com/v0/b/social-media-duc82.appspot.com/o/messages%2Fba-roi-nuong-rieng-me.webp?alt=media&token=3b894344-81a3-4cca-bf96-c269d5482085', 'image', '0a148200-e9e5-48cb-858a-c6e7184580a3');


--
-- Data for Name: message_reads; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.message_reads (id, "createdAt", "userId", "messageId") VALUES ('61d68566-dc23-463a-9e86-ebb656e501ec', '2024-08-07 12:26:52.045337+07', '324d6263-515c-42b7-a830-fe8261802c6b', 'f6ce8288-a6ac-4e4f-be5d-83a2714cf20f');
INSERT INTO public.message_reads (id, "createdAt", "userId", "messageId") VALUES ('bf09170d-0bcf-4f64-b2b7-4a41698b93ea', '2024-08-07 12:26:56.865585+07', '324d6263-515c-42b7-a830-fe8261802c6b', '94fe8583-7b31-4ac7-823f-4c614cf24653');
INSERT INTO public.message_reads (id, "createdAt", "userId", "messageId") VALUES ('3bde9881-feb1-4260-9196-4e5f434b3dd1', '2024-08-07 12:38:57.869331+07', '324d6263-515c-42b7-a830-fe8261802c6b', '270126f2-eb73-4da2-b93a-98c184a899ef');
INSERT INTO public.message_reads (id, "createdAt", "userId", "messageId") VALUES ('6c1a9c44-4d88-444d-8158-c74cccbdf2b8', '2024-08-07 12:44:53.399473+07', '324d6263-515c-42b7-a830-fe8261802c6b', '9744fbd1-9d21-41e7-b400-fd8a8f3e1928');
INSERT INTO public.message_reads (id, "createdAt", "userId", "messageId") VALUES ('9bf726ce-4076-4ff3-a028-2056bef92ade', '2024-08-07 12:44:55.181159+07', '324d6263-515c-42b7-a830-fe8261802c6b', '60e17948-e2ae-4c64-9cb3-c38350081689');
INSERT INTO public.message_reads (id, "createdAt", "userId", "messageId") VALUES ('8706eed3-8523-4d6d-bdf2-30fa439ba2a4', '2024-08-07 12:45:00.116326+07', '324d6263-515c-42b7-a830-fe8261802c6b', '8e77fec4-3e75-412f-90dc-9cae3ded529a');
INSERT INTO public.message_reads (id, "createdAt", "userId", "messageId") VALUES ('596a6693-93e5-43bc-a4d3-3d4e45a9b4d8', '2024-08-07 12:45:36.998465+07', '324d6263-515c-42b7-a830-fe8261802c6b', '0a148200-e9e5-48cb-858a-c6e7184580a3');


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: post_files; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: posts_likes_users; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 12, true);


--
-- PostgreSQL database dump complete
--

