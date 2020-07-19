import { makeBadge } from 'badge-maker';

export function render(label, metric) {
  return makeBadge({
    label,
    message: String(metric),
    color:
      metric < 10
        ? 'red'
        : metric < 50
        ? 'orange'
        : metric < 100
        ? 'yellow'
        : metric < 500
        ? 'yellowgreen'
        : metric < 1000
        ? 'green'
        : 'brightgreen',
  });
}
