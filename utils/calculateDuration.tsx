export const calculateDuration = (start: string, end: string) => {
  const startTime = new Date(start);
  const endTime = new Date(end);
  const durationInMinutes = (endTime.getTime() - startTime.getTime()) / (1000 * 60); // Convert milliseconds to minutes
  return durationInMinutes.toString();
};