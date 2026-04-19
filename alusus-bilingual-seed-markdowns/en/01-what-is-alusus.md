# What Is Alusus Programming Language?

Alusus is a general-purpose programming language designed to combine low-level power with high-level flexibility. Its official documentation describes it as a language that can be **dynamically extended by end users** while still providing low-level features similar to C and C++, such as static typing, pointers, and manual memory management.

## Key Ideas

- **General-purpose**: Alusus is not limited to one domain.
- **Extensible**: Users can extend the language during compilation.
- **Low-level core**: It supports features familiar to C/C++ developers.
- **High-level productivity**: It aims to reduce the need to switch between multiple languages in the same project.
- **Multiple dialects**: Alusus supports both **English** and **Arabic** dialects.

## Why Alusus Is Interesting

Many projects use one language for systems code, another for tooling, and another for the web. Alusus aims to reduce that fragmentation by allowing developers to build different layers of a project with one language and an extensible compilation model.

## Core Features

### 1. Static Typing
Alusus provides strong typing for variables and functions.

### 2. Procedural and Object-Oriented Programming
You can write procedural code, define functions, create classes, and use inheritance and polymorphism.

### 3. Macros and Extensibility
Macros are a major part of Alusus. They allow language-level customization and domain-specific extensions.

### 4. Runtime Library
The standard runtime includes modules such as:
- `Console`
- `String`
- `Array`
- `Map`
- `Math`
- `Regex`
- `Time`
- `Fs`

### 5. Web App Development
With WebPlatform, Alusus can be used to build full-stack web apps.

## Where To Start

A practical learning path:

1. Read the Introduction tutorial.
2. Learn variables, control flow, strings, functions, and classes.
3. Practice with examples.
4. Explore WebPlatform for web apps.
5. Move into macros and C library bindings.

## Simple Hello World Example

```alusus
import "Srl/Console.alusus";
use Srl;

Console.print("Hello World!\n");
```

## Recommended Next Topics

- Variables and operators
- Functions
- Classes
- Macros
- Binding with C libraries
- WebPlatform

## Summary

Alusus is a language for developers who want:
- low-level control,
- extensibility,
- one-language project flow,
- and support for both Arabic and English coding styles.
