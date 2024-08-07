---
layout: article
title: My Custom Game Engine in C++ and JavaScript
description: My journey of creating a game engine with online multiplayer, JavaScript for scripting, and real-time lighting.
author: Hao Qi Wu
date: 2022-05-25T22:30:00
---

I made this Game Engine in JavaScript and C++. I spend a little under a year creating this all by myself in VS Code. This engine had some super cool features like physically based materials, real-time shadows, post-processing, roll-back netcode, and a JavaScript engine for game logic. I’ll be going over the long journey I took in order to get to where I am today and at the end, I’ll give you some demos as well as some insight into what I learned.

<YouTube videoId="uQt9vWHvJQ4" opts={{width: '100%', height: 'auto'}}/>
Video version of this article

<Image src="/images/my-game-engine/1_vFHk5QtyZg5VjN5PZIU77g.webp" alt="A high quality 3D render showing a classroom" width={1920} height={1080} priority />
Blender Classroom

But let’s start from the beginning, it all started during a spring break in college. I decided to use my free time on making a custom renderer with software rasterization. I was able to render a wireframe 3D model, but I decided to switch to OpenGL, and then I decided to instead switch to a renderer called Filament.

<Image src="/images/my-game-engine/1_XJsCLjkRO3U8WIZJFG5dIA.webp" alt="Filament is a real-time physically based rendering engine for Android, iOS, Windows, Linux, macOS, and WebGL2" width={2048} height={1306} />
[google/filament (github.com)](https://github.com/google/filament)

Filament is a renderer developed and maintained by Google (not an officially supported Google product), and therefore has a lot of useful features like physically based materials, anti-aliasing, post-processing, etc. It is however missing things like global illumination and instead goes for a skybox image for distant indirect lighting. Meaning that it’s missing local indirect lighting, this is lighting that comes from lighting bouncing around you.

<Image src="/images/my-game-engine/1_sf-i-RxlboRj6dE0AMDEZQ.webp" alt="With indirect lighting" width={1920} height={1080} />
Rendered in Blender with Cycles and Open Image Denoise

This is what it looks like with it.

<Image src="/images/my-game-engine/1_nXvjxQwsVD9Qy-eHSyN7Bg.webp" alt="without indirect lighting" width={1082} height={752} />

without

<Image src="/images/my-game-engine/1_uqBmxBtsVate64Yc20QhOA.webp" alt="Fake Local Indirect Lighting Comparison" width={1920} height={1080} />

And in the image on the right, is me trying to fake it with lights.

<Image src="/images/my-game-engine/1_S_hsppCiJIYJdziNyTvwnQ.webp" alt="Flashlight pointed to mouse cursor" width={1920} height={1080} />

But at the end of the day, with Filament, I was able to render a textured square with lighting and shadows. All done without needing to write a ton of code.

<Image src="/images/my-game-engine/1_nZewzv5zR-UV_K7beZCU5Q.webp" alt="Back in the classroom while staring at the window and the blue sky" width={1920} height={1080} />

After that, my spring break was over, but I kept wondering if I could create my own online game and game engine with a goal of releasing a game. So, I went back and added in multiplayer by using roll-back net code. To send and receive states of my game over the internet, I used the steam networking library,

<Image src="/images/my-game-engine/1_0ZEryLF6Tj4ozbOHmWG49w.webp" alt="Steam Networking, which ensures that players and gameservers are protected. Higher performance and reliability." width={1920} height={1080} />
[Steam Networking (Steamworks Documentation) (steamgames.com)](https://partner.steamgames.com/doc/features/multiplayer/networking)

because it can also ensure that players and servers are protected while providing high performance and reliability. I also used ASIO to asynchronously handle timers and network polling. I started writing code for rollback netcode, and I was surprised by how simple it was. Rollback is when the client predicts the next half second and shows that on screen, often it’ll just assume that players haven’t changed their inputs. Like, if you hold a button down, it’ll assume you’ll continue to hold for the next half second. When the prediction is incorrect, it’ll go back and correct all past history of states to correct them. However, I quickly noticed its drawbacks, without any added delay, objects tend to jiggle or rubber band, but it wasn’t happening very often, so I decided to move on by creating a server, and allowing many players at once. This part wasn’t hard to do, but it only made the bugs much worse. Usually, rollback only happens every so often, but with 4 players at once, it was happening all the time, causing everything to jiggle a lot more. I decided to turn it off and come up with a better solution for my game in the future.

<Image src="/images/my-game-engine/1_qPvde-V3pp2vrCKobZKmCw.webp" alt="image of walls" width={1920} height={1080} />

Now, I needed to prevent players from going through walls and objects.

<Image src="/images/my-game-engine/1_MMmMND9lMJKE-FrFw_xLRg.webp" alt="physics demo" width={1920} height={1080} />
[Ragdoll physics — CodeSandbox](https://codesandbox.io/s/ragdoll-physics-wdzv4)

This can be done by adding in a physics simulation.

Furthermore, I used the box2D library for this because it’s used in many 2D games. Plus, it’s packed with all sorts of features like many types of bodies, joints, and properties that can be added to moving objects in a scene. Adding this allowed players to push each other, bow and arrows, swords, etc.

However, I noticed a problem really quickly, there isn’t really a system for handling gameplay logic. C++ has a lot of problems when it comes to handling the kind of logic that’s common in games. Prototyping ideas for a game requires quick iteration and writing C++ can be tricky because of manual memory management that can be pretty easy to mess up. C++ can easily take a long time to compile, plus it has to be compiled separately for each platform, and that can hurt your focus or productivity.

However, in a scripting language, this process can be easily streamlined. So, I looked for alternatives, and settled on using JavaScript.

When I made the decision to go with JavaScript, my friends would ask, “Why not Lua?” “Why not Python?”, “Why not Dart, C#, or Java?”. “Why not just rewrite everything in Rust?” I actually spent a few weeks on the question of what language to use.

<Image src="/images/my-game-engine/1_GBK_udIM3P5zCj_GZc00DA.webp" alt="GameMaker has programming languages for both text and visual" width={1920} height={1080} />
[GameMaker Features And Tools](https://gamemaker.io/en/gamemaker/features)

Some game engines use their own scripting language, but I didn’t want to do that, as already made languages have community support with things like libraries and tooling.

<Image src="/images/my-game-engine/1_A5gmlXiovO9Yn4FMqSyDRQ.webp" alt="React — A JavaScript library for building user interfaces, ESLint — Pluggable JavaScript linter, Frequent ‘javascript’, Questions — Stack Overflow" width={1920} height={1080} />
[React (reactjs.org)](https://reactjs.org/)

The reason why I went with JavaScript is that there are a lot of great libraries, tools and support thanks to the fact that it is ubiquitous across the web.

With that choice out of the way, I needed to choose a JavaScript library that I can add into my game engine. There’s QuickJS, Duktape, Hermes, MuJS, and V8. I decided to use V8 because it’s the most widely used of all the choices. It’s used in Chrome, Node.js, and Deno. “V8 is a pretty easy library to use”, is what I would have said if I was sure that this was a good idea, but now, I’m not sure if I made a big mistake. This is because V8 was not easy to add into my project. There are a ton of different problems, mostly stemming from how the V8’s build system builds V8.

V8 is just built different. I believe that V8 has a build system written by the devil himself. This build system from hell had me tearing my hair out for multiple weeks straight. Each attempt to add it into my game engine required me to sit waiting for compiles to finish for hours, only for it to give me an error.

<Image src="/images/my-game-engine/1_wBbI3vsIjQyn0Fk3LneWxQ.webp" alt="Running JS code via my game’s console" width={1920} height={1080} />


After spending weeks on the problem, I finally got it to work and ran some JavaScript code in my game engine, and that’s where the project ended. I think you can see why I somewhat regret my decision.

Other than the build system, V8 isn’t a bad library to use. I was able to add it to my game engine easily after the build system issues. In a few days, I was able to add JavaScript functions that work with my game engine’s asynchronous timer system, and GUI. I planned on adding more JavaScript functions, but I was starting to feel burnt out on the idea of making my own game engine.

<Image src="/images/my-game-engine/1_GbfNCNlaJwoG5TvqXD5vEA.webp" alt="Technology in focus, Game out of focus" width={1920} height={1080} />

Mainly because there wasn’t a ton of focus on the game, which had been re-written several times as new systems were added. It’s not a stable foundation to build a game on top of, and I was spending far too much time on the tech driving the game instead of the game itself, and I felt that I was running out of time. Earlier, I set a goal that I would, create a game and release it, but I felt that I was taking way too long, and I needed to find a job.

<Image src="/images/my-game-engine/1_hOHy_Ct4SFjb9_D6uA9-Cw.webp" alt="Game I made using Unity, all done in 2 days" width={1920} height={1080} />

Now it’s been a bit less than 2 years since then. But recently, I decided to pick up Unity again. I used to use Unreal Engine, and I was shocked by how much I like Unity more than Unreal Engine. This mostly came down to the flexibility and ease of use that came from Unity’s C# scripting. I was easily able to iterate much more rapidly with Unity. I don’t dislike the Unreal Engine, but in my opinion, it’s more artist focused, while Unity is easier for a programmer. By the way, this was written before Unreal Engine 5 released, I recently tried it and my opinion hasn’t changed.

<Image src="/images/my-game-engine/1_IiFv7z92yGoSYRMiWw9VpQ.webp" alt="Sun typed in the game’s console" width={1920} height={1080} />

Alright, time for some demos. So, the first thing I’m going to show is about the sun.

<Image src="/images/my-game-engine/1_2b72BxoHhGvLPvLc8SRKhw.webp" alt="In the game's console, “sun” is entered, sun is an object with two functions that are written with native code. set intensity and set direction" width={1920} height={1080} />

If you type in *sun*, it will give you an object and in the GUI, you can see what’s inside that object. As you can see, there are two functions.

<Image src="/images/my-game-engine/1_ESl3_xmmcGvROOkwuIlAkQ.webp" alt="In the game's console, “sun.setIntensity(500)” is entered. In the game, the lighting from the sun becomes very dim" width={1920} height={1080} />

I’m going to set the intensity of the sun, and you can see the change in the lighting.

<video controls loop width="100%"><source src="/images/my-game-engine/DeliciousScaredDeer-mobile.mp4" type="video/mp4" /></video>

There's also another important function called *setTimer*.

<Image src="/images/my-game-engine/1_ERPGWepuOMIcQdyOvXALVw.webp" alt="writing a script in the game's console" width={1920} height={1080} />

```js
let direction = 0
directionChange = 0.01
let animateDirection = () => {}
animateDirection = () => {
  direction += directionChange;
  sun.setDirection(direction, -1.0, -0.8);
  setTimer(animateDirection, 15);
}
```

So, I’m going to make a variable called *direction*, and I’m going to make a new function called *animateDirection*, then we will set a timer that will call the function animate direction, and it’ll do this every 15 milliseconds. Finally, I’m going to call the function *animateDirection*.

<video controls loop width="100%"><source src="/images/my-game-engine/ScarceFrequentAruanas-mobile.mp4" type="video/mp4" /></video>

Now it’s changing the lighting overtime.

Generally speaking, I feel that even if this didn’t amount to much, I didn’t feel like I wasted my time. It taught me a lot about the inner workings of a game engine and the problems that you have to solve when making a game engine. If there’s one thing I would do differently, it would be using the Entity Component System pattern, instead of having a different array for each type, they are defined by components that make up the thing.

The entities have components, components would contain data,

```
Body component
    Weight
    Shape
AI component
    IQ Score
    Knowledge
```

and code would be the systems.

```
//Body system:
  For each body components:
    Use physics on body components
//AI system:
  For each AI components:
    Use AI to AI
```

For example, a NPC entity would have a body for physics, a sprite to render, and a health counter. There would be a system that calculated the physics for bodies, one that rendered the sprites, and one that handles its health, etc. Without this, my game engine has a similar system, but without components. Every thing in the scene, would have a type and each type would have its own list of objects of that type.

```
list<NPC> allNPCs;
```

Say you want to get every sprite to render, you would need to go through every list and look for the sprites. By separating things into entities and components, you can just get a list of components of the same or multiple types with a single function that works for all types of components.

```c#
Entities
  .WithAll<Body, Health>() // Require these components
  .ForEach(
    (Entity entity, ref Body body, ref Health health) =>
    {
    }
  )
  .ScheduleParallel(); // Schedule as a parallel job
```

This also allows each system to be its own job or thread, making multithreading easier.

<Image src="/images/my-game-engine/1_-WvTAnIQfIk_C7D8pFGVKA.webp" alt="facebook/hermes: A JavaScript engine optimized for running React Native." width={1920} height={1080} />
[facebook/hermes (github.com)](https://github.com/facebook/hermes)

I could have also chosen an alternative JavaScript engine such as Hermes or Quick JS to save myself from weeks of suffering, unless, Google makes compiling and linking V8 much easier.
