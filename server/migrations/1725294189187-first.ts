import { MigrationInterface, QueryRunner } from "typeorm";

export class First1725294189187 implements MigrationInterface {
    name = 'First1725294189187'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."profiles_gender_enum" AS ENUM('male', 'female', 'other')`);
        await queryRunner.query(`CREATE TYPE "public"."profiles_maritalstatus_enum" AS ENUM('single', 'married', 'divorced', 'widowed')`);
        await queryRunner.query(`CREATE TABLE "profiles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "gender" "public"."profiles_gender_enum" NOT NULL, "avatar" character varying NOT NULL, "wallpaper" character varying, "birthday" date NOT NULL, "maritalStatus" "public"."profiles_maritalstatus_enum", "job" character varying, "address" character varying, "bio" character varying(300), "education" character varying, "workplace" character varying, CONSTRAINT "PK_8e520eb4da7dc01d0e190447c8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "deletedAt" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" uuid, "postId" uuid, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."post_files_type_enum" AS ENUM('image', 'video')`);
        await queryRunner.query(`CREATE TABLE "post_files" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "path" character varying NOT NULL, "type" "public"."post_files_type_enum" NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "postId" uuid, CONSTRAINT "PK_3a75ee290763a3bfa3597f05f3e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."posts_access_enum" AS ENUM('Public', 'Friends', 'Only me')`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying, "access" "public"."posts_access_enum" NOT NULL DEFAULT 'Public', "isStory" boolean NOT NULL DEFAULT false, "feeling" text array, "activity" text array, "deletedAt" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "resetToken" character varying, "resetTokenExpires" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."groups_access_enum" AS ENUM('PUBLIC', 'PRIVATE')`);
        await queryRunner.query(`CREATE TABLE "groups" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "about" character varying, "access" "public"."groups_access_enum" NOT NULL, "deletedAt" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."group_members_role_enum" AS ENUM('admin', 'moderator', 'member')`);
        await queryRunner.query(`CREATE TABLE "group_members" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role" "public"."group_members_role_enum" NOT NULL DEFAULT 'member', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "groupId" uuid, "userId" uuid, CONSTRAINT "PK_86446139b2c96bfd0f3b8638852" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."message_files_type_enum" AS ENUM('image', 'video')`);
        await queryRunner.query(`CREATE TABLE "message_files" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "path" character varying NOT NULL, "type" "public"."message_files_type_enum" NOT NULL, "messageId" uuid, CONSTRAINT "PK_0c383dd49eca61f122709fb16d0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "message_reads" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" uuid, "messageId" uuid, CONSTRAINT "PK_7d3be462a9d7dfbbccc93c097e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_message_reads_user_id" ON "message_reads" ("userId") `);
        await queryRunner.query(`CREATE INDEX "idx_message_reads_message_id" ON "message_reads" ("messageId") `);
        await queryRunner.query(`CREATE TYPE "public"."messages_callstatus_enum" AS ENUM('success', 'failed')`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying, "isVideoCall" boolean, "isAudioCall" boolean, "callDuration" integer, "callStatus" "public"."messages_callstatus_enum", "deletedAt" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "conversationId" uuid, "userId" uuid, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_messages_conversation_id" ON "messages" ("conversationId") `);
        await queryRunner.query(`CREATE TABLE "conversations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "image" character varying, "isGroup" boolean NOT NULL, "deletedAt" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_ee34f4f7ced4ec8681f26bf04ef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."conversation_members_role_enum" AS ENUM('admin', 'moderator', 'member')`);
        await queryRunner.query(`CREATE TABLE "conversation_members" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role" "public"."conversation_members_role_enum" NOT NULL DEFAULT 'member', "deletedAt" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "conversationId" uuid, "userId" uuid, CONSTRAINT "PK_33146a476696a973a14d931e675" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blocked_users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "blockedUserId" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_93760d788a31b7546c5424f42cc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('user', 'admin')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "emailVerified" TIMESTAMP WITH TIME ZONE, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', "offlineAt" TIMESTAMP WITH TIME ZONE, "bannedAt" TIMESTAMP WITH TIME ZONE, "deletedAt" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "profileId" uuid, "tokenId" uuid, CONSTRAINT "REL_b1bda35cdb9a2c1b777f5541d8" UNIQUE ("profileId"), CONSTRAINT "REL_d98a275f8bc6cd986fcbe2eab0" UNIQUE ("tokenId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "idx_users_username" ON "users" ("username") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "idx_users_email" ON "users" ("email") `);
        await queryRunner.query(`CREATE TYPE "public"."friends_status_enum" AS ENUM('pending', 'accepted', 'declined')`);
        await queryRunner.query(`CREATE TABLE "friends" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."friends_status_enum" NOT NULL DEFAULT 'pending', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" uuid, "friendId" uuid, CONSTRAINT "PK_65e1b06a9f379ee5255054021e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "image" character varying NOT NULL, "description" character varying NOT NULL, "readAt" TIMESTAMP WITH TIME ZONE, "deletedAt" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "friendId" uuid, "userId" uuid, CONSTRAINT "REL_2d69981b419fe03231a32f6095" UNIQUE ("friendId"), CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blog_tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_8880485f371f1892310811845c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blog_comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_b478aaeecf38441a25739aa9610" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blogs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "content" character varying NOT NULL, "image" character varying NOT NULL, "deletedAt" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "tagId" uuid, CONSTRAINT "PK_e113335f11c926da929a625f118" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments_likes_users" ("commentsId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_88f329d3fff9b74186c0fe7474c" PRIMARY KEY ("commentsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0518ca06cb04edf6b840e11f5b" ON "comments_likes_users" ("commentsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ea5e811da14ec00071a13b9df8" ON "comments_likes_users" ("usersId") `);
        await queryRunner.query(`CREATE TABLE "comments_replies_comments" ("commentsId_1" uuid NOT NULL, "commentsId_2" uuid NOT NULL, CONSTRAINT "PK_47b2e02b0da7fb6e918ed032a7c" PRIMARY KEY ("commentsId_1", "commentsId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_89120bf99ebf0e5fb7508193f7" ON "comments_replies_comments" ("commentsId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_ccd49a9e5eaabeba4a5836d256" ON "comments_replies_comments" ("commentsId_2") `);
        await queryRunner.query(`CREATE TABLE "posts_likes_users" ("postsId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_22375725d266ad40d394810d96b" PRIMARY KEY ("postsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ddf35245765d65f6e1a9430fa7" ON "posts_likes_users" ("postsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_af99ecc047b6eefd6b93479fc7" ON "posts_likes_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_files" ADD CONSTRAINT "FK_a12706e0fd90132ab2ffa9b0b1e" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_ae05faaa55c866130abef6e1fee" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_members" ADD CONSTRAINT "FK_1aa8d31831c3126947e7a713c2b" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_members" ADD CONSTRAINT "FK_fdef099303bcf0ffd9a4a7b18f5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message_files" ADD CONSTRAINT "FK_d06fa80e981c0fdf8c2b19c320f" FOREIGN KEY ("messageId") REFERENCES "messages"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message_reads" ADD CONSTRAINT "FK_d73adf0e3689c233a1aceea2ffa" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message_reads" ADD CONSTRAINT "FK_52bbdda5d68282f2b13b605dbf0" FOREIGN KEY ("messageId") REFERENCES "messages"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_e5663ce0c730b2de83445e2fd19" FOREIGN KEY ("conversationId") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "conversation_members" ADD CONSTRAINT "FK_9a23e356db3cedb8d9725d01d1a" FOREIGN KEY ("conversationId") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "conversation_members" ADD CONSTRAINT "FK_b49c970adabf84fd2b013b60a99" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blocked_users" ADD CONSTRAINT "FK_1af4fb14dc336fbdf578d171d4c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01" FOREIGN KEY ("tokenId") REFERENCES "tokens"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friends" ADD CONSTRAINT "FK_0c4c4b18d8a52c580213a40c084" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friends" ADD CONSTRAINT "FK_867f9b37dcc79035fa20e8ffe5e" FOREIGN KEY ("friendId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_2d69981b419fe03231a32f60956" FOREIGN KEY ("friendId") REFERENCES "friends"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_692a909ee0fa9383e7859f9b406" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blog_comments" ADD CONSTRAINT "FK_166954a3340789682daf335b3f4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blogs" ADD CONSTRAINT "FK_e47fc2b27ef4b17e6d43a93c09d" FOREIGN KEY ("tagId") REFERENCES "blog_tags"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments_likes_users" ADD CONSTRAINT "FK_0518ca06cb04edf6b840e11f5b8" FOREIGN KEY ("commentsId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "comments_likes_users" ADD CONSTRAINT "FK_ea5e811da14ec00071a13b9df85" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "comments_replies_comments" ADD CONSTRAINT "FK_89120bf99ebf0e5fb7508193f77" FOREIGN KEY ("commentsId_1") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "comments_replies_comments" ADD CONSTRAINT "FK_ccd49a9e5eaabeba4a5836d2564" FOREIGN KEY ("commentsId_2") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts_likes_users" ADD CONSTRAINT "FK_ddf35245765d65f6e1a9430fa70" FOREIGN KEY ("postsId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "posts_likes_users" ADD CONSTRAINT "FK_af99ecc047b6eefd6b93479fc7f" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts_likes_users" DROP CONSTRAINT "FK_af99ecc047b6eefd6b93479fc7f"`);
        await queryRunner.query(`ALTER TABLE "posts_likes_users" DROP CONSTRAINT "FK_ddf35245765d65f6e1a9430fa70"`);
        await queryRunner.query(`ALTER TABLE "comments_replies_comments" DROP CONSTRAINT "FK_ccd49a9e5eaabeba4a5836d2564"`);
        await queryRunner.query(`ALTER TABLE "comments_replies_comments" DROP CONSTRAINT "FK_89120bf99ebf0e5fb7508193f77"`);
        await queryRunner.query(`ALTER TABLE "comments_likes_users" DROP CONSTRAINT "FK_ea5e811da14ec00071a13b9df85"`);
        await queryRunner.query(`ALTER TABLE "comments_likes_users" DROP CONSTRAINT "FK_0518ca06cb04edf6b840e11f5b8"`);
        await queryRunner.query(`ALTER TABLE "blogs" DROP CONSTRAINT "FK_e47fc2b27ef4b17e6d43a93c09d"`);
        await queryRunner.query(`ALTER TABLE "blog_comments" DROP CONSTRAINT "FK_166954a3340789682daf335b3f4"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_692a909ee0fa9383e7859f9b406"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_2d69981b419fe03231a32f60956"`);
        await queryRunner.query(`ALTER TABLE "friends" DROP CONSTRAINT "FK_867f9b37dcc79035fa20e8ffe5e"`);
        await queryRunner.query(`ALTER TABLE "friends" DROP CONSTRAINT "FK_0c4c4b18d8a52c580213a40c084"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_b1bda35cdb9a2c1b777f5541d87"`);
        await queryRunner.query(`ALTER TABLE "blocked_users" DROP CONSTRAINT "FK_1af4fb14dc336fbdf578d171d4c"`);
        await queryRunner.query(`ALTER TABLE "conversation_members" DROP CONSTRAINT "FK_b49c970adabf84fd2b013b60a99"`);
        await queryRunner.query(`ALTER TABLE "conversation_members" DROP CONSTRAINT "FK_9a23e356db3cedb8d9725d01d1a"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_e5663ce0c730b2de83445e2fd19"`);
        await queryRunner.query(`ALTER TABLE "message_reads" DROP CONSTRAINT "FK_52bbdda5d68282f2b13b605dbf0"`);
        await queryRunner.query(`ALTER TABLE "message_reads" DROP CONSTRAINT "FK_d73adf0e3689c233a1aceea2ffa"`);
        await queryRunner.query(`ALTER TABLE "message_files" DROP CONSTRAINT "FK_d06fa80e981c0fdf8c2b19c320f"`);
        await queryRunner.query(`ALTER TABLE "group_members" DROP CONSTRAINT "FK_fdef099303bcf0ffd9a4a7b18f5"`);
        await queryRunner.query(`ALTER TABLE "group_members" DROP CONSTRAINT "FK_1aa8d31831c3126947e7a713c2b"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_ae05faaa55c866130abef6e1fee"`);
        await queryRunner.query(`ALTER TABLE "post_files" DROP CONSTRAINT "FK_a12706e0fd90132ab2ffa9b0b1e"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_af99ecc047b6eefd6b93479fc7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ddf35245765d65f6e1a9430fa7"`);
        await queryRunner.query(`DROP TABLE "posts_likes_users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ccd49a9e5eaabeba4a5836d256"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_89120bf99ebf0e5fb7508193f7"`);
        await queryRunner.query(`DROP TABLE "comments_replies_comments"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ea5e811da14ec00071a13b9df8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0518ca06cb04edf6b840e11f5b"`);
        await queryRunner.query(`DROP TABLE "comments_likes_users"`);
        await queryRunner.query(`DROP TABLE "blogs"`);
        await queryRunner.query(`DROP TABLE "blog_comments"`);
        await queryRunner.query(`DROP TABLE "blog_tags"`);
        await queryRunner.query(`DROP TABLE "notifications"`);
        await queryRunner.query(`DROP TABLE "friends"`);
        await queryRunner.query(`DROP TYPE "public"."friends_status_enum"`);
        await queryRunner.query(`DROP INDEX "public"."idx_users_email"`);
        await queryRunner.query(`DROP INDEX "public"."idx_users_username"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "blocked_users"`);
        await queryRunner.query(`DROP TABLE "conversation_members"`);
        await queryRunner.query(`DROP TYPE "public"."conversation_members_role_enum"`);
        await queryRunner.query(`DROP TABLE "conversations"`);
        await queryRunner.query(`DROP INDEX "public"."idx_messages_conversation_id"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TYPE "public"."messages_callstatus_enum"`);
        await queryRunner.query(`DROP INDEX "public"."idx_message_reads_message_id"`);
        await queryRunner.query(`DROP INDEX "public"."idx_message_reads_user_id"`);
        await queryRunner.query(`DROP TABLE "message_reads"`);
        await queryRunner.query(`DROP TABLE "message_files"`);
        await queryRunner.query(`DROP TYPE "public"."message_files_type_enum"`);
        await queryRunner.query(`DROP TABLE "group_members"`);
        await queryRunner.query(`DROP TYPE "public"."group_members_role_enum"`);
        await queryRunner.query(`DROP TABLE "groups"`);
        await queryRunner.query(`DROP TYPE "public"."groups_access_enum"`);
        await queryRunner.query(`DROP TABLE "tokens"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TYPE "public"."posts_access_enum"`);
        await queryRunner.query(`DROP TABLE "post_files"`);
        await queryRunner.query(`DROP TYPE "public"."post_files_type_enum"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "profiles"`);
        await queryRunner.query(`DROP TYPE "public"."profiles_maritalstatus_enum"`);
        await queryRunner.query(`DROP TYPE "public"."profiles_gender_enum"`);
    }

}