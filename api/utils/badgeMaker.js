import { makeBadge } from 'badge-maker';

export function render({ total, daily, monthly }) {
  const dailyBadge = makeBadge({
    label: 'Daily Visitors',
    message: String(daily),
    style: 'flat-square',
    color:
      daily < 1
        ? 'red'
        : daily < 5
        ? 'orange'
        : daily < 10
        ? 'yellow'
        : daily < 50
        ? 'yellowgreen'
        : daily < 100
        ? 'green'
        : 'brightgreen'
  });

  const monthlyBadge = makeBadge({
    label: 'Monthly Visitors',
    message: String(monthly),
    style: 'flat-square',
    color:
      daily < 10
        ? 'red'
        : daily < 50
        ? 'orange'
        : daily < 100
        ? 'yellow'
        : daily < 500
        ? 'yellowgreen'
        : daily < 1000
        ? 'green'
        : 'brightgreen'
  });

  const totalBadge = makeBadge({
    label: 'Total Visitors',
    message: String(total),
    style: 'flat-square',
    color:
      total < 50
        ? 'red'
        : total < 100
        ? 'orange'
        : total < 500
        ? 'yellow'
        : total < 1000
        ? 'yellowgreen'
        : total < 5000
        ? 'green'
        : 'brightgreen'
  });

  return `<div>${dailyBadge} ${monthlyBadge} ${totalBadge}</div>`;
}
