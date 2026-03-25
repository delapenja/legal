// ============================================================
// Puna Ime — Employment Termination Notice Period Calculator
// Core calculation engine based on Albanian Labor Code (2024)
// Articles 140–158
// ============================================================

/**
 * Calculate the difference between two dates as {years, months, days}.
 */
function dateDiff(start, end) {
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }
  return { years, months, days };
}

/**
 * Total months of employment (fractional).
 */
function totalMonths(start, end) {
  const diff = dateDiff(start, end);
  return diff.years * 12 + diff.months + diff.days / 30;
}

/**
 * Check if the employee is in probation period (first 3 months).
 * Art. 142: The first 3 months are considered probation.
 */
function isInProbation(startDate, referenceDate) {
  const probationEnd = new Date(startDate);
  probationEnd.setMonth(probationEnd.getMonth() + 3);
  return referenceDate < probationEnd;
}

/**
 * Determine the notification period tier based on employment duration.
 * Art. 142.3: During probation — 5 days
 * Art. 143.1: Post-probation tiers:
 *   ≤6 months  → 2 weeks
 *   >6m–2y     → 1 month
 *   >2y–5y     → 2 months
 *   >5y        → 3 months
 */
function getNotificationPeriod(startDate, referenceDate) {
  if (isInProbation(startDate, referenceDate)) {
    return {
      tier: 'probation',
      labelKey: 'fiveDays',
      calendarDays: 5,
      description: 'Art. 142.3',
    };
  }

  const months = totalMonths(startDate, referenceDate);

  if (months <= 6) {
    return {
      tier: '2weeks',
      labelKey: 'twoWeeks',
      calendarDays: 14,
      description: 'Art. 143.1',
    };
  } else if (months <= 24) {
    return {
      tier: '1month',
      labelKey: 'oneMonth',
      calendarDays: null, // use month arithmetic
      monthsCount: 1,
      description: 'Art. 143.1',
    };
  } else if (months <= 60) {
    return {
      tier: '2months',
      labelKey: 'twoMonths',
      calendarDays: null,
      monthsCount: 2,
      description: 'Art. 143.1',
    };
  } else {
    return {
      tier: '3months',
      labelKey: 'threeMonths',
      calendarDays: null,
      monthsCount: 3,
      description: 'Art. 143.1',
    };
  }
}

/**
 * Get end of the week (Sunday) for a given date.
 */
function getEndOfWeek(date) {
  const d = new Date(date);
  const dayOfWeek = d.getDay(); // 0=Sun, 6=Sat
  const daysUntilSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
  d.setDate(d.getDate() + daysUntilSunday);
  return d;
}

/**
 * Get end of month for a given date.
 */
function getEndOfMonth(date) {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

/**
 * Calculate the raw end of the notice period (before Art. 143.3 extension).
 */
function getRawNoticeEndDate(noticeStartDate, period) {
  const d = new Date(noticeStartDate);
  if (period.calendarDays) {
    d.setDate(d.getDate() + period.calendarDays);
  } else {
    d.setMonth(d.getMonth() + period.monthsCount);
  }
  return d;
}

/**
 * Apply Art. 143.3 extension: notice extends to end of week (for 2-week)
 * or end of month (for 1/2/3 month notices).
 * During probation (5 days), no extension applies.
 */
function getExtendedNoticeEndDate(noticeStartDate, period) {
  const rawEnd = getRawNoticeEndDate(noticeStartDate, period);

  if (period.tier === 'probation') {
    return rawEnd; // No extension for probation
  }

  if (period.tier === '2weeks') {
    return getEndOfWeek(rawEnd);
  }

  // 1, 2, or 3 months → extend to end of month
  return getEndOfMonth(rawEnd);
}

/**
 * Calculate hours difference between two Date objects.
 */
function hoursDiff(a, b) {
  return (b.getTime() - a.getTime()) / (1000 * 60 * 60);
}

/**
 * Validate the 72-hour rule between invitation and meeting.
 * Art. 144.1: ≥72 hours before meeting.
 */
function validate72hRule(invitationDate, meetingDateTime) {
  const hours = hoursDiff(invitationDate, meetingDateTime);
  return { valid: hours >= 72, hours: Math.round(hours * 10) / 10 };
}

/**
 * Validate the 48h–1 week rule between meeting and written notice.
 * Art. 144.3: 48 hours to 1 week after meeting.
 */
function validate48hRule(meetingDateTime, writtenNoticeDate) {
  const hours = hoursDiff(meetingDateTime, writtenNoticeDate);
  const days = hours / 24;
  const tooEarly = hours < 48;
  const tooLate = days > 7;
  return {
    valid: !tooEarly && !tooLate,
    tooEarly,
    tooLate,
    hours: Math.round(hours * 10) / 10,
    days: Math.round(days * 10) / 10,
  };
}

/**
 * Build the full termination process timeline.
 * Art. 144 procedure — the invitation IS the first step:
 *   1. Written meeting invitation (= referenceDate, the process starts here)
 *   2. Meeting takes place (≥72h after invitation)
 *   3. Written termination notice (48h–1 week after meeting)
 *   4. Notice period runs from written termination notice date
 *
 * @param {Date} invitationDate - Date the meeting invitation was sent
 * @param {Date|null} meetingDateTime - User-provided meeting date+time (or null for auto)
 * @param {Date|null} writtenNoticeDate - User-provided written notice date (or null for auto)
 * @param {Object} period - notification period tier
 */
function buildTimeline(invitationDate, meetingDateTime, writtenNoticeDate, period) {
  const inv = new Date(invitationDate);

  // Step 1: Invitation date = start of the process
  const invDate = new Date(inv);

  // Step 2: Meeting date — user-provided or auto (72h minimum from invitation)
  const meetingAuto = new Date(inv);
  meetingAuto.setHours(meetingAuto.getHours() + 72);

  const meetingIsUserProvided = meetingDateTime !== null;
  const meetingActual = meetingIsUserProvided ? new Date(meetingDateTime) : meetingAuto;

  // Validate 72h rule
  const rule72h = validate72hRule(inv, meetingActual);

  // Step 3: Written termination notice — user-provided or auto (48h minimum from meeting)
  const writtenNoticeEarliest = new Date(meetingActual);
  writtenNoticeEarliest.setHours(writtenNoticeEarliest.getHours() + 48);

  const writtenNoticeLatest = new Date(meetingActual);
  writtenNoticeLatest.setDate(writtenNoticeLatest.getDate() + 7);

  const writtenNoticeIsUserProvided = writtenNoticeDate !== null;
  const writtenNoticeActual = writtenNoticeIsUserProvided
    ? new Date(writtenNoticeDate)
    : new Date(writtenNoticeEarliest);

  // Validate 48h–1wk rule
  const rule48h = writtenNoticeIsUserProvided
    ? validate48hRule(meetingActual, writtenNoticeActual)
    : { valid: true, tooEarly: false, tooLate: false, hours: 48, days: 2 };

  // Step 4: Notice period starts = written termination notice date
  const noticeStart = new Date(writtenNoticeActual);

  // Step 5: Notice period end with Art. 143.3 extension
  const effectiveDate = getExtendedNoticeEndDate(noticeStart, period);

  return {
    invitationDate: invDate,
    meetingAuto,
    meetingActual,
    meetingIsUserProvided,
    rule72h,
    writtenNoticeEarliest,
    writtenNoticeLatest,
    writtenNoticeActual,
    writtenNoticeIsUserProvided,
    rule48h,
    noticeStart,
    effectiveDate,
  };
}

/**
 * Calculate seniority compensation eligibility and formula.
 * Art. 145: If employment ≥3 years, at least 15 days' salary per full year.
 */
function calculateSeniority(startDate, effectiveDate, monthlySalary) {
  const diff = dateDiff(startDate, effectiveDate);
  const fullYears = diff.years;
  const eligible = fullYears >= 3;

  let amount = null;
  if (eligible && monthlySalary && monthlySalary > 0) {
    const dailySalary = monthlySalary / 30;
    amount = Math.round(dailySalary * 15 * fullYears);
  }

  return { eligible, fullYears, amount };
}

/**
 * Calculate the lawsuit deadline.
 * Art. 146.2: 180 days from end of notice period.
 */
function getLawsuitDeadline(effectiveDate) {
  const d = new Date(effectiveDate);
  d.setDate(d.getDate() + 180);
  return d;
}

// ============================================================
// UI Logic
// ============================================================

function validateForm(startDate, invitationDate, meetingDateTime, writtenNoticeDate) {
  const errors = [];
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  if (!startDate) {
    errors.push(t('errorStartRequired'));
    return errors;
  }

  if (startDate > today) {
    errors.push(t('errorStartFuture'));
  }

  if (startDate >= invitationDate) {
    errors.push(t('errorStartAfterRef'));
  }

  if (meetingDateTime && meetingDateTime < invitationDate) {
    errors.push(t('errorMeetingBeforeInvite'));
  }

  if (writtenNoticeDate) {
    if (meetingDateTime && writtenNoticeDate < meetingDateTime) {
      errors.push(t('errorWrittenNoticeBeforeMeeting'));
    } else if (!meetingDateTime && writtenNoticeDate < invitationDate) {
      errors.push(t('errorWrittenNoticeBeforeInvite'));
    }
  }

  return errors;
}

function showErrors(errors) {
  const errorContainer = document.getElementById('errorContainer');
  if (errors.length === 0) {
    errorContainer.classList.add('hidden');
    errorContainer.innerHTML = '';
    return;
  }
  errorContainer.innerHTML = errors
    .map((e) => `<p class="error-msg">${e}</p>`)
    .join('');
  errorContainer.classList.remove('hidden');
}

/**
 * Build a single timeline step HTML.
 */
function buildTimelineStep(step) {
  const highlightClass = step.highlight ? ' timeline-highlight' : '';
  const dateStr = step.dateIsDateTime
    ? formatDateTimeLong(step.date)
    : formatDateLong(step.date);

  let sublabelHtml = '';
  if (step.sublabels && step.sublabels.length > 0) {
    sublabelHtml = step.sublabels
      .map((s) => `<span class="timeline-sublabel">${s}</span>`)
      .join('');
  }

  return `
    <div class="timeline-step${highlightClass}">
      <div class="timeline-icon">${step.icon}</div>
      <div class="timeline-content">
        <span class="timeline-date">${dateStr}</span>
        <span class="timeline-label">${step.label}</span>
        ${sublabelHtml}
      </div>
    </div>`;
}

function renderResults(startDate, invitationDate, meetingDateTime, writtenNoticeDate, salary) {
  const resultsSection = document.getElementById('results');
  const duration = dateDiff(startDate, invitationDate);
  const probation = isInProbation(startDate, invitationDate);
  const period = getNotificationPeriod(startDate, invitationDate);
  const timeline = buildTimeline(invitationDate, meetingDateTime, writtenNoticeDate, period);
  const seniority = calculateSeniority(
    startDate,
    timeline.effectiveDate,
    salary
  );
  const lawsuitDeadline = getLawsuitDeadline(timeline.effectiveDate);

  // Build HTML
  let html = '';

  // --- Employment Duration ---
  html += `<div class="result-card">
    <h3>${t('employmentDuration')}</h3>
    <p class="result-value">${duration.years} ${t('years')}, ${duration.months} ${t('months')}, ${duration.days} ${t('days')}</p>
    <p class="result-status ${probation ? 'status-probation' : 'status-active'}">
      <span class="status-badge">${t('status')}:</span> ${probation ? t('probation') : t('postProbation')}
    </p>
  </div>`;

  // --- Notification Period ---
  html += `<div class="result-card">
    <h3>${t('notificationPeriod')}</h3>
    <p class="result-value">${t(period.labelKey)}</p>
    <p class="result-ref">${t('legalRef')}: ${period.description}</p>
  </div>`;

  // --- Timeline ---
  html += `<div class="result-card timeline-card">
    <h3>${t('timelineTitle')}</h3>
    <div class="timeline">`;

  // Step 1: Meeting invitation (= first step)
  html += buildTimelineStep({
    date: timeline.invitationDate,
    label: t('timelineMeetingInvite'),
    icon: '✉️',
  });

  // Step 2: Meeting
  const meetingSource = timeline.meetingIsUserProvided
    ? t('userProvided')
    : t('autoCalculated');
  let meetingSublabels = [meetingSource];

  // 72h validation badge
  if (timeline.meetingIsUserProvided) {
    if (timeline.rule72h.valid) {
      meetingSublabels.push(
        `<span class="badge badge-ok">${t('meets72hRule')}</span>`
      );
    } else {
      meetingSublabels.push(
        `<span class="badge badge-error">${t('violates72hRule')}</span>`
      );
    }
    meetingSublabels.push(
      t('hoursBetween').replace('{hours}', timeline.rule72h.hours)
    );
  } else {
    meetingSublabels.push(t('meetingDateAuto'));
  }

  html += buildTimelineStep({
    date: timeline.meetingActual,
    dateIsDateTime: timeline.meetingIsUserProvided,
    label: t('timelineMeeting'),
    icon: '🤝',
    sublabels: meetingSublabels,
  });

  // Step 3: Written termination notice
  const noticeSource = timeline.writtenNoticeIsUserProvided
    ? t('userProvided')
    : t('autoCalculated');
  let noticeSublabels = [noticeSource];

  if (timeline.writtenNoticeIsUserProvided) {
    if (timeline.rule48h.valid) {
      noticeSublabels.push(
        `<span class="badge badge-ok">${t('meets48hRule')}</span>`
      );
    } else if (timeline.rule48h.tooEarly) {
      noticeSublabels.push(
        `<span class="badge badge-error">${t('violates48hTooEarly')}</span>`
      );
    } else if (timeline.rule48h.tooLate) {
      noticeSublabels.push(
        `<span class="badge badge-error">${t('violates48hTooLate')}</span>`
      );
    }
    noticeSublabels.push(
      t('hoursBetween').replace('{hours}', timeline.rule48h.hours) +
        ' (' + t('daysBetween').replace('{days}', timeline.rule48h.days) + ')'
    );
  } else {
    noticeSublabels.push(t('writtenNoticeDateAuto'));
  }

  // Show valid window
  noticeSublabels.push(
    t('writtenNoticeDateRange')
      .replace('{earliest}', formatDate(timeline.writtenNoticeEarliest))
      .replace('{latest}', formatDate(timeline.writtenNoticeLatest))
  );

  html += buildTimelineStep({
    date: timeline.writtenNoticeActual,
    label: t('timelineWrittenNotice'),
    icon: '📄',
    sublabels: noticeSublabels,
  });

  // Step 4: Notice period starts
  html += buildTimelineStep({
    date: timeline.noticeStart,
    label: t('timelineNoticePeriodStart'),
    icon: '⏱️',
    sublabels: [t('noticePeriodStartExplain')],
  });

  // Step 5: Effective termination date
  html += buildTimelineStep({
    date: timeline.effectiveDate,
    label: t('timelineEffectiveDate'),
    icon: '🔚',
    highlight: true,
  });

  // Extension note
  if (period.tier !== 'probation') {
    html += `<p class="timeline-note">${t('timelineExtensionNote')}</p>`;
  }

  html += `</div></div>`;

  // --- Seniority Compensation ---
  html += `<div class="result-card">
    <h3>${t('seniorityTitle')}</h3>`;
  if (seniority.eligible) {
    html += `<p class="result-eligible">${t('seniorityEligible')}</p>`;
    html += `<p>${t('seniorityFormula').replace('{years}', seniority.fullYears)}</p>`;
    if (seniority.amount !== null) {
      html += `<p class="result-value">${t('seniorityAmount').replace('{amount}', seniority.amount.toLocaleString())}</p>`;
    }
    html += `<p class="result-warning">${t('seniorityLostIfJustified')}</p>`;
  } else {
    html += `<p class="result-not-eligible">${t('seniorityNotEligible')}</p>`;
  }
  html += `<p class="result-ref">${t('legalRef')}: Art. 145</p></div>`;

  // --- Job Search Leave ---
  html += `<div class="result-card">
    <h3>${t('jobSearchTitle')}</h3>
    <p>${t('jobSearchDesc')}</p>
    <p class="result-ref">${t('legalRef')}: Art. 143.5</p>
  </div>`;

  // --- Lawsuit Deadline ---
  html += `<div class="result-card">
    <h3>${t('lawsuitTitle')}</h3>
    <p>${t('lawsuitDesc')}</p>
    <p class="result-value">${t('lawsuitDeadline').replace('{date}', formatDateLong(lawsuitDeadline))}</p>
    <p class="result-ref">${t('legalRef')}: Art. 146.2</p>
  </div>`;

  // --- Inappropriate Time Warning ---
  html += `<div class="result-card card-info">
    <h3>${t('inappropriateTitle')}</h3>
    <p>${t('inappropriateDesc')}</p>
    <p class="result-ref">${t('legalRef')}: Art. 147</p>
  </div>`;

  // --- Termination Procedure ---
  html += `<div class="result-card card-procedure">
    <h3>${t('procedureTitle')}</h3>
    <ol class="procedure-steps">
      <li>${t('procedureStep1')}</li>
      <li>${t('procedureStep2')}</li>
      <li>${t('procedureStep3')}</li>
      <li>${t('procedureStep4')}</li>
    </ol>
  </div>`;

  // --- Print Button ---
  html += `<div class="print-section">
    <button type="button" class="btn btn-print" onclick="preparePrint()">${t('printBtn')}</button>
  </div>`;

  resultsSection.innerHTML = html;
  resultsSection.classList.remove('hidden');
  resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Prepare and trigger print with generation date.
 */
function preparePrint() {
  const printDateEl = document.getElementById('printDate');
  if (printDateEl) {
    const now = new Date();
    const dateStr = now.toLocaleDateString(currentLang === 'sq' ? 'sq-AL' : 'en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
    printDateEl.textContent = t('printGeneratedOn') + ' ' + dateStr;
  }
  window.print();
}

// ============================================================
// Event Handlers
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // Set default language
  setLanguage(currentLang);

  // Set default reference date to today
  const refInput = document.getElementById('referenceDate');
  if (refInput && !refInput.value) {
    refInput.value = new Date().toISOString().split('T')[0];
  }

  // Language toggle
  const langBtn = document.getElementById('langToggle');
  if (langBtn) {
    langBtn.addEventListener('click', toggleLanguage);
  }

  // Form submit
  const form = document.getElementById('calcForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const startVal = document.getElementById('startDate').value;
      const refVal = document.getElementById('referenceDate').value;
      const meetingVal = document.getElementById('meetingDate').value;
      const writtenNoticeVal = document.getElementById('writtenNoticeDate').value;
      const salaryVal = document.getElementById('salary').value;

      const startDate = startVal ? new Date(startVal + 'T00:00:00') : null;
      const invitationDate = refVal
        ? new Date(refVal + 'T00:00:00')
        : new Date();
      invitationDate.setHours(0, 0, 0, 0);

      // Meeting date+time — uses datetime-local input
      const meetingDateTime = meetingVal ? new Date(meetingVal) : null;

      // Written notice date
      const writtenNoticeDate = writtenNoticeVal
        ? new Date(writtenNoticeVal + 'T00:00:00')
        : null;

      const salary = salaryVal ? parseFloat(salaryVal) : null;

      const errors = validateForm(startDate, invitationDate, meetingDateTime, writtenNoticeDate);
      showErrors(errors);

      if (errors.length > 0) {
        document.getElementById('results').classList.add('hidden');
        return;
      }

      renderResults(startDate, invitationDate, meetingDateTime, writtenNoticeDate, salary);
    });
  }

  // Reset button
  const resetBtn = document.getElementById('resetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      document.getElementById('results').classList.add('hidden');
      document.getElementById('errorContainer').classList.add('hidden');
      document.getElementById('errorContainer').innerHTML = '';
      const refInput = document.getElementById('referenceDate');
      refInput.value = new Date().toISOString().split('T')[0];
    });
  }
});
