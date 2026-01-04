(function() {
    const DEBUG = true;
    function debugLog(...args) {
        if (DEBUG && console && console.debug) console.debug('[video-iframe]', ...args);
    }

    // Inject preconnect links for YouTube domains to speed up iframe loads
    document.addEventListener('DOMContentLoaded', () => {
        try {
            const preconnectHosts = ['https://www.youtube.com', 'https://www.youtube-nocookie.com', 'https://s.ytimg.com'];
            preconnectHosts.forEach(href => {
                if (!document.querySelector(`link[rel="preconnect"][href="${href}"]`)) {
                    const l = document.createElement('link');
                    l.rel = 'preconnect';
                    l.href = href;
                    l.crossOrigin = '';
                    document.head.appendChild(l);
                    debugLog('Added preconnect for', href);
                }
            });
        } catch (e) {
            debugLog('Preconnect injection failed', e);
        }
    });

    // Helper to create and show a video modal with spinner + fallback button + load/error handling
    window.playVideo = function(videoId) {
        debugLog('playVideo called for', videoId);
        if (!videoId) return debugLog('No video id provided');

        // If a modal already exists, remove it first
        const existing = document.getElementById('video-modal-overlay');
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.id = 'video-modal-overlay';
        overlay.style.cssText = 'position:fixed;inset:0;display:flex;align-items:center;justify-content:center;z-index:2000;background:rgba(0,0,0,0.6);backdrop-filter:blur(2px);';
        overlay.innerHTML = `
            <div id="video-modal" role="dialog" aria-modal="true" style="width:90%;max-width:1000px;background:#000;border-radius:8px;overflow:hidden;position:relative;">
                <button id="video-modal-close" aria-label="Close video" style="position:absolute;top:8px;right:8px;z-index:5;background:transparent;border:none;color:white;font-size:1.2rem;cursor:pointer;">✕</button>
                <div id="video-spinner" style="display:flex;align-items:center;justify-content:center;height:0;padding-top:56.25%;position:relative;background:#111;">
                    <div class="spinner" aria-hidden="true" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);font-size:2rem;color:white;">
                        <i class="fas fa-spinner fa-spin"></i>
                    </div>
                </div>
                <div id="video-iframe-wrap" style="display:none;position:relative;padding-top:56.25%;background:#000;"></div>
                <div id="video-fallback" style="display:none;padding:1rem;text-align:center;background:#0b1220;color:#fff;">
                    <p>Unable to load the video inline. You can open it on YouTube instead.</p>
                    <a id="video-fallback-btn" href="#" target="_blank" rel="noopener" style="display:inline-block;margin-top:6px;padding:8px 14px;border-radius:6px;background:#ff0000;color:white;text-decoration:none;">Open on YouTube</a>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        const spinner = overlay.querySelector('#video-spinner');
        const iframeWrap = overlay.querySelector('#video-iframe-wrap');
        const fallback = overlay.querySelector('#video-fallback');
        const fallbackBtn = overlay.querySelector('#video-fallback-btn');
        const closeBtn = overlay.querySelector('#video-modal-close');

        const youtubeEmbed = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0&modestbranding=1`;
        const watchUrl = `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`;
        fallbackBtn.href = watchUrl;

        let timeoutHandle = null;
        let loaded = false;

        // Create iframe
        const iframe = document.createElement('iframe');
        iframe.src = youtubeEmbed;
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        iframe.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:100%;border:0;';
        iframe.loading = 'lazy';

        // onload handling
        iframe.addEventListener('load', () => {
            debugLog('iframe load event for', videoId);
            loaded = true;
            clearTimeout(timeoutHandle);
            if (spinner) spinner.style.display = 'none';
            if (iframeWrap) iframeWrap.style.display = 'block';
        });

        // Timeout fallback (iframe onerror is unreliable, so use timeout)
        timeoutHandle = setTimeout(() => {
            if (!loaded) {
                debugLog('iframe load timed out for', videoId);
                if (spinner) spinner.style.display = 'none';
                if (iframeWrap) iframeWrap.style.display = 'none';
                if (fallback) fallback.style.display = 'block';
            }
        }, 10000); // 10s timeout

        iframeWrap.appendChild(iframe);

        function cleanup() {
            debugLog('Cleaning up video modal for', videoId);
            clearTimeout(timeoutHandle);
            try { overlay.remove(); } catch (e) { debugLog('Error removing overlay', e); }
        }

        // Close handlers
        closeBtn.addEventListener('click', cleanup, { once: true });
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) cleanup();
        });

        // Accessibility: focus close button
        closeBtn.focus();
    };

    debugLog('Video iframe enhancements loaded');
})();
