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

INSERT INTO public.profiles (id, gender, avatar, wallpaper, birthday, "maritalStatus", job, address, bio, education, workplace) VALUES ('704edcae-df4a-4594-9a64-3a558bd652b2', 'male', 'https://storage.googleapis.com/social-media-duc82.appspot.com/avatars/bidv840242@gmail.com?time=1727158479926', NULL, '2003-02-08', NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.profiles (id, gender, avatar, wallpaper, birthday, "maritalStatus", job, address, bio, education, workplace) VALUES ('75b724bd-9270-4eac-8632-f5064729a67c', 'male', 'https://storage.googleapis.com/social-media-duc82.appspot.com/avatars/duccdht123@gmail.com?time=1732087406168', 'https://storage.googleapis.com/social-media-duc82.appspot.com/wallpapers/duccdht123@gmail.com?time=1729237729048', '2003-02-08', NULL, NULL, NULL, 'This is test bio', NULL, NULL);


--
-- Data for Name: tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (id, "firstName", "lastName", username, email, "emailVerified", password, role, "offlineAt", "bannedAt", "deletedAt", "createdAt", "profileId", "tokenId") VALUES ('6165654e-2ede-4667-9668-d01aa14aefc3', 'Duc', 'Dang', 'duccdht123', 'duccdht123@gmail.com', '2024-09-22 16:36:27.167+07', '$2b$10$Yak.hs3iq/jcH0aovo70s.1lCp8G9hbFADvSH7raAc01RuZBNucS6', 'user', NULL, NULL, NULL, '2024-09-22 16:35:20.805195+07', '75b724bd-9270-4eac-8632-f5064729a67c', NULL);
INSERT INTO public.users (id, "firstName", "lastName", username, email, "emailVerified", password, role, "offlineAt", "bannedAt", "deletedAt", "createdAt", "profileId", "tokenId") VALUES ('98db3b63-2694-4be6-b4c2-f3221903fb41', 'Đức', 'Đặng Trần', 'bidv840242', 'bidv840242@gmail.com', '2024-09-24 13:18:46.428572+07', '$2b$10$njRgCjSgdvP/bZUluaFhtOWOlwmum29SRFkWvppUG7tqB3.54Kgpq', 'user', NULL, NULL, NULL, '2024-09-24 13:14:39.942094+07', '704edcae-df4a-4594-9a64-3a558bd652b2', NULL);


--
-- Data for Name: blocked; Type: TABLE DATA; Schema: public; Owner: postgres
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

INSERT INTO public.posts (id, content, access, feeling, activity, "deletedAt", "createdAt", "userId") VALUES ('de3099d1-5639-48c0-92f9-ad3851f56c9e', '', 'Public', NULL, NULL, '2024-11-05 12:41:09.24004+07', '2024-11-05 12:37:44.788681+07', '6165654e-2ede-4667-9668-d01aa14aefc3');
INSERT INTO public.posts (id, content, access, feeling, activity, "deletedAt", "createdAt", "userId") VALUES ('368c093c-e6df-4968-89ae-eaa7dacf5faa', '', 'Public', NULL, NULL, '2024-11-05 12:41:10.187858+07', '2024-11-05 12:36:32.634087+07', '6165654e-2ede-4667-9668-d01aa14aefc3');
INSERT INTO public.posts (id, content, access, feeling, activity, "deletedAt", "createdAt", "userId") VALUES ('60d3e970-92c3-402a-a28d-275c7e5949bd', '', 'Public', NULL, NULL, '2024-11-05 12:41:10.885308+07', '2024-11-05 12:36:21.999495+07', '6165654e-2ede-4667-9668-d01aa14aefc3');
INSERT INTO public.posts (id, content, access, feeling, activity, "deletedAt", "createdAt", "userId") VALUES ('297a5ffa-de2b-487d-add6-31a612556fd9', '', 'Public', NULL, NULL, '2024-11-05 12:41:11.693816+07', '2024-11-05 12:35:49.362172+07', '6165654e-2ede-4667-9668-d01aa14aefc3');
INSERT INTO public.posts (id, content, access, feeling, activity, "deletedAt", "createdAt", "userId") VALUES ('14cfd760-05fa-4a13-9e97-e033fac4931e', '', 'Public', NULL, NULL, '2024-11-05 12:41:12.748871+07', '2024-11-05 12:35:32.03074+07', '6165654e-2ede-4667-9668-d01aa14aefc3');
INSERT INTO public.posts (id, content, access, feeling, activity, "deletedAt", "createdAt", "userId") VALUES ('e12b3efb-03b9-4b3f-a2f5-0fee99df45e5', 'It good bro', 'Public', NULL, NULL, '2024-11-05 12:41:13.901108+07', '2024-11-05 12:34:42.848011+07', '6165654e-2ede-4667-9668-d01aa14aefc3');
INSERT INTO public.posts (id, content, access, feeling, activity, "deletedAt", "createdAt", "userId") VALUES ('0efe72ba-224f-4973-ba4b-e23a3ec0c306', '', 'Public', NULL, NULL, NULL, '2024-11-05 12:41:36.280572+07', '6165654e-2ede-4667-9668-d01aa14aefc3');
INSERT INTO public.posts (id, content, access, feeling, activity, "deletedAt", "createdAt", "userId") VALUES ('e404ad4b-b2aa-4d29-8db7-7ae046f171be', '', 'Public', NULL, NULL, '2024-11-05 12:55:35.721008+07', '2024-11-05 12:55:10.920815+07', '6165654e-2ede-4667-9668-d01aa14aefc3');
INSERT INTO public.posts (id, content, access, feeling, activity, "deletedAt", "createdAt", "userId") VALUES ('8aa4b9a9-f0c3-415e-9271-3f87eb6c8c68', '', 'Public', NULL, NULL, NULL, '2024-11-05 12:55:52.742285+07', '6165654e-2ede-4667-9668-d01aa14aefc3');


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: comments_likes_users; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: comments_replies_comments; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: conversations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.conversations (id, name, "isGroup", "deletedAt", "createdAt") VALUES ('c06552df-bd35-41a5-93c5-2a947194e589', NULL, false, NULL, '2024-11-24 23:21:08.241238+07');


--
-- Data for Name: conversation_members; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.conversation_members (id, role, "deletedAt", "createdAt", "conversationId", "userId") VALUES ('3d3cbd92-4ced-4bfa-8da7-870b29201e14', 'admin', NULL, '2024-11-24 23:21:08.241238+07', 'c06552df-bd35-41a5-93c5-2a947194e589', '6165654e-2ede-4667-9668-d01aa14aefc3');
INSERT INTO public.conversation_members (id, role, "deletedAt", "createdAt", "conversationId", "userId") VALUES ('4fc33645-45f7-4a75-8f6a-c1ee0716b919', 'member', NULL, '2024-11-24 23:21:08.241238+07', 'c06552df-bd35-41a5-93c5-2a947194e589', '98db3b63-2694-4be6-b4c2-f3221903fb41');


--
-- Data for Name: friends; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.friends (id, status, "createdAt", "userId", "friendId") VALUES ('65865108-1b3d-42ee-99d1-ea311adbaf47', 'pending', '2024-10-25 17:06:48.108877+07', '6165654e-2ede-4667-9668-d01aa14aefc3', '98db3b63-2694-4be6-b4c2-f3221903fb41');


--
-- Data for Name: groups; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: group_members; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: message_files; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: message_reads; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: notification_settings; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: post_files; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.post_files (id, url, path, type, "createdAt", "postId") VALUES ('76c2df96-72c5-469d-9239-29eba8e678f2', 'https://storage.googleapis.com/social-media-duc82.appspot.com/posts/bfa.png?time=1730784882840', 'posts/bfa.png', 'image', '2024-11-05 12:34:42.848011+07', 'e12b3efb-03b9-4b3f-a2f5-0fee99df45e5');
INSERT INTO public.post_files (id, url, path, type, "createdAt", "postId") VALUES ('bf26387a-97fa-4460-b438-05ce35b706dc', 'https://storage.googleapis.com/social-media-duc82.appspot.com/posts/8c918d7ebd98b88a32225232b64b5c87.jpg?time=1730784932028', 'posts/8c918d7ebd98b88a32225232b64b5c87.jpg', 'image', '2024-11-05 12:35:32.03074+07', '14cfd760-05fa-4a13-9e97-e033fac4931e');
INSERT INTO public.post_files (id, url, path, type, "createdAt", "postId") VALUES ('27876040-db60-4976-9280-8a77b70cc1f4', 'https://storage.googleapis.com/social-media-duc82.appspot.com/posts/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg?time=1730784949360', 'posts/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg', 'image', '2024-11-05 12:35:49.362172+07', '297a5ffa-de2b-487d-add6-31a612556fd9');
INSERT INTO public.post_files (id, url, path, type, "createdAt", "postId") VALUES ('c98ed7f7-870b-48f4-9208-24cd5a75fd34', 'https://storage.googleapis.com/social-media-duc82.appspot.com/posts/pepe.jpg?time=1730784981998', 'posts/pepe.jpg', 'image', '2024-11-05 12:36:21.999495+07', '60d3e970-92c3-402a-a28d-275c7e5949bd');
INSERT INTO public.post_files (id, url, path, type, "createdAt", "postId") VALUES ('ab316a7e-6cb4-4c4d-be07-2e32494bacc5', 'https://storage.googleapis.com/social-media-duc82.appspot.com/posts/pepe_cry.png?time=1730784992632', 'posts/pepe_cry.png', 'image', '2024-11-05 12:36:32.634087+07', '368c093c-e6df-4968-89ae-eaa7dacf5faa');
INSERT INTO public.post_files (id, url, path, type, "createdAt", "postId") VALUES ('f41dfe5c-0490-4e0d-9054-d9dfc52cab13', 'https://storage.googleapis.com/social-media-duc82.appspot.com/posts/pepe.jpg?time=1730785064433', 'posts/pepe.jpg', 'image', '2024-11-05 12:37:44.788681+07', 'de3099d1-5639-48c0-92f9-ad3851f56c9e');
INSERT INTO public.post_files (id, url, path, type, "createdAt", "postId") VALUES ('0b8c6eeb-02fc-4d8f-a50f-1e88f5808728', 'https://storage.googleapis.com/social-media-duc82.appspot.com/posts/pepe_cry.png?time=1730785064786', 'posts/pepe_cry.png', 'image', '2024-11-05 12:37:44.788681+07', 'de3099d1-5639-48c0-92f9-ad3851f56c9e');
INSERT INTO public.post_files (id, url, path, type, "createdAt", "postId") VALUES ('21d83d3c-b3e5-4187-92a2-487c93871110', 'https://storage.googleapis.com/social-media-duc82.appspot.com/posts/pepe_cry.png?time=1730785296278', 'posts/pepe_cry.png', 'image', '2024-11-05 12:41:36.280572+07', '0efe72ba-224f-4973-ba4b-e23a3ec0c306');
INSERT INTO public.post_files (id, url, path, type, "createdAt", "postId") VALUES ('a97030bd-1222-4496-b81f-97baa1dc4c51', 'https://storage.googleapis.com/social-media-duc82.appspot.com/posts/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg?time=1730786110919', 'posts/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg', 'image', '2024-11-05 12:55:10.920815+07', 'e404ad4b-b2aa-4d29-8db7-7ae046f171be');
INSERT INTO public.post_files (id, url, path, type, "createdAt", "postId") VALUES ('1f93aa48-a4b7-44e1-9dda-dfabe63e384f', 'https://storage.googleapis.com/social-media-duc82.appspot.com/posts/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg?time=1730786152740', 'posts/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg', 'image', '2024-11-05 12:55:52.742285+07', '8aa4b9a9-f0c3-415e-9271-3f87eb6c8c68');


--
-- Data for Name: posts_likes_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.posts_likes_users ("postsId", "usersId") VALUES ('e12b3efb-03b9-4b3f-a2f5-0fee99df45e5', '6165654e-2ede-4667-9668-d01aa14aefc3');


--
-- Data for Name: stories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.stories (id, content, type, "expiresAt", "deletedAt", "createdAt", "userId") VALUES ('f7eca099-bbe4-4988-8bac-327ef4d95d15', 'https://storage.googleapis.com/social-media-duc82.appspot.com/stories/bfa.png?time=1731032550629', 'image', '2024-11-08 09:22:30.639884+07', NULL, '2024-11-08 09:22:30.639884+07', '6165654e-2ede-4667-9668-d01aa14aefc3');
INSERT INTO public.stories (id, content, type, "expiresAt", "deletedAt", "createdAt", "userId") VALUES ('0423eb05-1d5a-435e-bab5-a4dc8e177e1a', 'https://storage.googleapis.com/social-media-duc82.appspot.com/stories/8c918d7ebd98b88a32225232b64b5c87.jpg?time=1731032995669', 'image', '2024-11-08 09:29:55.673858+07', NULL, '2024-11-08 09:29:55.673858+07', '6165654e-2ede-4667-9668-d01aa14aefc3');
INSERT INTO public.stories (id, content, type, "expiresAt", "deletedAt", "createdAt", "userId") VALUES ('23ad5e92-bd5a-454d-8f6d-6c31ded3366b', 'https://storage.googleapis.com/social-media-duc82.appspot.com/stories/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg?time=1731033052366', 'image', '2024-11-08 09:30:52.370268+07', NULL, '2024-11-08 09:30:52.370268+07', '6165654e-2ede-4667-9668-d01aa14aefc3');
INSERT INTO public.stories (id, content, type, "expiresAt", "deletedAt", "createdAt", "userId") VALUES ('31c2a74e-a67e-4179-876d-1af1eea308e8', 'https://storage.googleapis.com/social-media-duc82.appspot.com/stories/pepe.jpg?time=1731033180777', 'image', '2024-11-08 09:33:00.78096+07', NULL, '2024-11-08 09:33:00.78096+07', '6165654e-2ede-4667-9668-d01aa14aefc3');


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 7, true);


--
-- PostgreSQL database dump complete
--

