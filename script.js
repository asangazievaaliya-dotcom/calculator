let cur = '0', expr = '', op = null, prev = null, fresh = false;

function update() {
  document.getElementById('val').textContent = cur;
  document.getElementById('expr').textContent = expr;
}

function compute(a, o, b) {
  a = parseFloat(a); b = parseFloat(b);
  if (o === '+') return a + b;
  if (o === '-') return a - b;
  if (o === '*') return a * b;
  if (o === '/') return b === 0 ? null : a / b;
}

function fmt(n) {
  if (n === null) return 'Error';
  return parseFloat(n.toFixed(10)).toString();
}

function calc(action, val) {
  if (action === 'clear') {
    cur = '0'; expr = ''; op = null; prev = null; fresh = false;

  } else if (action === 'digit') {
    if (fresh) { cur = val; fresh = false; }
    else cur = cur === '0' ? val : cur + val;

  } else if (action === 'dot') {
    if (fresh) { cur = '0.'; fresh = false; }
    else if (!cur.includes('.')) cur += '.';

  } else if (action === 'op') {
    if (op && !fresh) {
      cur = fmt(compute(prev, op, cur));
      expr = cur + ' ' + val;
    } else {
      expr = cur + ' ' + val;
    }
    prev = cur; op = val; fresh = true;

  } else if (action === 'equals') {
    if (op && prev !== null) {
      expr = prev + ' ' + op + ' ' + cur + ' =';
      cur = fmt(compute(prev, op, cur));
      op = null; prev = null; fresh = true;
    }
  }

  update();
}
