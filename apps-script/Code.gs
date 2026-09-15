/**
 * Mojsilov Detailing — backend za upite sa sajta
 * ----------------------------------------------
 * Google Apps Script web app: svaki upit upisuje u vezani Google Sheet i
 * šalje jedno brendirano obaveštenje na mejl.
 *
 * Sajt šalje GET sa URL parametrima (Apps Script 302-redirektuje POST i
 * pretvara ga u GET, čime se gubi e.postData). doPost je zadržan za JSON telo
 * ako se front kasnije promeni.
 *
 * DEPLOY: Extensions > Apps Script > nalepi ovo u Code.gs >
 * Deploy > New deployment > Web app > Execute as: Me, Access: Anyone >
 * kopiraj /exec URL u FORM_ENDPOINT u js/site.js.
 * Kod se menja? Deploy > Manage deployments > edit > New version (obavezno).
 */

/* ================= CONFIG ================= */

// Mejl na koji stižu obaveštenja (Pavle odlučio: odmah klijentov).
var NOTIFY_TO   = 'MojsilovDetailing@gmail.com';
var SENDER_NAME = 'Mojsilov Detailing sajt';
var BRAND       = 'Mojsilov Detailing';
// Google Sheet sa lidovima (link u podnožju mejla). Prazno sakriva link.
var SHEET_URL   = '';
// Prazno kad je skripta vezana za sheet. Popuniti ako je standalone.
var SHEET_ID    = '';

/* ================= PALETTE (light) =================
   brand = akcent sa sajta (#2164da), brandDark dovoljno taman za beli tekst. */
var C = {
  page:      '#F4F5F8', // blaga podloga iza kartice
  card:      '#FFFFFF', // sama kartica
  panel:     '#F5F7FB', // panel poruke
  line:      '#E5E7EF', // linije
  brand:     '#2164da', // akcent: linija zaglavlja, eyebrow, glavno dugme
  brandDark: '#1a4bb5', // pozadina dugmeta (tamnije za kontrast belog teksta)
  ink:       '#121358', // naslovi i vrednosti (navy sa sajta)
  body:      '#3C4046', // tekst poruke
  muted:     '#7A7F87', // labele, podnožje
  onBrand:   '#FFFFFF'  // tekst na glavnom dugmetu
};

var RADIUS = '16px';
var RPILL  = '8px';
var SANS   = 'Helvetica,Arial,sans-serif';

/* ================= ENTRY POINTS ================= */

function doGet(e) {
  var d = readParams_(e);
  if (!d.name && !d.email && !d.message) {
    return json_({ ok: true, service: BRAND + ' endpoint za upite' });
  }
  return handle_(d);
}

function doPost(e) {
  var d = readParams_(e);
  if (e && e.postData && e.postData.contents) {
    try {
      var body = JSON.parse(e.postData.contents);
      for (var k in body) if (body[k]) d[k] = body[k];
    } catch (err) { /* nije JSON, parametri su već pročitani */ }
  }
  return handle_(d);
}

function handle_(d) {
  if (d.botcheck) return json_({ ok: true }); // honeypot: tiho odbaci
  var sheetErr = '';
  // Namerno nezavisno: pad upisa u sheet ne sme da košta lida.
  try { saveRow_(d); } catch (err) { sheetErr = String(err); }
  try {
    sendEmail_(d);
  } catch (err) {
    return json_({ ok: false, error: String(err), sheetError: sheetErr });
  }
  return json_({ ok: true, sheetError: sheetErr });
}

function readParams_(e) {
  var p = (e && e.parameter) ? e.parameter : {};
  return {
    name:     p.name     || '',
    phone:    p.phone    || '',
    email:    p.email    || '',
    service:  p.service  || '',
    velicina: p.velicina || '',
    keramika: p.keramika || '',
    termin:   p.termin   || '',
    message:  p.message  || '',
    page:     p.page     || '',
    botcheck: p.botcheck || ''
  };
}

/* ================= SHEET ================= */

function saveRow_(d) {
  var ss = SHEET_ID
    ? SpreadsheetApp.openById(SHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('Nema tabele: veži skriptu za sheet ili postavi SHEET_ID.');
  var sheet = ss.getSheets()[0];

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Primljeno', 'Ime', 'Telefon', 'Email', 'Usluga', 'Veličina', 'Keramika', 'Termin', 'Poruka', 'Strana']);
    sheet.getRange(1, 1, 1, 10).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  sheet.appendRow([
    new Date(),
    d.name || '', d.phone || '', d.email || '', d.service || '',
    d.velicina || '', d.keramika || '', d.termin || '', d.message || '', d.page || ''
  ]);
}

/* ================= EMAIL ================= */

function sendEmail_(d) {
  MailApp.sendEmail(NOTIFY_TO, buildSubject_(d), buildPlain_(d), {
    name: SENDER_NAME,
    htmlBody: buildHtml_(d),
    replyTo: d.email || undefined // odgovor ide direktno pošiljaocu upita
  });
}

function buildSubject_(d) {
  var who  = d.name || 'Novi kontakt';
  var tail = d.service ? ', ' + d.service : '';
  return 'Novi upit, ' + BRAND + ': ' + who + tail;
}

function buildPlain_(d) {
  return [
    'NOVI UPIT, ' + BRAND.toUpperCase(),
    '',
    'Ime:      ' + (d.name || ''),
    'Telefon:  ' + (d.phone || ''),
    'Email:    ' + (d.email || ''),
    'Usluga:   ' + (d.service || ''),
    'Veličina: ' + (d.velicina || ''),
    'Keramika: ' + (d.keramika || ''),
    'Termin:   ' + (d.termin || ''),
    '',
    'PORUKA',
    (d.message || '(bez poruke)'),
    '',
    'Poslato sa sajta' + (d.page ? ' (' + d.page + ')' : '') + '.'
  ].join('\n');
}

/**
 * Pravila su namerna, vidi reference/gotchas.md:
 *  - samo tabele i inline stilovi (bez flex/grid, web fontova, slika)
 *  - !important na svakoj boji + bgcolor na svakom bloku (dark mode ne repaint)
 *  - color-scheme meta zaustavlja auto-invert u Apple Mail-u
 *  - ništa nosivo na border-radius (Outlook ga skvari bezopasno)
 *  - dugmad su tabelarne ćelije sa paddingom, ne stilizovani linkovi
 */
function buildHtml_(d) {
  var name  = d.name || 'Neko';
  var first = (String(name).split(' ')[0] || 'njega').slice(0, 18);

  var digits   = String(d.phone || '').replace(/[^\d+]/g, '');
  var callable = digits.replace(/\D/g, '').length >= 6;
  var tel      = 'tel:' + digits;
  var mailable = /.+@.+\..+/.test(String(d.email || ''));

  var rows = [
    ['Ime',      d.name],
    ['Telefon',  d.phone, callable ? tel : ''],
    ['Email',    d.email, mailable ? 'mailto:' + esc_(d.email) : ''],
    ['Usluga',   d.service],
    ['Veličina', d.velicina],
    ['Keramika', d.keramika],
    ['Termin',   d.termin]
  ].filter(function (r) { return r[1]; }).map(function (r, i, all) {
    var border = (i === all.length - 1) ? '' : 'border-bottom:1px solid ' + C.line + ';';
    var value = r[2]
      ? '<a href="' + r[2] + '" style="color:' + C.ink + ' !important;text-decoration:none;' +
        'border-bottom:1px solid ' + C.line + ';">' + esc_(r[1]) + '</a>'
      : esc_(r[1]);
    return '<tr>' +
      '<td bgcolor="' + C.card + '" width="120" style="background-color:' + C.card + ' !important;' + border +
        'padding:15px 16px 15px 0;color:' + C.muted + ' !important;font:700 11px/1.35 ' + SANS + ';' +
        'letter-spacing:.13em;text-transform:uppercase;vertical-align:top;">' + r[0] + '</td>' +
      '<td bgcolor="' + C.card + '" style="background-color:' + C.card + ' !important;' + border +
        'padding:13px 0;color:' + C.ink + ' !important;font:400 17px/1.45 ' + SANS + ';">' + value + '</td>' +
    '</tr>';
  }).join('');

  var panel =
    '<tr><td bgcolor="' + C.panel + '" style="background-color:' + C.panel + ' !important;' +
      'border-left:3px solid ' + C.brand + ';border-radius:' + RPILL + ';padding:20px 22px;">' +
      '<div style="color:' + C.muted + ' !important;font:700 11px/1.2 ' + SANS + ';letter-spacing:.13em;' +
        'text-transform:uppercase;padding-bottom:10px;">Poruka</div>' +
      '<div style="color:' + C.body + ' !important;font:400 16px/1.65 ' + SANS + ';white-space:pre-wrap;">' +
        esc_(d.message || 'Bez poruke.') + '</div>' +
    '</td></tr>';

  var solid = function (href, label) {
    return '<td bgcolor="' + C.brandDark + '" style="background-color:' + C.brandDark + ' !important;' +
      'border-radius:' + RPILL + ';padding:15px 30px;">' +
      '<a href="' + href + '" style="color:' + C.onBrand + ' !important;text-decoration:none;' +
      'font:700 13px/1 ' + SANS + ';letter-spacing:.1em;text-transform:uppercase;">' + label + '</a></td>';
  };
  var ghost = function (href, label) {
    return '<td bgcolor="' + C.card + '" style="background-color:' + C.card + ' !important;' +
      'border:1px solid ' + C.line + ';border-radius:' + RPILL + ';padding:14px 28px;">' +
      '<a href="' + href + '" style="color:' + C.ink + ' !important;text-decoration:none;' +
      'font:700 13px/1 ' + SANS + ';letter-spacing:.1em;text-transform:uppercase;">' + label + '</a></td>';
  };
  var mailHref = 'mailto:' + esc_(d.email) + '?subject=' +
    encodeURIComponent('Re: Vaš upit, ' + BRAND);

  var buttons = '';
  if (callable && mailable) {
    buttons = solid(tel, 'Pozovi ' + esc_(first)) +
      '<td width="10" style="width:10px;">&nbsp;</td>' + ghost(mailHref, 'Email');
  } else if (callable) {
    buttons = solid(tel, 'Pozovi ' + esc_(first));
  } else if (mailable) {
    buttons = solid(mailHref, 'Email ' + esc_(first));
  }

  var actions = buttons
    ? '<tr><td class="pad" bgcolor="' + C.card + '" style="background-color:' + C.card + ' !important;padding:28px 40px 38px;">' +
      '<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>' + buttons + '</tr></table>' +
      '</td></tr>'
    : '<tr><td bgcolor="' + C.card + '" style="background-color:' + C.card + ' !important;height:34px;font-size:0;line-height:0;">&nbsp;</td></tr>';

  return '' +
'<!DOCTYPE html><html><head><meta charset="utf-8">' +
'<meta name="viewport" content="width=device-width,initial-scale=1">' +
'<meta name="color-scheme" content="light dark">' +
'<meta name="supported-color-schemes" content="light dark">' +
'<style>:root{color-scheme:light dark;supported-color-schemes:light dark;}' +
'@media (max-width:600px){.pad{padding-left:24px !important;padding-right:24px !important;}' +
'.hd{font-size:26px !important;}}</style></head>' +
'<body style="margin:0;padding:0;background-color:' + C.page + ' !important;" bgcolor="' + C.page + '">' +
'<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" ' +
  'bgcolor="' + C.page + '" style="background-color:' + C.page + ' !important;">' +
'<tr><td align="center" style="padding:32px 12px 44px;">' +

  '<!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->' +
  '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" ' +
    'style="width:100%;max-width:600px;">' +

  '<tr><td style="padding:0;">' +
  '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" ' +
    'bgcolor="' + C.card + '" style="background-color:' + C.card + ' !important;' +
    'border:1px solid ' + C.line + ';border-radius:' + RADIUS + ';">' +

    '<tr><td class="pad" bgcolor="' + C.card + '" style="background-color:' + C.card + ' !important;' +
      'border-top:4px solid ' + C.brand + ';border-radius:' + RADIUS + ' ' + RADIUS + ' 0 0;padding:34px 40px 28px;">' +
      '<div style="color:' + C.brand + ' !important;font:700 11px/1.2 ' + SANS + ';letter-spacing:.2em;' +
        'text-transform:uppercase;">' + esc_(BRAND) + '</div>' +
      '<div class="hd" style="color:' + C.ink + ' !important;font:700 32px/1.15 ' + SANS + ';' +
        'letter-spacing:-.01em;padding-top:14px;">Novi upit</div>' +
      '<div style="color:' + C.muted + ' !important;font:400 15px/1.5 ' + SANS + ';padding-top:10px;">' +
        esc_(name) + (d.service ? ' &middot; ' + esc_(d.service) : '') + '</div>' +
    '</td></tr>' +

    (rows ? '<tr><td class="pad" bgcolor="' + C.card + '" style="background-color:' + C.card + ' !important;padding:0 40px;">' +
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" ' +
        'bgcolor="' + C.card + '" style="background-color:' + C.card + ' !important;' +
        'border-top:1px solid ' + C.line + ';">' + rows + '</table>' +
    '</td></tr>' : '') +

    '<tr><td class="pad" bgcolor="' + C.card + '" style="background-color:' + C.card + ' !important;padding:26px 40px 0;">' +
      '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">' + panel + '</table>' +
    '</td></tr>' +

    actions +

  '</table></td></tr>' +

    '<tr><td class="pad" bgcolor="' + C.page + '" style="background-color:' + C.page + ' !important;padding:20px 40px 0;">' +
      '<div style="color:' + C.muted + ' !important;font:700 11px/1.7 ' + SANS + ';letter-spacing:.12em;' +
        'text-transform:uppercase;">Upit sa sajta' +
        (d.page ? ' &nbsp;&middot;&nbsp; ' + esc_(d.page) : '') + '</div>' +
      (SHEET_URL ? '<div style="padding-top:8px;"><a href="' + SHEET_URL + '" ' +
        'style="color:' + C.muted + ' !important;font:400 12px/1.7 ' + SANS + ';' +
        'text-decoration:underline;">Otvori bazu lidova</a></div>' : '') +
    '</td></tr>' +

  '</table>' +
  '<!--[if mso]></td></tr></table><![endif]-->' +
'</td></tr></table></body></html>';
}

/* ================= HELPERS ================= */

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function esc_(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
