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

INSERT INTO public.profiles (id, gender, avatar, wallpaper, birthday, "maritalStatus", job, address, bio, education, workplace) VALUES ('94f4f381-7b82-4334-b57d-363a0c698539', 'female', 'https://storage.googleapis.com/social-media-duc82.appspot.com/avatars%2Fbidv840242%40gmail.com', NULL, '1974-09-18', NULL, NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (id, "firstName", "lastName", username, email, "emailVerified", password, role, "offlineAt", "bannedAt", "deletedAt", "createdAt", "profileId", "tokenId") VALUES ('5da0127b-f4b0-44b0-aed9-fc95d03a7a7c', 'Duc', 'Dang', 'bidv840242', 'bidv840242@gmail.com', '2024-09-04 02:25:27.99+07', '$2b$10$vSiLKQK1qBMsWk4oN.d1EO5KYKQnuLbJ9F3tdaPeTY9YAf20AOWvK', 'user', '2024-09-12 22:10:32.068+07', NULL, NULL, '2024-09-04 02:24:55.397911+07', '94f4f381-7b82-4334-b57d-363a0c698539', NULL);


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

INSERT INTO public.posts (id, content, access, "isStory", feeling, activity, "deletedAt", "createdAt", "userId") VALUES ('ba8e8364-4c0f-421c-9930-dfaa733c87f9', 'hi brothers', 'Public', false, NULL, NULL, NULL, '2024-09-09 11:28:25.952825+07', '5da0127b-f4b0-44b0-aed9-fc95d03a7a7c');
INSERT INTO public.posts (id, content, access, "isStory", feeling, activity, "deletedAt", "createdAt", "userId") VALUES ('d4174c47-8818-4b90-9c25-fbb7f2b7ef73', 'Im tired 0803', 'Public', false, NULL, NULL, '2024-09-10 21:35:39.460902+07', '2024-09-09 19:42:43.776021+07', '5da0127b-f4b0-44b0-aed9-fc95d03a7a7c');
INSERT INTO public.posts (id, content, access, "isStory", feeling, activity, "deletedAt", "createdAt", "userId") VALUES ('1c2cc7c6-e7ad-4ce9-b377-fc80efc119d3', 'Oho', 'Public', false, NULL, NULL, '2024-09-10 21:35:41.523907+07', '2024-09-09 19:41:28.211731+07', '5da0127b-f4b0-44b0-aed9-fc95d03a7a7c');
INSERT INTO public.posts (id, content, access, "isStory", feeling, activity, "deletedAt", "createdAt", "userId") VALUES ('bfe63d6a-f77b-426f-92b9-6eb1c32f2a70', 'Liu Till Real', 'Public', false, '{😢,sad}', NULL, '2024-09-10 21:35:44.082279+07', '2024-09-09 11:44:16.275914+07', '5da0127b-f4b0-44b0-aed9-fc95d03a7a7c');


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.comments (id, content, "deletedAt", "createdAt", "userId", "postId") VALUES ('f46c2965-86b2-47b8-87d1-471937da777e', 'hi', NULL, '2024-09-09 11:37:54.66539+07', '5da0127b-f4b0-44b0-aed9-fc95d03a7a7c', 'ba8e8364-4c0f-421c-9930-dfaa733c87f9');
INSERT INTO public.comments (id, content, "deletedAt", "createdAt", "userId", "postId") VALUES ('e6d462f7-92f6-4c4e-821d-0053841dc4f6', 'what the fuck', NULL, '2024-09-09 11:38:04.9369+07', '5da0127b-f4b0-44b0-aed9-fc95d03a7a7c', 'ba8e8364-4c0f-421c-9930-dfaa733c87f9');
INSERT INTO public.comments (id, content, "deletedAt", "createdAt", "userId", "postId") VALUES ('7e9a6b96-0c0f-4e89-8fac-f478b8383bb8', '123', NULL, '2024-09-09 11:39:11.926459+07', '5da0127b-f4b0-44b0-aed9-fc95d03a7a7c', 'ba8e8364-4c0f-421c-9930-dfaa733c87f9');
INSERT INTO public.comments (id, content, "deletedAt", "createdAt", "userId", "postId") VALUES ('478b3818-fa96-4cba-93d7-4c786e673879', 'brother', NULL, '2024-09-09 11:41:00.333343+07', '5da0127b-f4b0-44b0-aed9-fc95d03a7a7c', 'ba8e8364-4c0f-421c-9930-dfaa733c87f9');
INSERT INTO public.comments (id, content, "deletedAt", "createdAt", "userId", "postId") VALUES ('0ad3e846-a2d5-4ea5-a6d6-42fdf526a06b', 'haha', NULL, '2024-09-09 11:41:08.813566+07', '5da0127b-f4b0-44b0-aed9-fc95d03a7a7c', 'ba8e8364-4c0f-421c-9930-dfaa733c87f9');


--
-- Data for Name: comments_likes_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.comments_likes_users ("commentsId", "usersId") VALUES ('0ad3e846-a2d5-4ea5-a6d6-42fdf526a06b', '5da0127b-f4b0-44b0-aed9-fc95d03a7a7c');


--
-- Data for Name: comments_replies_comments; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: conversations; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: conversation_members; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: friends; Type: TABLE DATA; Schema: public; Owner: postgres
--



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
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: post_files; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.post_files (id, url, path, type, "createdAt", "postId") VALUES ('a36f26d1-ba9d-425d-9758-d3e1fca6a2ef', 'https://storage.googleapis.com/social-media-duc82.appspot.com/posts%2F4k-office-background-silapjkl0bkxakj4.jpg', 'posts/4k-office-background-silapjkl0bkxakj4.jpg', 'image', '2024-09-09 11:44:16.275914+07', 'bfe63d6a-f77b-426f-92b9-6eb1c32f2a70');
INSERT INTO public.post_files (id, url, path, type, "createdAt", "postId") VALUES ('c8b65fb2-69d8-4784-a44d-50d334247fa2', 'https://storage.googleapis.com/social-media-duc82.appspot.com/posts%2FGV7BoC3V4.jpeg', 'posts/GV7BoC3V4.jpeg', 'image', '2024-09-09 11:44:16.275914+07', 'bfe63d6a-f77b-426f-92b9-6eb1c32f2a70');
INSERT INTO public.post_files (id, url, path, type, "createdAt", "postId") VALUES ('a3497bbf-a9b5-452b-bdc3-f65f9396e171', 'https://storage.googleapis.com/social-media-duc82.appspot.com/posts%2FOIP.jfif', 'posts/OIP.jfif', 'image', '2024-09-09 11:44:16.275914+07', 'bfe63d6a-f77b-426f-92b9-6eb1c32f2a70');


--
-- Data for Name: posts_likes_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.posts_likes_users ("postsId", "usersId") VALUES ('ba8e8364-4c0f-421c-9930-dfaa733c87f9', '5da0127b-f4b0-44b0-aed9-fc95d03a7a7c');


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 1, true);


--
-- PostgreSQL database dump complete
--

