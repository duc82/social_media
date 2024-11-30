export default function formatNumber(number: number) {
  return Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
  }).format(number);
}
