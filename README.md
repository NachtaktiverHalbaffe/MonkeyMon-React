# MonkeyMon-React
A example React project to dive depper into React and popular packages around it. Just a useless idea which purpose is to play around with all fun aspects of React. **It's my personal playground.** 

The project builds around the [Pokeapi](https://pokeapi.co/) and my own [Spring Boot REST API](https://github.com/NachtaktiverHalbaffe/MonkeyAPI-SpringBoot). You need CORS to be disabled in your browser in order for my own API to work

The current web version of the app can be accessed via [Github Pages](https://nachtaktiverhalbaffe.github.io/MonkeyMon-React/) of this repo.

# Project Idea
It's a project to dive into React and experiment with it, so the Application itself is useless and is tailored to cover as most topics as possible. Its the same idea as [MonkeyMon](https://github.com/NachtaktiverHalbaffe/MonkeyMon/tree/main) which was another learning project for Flutter.

At it's core, the application fetches data from [Pokeapi](https://pokeapi.co/) and my own [Spring Boot REST API](https://github.com/NachtaktiverHalbaffe/MonkeyAPI-SpringBoot), caches the data in a powerful local database and shows the entries in a Pokedex and a Mondex (a Pokedex for my Monkey API). Either a Pokemon or a monkey can be send into the arena where they can fight each other like in Pokemon.

My own [Spring Boot REST API](https://github.com/NachtaktiverHalbaffe/MonkeyAPI-SpringBoot) runs on a local Docker Container over localhost, so the Monkey-Part doesnt show anything on the release version of the App.

# Core Tech Stack
React with following (bigger) frameworks and libraries:
- ReactJS 18 + Vite
- Tanstack Query for Asynchronous tasks like REST-Fetching
- Tanstack Router for Routing
- For Pokemon remote datasource: A already finished wrapper for [Pokeapi](https://pokeapi.co/)
- Native `fetch()` for REST-API
- Shadcn/UI as a flexible and extensible component library
- Tailwind CSS
- Vitest for testing


# License
Pokémon and Pokémon character names are trademarks of Nintendo.

Copyright 2024 NachtaktiverHalbaffe

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.