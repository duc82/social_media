import { UsersService } from "src/modules/users/users.service";
import { INestApplicationContext, Logger } from "@nestjs/common";
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

async function seedUsers(application: INestApplicationContext, row: number) {
  const usersService = application.get(UsersService);
  const genders = ["MALE", "FEMALE", "OTHER"] as const;

  for (let i = 0; i < row; i++) {
    const firstName = generateRandomText(5);
    const lastName = generateRandomText(4);
    const gender = Gender[genders[generateRandomNumber(0, genders.length - 1)]];
    const email = `${firstName.toLowerCase()}@gmail.com`;

    const user = await usersService.create({
      email,
      firstName,
      lastName,
      password: "Socialmedia@123",
      emailVerified: new Date(),
      birthday: new Date().toISOString(),
      gender,
    });

    Logger.log(`User ${user.fullName} created`);
  }
}

export default seedUsers;
