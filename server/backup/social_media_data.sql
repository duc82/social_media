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

INSERT INTO public.profiles (id, gender, avatar, wallpaper, birthday, "maritalStatus", job, address, bio, education, workplace) VALUES ('163d5182-2706-4399-be52-a41c9d592343', 'male', 'https://storage.googleapis.com/social-media-duc82.appspot.com/avatars/duccdht123@gmail.com?time=1726827101067', 'https://storage.googleapis.com/social-media-duc82.appspot.com/wallpapers/duccdht123@gmail.com?time=1726653857573', '2003-02-07', NULL, NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (id, "firstName", "lastName", username, email, "emailVerified", password, role, "offlineAt", "bannedAt", "deletedAt", "createdAt", "profileId", "tokenId") VALUES ('3dd4bb63-1c75-4733-8f08-5d6d2d459280', 'Duc', 'Dang', 'duccdht123', 'duccdht123@gmail.com', '2024-09-18 15:34:54.77+07', '$2b$10$w7aYnBz.gjnjtS1sK4X5i.sp86Jlap6fVS0ckKHvdnMizHfnfdAdW', 'user', NULL, NULL, NULL, '2024-09-18 15:34:42.343706+07', '163d5182-2706-4399-be52-a41c9d592343', NULL);


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

INSERT INTO public.posts (id, content, access, "isStory", feeling, activity, "deletedAt", "createdAt", "userId") VALUES ('7dc57ddf-e468-417c-af84-17b1cba88b73', 'hi', 'Public', false, NULL, NULL, NULL, '2024-09-18 17:04:41.426179+07', '3dd4bb63-1c75-4733-8f08-5d6d2d459280');
INSERT INTO public.posts (id, content, access, "isStory", feeling, activity, "deletedAt", "createdAt", "userId") VALUES ('c3474e11-e381-4a1a-b86a-8e1457339966', '', 'Public', false, NULL, NULL, '2024-09-20 17:10:53.614898+07', '2024-09-20 17:10:47.927094+07', '3dd4bb63-1c75-4733-8f08-5d6d2d459280');
INSERT INTO public.posts (id, content, access, "isStory", feeling, activity, "deletedAt", "createdAt", "userId") VALUES ('61904b8f-5c19-4e6d-a8ef-def4dcdcc28e', 'Test bro', 'Public', false, NULL, NULL, '2024-09-22 11:22:48.416154+07', '2024-09-22 11:22:07.829605+07', '3dd4bb63-1c75-4733-8f08-5d6d2d459280');
INSERT INTO public.posts (id, content, access, "isStory", feeling, activity, "deletedAt", "createdAt", "userId") VALUES ('44ba6c01-6086-4180-9ff8-6889d609b22e', 'Đây là video test', 'Public', false, NULL, NULL, '2024-09-22 11:26:18.380387+07', '2024-09-20 22:15:15.259894+07', '3dd4bb63-1c75-4733-8f08-5d6d2d459280');
INSERT INTO public.posts (id, content, access, "isStory", feeling, activity, "deletedAt", "createdAt", "userId") VALUES ('7eb75c92-d321-4a78-b9b7-bc9e0e6308ca', 'Test', 'Public', false, NULL, NULL, NULL, '2024-09-22 11:37:57.154773+07', '3dd4bb63-1c75-4733-8f08-5d6d2d459280');
INSERT INTO public.posts (id, content, access, "isStory", feeling, activity, "deletedAt", "createdAt", "userId") VALUES ('9d7218ad-6932-466c-b261-6f7a9cdae5be', '', 'Public', false, NULL, NULL, '2024-09-22 11:45:55.970061+07', '2024-09-22 11:44:02.060689+07', '3dd4bb63-1c75-4733-8f08-5d6d2d459280');


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.comments (id, content, "deletedAt", "createdAt", "userId", "postId", "parentCommentId") VALUES ('83ed9b33-2751-4e27-b032-b180132721fa', 'Đây là cấp 1', NULL, '2024-09-18 18:39:29.983171+07', '3dd4bb63-1c75-4733-8f08-5d6d2d459280', '7dc57ddf-e468-417c-af84-17b1cba88b73', NULL);
INSERT INTO public.comments (id, content, "deletedAt", "createdAt", "userId", "postId", "parentCommentId") VALUES ('0508ffa3-5d91-45ab-b8de-4ac2d7fcb727', 'Đây là cấp 2', NULL, '2024-09-18 18:39:37.467406+07', '3dd4bb63-1c75-4733-8f08-5d6d2d459280', '7dc57ddf-e468-417c-af84-17b1cba88b73', '83ed9b33-2751-4e27-b032-b180132721fa');
INSERT INTO public.comments (id, content, "deletedAt", "createdAt", "userId", "postId", "parentCommentId") VALUES ('3b40b87d-e3e5-425b-8d6f-46e8a9c43b93', 'Đây là cấp 3', NULL, '2024-09-18 18:39:44.507662+07', '3dd4bb63-1c75-4733-8f08-5d6d2d459280', '7dc57ddf-e468-417c-af84-17b1cba88b73', '0508ffa3-5d91-45ab-b8de-4ac2d7fcb727');
INSERT INTO public.comments (id, content, "deletedAt", "createdAt", "userId", "postId", "parentCommentId") VALUES ('a097816d-348e-4fa1-b911-cdc73f33032c', 'Đây là cấp 4', NULL, '2024-09-18 18:39:50.171123+07', '3dd4bb63-1c75-4733-8f08-5d6d2d459280', '7dc57ddf-e468-417c-af84-17b1cba88b73', '3b40b87d-e3e5-425b-8d6f-46e8a9c43b93');
INSERT INTO public.comments (id, content, "deletedAt", "createdAt", "userId", "postId", "parentCommentId") VALUES ('ff6f2686-5bce-4d38-9e25-4b5c2d0eece6', 'hoho', NULL, '2024-09-18 18:40:26.310291+07', '3dd4bb63-1c75-4733-8f08-5d6d2d459280', '7dc57ddf-e468-417c-af84-17b1cba88b73', 'a097816d-348e-4fa1-b911-cdc73f33032c');


--
-- Data for Name: comments_likes_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.comments_likes_users ("commentsId", "usersId") VALUES ('83ed9b33-2751-4e27-b032-b180132721fa', '3dd4bb63-1c75-4733-8f08-5d6d2d459280');


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

INSERT INTO public.post_files (id, url, path, type, "createdAt", "postId") VALUES ('17fdde0d-8316-4510-b30f-ad47bdcfad31', 'https://storage.googleapis.com/social-media-duc82.appspot.com/posts/hq720.webp?time=1726827047916', 'posts/hq720.webp', 'image', '2024-09-20 17:10:47.927094+07', 'c3474e11-e381-4a1a-b86a-8e1457339966');
INSERT INTO public.post_files (id, url, path, type, "createdAt", "postId") VALUES ('d0d901d6-9c2e-44ec-9335-352fb05b7e12', 'https://storage.googleapis.com/social-media-duc82.appspot.com/posts/video-feed.mp4?time=1726845315252', 'posts/video-feed.mp4', 'video', '2024-09-20 22:15:15.259894+07', '44ba6c01-6086-4180-9ff8-6889d609b22e');
INSERT INTO public.post_files (id, url, path, type, "createdAt", "postId") VALUES ('ebf9addd-2cfa-4b70-a6ea-3de3d89202e9', 'https://storage.googleapis.com/social-media-duc82.appspot.com/posts/gemini-description.jpg?time=1726978927440', 'posts/gemini-description.jpg', 'image', '2024-09-22 11:22:07.829605+07', '61904b8f-5c19-4e6d-a8ef-def4dcdcc28e');
INSERT INTO public.post_files (id, url, path, type, "createdAt", "postId") VALUES ('f74681a2-6265-4844-8191-a461f0830804', 'https://storage.googleapis.com/social-media-duc82.appspot.com/posts/google-gemini-ai-logo-on-color-swirl-background.jpg?time=1726978927352', 'posts/google-gemini-ai-logo-on-color-swirl-background.jpg', 'image', '2024-09-22 11:22:07.829605+07', '61904b8f-5c19-4e6d-a8ef-def4dcdcc28e');
INSERT INTO public.post_files (id, url, path, type, "createdAt", "postId") VALUES ('75613058-f526-4ab4-8203-71c1aac56dd5', 'https://storage.googleapis.com/social-media-duc82.appspot.com/posts/OIP.jfif?time=1726978927283', 'posts/OIP.jfif', 'image', '2024-09-22 11:22:07.829605+07', '61904b8f-5c19-4e6d-a8ef-def4dcdcc28e');
INSERT INTO public.post_files (id, url, path, type, "createdAt", "postId") VALUES ('cdfbe2ea-aef0-47c8-b4a2-c06740b2b37a', 'https://storage.googleapis.com/social-media-duc82.appspot.com/posts/th.png?time=1726978927255', 'posts/th.png', 'image', '2024-09-22 11:22:07.829605+07', '61904b8f-5c19-4e6d-a8ef-def4dcdcc28e');
INSERT INTO public.post_files (id, url, path, type, "createdAt", "postId") VALUES ('2c7d0b18-0b73-484a-9cf8-d3350b5275d6', 'https://storage.googleapis.com/social-media-duc82.appspot.com/posts/chitieucanhan.drawio.png?time=1726978927824', 'posts/chitieucanhan.drawio.png', 'image', '2024-09-22 11:22:07.829605+07', '61904b8f-5c19-4e6d-a8ef-def4dcdcc28e');
INSERT INTO public.post_files (id, url, path, type, "createdAt", "postId") VALUES ('3d1960fc-0eb1-4410-9689-9c0c72e97d0f', 'https://storage.googleapis.com/social-media-duc82.appspot.com/posts/video-feed.mp4?time=1726979877152', 'posts/video-feed.mp4', 'video', '2024-09-22 11:37:57.154773+07', '7eb75c92-d321-4a78-b9b7-bc9e0e6308ca');
INSERT INTO public.post_files (id, url, path, type, "createdAt", "postId") VALUES ('895909db-664c-4b59-9ef8-ef8c71f6f9de', 'https://storage.googleapis.com/social-media-duc82.appspot.com/posts/video-feed.mp4?time=1726980242057', 'posts/video-feed.mp4', 'video', '2024-09-22 11:44:02.060689+07', '9d7218ad-6932-466c-b261-6f7a9cdae5be');
INSERT INTO public.post_files (id, url, path, type, "createdAt", "postId") VALUES ('21f638f3-56b7-4b87-9e81-4803ded3fdd6', 'https://storage.googleapis.com/social-media-duc82.appspot.com/posts/hq720.webp?time=1726980237540', 'posts/hq720.webp', 'image', '2024-09-22 11:44:02.060689+07', '9d7218ad-6932-466c-b261-6f7a9cdae5be');
INSERT INTO public.post_files (id, url, path, type, "createdAt", "postId") VALUES ('7dfd57cb-40fb-4077-a0ae-088a79da2c7a', 'https://storage.googleapis.com/social-media-duc82.appspot.com/posts/gemini-description.jpg?time=1726980237631', 'posts/gemini-description.jpg', 'image', '2024-09-22 11:44:02.060689+07', '9d7218ad-6932-466c-b261-6f7a9cdae5be');
INSERT INTO public.post_files (id, url, path, type, "createdAt", "postId") VALUES ('7ce6a72a-9392-44ed-981d-6f42a992662a', 'https://storage.googleapis.com/social-media-duc82.appspot.com/posts/google-gemini-ai-logo-on-color-swirl-background.jpg?time=1726980238058', 'posts/google-gemini-ai-logo-on-color-swirl-background.jpg', 'image', '2024-09-22 11:44:02.060689+07', '9d7218ad-6932-466c-b261-6f7a9cdae5be');
INSERT INTO public.post_files (id, url, path, type, "createdAt", "postId") VALUES ('683916ee-c6d5-4983-9c12-c59be597366c', 'https://storage.googleapis.com/social-media-duc82.appspot.com/posts/OIP.jfif?time=1726980237515', 'posts/OIP.jfif', 'image', '2024-09-22 11:44:02.060689+07', '9d7218ad-6932-466c-b261-6f7a9cdae5be');
INSERT INTO public.post_files (id, url, path, type, "createdAt", "postId") VALUES ('d60d92e6-4a61-43a7-b4bf-729b41db7557', 'https://storage.googleapis.com/social-media-duc82.appspot.com/posts/chitieucanhan.drawio.png?time=1726980237645', 'posts/chitieucanhan.drawio.png', 'image', '2024-09-22 11:44:02.060689+07', '9d7218ad-6932-466c-b261-6f7a9cdae5be');


--
-- Data for Name: posts_likes_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.posts_likes_users ("postsId", "usersId") VALUES ('44ba6c01-6086-4180-9ff8-6889d609b22e', '3dd4bb63-1c75-4733-8f08-5d6d2d459280');


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 2, true);


--
-- PostgreSQL database dump complete
--

