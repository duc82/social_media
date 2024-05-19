import { UserService } from "src/users/users.service";
import { INestApplicationContext } from "@nestjs/common";
import { Gender } from "src/users/interfaces/profiles.interface";

function generateRandomText(length: number) {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < length; i++) {
    const c = characters.charAt(Math.floor(Math.random() * characters.length));
    result += i === 0 ? c.toUpperCase() : c;
  }
  return result;
}

function generateRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function seedUsers(application: INestApplicationContext) {
  const userService = application.get(UserService);
  const genders = ["MALE", "FEMALE", "OTHER"];

  for (let i = 0; i < 500; i++) {
    const fullName = generateRandomText(5);
    const gender =
      Gender[
        genders[
          generateRandomNumber(0, genders.length - 1)
        ] as keyof typeof Gender
      ];
    const email = `${fullName.toLowerCase()}@gmail.com`;

    await userService.create({
      email,
      fullName,
      password: "Liutiudiu@0802",
      emailVerified: new Date(),
      profile: {
        avatar:
          "https://firebasestorage.googleapis.com/v0/b/social-media-duc82.appspot.com/o/avatars%2Fpepe.png?alt=media&token=50d3d84d-c797-45a3-b68c-4cbd766bd316",
        birthday: new Date().toISOString(),
        gender,
      },
    });
  }
}

export default seedUsers;
