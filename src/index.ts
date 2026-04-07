import suncalc from "suncalc";

// Fajr
suncalc.addTime(-14.5, "fajrStart", "_");

export default function prayerTimes(
  date: Date,
  latitude: number,
  longitude: number,
): { [key: string]: { start: Date; end: Date } } {
  let times = { ...suncalc.getTimes(date, latitude, longitude) } as {
    [key: string]: Date;
  };

  const [fajrStart, fajrEnd] = [times.fajrStart, times.sunrise];
  const [dohaStart, dohaEnd] = [
    // sunrise end + 15 minutes.
    new Date(times.sunriseEnd.getTime() + 900000),
    // duhr start - 10 minutes
    new Date(times.solarNoon.getTime() - 600000),
  ];
  const duhrStart = times.solarNoon;

  // calculate ASR angle.
  const sunPositionAtDuhrStart = suncalc.getPosition(
    duhrStart,
    latitude,
    longitude,
  );
  const sunAngle = sunPositionAtDuhrStart.altitude;
  const objectHeight = 10;
  const shadowLength = objectHeight / Math.tan(sunAngle);

  const asrSunAngle =
    (Math.atan(objectHeight / (shadowLength + objectHeight)) * 180) / Math.PI;
  suncalc.addTime(asrSunAngle, "_", "asrStart");

  times = { ...suncalc.getTimes(date, latitude, longitude), ...times };

  const [asrStart, asrEnd] = [times.asrStart, times.goldenHour];
  //@ts-ignore
  (suncalc["times"] as Array<any>).pop();

  const [maghribStart, maghribEnd] = [times.sunsetStart, times.nauticalDusk];

  //for more info: https://islamqa.info/ar/answers/362908/
  const nightDuration = maghribStart.getTime() - fajrStart.getTime();

  const nextFajrTime = (
    {
      ...suncalc.getTimes(
        // next date.
        new Date(date.getTime() + 8.64e7),
        latitude,
        longitude,
      ),
    } as { [key: string]: Date }
  ).fajrStart;

  return {
    fajr: { start: fajrStart, end: fajrEnd },
    doha: { start: dohaStart, end: dohaEnd },
    duhr: { start: duhrStart, end: asrStart },
    asr: { start: asrStart, end: asrEnd },
    maghrib: { start: maghribStart, end: maghribEnd },
    isha: {
      start: maghribEnd,
      end: new Date(maghribStart.getTime() + nightDuration / 2),
    },
    lastThirdOfNight: {
      start: new Date(maghribStart.getTime() + (nightDuration / 3) * 2),
      end: nextFajrTime,
    },
  };
}
