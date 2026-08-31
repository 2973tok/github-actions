const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const startTime = new Date();
let visitCount = 0;

function formatUptime(ms) {
    const seconds = Math.floor(ms / 1000);
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
}

app.get('/', (req, res) => {
    visitCount++;
    const now = new Date();
    const uptimeMs = now - startTime;

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>GitHub Actions Deploy Demo</title>
        <meta http-equiv="refresh" content="5">
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #0d1117;
                color: #c9d1d9;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                text-align: center;
            }
            .card {
                background-color: #161b22;
                padding: 40px;
                border-radius: 12px;
                border: 1px solid #30363d;
                min-width: 320px;
            }
            h1 { color: #58a6ff; }
            .stat {
                margin-top: 12px;
                font-size: 15px;
                color: #8b949e;
                text-align: left;
            }
            .stat span { color: #c9d1d9; font-weight: bold; }
            .badge {
                display: inline-block;
                margin-top: 16px;
                padding: 4px 12px;
                background-color: #238636;
                border-radius: 20px;
                font-size: 12px;
            }
        </style>
    </head>
    <body>
        <div class="card">
            <h1>🚀 Node.js Deploy Demo</h1>
            <div class="stat">Environment: <span>${process.env.APP_ENV || 'unknown'}</span></div>
            <div class="stat">Server time: <span>${now.toISOString()}</span></div>
            <div class="stat">Uptime: <span>${formatUptime(uptimeMs)}</span></div>
            <div class="stat">Visit count (since restart): <span>${visitCount}</span></div>
            <div class="stat">Commit: <span>${process.env.COMMIT_SHA || 'unknown'}</span></div>
            <div class="badge">● LIVE</div>
        </div>
    </body>
    </html>
    `;
    res.send(html);
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', uptime: uptimeMs !== undefined ? uptimeMs : (new Date() - startTime) });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
