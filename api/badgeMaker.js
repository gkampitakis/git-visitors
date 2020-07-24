import { makeBadge } from 'badge-maker';

export function render(label, metric, scale) {
  return makeBadge({
    label,
    message: String(metric),
    color:
      metric < 1 * scale
        ? 'red'
        : metric < 5 * scale
        ? 'orange'
        : metric < 10 * scale
        ? 'yellow'
        : metric < 50 * scale
        ? 'yellowgreen'
        : metric < 100 * scale
        ? 'green'
        : 'brightgreen'
  });
}
