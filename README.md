# GMR O₂ Calculation

A cross-platform React Native app (Expo) for calculating oxygen consumption and remaining supply for ventilated and non-ventilated patients, now branded for GMR.

## Features

* Toggle between **ventilated** and **spontaneous breathing** modes
* Inputs for minute volume, bias flow, FiO₂, flight time, and individual tank pressures
* Real‑time calculation of total O₂ consumed, supply remaining, and status (OK / CAUTION / STOP)
* Persistent storage via AsyncStorage
* **Clear All Data** option in Settings
* Error boundaries to catch and display unexpected crashes
* GMR branding with hex colors and logo

## Tech Stack

* React Native (Expo SDK 48)
* TypeScript
* React Navigation (Stack Navigator)
* Tailwind-style utilities via NativeWind
* AsyncStorage for persistence

## Project Structure

```
📦src
 ┣ 📂assets        // Images & logos
 ┣ 📂components    // Reusable UI components
 ┣ 📂navigation    // AppNavigator & header
 ┣ 📂screens       // HomeScreen, SettingsScreen
 ┣ 📂utils         // calculations.ts, storage.ts
 ┗ 📂App.tsx       // Entry point with ErrorBoundary
```

## Getting Started

1. **Clone the repo**

   ```sh
   git clone https://github.com/Nicholas-Amsler/O2calc.git
   cd O2calc
   ```
2. **Install dependencies**

   ```sh
   npm install --legacy-peer-deps
   ```
3. **Run on device or web**

   ```sh
   npm run start
   # then press 'a' for Android, 'i' for iOS, or 'w' for web
   ```

## Configuration

* Logo: Place `gmr-logo.png` in `src/assets/`
* Colors are defined inline in components (deep blue `#0B3954`, light primary, accent green `#2C9C7A`).

## Contributing

1. Create a branch: `git checkout -b feature/YourFeature`
2. Commit your changes: `git commit -m "Add some feature"`
3. Push to branch: `git push origin feature/YourFeature`
4. Open a pull request.

## License

Copyright (c) 2025 Amsler Labs

All rights reserved.

This software is proprietary. You may not use, copy, distribute,
or modify it without express permission from the copyright holder.

This project is licensed under the [Apache License 2.0](LICENSE).
