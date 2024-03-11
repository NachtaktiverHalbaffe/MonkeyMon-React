import { Monkey, MonkeySchema } from "@/types/monkey";

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
  // Its important that all errors are catched because otherwise the router wont work
  const monkeys: Array<Monkey> = [];
  try {
    const response = await fetch("http://localhost:8080/api/v1/monkeys", {
      method: "GET",
    });
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
        console.warn(error);
      }
    });
  } catch {
    return [];
  }

  return monkeys;
}
