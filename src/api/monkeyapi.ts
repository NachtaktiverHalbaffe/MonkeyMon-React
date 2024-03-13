import { Monkey, MonkeyNotNullable, MonkeySchema } from "@/types/monkey";

interface MonkeyApiResponse {
  id: number;
  name: string;
  description: string;
  health_points: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
  image: string;
  known_from: string;
  strength: string;
  weaknesses: string;
  species_name: string;
  species_content: object;
}
export async function getAllMonkeys() {
  const monkeys: Array<Monkey> = [];
  const controller = new AbortController();
  // 5 second timeout:
  const timeoutId = setTimeout(() => controller.abort(), 3000);
  const response = await fetch("http://localhost:8080/api/v1/monkeys", {
    method: "GET",
    signal: controller.signal,
  });
  clearTimeout(timeoutId);
  const responseJson = await response.json();

  responseJson["content"].map((element: MonkeyApiResponse) => {
    const monkey: Monkey = {
      id: element["id"],
      name: element["name"],
      description: element["description"],
      hp: element["health_points"],
      attack: element["attack"],
      defense: element["defense"],
      specialAttack: element["special_attack"],
      specialDefense: element["special_defense"],
      speed: element["speed"],
      image: element["image"],
      knownFrom: element["known_from"],
      strength: element["strength"],
      weaknesses: element["weaknesses"],
      speciesName: element["species_name"],
      //   speciesContent: element["species_content"],
    };
    try {
      monkeys.push(MonkeySchema.parse(monkey));
    } catch (error) {
      console.debug(error);
    }
  });

  return monkeys;
}

export async function postMonkey(monkey: Monkey | MonkeyNotNullable) {
  const controller = new AbortController();
  // 5 second timeout:
  setTimeout(() => controller.abort(), 3000);

  const formData = new FormData();
  formData.append(
    "body",
    JSON.stringify({
      name: monkey.name,
      description: monkey.description,
      health_points: monkey.hp,
      attack: monkey.attack,
      defense: monkey.defense,
      special_attack: monkey.specialAttack,
      special_defense: monkey.specialDefense,
      speed: monkey.speed,
      image: monkey.image,
      known_from: monkey.knownFrom,
      strength: monkey.strength,
      weaknesses: monkey.weaknesses,
      species_name: monkey.speciesName != "" ? monkey.speciesName : null,
    })
  );

  const response = await fetch("http://localhost:8080/api/v1/monkeys", {
    method: "POST",
    signal: controller.signal,
    body: formData,
  });

  if (response.status == 201) {
    return true;
  } else {
    return false;
  }
}
