import { UserService } from "src/modules/users/users.service";
import { INestApplicationContext } from "@nestjs/common";
import { Gender } from "src/modules/users/enums/profiles.enum";

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

  for (let i = 0; i < 5; i++) {
    const firstName = generateRandomText(5);
    const lastName = generateRandomText(5);
    const gender =
      Gender[
        genders[
          generateRandomNumber(0, genders.length - 1)
        ] as keyof typeof Gender
      ];
    const email = `${firstName.toLowerCase()}@gmail.com`;

    await userService.create({
      email,
      firstName,
      lastName,
      password: "Liutiudiu@0802",
      emailVerified: new Date(),
      profile: {
        birthday: new Date().toISOString(),
        gender,
      },
    });
  }
}

export default seedUsers;
