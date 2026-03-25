const translations = {
  sq: {
    // Header
    siteTitle: 'Puna Ime',
    siteSubtitle: 'Llogaritësi i Afatit të Njoftimit për Zgjidhjen e Kontratës së Punës',
    langToggle: 'EN',

    // Disclaimer
    disclaimer: 'Ky mjet është vetëm për qëllime informative dhe nuk përbën këshillë ligjore. Referojuni gjithmonë Kodit të Punës të Republikës së Shqipërisë dhe konsultohuni me një profesionist ligjor.',

    // Form
    formTitle: 'Të dhënat e punësimit',
    startDateLabel: 'Data e fillimit të punës',
    referenceDateLabel: 'Data e ftesës me shkrim për takim',
    referenceDateHint: '(data kur punëdhënësi i dërgon punëmarrësit ftesën me shkrim — parazgjedhur sot)',
    meetingDateLabel: 'Data dhe ora e takimit (opsionale)',
    meetingDateHint: '(data dhe ora e takimit të caktuar nga ftesa)',
    writtenNoticeDateLabel: 'Data e njoftimit me shkrim (opsionale)',
    writtenNoticeDateHint: '(data kur punëdhënësi lëshon njoftimin me shkrim pas takimit)',
    salaryLabel: 'Paga mujore bruto (opsionale)',
    salaryHint: '(për llogaritjen e shpërblimit të vjetërsisë)',
    salaryPlaceholder: 'p.sh. 50000',
    calculateBtn: 'Llogarit',
    resetBtn: 'Pastro',

    // Validation
    errorStartRequired: 'Ju lutem vendosni datën e fillimit të punës.',
    errorStartFuture: 'Data e fillimit nuk mund të jetë në të ardhmen.',
    errorStartAfterRef: 'Data e fillimit duhet të jetë përpara datës së ftesës.',
    errorMeetingBeforeInvite: 'Data e takimit nuk mund të jetë përpara datës së ftesës.',
    errorWrittenNoticeBeforeMeeting: 'Data e njoftimit me shkrim nuk mund të jetë përpara datës së takimit.',
    errorWrittenNoticeBeforeInvite: 'Data e njoftimit me shkrim nuk mund të jetë përpara datës së ftesës.',

    // Results
    resultsTitle: 'Rezultatet',
    employmentDuration: 'Kohëzgjatja e punësimit',
    years: 'vjet',
    months: 'muaj',
    days: 'ditë',
    status: 'Statusi',
    probation: 'Periudhë prove',
    postProbation: 'Pas periudhës së provës',
    notificationPeriod: 'Afati i njoftimit',
    fiveDays: '5 ditë',
    twoWeeks: '2 javë',
    oneMonth: '1 muaj',
    twoMonths: '2 muaj',
    threeMonths: '3 muaj',
    legalRef: 'Baza ligjore',

    // Timeline
    timelineTitle: 'Kalendari i procesit të zgjidhjes',
    timelineMeetingInvite: 'Ftesë me shkrim për takim (Neni 144.1)',
    timelineMeeting: 'Takimi me punëmarrësin (Neni 144.2)',
    timelineWrittenNotice: 'Njoftimi me shkrim i zgjidhjes (Neni 144.3)',
    timelineNoticePeriodStart: 'Fillimi i afatit të njoftimit',
    timelineEffectiveDate: 'Data efektive e përfundimit të punës',
    timelineExtensionNote: 'Afati zgjatet deri në fund të javës ose muajit (Neni 143.3)',

    // Timeline validation badges
    meets72hRule: '✓ Respekton rregullin e 72 orëve',
    violates72hRule: '✗ Nuk respekton rregullin e 72 orëve (kërkohen ≥72 orë ndërmjet ftesës dhe takimit)',
    meets48hRule: '✓ Respekton rregullin 48 orë – 1 javë',
    violates48hTooEarly: '✗ Njoftimi është dhënë para 48 orëve nga takimi',
    violates48hTooLate: '✗ Njoftimi është dhënë pas 1 jave nga takimi',
    hoursBetween: '{hours} orë ndërmjet',
    daysBetween: '{days} ditë ndërmjet',
    meetingDateAuto: 'Data minimale e takimit (72 orë nga ftesa)',
    writtenNoticeDateAuto: 'Data minimale e njoftimit (48 orë nga takimi)',
    writtenNoticeDateRange: 'Dritare e vlefshme: {earliest} – {latest}',
    userProvided: '(sipas të dhënave tuaja)',
    autoCalculated: '(e llogaritur automatikisht)',
    noticePeriodStartExplain: 'Afati i njoftimit fillon nga data e njoftimit me shkrim',

    // Seniority
    seniorityTitle: 'Shpërblimi për vjetërsinë',
    seniorityEligible: 'I përshtatshëm — marrëdhënia e punës ka zgjatur ≥3 vjet.',
    seniorityNotEligible: 'Nuk përfitoni — nevojiten të paktën 3 vjet punë.',
    seniorityFormula: 'Formula: 15 ditë pagë × {years} vjet pune të plota',
    seniorityAmount: 'Shuma e përafërt: {amount} Lekë',
    seniorityLostIfJustified: 'Kujdes: E drejta humbet nëse pushimi bëhet me efekt të menjëhershëm për shkaqe të arsyeshme (Neni 145.1).',

    // Job search leave
    jobSearchTitle: 'Leja për kërkim pune',
    jobSearchDesc: 'Gjatë periudhës së njoftimit, keni të drejtë për të paktën 20 orë leje të pagueshme në javë për të kërkuar punë të re.',

    // Lawsuit deadline
    lawsuitTitle: 'Afati për padi gjyqësore',
    lawsuitDesc: 'Nëse zgjidhja është pa shkaqe të arsyeshme, keni të drejtë të ngrini padi brenda 180 ditëve nga përfundimi i afatit të njoftimit.',
    lawsuitDeadline: 'Afati i fundit: {date}',

    // Inappropriate time warning
    inappropriateTitle: 'Mbrojtje nga zgjidhja në kohë të papërshtatshme',
    inappropriateDesc: 'Punëdhënësi nuk mund të zgjidhë kontratën kur punëmarrësi përfiton pagesë paaftësie (deri në 1 vit) ose është me pushime të dhëna nga punëdhënësi (Neni 147).',

    // Procedure
    procedureTitle: 'Procedura e zgjidhjes (Neni 144)',
    procedureStep1: 'Punëdhënësi njofton me shkrim punëmarrësin të paktën 72 orë para takimit.',
    procedureStep2: 'Gjatë takimit, punëdhënësi parashtron arsyet dhe dëgjon punëmarrësin.',
    procedureStep3: 'Zgjidhja njoftohet me shkrim, brenda 48 orëve deri në 1 javë pas takimit, duke përcaktuar arsyet.',
    procedureStep4: 'Mosrespektimi i procedurës = dëmshpërblim i barabartë me pagën e 2 muajve (Neni 144.5).',

    // Footer
    footerText: 'Bazuar në Kodin e Punës të Republikës së Shqipërisë (Ligj nr. 7961/1995, i ndryshuar)',
    footerArticles: 'Nenet 140–158',

    // Print
    printBtn: 'Printo rezultatet',
    printReportTitle: 'Raport i Llogaritjes',
    printGeneratedOn: 'Gjeneruar më:',
    printDisclaimer: 'Ky dokument është vetëm për qëllime informative dhe nuk përbën këshillë ligjore. Referojuni gjithmonë Kodit të Punës dhe konsultohuni me një profesionist ligjor.',
    printFooterConfidential: 'Dokument konfidencial — vetëm për përdorim të brendshëm',
    printPageLabel: 'Faqe',
  },

  en: {
    // Header
    siteTitle: 'Puna Ime',
    siteSubtitle: 'Employment Termination Notice Period Calculator',
    langToggle: 'SQ',

    // Disclaimer
    disclaimer: 'This tool is for informational purposes only and does not constitute legal advice. Always refer to the Albanian Labor Code and consult a legal professional.',

    // Form
    formTitle: 'Employment details',
    startDateLabel: 'Employment start date',
    referenceDateLabel: 'Written meeting invitation date',
    referenceDateHint: '(the date the employer sends the written meeting invitation — defaults to today)',
    meetingDateLabel: 'Meeting date and time (optional)',
    meetingDateHint: '(the date and time of the meeting set by the invitation)',
    writtenNoticeDateLabel: 'Written termination notice date (optional)',
    writtenNoticeDateHint: '(the date the employer issues the written notice after the meeting)',
    salaryLabel: 'Gross monthly salary (optional)',
    salaryHint: '(for seniority compensation calculation)',
    salaryPlaceholder: 'e.g. 50000',
    calculateBtn: 'Calculate',
    resetBtn: 'Reset',

    // Validation
    errorStartRequired: 'Please enter the employment start date.',
    errorStartFuture: 'The start date cannot be in the future.',
    errorStartAfterRef: 'The start date must be before the invitation date.',
    errorMeetingBeforeInvite: 'The meeting date cannot be before the invitation date.',
    errorWrittenNoticeBeforeMeeting: 'The written notice date cannot be before the meeting date.',
    errorWrittenNoticeBeforeInvite: 'The written notice date cannot be before the invitation date.',

    // Results
    resultsTitle: 'Results',
    employmentDuration: 'Employment duration',
    years: 'years',
    months: 'months',
    days: 'days',
    status: 'Status',
    probation: 'Probation period',
    postProbation: 'Post-probation',
    notificationPeriod: 'Notice period',
    fiveDays: '5 days',
    twoWeeks: '2 weeks',
    oneMonth: '1 month',
    twoMonths: '2 months',
    threeMonths: '3 months',
    legalRef: 'Legal basis',

    // Timeline
    timelineTitle: 'Termination process timeline',
    timelineMeetingInvite: 'Written meeting invitation (Art. 144.1)',
    timelineMeeting: 'Meeting with employee (Art. 144.2)',
    timelineWrittenNotice: 'Written termination notice (Art. 144.3)',
    timelineNoticePeriodStart: 'Notice period starts',
    timelineEffectiveDate: 'Effective employment termination date',
    timelineExtensionNote: 'Period extends to end of week or month (Art. 143.3)',

    // Timeline validation badges
    meets72hRule: '✓ Meets the 72-hour rule',
    violates72hRule: '✗ Violates the 72-hour rule (≥72 hours required between invitation and meeting)',
    meets48hRule: '✓ Meets the 48h – 1 week rule',
    violates48hTooEarly: '✗ Notice was issued before 48 hours from the meeting',
    violates48hTooLate: '✗ Notice was issued after 1 week from the meeting',
    hoursBetween: '{hours} hours between',
    daysBetween: '{days} days between',
    meetingDateAuto: 'Minimum meeting date (72 hours from invitation)',
    writtenNoticeDateAuto: 'Minimum notice date (48 hours from meeting)',
    writtenNoticeDateRange: 'Valid window: {earliest} – {latest}',
    userProvided: '(as per your input)',
    autoCalculated: '(auto-calculated)',
    noticePeriodStartExplain: 'Notice period starts from the written termination notice date',

    // Seniority
    seniorityTitle: 'Seniority compensation',
    seniorityEligible: 'Eligible — employment lasted ≥3 years.',
    seniorityNotEligible: 'Not eligible — at least 3 years of employment required.',
    seniorityFormula: 'Formula: 15 days\' salary × {years} full years of work',
    seniorityAmount: 'Approximate amount: {amount} ALL',
    seniorityLostIfJustified: 'Note: This right is lost if dismissal is immediate for justified reasons (Art. 145.1).',

    // Job search leave
    jobSearchTitle: 'Job search leave',
    jobSearchDesc: 'During the notice period, you are entitled to at least 20 paid hours per week to search for new employment.',

    // Lawsuit deadline
    lawsuitTitle: 'Lawsuit deadline',
    lawsuitDesc: 'If the termination is without reasonable cause, you may file a lawsuit within 180 days from the end of the notice period.',
    lawsuitDeadline: 'Deadline: {date}',

    // Inappropriate time warning
    inappropriateTitle: 'Protection from untimely termination',
    inappropriateDesc: 'The employer cannot terminate the contract while the employee receives disability pay (up to 1 year) or is on employer-granted leave (Art. 147).',

    // Procedure
    procedureTitle: 'Termination procedure (Art. 144)',
    procedureStep1: 'The employer notifies the employee in writing at least 72 hours before the meeting.',
    procedureStep2: 'During the meeting, the employer presents the reasons and hears the employee.',
    procedureStep3: 'Written termination notice is issued within 48 hours to 1 week after the meeting, stating the reasons.',
    procedureStep4: 'Failure to follow procedure = compensation equal to 2 months\' salary (Art. 144.5).',

    // Footer
    footerText: 'Based on the Labor Code of the Republic of Albania (Law no. 7961/1995, as amended)',
    footerArticles: 'Articles 140–158',

    // Print
    printBtn: 'Print results',
    printReportTitle: 'Calculation Report',
    printGeneratedOn: 'Generated on:',
    printDisclaimer: 'This document is for informational purposes only and does not constitute legal advice. Always refer to the Labor Code and consult a legal professional.',
    printFooterConfidential: 'Confidential document — for internal use only',
    printPageLabel: 'Page',
  },
};

let currentLang = localStorage.getItem('punaime_lang') || 'sq';

function t(key) {
  return translations[currentLang][key] || translations.sq[key] || key;
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('punaime_lang', lang);
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = t(key);
  });
  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    const key = el.getAttribute('data-i18n-title');
    el.title = t(key);
  });
  const toggleBtn = document.getElementById('langToggle');
  if (toggleBtn) {
    toggleBtn.textContent = t('langToggle');
  }
}

function toggleLanguage() {
  setLanguage(currentLang === 'sq' ? 'en' : 'sq');
  // Re-render results if visible
  const resultsSection = document.getElementById('results');
  if (resultsSection && !resultsSection.classList.contains('hidden')) {
    const form = document.getElementById('calcForm');
    if (form) form.dispatchEvent(new Event('submit'));
  }
}

function formatDate(date) {
  const d = new Date(date);
  if (currentLang === 'sq') {
    return d.toLocaleDateString('sq-AL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function formatDateLong(date) {
  const d = new Date(date);
  if (currentLang === 'sq') {
    return d.toLocaleDateString('sq-AL', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
  return d.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function formatDateTimeLong(date) {
  const d = new Date(date);
  if (currentLang === 'sq') {
    return d.toLocaleDateString('sq-AL', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }) + ', ' + d.toLocaleTimeString('sq-AL', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
  return d.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }) + ', ' + d.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
}
