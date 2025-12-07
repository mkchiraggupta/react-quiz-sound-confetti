# React Quiz App with Sound & Confetti

An interactive quiz application built with Next.js and React, featuring sound effects, confetti animations, timer functionality, and score tracking.

## Features

- ⏱️ 5-second timer per question with visual countdown
- 🎯 8 quiz questions covering web development topics
- 📊 Score tracking and results summary
- 🎉 Confetti animation on correct answers
- 🔊 Sound effects for correct/incorrect answers
- 📈 Progress indicator
- 🔄 Restart functionality

## Tech Stack

- Next.js 15.5
- React 19.1
- Tailwind CSS 4.0
- canvas-confetti

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/react-quiz-sound-confetti.git
   cd react-quiz-sound-confetti
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
react-quiz-sound-confetti/
├── public/
│   └── sounds/
│       ├── win.mp3
│       └── lost.mp3
├── src/
│   └── app/
│       ├── Components/
│       │   └── QuizApp.js
│       ├── page.js
│       ├── layout.js
│       └── globals.css
└── package.json
```

## License

MIT License
