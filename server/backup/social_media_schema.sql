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
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: unaccent; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA public;


--
-- Name: EXTENSION unaccent; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION unaccent IS 'text search dictionary that removes accents';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: conversation_members_role_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.conversation_members_role_enum AS ENUM (
    'admin',
    'moderator',
    'member'
);


ALTER TYPE public.conversation_members_role_enum OWNER TO postgres;

--
-- Name: friends_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.friends_status_enum AS ENUM (
    'pending',
    'accepted',
    'declined'
);


ALTER TYPE public.friends_status_enum OWNER TO postgres;

--
-- Name: group_members_role_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.group_members_role_enum AS ENUM (
    'admin',
    'moderator',
    'member'
);


ALTER TYPE public.group_members_role_enum OWNER TO postgres;

--
-- Name: groups_access_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.groups_access_enum AS ENUM (
    'public',
    'private'
);


ALTER TYPE public.groups_access_enum OWNER TO postgres;

--
-- Name: message_files_type_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.message_files_type_enum AS ENUM (
    'image',
    'video'
);


ALTER TYPE public.message_files_type_enum OWNER TO postgres;

--
-- Name: notifications_type_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.notifications_type_enum AS ENUM (
    'like',
    'comment',
    'friend_request',
    'accepted_friend_request',
    'birthday',
    'group'
);


ALTER TYPE public.notifications_type_enum OWNER TO postgres;

--
-- Name: post_files_type_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.post_files_type_enum AS ENUM (
    'image',
    'video'
);


ALTER TYPE public.post_files_type_enum OWNER TO postgres;

--
-- Name: posts_access_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.posts_access_enum AS ENUM (
    'public',
    'friends',
    'only me'
);


ALTER TYPE public.posts_access_enum OWNER TO postgres;

--
-- Name: profiles_gender_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.profiles_gender_enum AS ENUM (
    'male',
    'female',
    'other'
);


ALTER TYPE public.profiles_gender_enum OWNER TO postgres;

--
-- Name: profiles_maritalstatus_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.profiles_maritalstatus_enum AS ENUM (
    'single',
    'married',
    'divorced',
    'widowed'
);


ALTER TYPE public.profiles_maritalstatus_enum OWNER TO postgres;

--
-- Name: stories_type_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.stories_type_enum AS ENUM (
    'image',
    'video'
);


ALTER TYPE public.stories_type_enum OWNER TO postgres;

--
-- Name: users_role_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.users_role_enum AS ENUM (
    'user',
    'admin'
);


ALTER TYPE public.users_role_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: blocked; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.blocked (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "userId" uuid,
    "blockedById" uuid
);


ALTER TABLE public.blocked OWNER TO postgres;

--
-- Name: blog_comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.blog_comments (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    content character varying NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "userId" uuid
);


ALTER TABLE public.blog_comments OWNER TO postgres;

--
-- Name: blog_tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.blog_tags (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.blog_tags OWNER TO postgres;

--
-- Name: blogs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.blogs (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title character varying NOT NULL,
    content character varying NOT NULL,
    image character varying NOT NULL,
    "deletedAt" timestamp with time zone,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "tagId" uuid
);


ALTER TABLE public.blogs OWNER TO postgres;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    content character varying NOT NULL,
    "deletedAt" timestamp with time zone,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "userId" uuid,
    "postId" uuid,
    "parentCommentId" uuid
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- Name: comments_likes_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments_likes_users (
    "commentsId" uuid NOT NULL,
    "usersId" uuid NOT NULL
);


ALTER TABLE public.comments_likes_users OWNER TO postgres;

--
-- Name: conversation_members; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.conversation_members (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    role public.conversation_members_role_enum DEFAULT 'member'::public.conversation_members_role_enum NOT NULL,
    "deletedAt" timestamp with time zone,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "conversationId" uuid,
    "userId" uuid
);


ALTER TABLE public.conversation_members OWNER TO postgres;

--
-- Name: conversations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.conversations (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying,
    "isGroup" boolean NOT NULL,
    "deletedAt" timestamp with time zone,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.conversations OWNER TO postgres;

--
-- Name: followers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.followers (
    "followerId" uuid NOT NULL,
    "followingId" uuid NOT NULL
);


ALTER TABLE public.followers OWNER TO postgres;

--
-- Name: friends; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.friends (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    status public.friends_status_enum DEFAULT 'pending'::public.friends_status_enum NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "userId" uuid,
    "friendId" uuid
);


ALTER TABLE public.friends OWNER TO postgres;

--
-- Name: group_members; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.group_members (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    role public.group_members_role_enum DEFAULT 'member'::public.group_members_role_enum NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "groupId" uuid,
    "userId" uuid
);


ALTER TABLE public.group_members OWNER TO postgres;

--
-- Name: groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.groups (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    description character varying,
    picture character varying NOT NULL,
    wallpaper character varying NOT NULL,
    access public.groups_access_enum NOT NULL,
    "deletedAt" timestamp with time zone,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.groups OWNER TO postgres;

--
-- Name: message_files; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.message_files (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    url character varying NOT NULL,
    path character varying NOT NULL,
    type public.message_files_type_enum NOT NULL,
    "messageId" uuid
);


ALTER TABLE public.message_files OWNER TO postgres;

--
-- Name: message_reads; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.message_reads (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "userId" uuid,
    "messageId" uuid
);


ALTER TABLE public.message_reads OWNER TO postgres;

--
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    content character varying,
    "deletedAt" timestamp with time zone,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "conversationId" uuid,
    "userId" uuid
);


ALTER TABLE public.messages OWNER TO postgres;

--
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: notification_settings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notification_settings (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    likes boolean DEFAULT true NOT NULL,
    followers boolean DEFAULT true NOT NULL,
    comments boolean DEFAULT true NOT NULL,
    "friendRequests" boolean DEFAULT true NOT NULL,
    birthdays boolean DEFAULT true NOT NULL,
    events boolean DEFAULT true NOT NULL,
    groups boolean DEFAULT true NOT NULL,
    messages boolean DEFAULT true NOT NULL,
    "userId" uuid
);


ALTER TABLE public.notification_settings OWNER TO postgres;

--
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notifications (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    content character varying NOT NULL,
    type public.notifications_type_enum NOT NULL,
    "readAt" timestamp with time zone,
    "deletedAt" timestamp with time zone,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "userId" uuid,
    "actorId" uuid,
    "postId" uuid,
    "commentId" uuid
);


ALTER TABLE public.notifications OWNER TO postgres;

--
-- Name: post_files; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.post_files (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    url character varying NOT NULL,
    path character varying NOT NULL,
    type public.post_files_type_enum NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "postId" uuid
);


ALTER TABLE public.post_files OWNER TO postgres;

--
-- Name: posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    content character varying,
    access public.posts_access_enum DEFAULT 'public'::public.posts_access_enum NOT NULL,
    feeling text[],
    activity text[],
    "deletedAt" timestamp with time zone,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "groupId" uuid,
    "userId" uuid
);


ALTER TABLE public.posts OWNER TO postgres;

--
-- Name: posts_likes_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts_likes_users (
    "postsId" uuid NOT NULL,
    "usersId" uuid NOT NULL
);


ALTER TABLE public.posts_likes_users OWNER TO postgres;

--
-- Name: profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profiles (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    gender public.profiles_gender_enum NOT NULL,
    avatar character varying NOT NULL,
    wallpaper character varying,
    birthday date NOT NULL,
    "maritalStatus" public.profiles_maritalstatus_enum,
    job character varying,
    address character varying,
    bio character varying(300),
    education character varying,
    workplace character varying
);


ALTER TABLE public.profiles OWNER TO postgres;

--
-- Name: stories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stories (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    content character varying NOT NULL,
    type public.stories_type_enum NOT NULL,
    "expiresAt" timestamp with time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp with time zone,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "userId" uuid
);


ALTER TABLE public.stories OWNER TO postgres;

--
-- Name: tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tokens (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "resetToken" character varying,
    "resetTokenExpires" timestamp with time zone,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.tokens OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "firstName" character varying NOT NULL,
    "lastName" character varying NOT NULL,
    "fullName" character varying NOT NULL,
    username character varying NOT NULL,
    email character varying NOT NULL,
    "emailVerified" timestamp with time zone,
    password character varying NOT NULL,
    role public.users_role_enum DEFAULT 'user'::public.users_role_enum NOT NULL,
    "offlineAt" timestamp with time zone,
    "bannedAt" timestamp with time zone,
    "deletedAt" timestamp with time zone,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "profileId" uuid,
    "tokenId" uuid
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: message_files PK_0c383dd49eca61f122709fb16d0; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message_files
    ADD CONSTRAINT "PK_0c383dd49eca61f122709fb16d0" PRIMARY KEY (id);


--
-- Name: followers PK_1485f24f1f66ac91ea2c5517ebd; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT "PK_1485f24f1f66ac91ea2c5517ebd" PRIMARY KEY ("followerId", "followingId");


--
-- Name: messages PK_18325f38ae6de43878487eff986; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY (id);


--
-- Name: posts_likes_users PK_22375725d266ad40d394810d96b; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts_likes_users
    ADD CONSTRAINT "PK_22375725d266ad40d394810d96b" PRIMARY KEY ("postsId", "usersId");


--
-- Name: posts PK_2829ac61eff60fcec60d7274b9e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY (id);


--
-- Name: tokens PK_3001e89ada36263dabf1fb6210a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY (id);


--
-- Name: conversation_members PK_33146a476696a973a14d931e675; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversation_members
    ADD CONSTRAINT "PK_33146a476696a973a14d931e675" PRIMARY KEY (id);


--
-- Name: post_files PK_3a75ee290763a3bfa3597f05f3e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_files
    ADD CONSTRAINT "PK_3a75ee290763a3bfa3597f05f3e" PRIMARY KEY (id);


--
-- Name: blocked PK_537b196b5b7e6aa56b637963a1e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blocked
    ADD CONSTRAINT "PK_537b196b5b7e6aa56b637963a1e" PRIMARY KEY (id);


--
-- Name: groups PK_659d1483316afb28afd3a90646e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY (id);


--
-- Name: friends PK_65e1b06a9f379ee5255054021e1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.friends
    ADD CONSTRAINT "PK_65e1b06a9f379ee5255054021e1" PRIMARY KEY (id);


--
-- Name: notifications PK_6a72c3c0f683f6462415e653c3a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY (id);


--
-- Name: message_reads PK_7d3be462a9d7dfbbccc93c097e1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message_reads
    ADD CONSTRAINT "PK_7d3be462a9d7dfbbccc93c097e1" PRIMARY KEY (id);


--
-- Name: group_members PK_86446139b2c96bfd0f3b8638852; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.group_members
    ADD CONSTRAINT "PK_86446139b2c96bfd0f3b8638852" PRIMARY KEY (id);


--
-- Name: blog_tags PK_8880485f371f1892310811845c8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blog_tags
    ADD CONSTRAINT "PK_8880485f371f1892310811845c8" PRIMARY KEY (id);


--
-- Name: comments_likes_users PK_88f329d3fff9b74186c0fe7474c; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments_likes_users
    ADD CONSTRAINT "PK_88f329d3fff9b74186c0fe7474c" PRIMARY KEY ("commentsId", "usersId");


--
-- Name: comments PK_8bf68bc960f2b69e818bdb90dcb; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY (id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: profiles PK_8e520eb4da7dc01d0e190447c8e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY (id);


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: blog_comments PK_b478aaeecf38441a25739aa9610; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blog_comments
    ADD CONSTRAINT "PK_b478aaeecf38441a25739aa9610" PRIMARY KEY (id);


--
-- Name: stories PK_bb6f880b260ed96c452b32a39f0; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stories
    ADD CONSTRAINT "PK_bb6f880b260ed96c452b32a39f0" PRIMARY KEY (id);


--
-- Name: notification_settings PK_d131abd7996c475ef768d4559ba; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification_settings
    ADD CONSTRAINT "PK_d131abd7996c475ef768d4559ba" PRIMARY KEY (id);


--
-- Name: blogs PK_e113335f11c926da929a625f118; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blogs
    ADD CONSTRAINT "PK_e113335f11c926da929a625f118" PRIMARY KEY (id);


--
-- Name: conversations PK_ee34f4f7ced4ec8681f26bf04ef; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversations
    ADD CONSTRAINT "PK_ee34f4f7ced4ec8681f26bf04ef" PRIMARY KEY (id);


--
-- Name: notification_settings REL_5a8ffc3b89343043c9440d631e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification_settings
    ADD CONSTRAINT "REL_5a8ffc3b89343043c9440d631e" UNIQUE ("userId");


--
-- Name: users REL_b1bda35cdb9a2c1b777f5541d8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "REL_b1bda35cdb9a2c1b777f5541d8" UNIQUE ("profileId");


--
-- Name: users REL_d98a275f8bc6cd986fcbe2eab0; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "REL_d98a275f8bc6cd986fcbe2eab0" UNIQUE ("tokenId");


--
-- Name: IDX_0518ca06cb04edf6b840e11f5b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_0518ca06cb04edf6b840e11f5b" ON public.comments_likes_users USING btree ("commentsId");


--
-- Name: IDX_451bb9eb792c3023a164cf14e0; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_451bb9eb792c3023a164cf14e0" ON public.followers USING btree ("followerId");


--
-- Name: IDX_5e34418be6d904b779ca96cf93; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_5e34418be6d904b779ca96cf93" ON public.followers USING btree ("followingId");


--
-- Name: IDX_af99ecc047b6eefd6b93479fc7; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_af99ecc047b6eefd6b93479fc7" ON public.posts_likes_users USING btree ("usersId");


--
-- Name: IDX_ddf35245765d65f6e1a9430fa7; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_ddf35245765d65f6e1a9430fa7" ON public.posts_likes_users USING btree ("postsId");


--
-- Name: IDX_ea5e811da14ec00071a13b9df8; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_ea5e811da14ec00071a13b9df8" ON public.comments_likes_users USING btree ("usersId");


--
-- Name: idx_message_reads_message_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_message_reads_message_id ON public.message_reads USING btree ("messageId");


--
-- Name: idx_message_reads_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_message_reads_user_id ON public.message_reads USING btree ("userId");


--
-- Name: idx_messages_conversation_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_messages_conversation_id ON public.messages USING btree ("conversationId");


--
-- Name: idx_users_email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX idx_users_email ON public.users USING btree (email);


--
-- Name: idx_users_username; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX idx_users_username ON public.users USING btree (username);


--
-- Name: comments_likes_users FK_0518ca06cb04edf6b840e11f5b8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments_likes_users
    ADD CONSTRAINT "FK_0518ca06cb04edf6b840e11f5b8" FOREIGN KEY ("commentsId") REFERENCES public.comments(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: friends FK_0c4c4b18d8a52c580213a40c084; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.friends
    ADD CONSTRAINT "FK_0c4c4b18d8a52c580213a40c084" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: blog_comments FK_166954a3340789682daf335b3f4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blog_comments
    ADD CONSTRAINT "FK_166954a3340789682daf335b3f4" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: group_members FK_1aa8d31831c3126947e7a713c2b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.group_members
    ADD CONSTRAINT "FK_1aa8d31831c3126947e7a713c2b" FOREIGN KEY ("groupId") REFERENCES public.groups(id) ON DELETE CASCADE;


--
-- Name: blocked FK_340622b9f43a602c8f568381310; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blocked
    ADD CONSTRAINT "FK_340622b9f43a602c8f568381310" FOREIGN KEY ("blockedById") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: blocked FK_39f1744f20e7c883da90e9fd9a3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blocked
    ADD CONSTRAINT "FK_39f1744f20e7c883da90e9fd9a3" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: notifications FK_44412a2d6f162ff4dc1697d0db7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT "FK_44412a2d6f162ff4dc1697d0db7" FOREIGN KEY ("actorId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: followers FK_451bb9eb792c3023a164cf14e0a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT "FK_451bb9eb792c3023a164cf14e0a" FOREIGN KEY ("followerId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: messages FK_4838cd4fc48a6ff2d4aa01aa646; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: comments FK_4875672591221a61ace66f2d4f9; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "FK_4875672591221a61ace66f2d4f9" FOREIGN KEY ("parentCommentId") REFERENCES public.comments(id);


--
-- Name: message_reads FK_52bbdda5d68282f2b13b605dbf0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message_reads
    ADD CONSTRAINT "FK_52bbdda5d68282f2b13b605dbf0" FOREIGN KEY ("messageId") REFERENCES public.messages(id) ON DELETE CASCADE;


--
-- Name: notification_settings FK_5a8ffc3b89343043c9440d631e2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notification_settings
    ADD CONSTRAINT "FK_5a8ffc3b89343043c9440d631e2" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: followers FK_5e34418be6d904b779ca96cf932; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT "FK_5e34418be6d904b779ca96cf932" FOREIGN KEY ("followingId") REFERENCES public.users(id);


--
-- Name: stories FK_655cd324a6949f46e1b397f621e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stories
    ADD CONSTRAINT "FK_655cd324a6949f46e1b397f621e" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: notifications FK_692a909ee0fa9383e7859f9b406; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT "FK_692a909ee0fa9383e7859f9b406" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: comments FK_7e8d7c49f218ebb14314fdb3749; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: friends FK_867f9b37dcc79035fa20e8ffe5e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.friends
    ADD CONSTRAINT "FK_867f9b37dcc79035fa20e8ffe5e" FOREIGN KEY ("friendId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: notifications FK_93c464aaf70fb0720dc500e93c8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT "FK_93c464aaf70fb0720dc500e93c8" FOREIGN KEY ("postId") REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: conversation_members FK_9a23e356db3cedb8d9725d01d1a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversation_members
    ADD CONSTRAINT "FK_9a23e356db3cedb8d9725d01d1a" FOREIGN KEY ("conversationId") REFERENCES public.conversations(id) ON DELETE CASCADE;


--
-- Name: notifications FK_9faba56a12931cf4e38f9dddb49; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT "FK_9faba56a12931cf4e38f9dddb49" FOREIGN KEY ("commentId") REFERENCES public.comments(id) ON DELETE CASCADE;


--
-- Name: post_files FK_a12706e0fd90132ab2ffa9b0b1e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_files
    ADD CONSTRAINT "FK_a12706e0fd90132ab2ffa9b0b1e" FOREIGN KEY ("postId") REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: posts FK_ae05faaa55c866130abef6e1fee; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "FK_ae05faaa55c866130abef6e1fee" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: posts_likes_users FK_af99ecc047b6eefd6b93479fc7f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts_likes_users
    ADD CONSTRAINT "FK_af99ecc047b6eefd6b93479fc7f" FOREIGN KEY ("usersId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: users FK_b1bda35cdb9a2c1b777f5541d87; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87" FOREIGN KEY ("profileId") REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: conversation_members FK_b49c970adabf84fd2b013b60a99; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversation_members
    ADD CONSTRAINT "FK_b49c970adabf84fd2b013b60a99" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: message_files FK_d06fa80e981c0fdf8c2b19c320f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message_files
    ADD CONSTRAINT "FK_d06fa80e981c0fdf8c2b19c320f" FOREIGN KEY ("messageId") REFERENCES public.messages(id) ON DELETE CASCADE;


--
-- Name: posts FK_d10acbe503da4c56853181efc98; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT "FK_d10acbe503da4c56853181efc98" FOREIGN KEY ("groupId") REFERENCES public.groups(id) ON DELETE CASCADE;


--
-- Name: message_reads FK_d73adf0e3689c233a1aceea2ffa; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.message_reads
    ADD CONSTRAINT "FK_d73adf0e3689c233a1aceea2ffa" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: users FK_d98a275f8bc6cd986fcbe2eab01; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01" FOREIGN KEY ("tokenId") REFERENCES public.tokens(id) ON DELETE CASCADE;


--
-- Name: posts_likes_users FK_ddf35245765d65f6e1a9430fa70; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts_likes_users
    ADD CONSTRAINT "FK_ddf35245765d65f6e1a9430fa70" FOREIGN KEY ("postsId") REFERENCES public.posts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: comments FK_e44ddaaa6d058cb4092f83ad61f; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f" FOREIGN KEY ("postId") REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: blogs FK_e47fc2b27ef4b17e6d43a93c09d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blogs
    ADD CONSTRAINT "FK_e47fc2b27ef4b17e6d43a93c09d" FOREIGN KEY ("tagId") REFERENCES public.blog_tags(id) ON DELETE CASCADE;


--
-- Name: messages FK_e5663ce0c730b2de83445e2fd19; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT "FK_e5663ce0c730b2de83445e2fd19" FOREIGN KEY ("conversationId") REFERENCES public.conversations(id) ON DELETE CASCADE;


--
-- Name: comments_likes_users FK_ea5e811da14ec00071a13b9df85; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments_likes_users
    ADD CONSTRAINT "FK_ea5e811da14ec00071a13b9df85" FOREIGN KEY ("usersId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: group_members FK_fdef099303bcf0ffd9a4a7b18f5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.group_members
    ADD CONSTRAINT "FK_fdef099303bcf0ffd9a4a7b18f5" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

