# Prayer Times

A TypeScript library for calculating Islamic prayer times based on geographic coordinates using the [SunCalc](https://github.com/mourner/suncalc) library.

## Features

- Calculates daily Islamic prayer times (Fajr, Doha, Duhr, Asr, Maghrib, Isha)
- Includes Last Third of Night calculation
- Location-based calculations using latitude/longitude
- Returns precise start and end times for each prayer period

## Installation

```bash
npm install prayer-times
yarn add prayer-times
pnpm install prayer-times
```

## Usage

```typescript
import prayerTimes from "prayer-times";

// Calculate prayer times for a specific date and location
const times = prayerTimes(
  new Date(), // Date
  lat, // Latitude
  long, // Longitude
);

// Access individual prayer times
console.log(times.fajr.start);
console.log(times.fajr.end);
```

## API

### `prayerTimes(date, latitude, longitude)`

**Parameters:**

- `date`: Date object for which to calculate prayer times
- `latitude`: Geographic latitude coordinate
- `longitude`: Geographic longitude coordinate

**Returns:**
An object containing the following prayer periods:

| Prayer             | Description                                                                            |
| ------------------ | -------------------------------------------------------------------------------------- |
| `fajr`             | Dawn prayer (starts at Fajr, ends at Sunrise)                                          |
| `doha`             | Forenoon prayer window (Sunrise + 15min to Duhr - 10min)                               |
| `duhr`             | Midday prayer (starts at Solar Noon, ends at Asr)                                      |
| `asr`              | Afternoon prayer (calculated using shadow length method)                               |
| `maghrib`          | Sunset prayer (starts at Sunset, ends at Nautical Dusk)                                |
| `isha`             | Night prayer (starts at Nautical Dusk, ends at midpoint between Maghrib and next Fajr) |
| `lastThirdOfNight` | Special time for voluntary prayers (starts 2/3 through the night, ends at next Fajr)   |

Each prayer object contains:

- `start`: Date when the prayer period begins
- `end`: Date when the prayer period ends

## Calculation Method

- **Fajr angle**: -14.5°
- **Asr**: Calculated using shadow length method based on object height and sun angle at Duhr
- **Isha**: Midpoint between Maghrib and the next day's Fajr
- **Last Third of Night**: Last third of the night period (Maghrib to next Fajr)

## Tech Stack

- TypeScript
- SunCalc (solar position calculations)
- Node.js

## License

All rights are for muslims
