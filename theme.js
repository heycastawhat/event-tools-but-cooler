(function() {
    const accent = localStorage.getItem('eventToolsAccent');
    const fontSize = localStorage.getItem('eventToolsFontSize');
    const theme = localStorage.getItem('eventToolsTheme');

    if (accent) {
        document.documentElement.style.setProperty('--accent', accent);
    }

    if (fontSize) {
        const sizes = { small: '14px', medium: '16px', large: '18px' };
        document.documentElement.style.setProperty('--base-font-size', sizes[fontSize]);
    }

    if (theme === 'light') {
        document.documentElement.style.setProperty('--bg-primary', '#ffffff');
        document.documentElement.style.setProperty('--bg-secondary', '#f6f8fa');
        document.documentElement.style.setProperty('--bg-tertiary', '#eaeef2');
        document.documentElement.style.setProperty('--text-primary', '#1f2328');
        document.documentElement.style.setProperty('--text-secondary', '#656d76');
        document.documentElement.style.setProperty('--text-muted', '#8b949e');
        document.documentElement.style.setProperty('--border', '#d0d7de');
    }
})();
