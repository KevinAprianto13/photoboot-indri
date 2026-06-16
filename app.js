/* ============================================
   PhotoBooth Camera - Application Logic
   ============================================ */

(function () {
    'use strict';

    // =====================
    // Effect Definitions
    // =====================
    const EFFECTS = {
        basic: [
            { id: 'normal', name: 'Normal', icon: '🔲', filter: 'none', overlay: '' },
            { id: 'grayscale', name: 'B&W', icon: '⬛', filter: 'grayscale(100%)', overlay: '' },
            { id: 'sepia', name: 'Sepia', icon: '🟤', filter: 'sepia(80%)', overlay: '' },
            { id: 'high-contrast', name: 'Hi Contrast', icon: '◼️', filter: 'contrast(150%) saturate(120%)', overlay: '' },
            { id: 'warm', name: 'Warm', icon: '🔥', filter: 'sepia(30%) saturate(140%) brightness(110%)', overlay: '' },
            { id: 'cool', name: 'Cool', icon: '❄️', filter: 'saturate(80%) hue-rotate(180deg) brightness(105%)', overlay: '' },
        ],
        instagram: [
            { id: 'ig-clarendon', name: 'Clarendon', icon: '🌟', filter: 'contrast(120%) saturate(135%) brightness(108%)', overlay: 'overlay-ig-clarendon' },
            { id: 'ig-gingham', name: 'Gingham', icon: '🧸', filter: 'brightness(105%) contrast(95%) saturate(85%)', overlay: 'overlay-ig-gingham' },
            { id: 'ig-moon', name: 'Moon', icon: '🌙', filter: 'grayscale(100%) contrast(110%) brightness(110%)', overlay: '' },
            { id: 'ig-lark', name: 'Lark', icon: '🐦', filter: 'contrast(105%) brightness(110%) saturate(110%)', overlay: 'overlay-ig-lark' },
            { id: 'ig-reyes', name: 'Reyes', icon: '🌸', filter: 'sepia(22%) brightness(110%) contrast(85%) saturate(75%)', overlay: 'overlay-ig-reyes' },
            { id: 'ig-juno', name: 'Juno', icon: '🪐', filter: 'contrast(115%) brightness(105%) saturate(140%) sepia(8%)', overlay: 'overlay-vignette' },
            { id: 'ig-slumber', name: 'Slumber', icon: '😴', filter: 'saturate(66%) brightness(105%) sepia(15%)', overlay: 'overlay-ig-slumber' },
            { id: 'ig-crema', name: 'Crema', icon: '☕', filter: 'sepia(15%) contrast(90%) brightness(105%) saturate(90%)', overlay: 'overlay-ig-crema' },
            { id: 'ig-ludwig', name: 'Ludwig', icon: '🎭', filter: 'contrast(105%) brightness(103%) saturate(105%) sepia(10%)', overlay: 'overlay-ig-ludwig' },
            { id: 'ig-aden', name: 'Aden', icon: '🌺', filter: 'hue-rotate(-20deg) contrast(90%) saturate(85%) brightness(120%)', overlay: 'overlay-ig-aden' },
            { id: 'ig-perpetua', name: 'Perpetua', icon: '🔮', filter: 'brightness(105%) saturate(110%)', overlay: 'overlay-ig-perpetua' },
            { id: 'ig-amaro', name: 'Amaro', icon: '✨', filter: 'brightness(110%) contrast(90%) saturate(150%) sepia(10%)', overlay: 'overlay-vignette' },
            { id: 'ig-mayfair', name: 'Mayfair', icon: '💎', filter: 'contrast(110%) brightness(105%) saturate(110%)', overlay: 'overlay-ig-mayfair' },
            { id: 'ig-rise', name: 'Rise', icon: '🌅', filter: 'brightness(108%) contrast(95%) saturate(110%) sepia(12%)', overlay: 'overlay-ig-rise' },
            { id: 'ig-hudson', name: 'Hudson', icon: '🧊', filter: 'brightness(112%) contrast(95%) saturate(90%)', overlay: 'overlay-ig-hudson' },
            { id: 'ig-valencia', name: 'Valencia', icon: '🍊', filter: 'sepia(18%) contrast(108%) brightness(108%) saturate(105%)', overlay: 'overlay-ig-valencia' },
            { id: 'ig-xpro2', name: 'X-Pro II', icon: '🎞️', filter: 'contrast(130%) saturate(140%) sepia(15%)', overlay: 'overlay-ig-xpro2' },
            { id: 'ig-lofi', name: 'Lo-Fi', icon: '🔊', filter: 'contrast(150%) saturate(140%) brightness(95%)', overlay: 'overlay-vignette' },
            { id: 'ig-earlybird', name: 'Earlybird', icon: '🐣', filter: 'sepia(30%) contrast(110%) brightness(105%) saturate(110%)', overlay: 'overlay-ig-earlybird' },
            { id: 'ig-nashville', name: 'Nashville', icon: '🎸', filter: 'sepia(15%) contrast(110%) brightness(108%) saturate(120%)', overlay: 'overlay-ig-nashville' },
            { id: 'ig-toaster', name: 'Toaster', icon: '🍞', filter: 'sepia(25%) contrast(130%) brightness(95%) saturate(110%)', overlay: 'overlay-ig-toaster' },
            { id: 'ig-walden', name: 'Walden', icon: '🌲', filter: 'brightness(110%) saturate(120%) sepia(15%) hue-rotate(-10deg)', overlay: 'overlay-ig-walden' },
            { id: 'ig-inkwell', name: 'Inkwell', icon: '🖋️', filter: 'grayscale(100%) contrast(120%) brightness(105%)', overlay: '' },
            { id: 'ig-hefe', name: 'Hefe', icon: '🌻', filter: 'contrast(115%) saturate(140%) brightness(100%) sepia(10%)', overlay: 'overlay-ig-hefe' },
            { id: 'ig-kelvin', name: 'Kelvin', icon: '🌡️', filter: 'contrast(120%) saturate(130%) brightness(105%) sepia(8%)', overlay: 'overlay-ig-kelvin' },
            { id: 'ig-sierra', name: 'Sierra', icon: '🏔️', filter: 'contrast(95%) brightness(108%) saturate(85%) sepia(10%)', overlay: 'overlay-ig-sierra' },
            { id: 'ig-willow', name: 'Willow', icon: '🌿', filter: 'grayscale(50%) contrast(95%) brightness(110%)', overlay: 'overlay-ig-willow' },
            { id: 'ig-brannan', name: 'Brannan', icon: '📷', filter: 'contrast(125%) saturate(80%) sepia(15%) brightness(105%)', overlay: 'overlay-ig-brannan' },
        ],
        portrait: [
            { id: 'pt-softglow', name: 'Soft Glow', icon: '💡', filter: 'brightness(110%) contrast(95%) saturate(90%) blur(0.3px)', overlay: 'overlay-sparkle' },
            { id: 'pt-porcelain', name: 'Porcelain', icon: '🤍', filter: 'brightness(115%) contrast(90%) saturate(80%)', overlay: '' },
            { id: 'pt-golden', name: 'Golden Hour', icon: '🌅', filter: 'sepia(20%) brightness(110%) saturate(130%) contrast(105%)', overlay: 'overlay-light-leak' },
            { id: 'pt-rosy', name: 'Rosy', icon: '🌹', filter: 'brightness(108%) contrast(100%) saturate(115%) hue-rotate(-8deg) sepia(10%)', overlay: 'overlay-ig-mayfair' },
            { id: 'pt-magazine', name: 'Magazine', icon: '📰', filter: 'contrast(120%) brightness(105%) saturate(110%)', overlay: '' },
            { id: 'pt-glamour', name: 'Glamour', icon: '💄', filter: 'contrast(108%) brightness(108%) saturate(120%) sepia(5%)', overlay: 'overlay-ig-clarendon' },
            { id: 'pt-peach', name: 'Peach', icon: '🍑', filter: 'sepia(15%) brightness(112%) contrast(95%) saturate(105%) hue-rotate(-5deg)', overlay: '' },
            { id: 'pt-ivory', name: 'Ivory', icon: '🦢', filter: 'brightness(110%) contrast(92%) saturate(75%) sepia(12%)', overlay: '' },
            { id: 'pt-cinematic', name: 'Cinematic', icon: '🎬', filter: 'contrast(115%) brightness(95%) saturate(90%)', overlay: 'overlay-ig-xpro2' },
        ],
        aesthetic: [
            { id: 'ae-pastel', name: 'Pastel', icon: '🎀', filter: 'brightness(115%) contrast(85%) saturate(75%)', overlay: '' },
            { id: 'ae-cottagecore', name: 'Cottagecore', icon: '🌾', filter: 'sepia(25%) brightness(110%) contrast(95%) saturate(100%)', overlay: 'overlay-light-leak' },
            { id: 'ae-grunge', name: 'Grunge', icon: '⛓️', filter: 'contrast(130%) brightness(90%) saturate(70%) sepia(10%)', overlay: 'overlay-vignette overlay-film-grain' },
            { id: 'ae-dark', name: 'Dark Mood', icon: '🖤', filter: 'contrast(120%) brightness(80%) saturate(90%)', overlay: 'overlay-vignette' },
            { id: 'ae-ethereal', name: 'Ethereal', icon: '🦋', filter: 'brightness(115%) contrast(90%) saturate(85%) hue-rotate(15deg)', overlay: 'overlay-sparkle' },
            { id: 'ae-film', name: 'Film', icon: '🎞️', filter: 'contrast(105%) brightness(103%) saturate(95%) sepia(8%)', overlay: 'overlay-film-grain overlay-ig-crema' },
            { id: 'ae-polaroid', name: 'Instant', icon: '📸', filter: 'contrast(110%) brightness(112%) saturate(130%) sepia(5%)', overlay: 'overlay-vignette' },
            { id: 'ae-teal-orange', name: 'Teal&Orange', icon: '🎨', filter: 'contrast(115%) saturate(130%) brightness(105%)', overlay: 'overlay-ig-perpetua' },
            { id: 'ae-lavender', name: 'Lavender', icon: '💜', filter: 'brightness(108%) contrast(95%) saturate(80%) hue-rotate(20deg)', overlay: '' },
            { id: 'ae-mint', name: 'Mint', icon: '🍃', filter: 'brightness(110%) contrast(95%) saturate(90%) hue-rotate(120deg)', overlay: '' },
            { id: 'ae-coral', name: 'Coral', icon: '🪸', filter: 'brightness(108%) contrast(105%) saturate(120%) hue-rotate(-15deg) sepia(10%)', overlay: '' },
            { id: 'ae-moody', name: 'Moody Blue', icon: '🫧', filter: 'contrast(110%) brightness(95%) saturate(85%) hue-rotate(200deg)', overlay: 'overlay-vignette' },
        ],
        vintage: [
            { id: 'vintage-1', name: 'Retro', icon: '📻', filter: 'sepia(50%) contrast(110%) brightness(90%)', overlay: 'overlay-vignette overlay-film-grain' },
            { id: 'vintage-2', name: '70s', icon: '🌻', filter: 'sepia(40%) saturate(150%) brightness(105%) hue-rotate(-10deg)', overlay: 'overlay-light-leak' },
            { id: 'vintage-3', name: 'Polaroid', icon: '📸', filter: 'contrast(110%) brightness(110%) saturate(130%)', overlay: 'overlay-vignette' },
            { id: 'vintage-4', name: 'Faded', icon: '🏚️', filter: 'contrast(90%) brightness(110%) saturate(60%)', overlay: 'overlay-film-grain' },
            { id: 'vintage-5', name: 'Noir', icon: '🎬', filter: 'grayscale(100%) contrast(130%) brightness(90%)', overlay: 'overlay-vignette overlay-film-grain' },
            { id: 'vintage-6', name: 'Old Film', icon: '🎞️', filter: 'sepia(60%) contrast(120%) brightness(85%) saturate(80%)', overlay: 'overlay-scanlines overlay-film-grain' },
        ],
        creative: [
            { id: 'neon', name: 'Neon', icon: '💜', filter: 'saturate(200%) contrast(130%) brightness(110%)', overlay: '' },
            { id: 'cyberpunk', name: 'Cyberpunk', icon: '🤖', filter: 'saturate(180%) hue-rotate(270deg) contrast(120%)', overlay: 'overlay-scanlines' },
            { id: 'dreamy', name: 'Dreamy', icon: '☁️', filter: 'brightness(115%) saturate(80%) blur(0.5px)', overlay: 'overlay-sparkle' },
            { id: 'pop-art', name: 'Pop Art', icon: '🎨', filter: 'saturate(300%) contrast(150%)', overlay: '' },
            { id: 'infrared', name: 'Infrared', icon: '🔴', filter: 'hue-rotate(180deg) saturate(200%) contrast(110%)', overlay: '' },
            { id: 'xray', name: 'X-Ray', icon: '💀', filter: 'invert(100%) grayscale(50%)', overlay: '' },
            { id: 'acid', name: 'Acid', icon: '🧪', filter: 'hue-rotate(90deg) saturate(250%) contrast(120%)', overlay: 'overlay-rainbow' },
            { id: 'sunset', name: 'Sunset', icon: '🌅', filter: 'sepia(20%) saturate(180%) hue-rotate(-20deg) brightness(105%)', overlay: 'overlay-light-leak' },
            { id: 'ocean', name: 'Ocean', icon: '🌊', filter: 'hue-rotate(200deg) saturate(120%) brightness(105%)', overlay: '' },
        ],
        fun: [
            { id: 'bokeh', name: 'Bokeh', icon: '🔮', filter: 'brightness(105%) saturate(120%)', overlay: 'overlay-bokeh' },
            { id: 'hearts', name: 'Hearts', icon: '❤️', filter: 'brightness(105%) saturate(130%)', overlay: 'overlay-hearts' },
            { id: 'stars', name: 'Stars', icon: '⭐', filter: 'brightness(110%)', overlay: 'overlay-stars' },
            { id: 'sparkle', name: 'Sparkle', icon: '✨', filter: 'brightness(110%) contrast(105%)', overlay: 'overlay-sparkle' },
            { id: 'vignette', name: 'Vignette', icon: '🔳', filter: 'none', overlay: 'overlay-vignette' },
            { id: 'light-leak', name: 'Light Leak', icon: '☀️', filter: 'brightness(105%)', overlay: 'overlay-light-leak' },
        ],
        frames: [
            { id: 'frame-none', name: 'No Frame', icon: '🔲', filter: 'none', overlay: '', frame: '' },
            { id: 'frame-polaroid', name: 'Polaroid', icon: '🖼️', filter: 'none', overlay: '', frame: 'frame-polaroid' },
            { id: 'frame-vintage', name: 'Vintage', icon: '🪵', filter: 'none', overlay: '', frame: 'frame-vintage-border' },
            { id: 'frame-neon', name: 'Neon', icon: '💡', filter: 'none', overlay: '', frame: 'frame-neon-border' },
            { id: 'frame-rounded', name: 'Rounded', icon: '⭕', filter: 'none', overlay: '', frame: 'frame-rounded' },
            { id: 'frame-film', name: 'Film Strip', icon: '🎞️', filter: 'none', overlay: '', frame: 'frame-film-strip' },
        ]
    };

    // =====================
    // State
    // =====================
    const state = {
        stream: null,
        isMirrored: true,
        currentEffect: EFFECTS.basic[0],
        currentFrame: '',
        currentCategory: 'basic',
        timer: 0,
        mode: 'single',
        photos: [],
        facingMode: 'user',
        demoMode: false,
        demoAnimId: null,
        demoCanvas: null,
        uploadedImage: null,
        adjustments: {
            brightness: 100,
            contrast: 100,
            saturate: 100,
            blur: 0,
            hue: 0
        }
    };

    // =====================
    // DOM Elements
    // =====================
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    const video = $('#camera-video');
    const effectsCanvas = $('#effects-canvas');
    const captureCanvas = $('#capture-canvas');
    const cameraOverlay = $('#camera-overlay');
    const cameraStatus = $('#camera-status');
    const recIndicator = $('#rec-indicator');
    const countdownDisplay = $('#countdown-display');
    const countdownNumber = $('#countdown-number');
    const flashEffect = $('#flash-effect');
    const currentTimeEl = $('#current-time');
    const currentEffectEl = $('#current-effect');
    const effectsGrid = $('#effects-grid');
    const galleryGrid = $('#gallery-grid');
    const gallerySection = $('#gallery-section');
    const galleryCount = $('#gallery-count');
    const photoModal = $('#photo-modal');
    const modalImage = $('#modal-image');
    const cameraContainer = $('#camera-container');

    // =====================
    // Camera Initialization
    // =====================
    async function initCamera() {
        try {
            // Stop demo mode if running
            stopDemoMode();

            const constraints = {
                video: {
                    facingMode: state.facingMode,
                    width: { ideal: 1920 },
                    height: { ideal: 1080 }
                },
                audio: false
            };

            if (state.stream) {
                state.stream.getTracks().forEach(track => track.stop());
            }

            state.stream = await navigator.mediaDevices.getUserMedia(constraints);
            video.srcObject = state.stream;
            video.style.display = 'block';
            effectsCanvas.style.display = 'none';

            video.onloadedmetadata = () => {
                state.demoMode = false;
                cameraStatus.classList.add('hidden');
                recIndicator.classList.remove('hidden');
                captureCanvas.width = video.videoWidth;
                captureCanvas.height = video.videoHeight;
            };
        } catch (err) {
            console.error('Camera error:', err);

            let errorMsg = 'Tidak dapat mengakses kamera';
            let errorDetail = 'Pastikan kamera terhubung dan diizinkan';
            if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
                errorMsg = 'Kamera tidak ditemukan';
                errorDetail = 'PC ini tidak memiliki webcam';
            } else if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                errorMsg = 'Akses kamera ditolak';
                errorDetail = 'Izinkan akses kamera di browser lalu klik Retry';
            } else if (err.name === 'NotReadableError') {
                errorMsg = 'Kamera sedang digunakan';
                errorDetail = 'Tutup aplikasi lain yang menggunakan kamera';
            }

            cameraStatus.classList.remove('hidden');
            cameraStatus.innerHTML = `
                <span style="font-size: 48px;">📷</span>
                <p style="color: #ef4444; font-weight: 600; margin-top: 8px;">${errorMsg}</p>
                <p style="font-size: 12px; color: #64748b; margin-bottom: 16px;">${errorDetail}</p>
                <div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;">
                    <button id="btn-retry-camera" style="
                        padding: 10px 24px;
                        background: linear-gradient(135deg, #7c3aed, #06b6d4);
                        border: none;
                        color: white;
                        border-radius: 10px;
                        font-family: 'Outfit', sans-serif;
                        font-size: 13px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: transform 0.2s;
                    ">🔄 Retry Kamera</button>
                    <button id="btn-demo-mode" style="
                        padding: 10px 24px;
                        background: rgba(124, 58, 237, 0.15);
                        border: 1px solid rgba(124, 58, 237, 0.5);
                        color: #a78bfa;
                        border-radius: 10px;
                        font-family: 'Outfit', sans-serif;
                        font-size: 13px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: transform 0.2s;
                    ">🎨 Demo Mode</button>
                    <button id="btn-upload-photo" style="
                        padding: 10px 24px;
                        background: rgba(6, 182, 212, 0.15);
                        border: 1px solid rgba(6, 182, 212, 0.5);
                        color: #67e8f9;
                        border-radius: 10px;
                        font-family: 'Outfit', sans-serif;
                        font-size: 13px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: transform 0.2s;
                    ">📁 Upload Foto</button>
                </div>
            `;

            // Bind error buttons
            document.getElementById('btn-retry-camera').addEventListener('click', () => {
                cameraStatus.innerHTML = '<div class="status-loader"></div><p>Mencoba ulang...</p>';
                setTimeout(initCamera, 500);
            });
            document.getElementById('btn-demo-mode').addEventListener('click', startDemoMode);
            document.getElementById('btn-upload-photo').addEventListener('click', uploadPhoto);
        }
    }

    // =====================
    // Demo Mode - Animated Canvas
    // =====================
    function startDemoMode() {
        state.demoMode = true;
        video.style.display = 'none';
        effectsCanvas.style.display = 'block';
        cameraStatus.classList.add('hidden');
        recIndicator.classList.remove('hidden');

        // Update rec indicator
        const recSpan = recIndicator.querySelector('span');
        if (recSpan) recSpan.textContent = 'DEMO';

        const canvas = effectsCanvas;
        const ctx = canvas.getContext('2d');
        canvas.width = 1280;
        canvas.height = 960;
        captureCanvas.width = 1280;
        captureCanvas.height = 960;

        let time = 0;
        const particles = [];
        // Create floating particles
        for (let i = 0; i < 60; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 25 + 5,
                dx: (Math.random() - 0.5) * 2,
                dy: (Math.random() - 0.5) * 2,
                hue: Math.random() * 360,
                alpha: Math.random() * 0.5 + 0.1
            });
        }

        function drawDemo() {
            time += 0.015;
            // Dynamic gradient background
            const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            const hue1 = (time * 20) % 360;
            const hue2 = (hue1 + 60) % 360;
            const hue3 = (hue1 + 180) % 360;
            grad.addColorStop(0, `hsl(${hue1}, 60%, 15%)`);
            grad.addColorStop(0.5, `hsl(${hue2}, 50%, 20%)`);
            grad.addColorStop(1, `hsl(${hue3}, 60%, 12%)`);
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Animated grid
            ctx.strokeStyle = 'rgba(124, 58, 237, 0.08)';
            ctx.lineWidth = 1;
            for (let x = 0; x < canvas.width; x += 60) {
                ctx.beginPath();
                ctx.moveTo(x + Math.sin(time + x * 0.01) * 5, 0);
                ctx.lineTo(x + Math.sin(time + x * 0.01 + 3) * 5, canvas.height);
                ctx.stroke();
            }
            for (let y = 0; y < canvas.height; y += 60) {
                ctx.beginPath();
                ctx.moveTo(0, y + Math.cos(time + y * 0.01) * 5);
                ctx.lineTo(canvas.width, y + Math.cos(time + y * 0.01 + 3) * 5);
                ctx.stroke();
            }

            // Draw particles
            particles.forEach(p => {
                p.x += p.dx;
                p.y += p.dy;
                p.hue = (p.hue + 0.5) % 360;

                // Bounce
                if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

                ctx.beginPath();
                const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
                g.addColorStop(0, `hsla(${p.hue}, 80%, 60%, ${p.alpha})`);
                g.addColorStop(1, `hsla(${p.hue}, 80%, 60%, 0)`);
                ctx.fillStyle = g;
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
            });

            // Center text
            ctx.save();
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            // Big floating emoji
            const emojis = ['📸', '✨', '🎬', '🎨', '💜'];
            emojis.forEach((emoji, i) => {
                const angle = time + (i * Math.PI * 2) / emojis.length;
                const ex = canvas.width / 2 + Math.cos(angle) * 200;
                const ey = canvas.height / 2 + Math.sin(angle) * 120;
                ctx.font = '48px serif';
                ctx.fillText(emoji, ex, ey);
            });

            // Title
            ctx.font = 'bold 56px Outfit, sans-serif';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.fillText('📸 PhotoBooth PRO', canvas.width / 2, canvas.height / 2 - 20);

            ctx.font = '22px Outfit, sans-serif';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.fillText('Demo Mode • Coba semua efek & filter!', canvas.width / 2, canvas.height / 2 + 30);

            // Pulsing circle
            const pulseR = 180 + Math.sin(time * 2) * 20;
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, pulseR, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(124, 58, 237, ${0.2 + Math.sin(time * 2) * 0.1})`;
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.restore();

            state.demoAnimId = requestAnimationFrame(drawDemo);
        }

        drawDemo();
    }

    function stopDemoMode() {
        if (state.demoAnimId) {
            cancelAnimationFrame(state.demoAnimId);
            state.demoAnimId = null;
        }
        state.demoMode = false;
    }

    // =====================
    // Upload Photo Mode
    // =====================
    function uploadPhoto() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (ev) => {
                const img = new Image();
                img.onload = () => {
                    state.demoMode = true;
                    state.uploadedImage = img;
                    video.style.display = 'none';
                    effectsCanvas.style.display = 'block';
                    cameraStatus.classList.add('hidden');
                    recIndicator.classList.remove('hidden');

                    const recSpan = recIndicator.querySelector('span');
                    if (recSpan) recSpan.textContent = 'PHOTO';

                    const canvas = effectsCanvas;
                    const ctx = canvas.getContext('2d');
                    
                    // Set canvas to match image aspect ratio
                    const maxW = 1280;
                    const maxH = 960;
                    let w = img.width;
                    let h = img.height;
                    if (w > maxW) { h = h * (maxW / w); w = maxW; }
                    if (h > maxH) { w = w * (maxH / h); h = maxH; }

                    canvas.width = w;
                    canvas.height = h;
                    captureCanvas.width = w;
                    captureCanvas.height = h;

                    // Draw uploaded image
                    function drawUpload() {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.drawImage(img, 0, 0, w, h);
                        state.demoAnimId = requestAnimationFrame(drawUpload);
                    }
                    
                    if (state.demoAnimId) cancelAnimationFrame(state.demoAnimId);
                    drawUpload();
                };
                img.src = ev.target.result;
            };
            reader.readAsDataURL(file);
        };
        input.click();
    }

    // =====================
    // Mirror Toggle
    // =====================
    function toggleMirror() {
        state.isMirrored = !state.isMirrored;
        video.classList.toggle('no-mirror', !state.isMirrored);
        const btn = $('#btn-toggle-mirror');
        btn.classList.toggle('active', state.isMirrored);
    }

    // =====================
    // Switch Camera
    // =====================
    async function switchCamera() {
        state.facingMode = state.facingMode === 'user' ? 'environment' : 'user';
        await initCamera();
    }

    // =====================
    // Effects System
    // =====================
    function applyEffect(effect) {
        state.currentEffect = effect;
        currentEffectEl.textContent = effect.name;

        // Build CSS filter combining effect + adjustments
        updateFilter();

        // Apply overlay
        cameraOverlay.className = 'camera-overlay';
        if (effect.overlay) {
            effect.overlay.split(' ').forEach(cls => {
                cameraOverlay.classList.add(cls);
            });
        }

        // Apply frame
        if (effect.frame !== undefined) {
            state.currentFrame = effect.frame;
        }
        applyFrame();

        // Update active state in effects grid
        $$('.effect-item').forEach(item => {
            item.classList.toggle('active', item.dataset.effectId === effect.id);
        });
    }

    function applyFrame() {
        // Remove all frame classes
        const frameClasses = ['frame-polaroid', 'frame-vintage-border', 'frame-neon-border', 'frame-rounded', 'frame-film-strip'];
        frameClasses.forEach(cls => cameraContainer.classList.remove(cls));

        if (state.currentFrame) {
            cameraContainer.classList.add(state.currentFrame);
        }
    }

    function updateFilter() {
        const effect = state.currentEffect;
        const adj = state.adjustments;

        // Parse effect filters and merge with adjustments
        let filterStr = '';

        // Start with effect filter if not 'none'
        if (effect.filter && effect.filter !== 'none') {
            filterStr = effect.filter + ' ';
        }

        // Apply adjustments (only if non-default to avoid redundancy)
        if (adj.brightness !== 100) filterStr += `brightness(${adj.brightness}%) `;
        if (adj.contrast !== 100) filterStr += `contrast(${adj.contrast}%) `;
        if (adj.saturate !== 100) filterStr += `saturate(${adj.saturate}%) `;
        if (adj.blur > 0) filterStr += `blur(${adj.blur}px) `;
        if (adj.hue > 0) filterStr += `hue-rotate(${adj.hue}deg) `;

        const finalFilter = filterStr.trim() || 'none';
        video.style.filter = finalFilter;
        effectsCanvas.style.filter = finalFilter;
    }

    function renderEffects(category) {
        state.currentCategory = category;
        const effects = EFFECTS[category] || [];

        effectsGrid.innerHTML = effects.map(effect => `
            <div class="effect-item ${state.currentEffect.id === effect.id ? 'active' : ''}" 
                 data-effect-id="${effect.id}" 
                 data-category="${category}"
                 title="${effect.name}">
                <span class="effect-icon">${effect.icon}</span>
                <span class="effect-name">${effect.name}</span>
            </div>
        `).join('');

        // Bind click events
        $$('.effect-item').forEach(item => {
            item.addEventListener('click', () => {
                const effectId = item.dataset.effectId;
                const cat = item.dataset.category;
                const effect = EFFECTS[cat].find(e => e.id === effectId);
                if (effect) applyEffect(effect);
            });
        });

        // Update category buttons
        $$('.category-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });
    }

    // =====================
    // Photo Capture
    // =====================
    function capturePhoto() {
        return new Promise((resolve) => {
            const ctx = captureCanvas.getContext('2d');

            if (state.demoMode) {
                // Capture from demo canvas
                captureCanvas.width = effectsCanvas.width;
                captureCanvas.height = effectsCanvas.height;
                ctx.save();
                ctx.filter = effectsCanvas.style.filter || 'none';
                ctx.drawImage(effectsCanvas, 0, 0);
                ctx.restore();
            } else {
                // Capture from video
                captureCanvas.width = video.videoWidth;
                captureCanvas.height = video.videoHeight;
                ctx.save();
                if (state.isMirrored) {
                    ctx.translate(captureCanvas.width, 0);
                    ctx.scale(-1, 1);
                }
                ctx.filter = video.style.filter || 'none';
                ctx.drawImage(video, 0, 0);
                ctx.restore();
            }

            // Apply overlay effects on canvas
            applyOverlayToCanvas(ctx, captureCanvas.width, captureCanvas.height);

            // Get image data
            const dataUrl = captureCanvas.toDataURL('image/png', 1.0);
            resolve(dataUrl);
        });
    }

    function applyOverlayToCanvas(ctx, width, height) {
        const overlay = state.currentEffect.overlay;
        if (!overlay) return;

        // Vignette effect
        if (overlay.includes('overlay-vignette')) {
            const gradient = ctx.createRadialGradient(
                width / 2, height / 2, width * 0.2,
                width / 2, height / 2, width * 0.7
            );
            gradient.addColorStop(0, 'rgba(0,0,0,0)');
            gradient.addColorStop(1, 'rgba(0,0,0,0.5)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
        }

        // Light leak
        if (overlay.includes('overlay-light-leak')) {
            const gradient = ctx.createLinearGradient(0, 0, width, height);
            gradient.addColorStop(0, 'rgba(255,120,50,0.12)');
            gradient.addColorStop(0.4, 'rgba(255,200,50,0.05)');
            gradient.addColorStop(0.6, 'rgba(0,0,0,0)');
            gradient.addColorStop(1, 'rgba(255,200,50,0.08)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
        }

        // Scanlines
        if (overlay.includes('overlay-scanlines')) {
            ctx.fillStyle = 'rgba(0,0,0,0.05)';
            for (let y = 0; y < height; y += 4) {
                ctx.fillRect(0, y, width, 2);
            }
        }

        // Instagram-style overlays
        // Clarendon - blue highlight toning
        if (overlay.includes('overlay-ig-clarendon')) {
            const g = ctx.createLinearGradient(0, 0, 0, height);
            g.addColorStop(0, 'rgba(127,187,227,0.08)');
            g.addColorStop(0.5, 'rgba(0,0,0,0)');
            g.addColorStop(1, 'rgba(43,67,100,0.06)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, width, height);
        }

        // Gingham - soft wash
        if (overlay.includes('overlay-ig-gingham')) {
            ctx.fillStyle = 'rgba(230,230,250,0.1)';
            ctx.fillRect(0, 0, width, height);
        }

        // Lark
        if (overlay.includes('overlay-ig-lark')) {
            const g = ctx.createLinearGradient(0, 0, 0, height);
            g.addColorStop(0, 'rgba(242,242,228,0.08)');
            g.addColorStop(0.4, 'rgba(0,0,0,0)');
            g.addColorStop(1, 'rgba(34,34,34,0.04)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, width, height);
        }

        // Reyes - dusty
        if (overlay.includes('overlay-ig-reyes')) {
            ctx.fillStyle = 'rgba(239,205,173,0.1)';
            ctx.fillRect(0, 0, width, height);
        }

        // Slumber
        if (overlay.includes('overlay-ig-slumber')) {
            const g = ctx.createLinearGradient(0, 0, width, height);
            g.addColorStop(0, 'rgba(125,105,24,0.1)');
            g.addColorStop(1, 'rgba(69,2,127,0.06)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, width, height);
            // Subtle vignette
            const v = ctx.createRadialGradient(width/2, height/2, width*0.3, width/2, height/2, width*0.7);
            v.addColorStop(0, 'rgba(0,0,0,0)');
            v.addColorStop(1, 'rgba(0,0,0,0.2)');
            ctx.fillStyle = v;
            ctx.fillRect(0, 0, width, height);
        }

        // Crema
        if (overlay.includes('overlay-ig-crema')) {
            ctx.fillStyle = 'rgba(255,230,200,0.08)';
            ctx.fillRect(0, 0, width, height);
        }

        // Ludwig
        if (overlay.includes('overlay-ig-ludwig')) {
            const g = ctx.createLinearGradient(0, 0, 0, height);
            g.addColorStop(0, 'rgba(200,155,110,0.08)');
            g.addColorStop(0.4, 'rgba(0,0,0,0)');
            g.addColorStop(1, 'rgba(44,22,5,0.06)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, width, height);
        }

        // Aden
        if (overlay.includes('overlay-ig-aden')) {
            const g = ctx.createLinearGradient(0, 0, width, height);
            g.addColorStop(0, 'rgba(66,10,14,0.06)');
            g.addColorStop(0.5, 'rgba(0,0,0,0)');
            g.addColorStop(1, 'rgba(205,175,155,0.1)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, width, height);
        }

        // Perpetua - teal to warm
        if (overlay.includes('overlay-ig-perpetua')) {
            const g = ctx.createLinearGradient(0, 0, 0, height);
            g.addColorStop(0, 'rgba(0,91,154,0.08)');
            g.addColorStop(0.5, 'rgba(0,0,0,0)');
            g.addColorStop(1, 'rgba(230,193,115,0.08)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, width, height);
        }

        // Mayfair - pink vignette
        if (overlay.includes('overlay-ig-mayfair')) {
            const g = ctx.createRadialGradient(width/2, height*0.6, 0, width/2, height*0.6, width*0.7);
            g.addColorStop(0, 'rgba(255,200,200,0.06)');
            g.addColorStop(0.5, 'rgba(175,105,120,0.08)');
            g.addColorStop(1, 'rgba(50,20,40,0.15)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, width, height);
        }

        // Rise
        if (overlay.includes('overlay-ig-rise')) {
            const g = ctx.createLinearGradient(0, 0, 0, height);
            g.addColorStop(0, 'rgba(253,225,155,0.1)');
            g.addColorStop(0.4, 'rgba(0,0,0,0)');
            g.addColorStop(1, 'rgba(233,185,110,0.06)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, width, height);
        }

        // Hudson - cold blue
        if (overlay.includes('overlay-ig-hudson')) {
            const g = ctx.createLinearGradient(0, 0, 0, height);
            g.addColorStop(0, 'rgba(166,177,255,0.1)');
            g.addColorStop(0.5, 'rgba(0,0,0,0)');
            g.addColorStop(1, 'rgba(52,33,120,0.1)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, width, height);
        }

        // Valencia - warm orange
        if (overlay.includes('overlay-ig-valencia')) {
            const g = ctx.createLinearGradient(0, 0, width, height);
            g.addColorStop(0, 'rgba(252,166,56,0.1)');
            g.addColorStop(0.5, 'rgba(0,0,0,0)');
            g.addColorStop(1, 'rgba(224,120,28,0.06)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, width, height);
        }

        // X-Pro II - warm center, cool edges
        if (overlay.includes('overlay-ig-xpro2')) {
            const g = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width*0.7);
            g.addColorStop(0, 'rgba(224,170,62,0.08)');
            g.addColorStop(0.4, 'rgba(0,0,0,0)');
            g.addColorStop(1, 'rgba(43,42,110,0.12)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, width, height);
        }

        // Earlybird
        if (overlay.includes('overlay-ig-earlybird')) {
            const g = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width*0.7);
            g.addColorStop(0, 'rgba(208,186,142,0.08)');
            g.addColorStop(0.4, 'rgba(0,0,0,0)');
            g.addColorStop(1, 'rgba(29,2,16,0.15)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, width, height);
        }

        // Nashville
        if (overlay.includes('overlay-ig-nashville')) {
            const g = ctx.createLinearGradient(0, 0, 0, height);
            g.addColorStop(0, 'rgba(247,176,218,0.1)');
            g.addColorStop(0.4, 'rgba(0,0,0,0)');
            g.addColorStop(1, 'rgba(0,70,150,0.06)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, width, height);
        }

        // Toaster
        if (overlay.includes('overlay-ig-toaster')) {
            const g = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width*0.7);
            g.addColorStop(0, 'rgba(128,78,15,0.08)');
            g.addColorStop(0.4, 'rgba(0,0,0,0)');
            g.addColorStop(1, 'rgba(59,0,0,0.2)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, width, height);
        }

        // Walden
        if (overlay.includes('overlay-ig-walden')) {
            const g = ctx.createLinearGradient(0, 0, width, height);
            g.addColorStop(0, 'rgba(0,68,204,0.06)');
            g.addColorStop(0.5, 'rgba(204,187,0,0.08)');
            g.addColorStop(1, 'rgba(0,68,204,0.04)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, width, height);
        }

        // Hefe
        if (overlay.includes('overlay-ig-hefe')) {
            const g = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width*0.7);
            g.addColorStop(0, 'rgba(252,230,150,0.06)');
            g.addColorStop(0.4, 'rgba(0,0,0,0)');
            g.addColorStop(1, 'rgba(0,0,0,0.15)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, width, height);
        }

        // Kelvin
        if (overlay.includes('overlay-ig-kelvin')) {
            const g = ctx.createLinearGradient(0, 0, 0, height);
            g.addColorStop(0, 'rgba(255,153,0,0.08)');
            g.addColorStop(0.5, 'rgba(0,0,0,0)');
            g.addColorStop(1, 'rgba(56,44,120,0.08)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, width, height);
        }

        // Sierra
        if (overlay.includes('overlay-ig-sierra')) {
            const g = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width*0.7);
            g.addColorStop(0, 'rgba(210,180,140,0.06)');
            g.addColorStop(0.4, 'rgba(0,0,0,0)');
            g.addColorStop(1, 'rgba(75,50,30,0.12)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, width, height);
        }

        // Willow
        if (overlay.includes('overlay-ig-willow')) {
            const g = ctx.createLinearGradient(0, 0, 0, height);
            g.addColorStop(0, 'rgba(100,85,120,0.1)');
            g.addColorStop(0.4, 'rgba(0,0,0,0)');
            g.addColorStop(1, 'rgba(212,169,175,0.08)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, width, height);
        }

        // Brannan
        if (overlay.includes('overlay-ig-brannan')) {
            const g = ctx.createLinearGradient(0, 0, 0, height);
            g.addColorStop(0, 'rgba(161,129,105,0.08)');
            g.addColorStop(0.4, 'rgba(0,0,0,0)');
            g.addColorStop(1, 'rgba(67,56,45,0.1)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, width, height);
        }
    }

    async function handleCapture() {
        const btn = $('#btn-capture');
        btn.disabled = true;

        if (state.timer > 0) {
            await runCountdown(state.timer);
        }

        if (state.mode === 'single') {
            await takeSinglePhoto();
        } else if (state.mode === 'burst') {
            await takeBurstPhotos();
        } else if (state.mode === 'strip') {
            await takeStripPhotos();
        }

        btn.disabled = false;
    }

    function runCountdown(seconds) {
        return new Promise((resolve) => {
            countdownDisplay.classList.remove('hidden');
            let count = seconds;
            countdownNumber.textContent = count;

            const interval = setInterval(() => {
                count--;
                if (count <= 0) {
                    clearInterval(interval);
                    countdownDisplay.classList.add('hidden');
                    resolve();
                } else {
                    countdownNumber.textContent = count;
                }
            }, 1000);
        });
    }

    function triggerFlash() {
        flashEffect.classList.add('active');
        // Play shutter sound
        playShutterSound();
        setTimeout(() => flashEffect.classList.remove('active'), 500);
    }

    function playShutterSound() {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.08);
            gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + 0.1);
        } catch (e) {
            // Silently fail if audio context is not supported
        }
    }

    async function takeSinglePhoto() {
        triggerFlash();
        const dataUrl = await capturePhoto();
        addPhotoToGallery(dataUrl);
    }

    async function takeBurstPhotos() {
        for (let i = 0; i < 4; i++) {
            triggerFlash();
            const dataUrl = await capturePhoto();
            addPhotoToGallery(dataUrl);
            if (i < 3) await delay(500);
        }
    }

    async function takeStripPhotos() {
        const photos = [];
        for (let i = 0; i < 4; i++) {
            if (i > 0) {
                await runCountdown(3);
            }
            triggerFlash();
            const dataUrl = await capturePhoto();
            photos.push(dataUrl);
            await delay(300);
        }

        // Create strip
        createPhotoStrip(photos);
    }

    function createPhotoStrip(photos) {
        const stripCanvas = document.createElement('canvas');
        const stripWidth = 600;
        const photoHeight = (stripWidth * 3) / 4;
        const padding = 20;
        const gap = 8;
        const bottomPad = 50;

        stripCanvas.width = stripWidth + padding * 2;
        stripCanvas.height = padding + (photoHeight + gap) * photos.length - gap + bottomPad;

        const ctx = stripCanvas.getContext('2d');

        // White background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, stripCanvas.width, stripCanvas.height);

        // Load and draw each photo
        let loaded = 0;
        photos.forEach((dataUrl, index) => {
            const img = new Image();
            img.onload = () => {
                const y = padding + (photoHeight + gap) * index;
                ctx.drawImage(img, padding, y, stripWidth, photoHeight);
                loaded++;

                if (loaded === photos.length) {
                    // Add branding at bottom
                    ctx.fillStyle = '#666';
                    ctx.font = '14px Outfit, sans-serif';
                    ctx.textAlign = 'center';
                    ctx.fillText('📸 PhotoBooth PRO • ' + new Date().toLocaleDateString('id-ID'), stripCanvas.width / 2, stripCanvas.height - 18);

                    const stripDataUrl = stripCanvas.toDataURL('image/png');
                    addPhotoToGallery(stripDataUrl);
                }
            };
            img.src = dataUrl;
        });
    }

    // =====================
    // Gallery Management
    // =====================
    function addPhotoToGallery(dataUrl) {
        const photo = {
            id: Date.now() + Math.random().toString(36).substring(2),
            dataUrl: dataUrl,
            timestamp: new Date()
        };

        state.photos.push(photo);
        updateGallery();
        updateGalleryCount();
    }

    function updateGallery() {
        if (state.photos.length === 0) {
            galleryGrid.innerHTML = `
                <div class="gallery-empty">
                    <span class="empty-icon">📷</span>
                    <p>Belum ada foto. Ayo ambil foto pertamamu!</p>
                </div>
            `;
            return;
        }

        galleryGrid.innerHTML = state.photos.map((photo, index) => `
            <div class="gallery-item" data-photo-index="${index}">
                <img src="${photo.dataUrl}" alt="Photo ${index + 1}" loading="lazy">
                <div class="gallery-item-overlay">
                    <span class="gallery-item-time">${formatTime(photo.timestamp)}</span>
                </div>
            </div>
        `).join('');

        // Bind click events
        $$('.gallery-item').forEach(item => {
            item.addEventListener('click', () => {
                const index = parseInt(item.dataset.photoIndex);
                openPhotoModal(index);
            });
        });
    }

    function updateGalleryCount() {
        galleryCount.textContent = state.photos.length;
    }

    function openPhotoModal(index) {
        const photo = state.photos[index];
        if (!photo) return;

        modalImage.src = photo.dataUrl;
        photoModal.classList.remove('hidden');
        photoModal.dataset.currentIndex = index;
    }

    function closePhotoModal() {
        photoModal.classList.add('hidden');
    }

    function downloadPhoto(dataUrl, filename) {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = filename || `photobooth_${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function deletePhoto(index) {
        state.photos.splice(index, 1);
        updateGallery();
        updateGalleryCount();
        closePhotoModal();
    }

    function downloadAllPhotos() {
        state.photos.forEach((photo, index) => {
            setTimeout(() => {
                downloadPhoto(photo.dataUrl, `photobooth_${index + 1}_${Date.now()}.png`);
            }, index * 300);
        });
    }

    function clearGallery() {
        if (state.photos.length === 0) return;
        if (confirm('Hapus semua foto dari gallery?')) {
            state.photos = [];
            updateGallery();
            updateGalleryCount();
        }
    }

    function printPhoto(dataUrl) {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
            <head><title>Print Photo</title></head>
            <body style="margin:0; display:flex; justify-content:center; align-items:center; min-height:100vh;">
                <img src="${dataUrl}" style="max-width:100%; max-height:100vh;" onload="window.print(); window.close();">
            </body>
            </html>
        `);
    }

    // =====================
    // Adjustments
    // =====================
    function setupAdjustments() {
        const sliders = [
            { id: 'adj-brightness', key: 'brightness', unit: '%', valId: 'val-brightness' },
            { id: 'adj-contrast', key: 'contrast', unit: '%', valId: 'val-contrast' },
            { id: 'adj-saturate', key: 'saturate', unit: '%', valId: 'val-saturate' },
            { id: 'adj-blur', key: 'blur', unit: 'px', valId: 'val-blur' },
            { id: 'adj-hue', key: 'hue', unit: '°', valId: 'val-hue' },
        ];

        sliders.forEach(slider => {
            const input = $(`#${slider.id}`);
            const display = $(`#${slider.valId}`);

            input.addEventListener('input', () => {
                state.adjustments[slider.key] = parseFloat(input.value);
                display.textContent = input.value + slider.unit;
                updateFilter();
            });
        });

        // Reset adjustments
        $('#btn-reset-adjustments').addEventListener('click', () => {
            state.adjustments = { brightness: 100, contrast: 100, saturate: 100, blur: 0, hue: 0 };
            sliders.forEach(slider => {
                const input = $(`#${slider.id}`);
                const display = $(`#${slider.valId}`);
                input.value = state.adjustments[slider.key];
                display.textContent = state.adjustments[slider.key] + slider.unit;
            });
            updateFilter();
        });
    }

    // =====================
    // Clock
    // =====================
    function updateClock() {
        const now = new Date();
        currentTimeEl.textContent = now.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }

    // =====================
    // Helpers
    // =====================
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function formatTime(date) {
        return date.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => { });
        } else {
            document.exitFullscreen().catch(() => { });
        }
    }

    // =====================
    // Event Binding
    // =====================
    function bindEvents() {
        // Mirror toggle
        $('#btn-toggle-mirror').addEventListener('click', toggleMirror);
        // Set initial active state
        $('#btn-toggle-mirror').classList.add('active');

        // Switch camera
        $('#btn-switch-camera').addEventListener('click', switchCamera);

        // Fullscreen
        $('#btn-fullscreen').addEventListener('click', toggleFullscreen);

        // Capture
        $('#btn-capture').addEventListener('click', handleCapture);

        // Timer buttons
        $$('.timer-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                $$('.timer-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                state.timer = parseInt(btn.dataset.timer);
            });
        });

        // Mode buttons
        $$('.mode-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                $$('.mode-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                state.mode = btn.dataset.mode;
            });
        });

        // Category buttons
        $$('.category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                renderEffects(btn.dataset.category);
            });
        });

        // Gallery toggle
        $('#btn-toggle-gallery').addEventListener('click', () => {
            gallerySection.classList.toggle('hidden');
        });

        // Gallery actions
        $('#btn-download-all').addEventListener('click', downloadAllPhotos);
        $('#btn-clear-gallery').addEventListener('click', clearGallery);

        // Modal
        $('#btn-close-modal').addEventListener('click', closePhotoModal);
        $('.modal-backdrop').addEventListener('click', closePhotoModal);

        $('#btn-modal-download').addEventListener('click', () => {
            const index = parseInt(photoModal.dataset.currentIndex);
            const photo = state.photos[index];
            if (photo) downloadPhoto(photo.dataUrl);
        });

        $('#btn-modal-delete').addEventListener('click', () => {
            const index = parseInt(photoModal.dataset.currentIndex);
            deletePhoto(index);
        });

        $('#btn-modal-print').addEventListener('click', () => {
            const index = parseInt(photoModal.dataset.currentIndex);
            const photo = state.photos[index];
            if (photo) printPhoto(photo.dataUrl);
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT') return;

            switch (e.key) {
                case ' ':
                case 'Enter':
                    e.preventDefault();
                    handleCapture();
                    break;
                case 'm':
                case 'M':
                    toggleMirror();
                    break;
                case 'f':
                case 'F':
                    toggleFullscreen();
                    break;
                case 'g':
                case 'G':
                    gallerySection.classList.toggle('hidden');
                    break;
                case 'Escape':
                    if (!photoModal.classList.contains('hidden')) {
                        closePhotoModal();
                    } else if (!gallerySection.classList.contains('hidden')) {
                        gallerySection.classList.add('hidden');
                    }
                    break;
            }
        });

        // Collapse effects panel
        $('#btn-collapse-effects').addEventListener('click', () => {
            const panel = $('#effects-panel');
            panel.classList.toggle('collapsed');
            if (panel.classList.contains('collapsed')) {
                panel.style.width = '60px';
                panel.style.minWidth = '60px';
                panel.style.overflow = 'hidden';
            } else {
                panel.style.width = '';
                panel.style.minWidth = '';
                panel.style.overflow = '';
            }
        });
    }

    // =====================
    // Initialize App
    // =====================
    function init() {
        // Initialize camera
        initCamera();

        // Render initial effects
        renderEffects('basic');

        // Setup adjustments
        setupAdjustments();

        // Bind events
        bindEvents();

        // Start clock
        updateClock();
        setInterval(updateClock, 1000);

        // Update gallery
        updateGallery();
        updateGalleryCount();

        console.log('📸 PhotoBooth PRO initialized!');
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
