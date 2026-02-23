// Simple Vercel serverless function to compute invoice totals and return rendered HTML
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed, use POST' });
    return;
  }

  try {
    const payload = req.body || {};
    const company = payload.company || {};
    const client = payload.client || {};
    const items = Array.isArray(payload.items) ? payload.items : [];

    let total = 0;
    const rows = items.map(it => {
      const qty = Number(it.qty) || 0;
      const price = Number(it.price) || 0;
      const amount = qty * price;
      total += amount;
      return `<tr><td>${escapeHtml(it.desc||'')}</td><td style="text-align:center">${qty}</td><td style="text-align:right">${price.toFixed(2)}</td><td style="text-align:right">${amount.toFixed(2)}</td></tr>`;
    }).join('');

    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Invoice</title></head><body><h2>Invoice</h2><p><strong>From:</strong> ${escapeHtml(company.name||'')}</p><p><strong>To:</strong> ${escapeHtml(client.name||'')}</p><table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse"><thead><tr><th>Description</th><th>Qty</th><th>Rate</th><th>Amount</th></tr></thead><tbody>${rows}</tbody></table><h3>Total: ${total.toFixed(2)}</h3></body></html>`;

    res.status(200).json({ total, html });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
};

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
}
