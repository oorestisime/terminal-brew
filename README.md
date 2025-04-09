# Terminal Brew Guide ☕️

An open-source website focused on brewing techniques for coffees sold on [Terminal.shop](https://www.terminal.shop). It provides tailored recipes for different brewing methods and coffee machines, helping home baristas and enthusiasts get the best out of each bean.

## About

This site is for coffee enthusiasts who:
- Buy coffees from Terminal.shop
- Brew at home using espresso machines or filter methods
- Want clear, tested recipes for their specific equipment
- Enjoy experimenting and documenting brew results

## Features

- 🔍 Browse coffee catalog with detailed information
- 📊 View brewing recipes for different methods
- 🛠️ Get specific parameters for various brewing equipment
- 💻 Terminal-inspired UI with monospace styling
- 📱 Responsive design that works on all devices
- 🖥️ CLI version available for terminal enthusiasts

## Tech Stack

- **Frontend**: React 19
- **Routing**: React Router 7
- **Styling**: Tailwind CSS 4 with shadcn/ui
- **Package Manager**: Bun
- **Bundler**: Vite
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

Make sure you have [Bun](https://bun.sh/) installed on your system.

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/terminal-recipes.git
cd terminal-recipes
bun install
```

### Development

Start the development server:

```bash
bun run dev
```

Your application will be available at `http://localhost:5173`.

### Building for Production

Create a production build:

```bash
bun run build
```

### CLI Version

This project also includes a terminal-based CLI version that you can run directly:

```bash
bun terminal-recipes-cli.ts
```

## Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

---

Built with ☕️ for coffee lovers.
