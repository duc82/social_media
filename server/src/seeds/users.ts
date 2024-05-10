import { UserService } from "src/users/users.service";
import { INestApplicationContext } from "@nestjs/common";

function generateRandomText(length: number) {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < length; i++) {
    const c = characters.charAt(Math.floor(Math.random() * characters.length));
    result += i === 0 ? c.toUpperCase() : c;
  }
  return result;
}

async function seedUsers(application: INestApplicationContext) {
  const userService = application.get(UserService);

  for (let i = 0; i < 500; i++) {
    const fullName = generateRandomText(5);
    const email = `${fullName.toLowerCase()}@gmail.com`;

    await userService.create({
      email,
      fullName,
      password: "Duc@0802",
      emailVerified: new Date(),
      profile: {
        avatar:
          "https://firebasestorage.googleapis.com/v0/b/social-media-duc82.appspot.com/o/avatars%2Fpepe.png?alt=media&token=50d3d84d-c797-45a3-b68c-4cbd766bd316",
      },
    });
  }
}

export default seedUsers;
