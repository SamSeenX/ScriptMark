export const templates = [
  {
    name: "Blank Script",
    label: "My Bookmarklet",
    description: "Start from scratch.",
    code: `// Your code here
alert("Hello from your bookmarklet!");`
  },
  {
    name: "Edit Page Content",
    label: "Edit Page",
    description: "Make the entire webpage editable like a document.",
    code: `document.body.contentEditable = 'true';
document.designMode = 'on';
alert('You can now edit the page content!');`
  },
  {
    name: "Dark Mode Toggle",
    label: "Dark Mode",
    description: "Invert colors to create a quick dark mode.",
    code: `const filter = 'invert(1) hue-rotate(180deg)';
if (document.body.style.filter === filter) {
  document.body.style.filter = '';
} else {
  document.body.style.filter = filter;
}`
  },
  {
    name: "Extract All Images",
    label: "Get Images",
    description: "Open a new tab with all images and download buttons.",
    code: `const seen = new Set();
const images = [];

// Helper to add image
const addImg = (src, width = 0, height = 0) => {
    if (src && !seen.has(src)) {
        seen.add(src);
        images.push({
            src: src,
            width: width,
            height: height
        });
    }
};

// 1. Get <img> tags (these have dimensions immediately)
Array.from(document.images).forEach(img => {
    if (img.naturalWidth > 50) {
        addImg(img.src, img.naturalWidth, img.naturalHeight);
    }
});

// 2. Get linked images (anchors pointing to image extensions)
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];
Array.from(document.querySelectorAll('a')).forEach(a => {
    try {
        if (a.href && imageExtensions.some(ext => a.href.toLowerCase().split('?')[0].endsWith(ext))) {
            addImg(a.href, 0, 0);
        }
    } catch (e) {}
});

if (images.length === 0) {
    alert("No images found on this page.");
} else {
    // Collect image data
    const imgData = images.map(i => {
        let name = i.src.split('/').pop().split('?')[0];
        if (!name || name.length > 30) name = name.substring(0, 27) + '...';
        
        // Only show dimensions if they are real
        let resString = 'Linked File';
        if (i.width > 0 && i.height > 0) {
            resString = i.width + ' x ' + i.height;
        }

        return {
            src: i.src,
            res: resString,
            area: i.width * i.height,
            name: name || 'Image'
        };
    }).sort((a, b) => b.area - a.area);

    let htmlContent = \`<!DOCTYPE html>
<html>
<head>
    <title>Extracted Images</title>
    <style>
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:system-ui,-apple-system,sans-serif;background:#1a1a1a;color:#fff;padding:20px}
        h1{text-align:center;margin-bottom:20px;font-size:1.5rem;font-weight:600}
        .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px}
        .card{position:relative;background:#2a2a2a;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.3);transition:transform 0.2s}
        .card:hover{transform:translateY(-2px)}
        .card-img-wrapper{position:relative;padding-top:75%;overflow:hidden;background:#333}
        .card img{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block}
        .caption{padding:10px;background:#2a2a2a;font-size:12px;color:#ccc;border-top:1px solid #333}
        .caption strong{display:block;color:#fff;margin-bottom:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .btns{position:absolute;top:8px;right:8px;display:flex;gap:4px;opacity:0;transition:opacity 0.2s}
        .card:hover .btns{opacity:1}
        .btn{width:32px;height:32px;border:none;border-radius:6px;cursor:pointer;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.7);color:#fff;font-size:14px;text-decoration:none;backdrop-filter:blur(4px);padding:6px}
        .btn:hover{background:rgba(0,0,0,0.9);transform:scale(1.05)}
        .btn svg{width:100%;height:100%;fill:white}
    </style>
</head>
<body>
    <h1>\${imgData.length} Images Found</h1>
    <div class="grid">\`;

    // Process data in JS before generating string to avoid inline script
    imgData.forEach(item => {
        // Simple HTML generation without scripts
        htmlContent += \`
        <div class="card">
            <div class="card-img-wrapper">
                <img src="\${item.src.replace(/"/g, '&quot;')}" loading="lazy">
                <div class="btns">
                    <a class="btn" href="\${item.src.replace(/"/g, '&quot;')}" download="\${item.name.replace(/"/g, '&quot;')}" title="Download">
                        <svg viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
                    </a>
                </div>
            </div>
            <div class="caption">
                <strong>\${item.name.replace(/</g, '&lt;')}</strong>
                \${item.res}
            </div>
        </div>\`;
    });

    htmlContent += \`
    </div>
    <div style="margin-top: 40px; border-top: 1px solid #333; padding-top: 20px; text-align: center; color: #666; font-size: 0.9rem;">
        <div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 10px;">
            <a href="https://github.com/SamSeenX" target="_blank" style="color: #666; text-decoration: none; transition: color 0.2s;">GitHub</a>
            <a href="https://twitter.com/SamSeenX" target="_blank" style="color: #666; text-decoration: none; transition: color 0.2s;">Twitter</a>
            <a href="https://buymeacoffee.com/samseen" target="_blank" style="color: #666; text-decoration: none; transition: color 0.2s;">Support</a>
        </div>
        <p>&copy; 2024 JS Bookmarklet Creator. All rights reserved.</p>
    </div>
</body>
</html>\`;

    // Create Blob and open in new tab
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
}`
  },
  {
    name: "Zap Elements",
    label: "Zap",
    description: "Click any element on the page to remove it instantly.",
    code: `if (window._zapMode) {
    document.removeEventListener('click', window._zapClick, true);
    document.removeEventListener('mouseover', window._zapHover);
    document.removeEventListener('mouseout', window._zapOut);
    window._zapMode = false;
    alert('Zap Mode OFF');
} else {
    window._zapClick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.target.style.display = 'none';
        e.target.style.outline = '';
    };
    window._zapHover = function(e) {
        e.target.style.outline = '2px solid red';
    };
    window._zapOut = function(e) {
        e.target.style.outline = '';
    };
    document.addEventListener('click', window._zapClick, true);
    document.addEventListener('mouseover', window._zapHover);
    document.addEventListener('mouseout', window._zapOut);
    window._zapMode = true;
    alert('Zap Mode ON! Click elements to remove them.\\nClick bookmarklet again to stop.');
}`
  },
  {
    name: "Enable Right-Click",
    label: "Right Click",
    description: "Re-enable right-click context menu and text selection.",
    code: `(function() {
    function unbindAll(el) {
        ['contextmenu', 'selectstart', 'dragstart', 'copy', 'cut', 'paste', 'mousedown', 'mouseup'].forEach(ev => {
            el['on' + ev] = null;
            el.addEventListener(ev, function(e) { e.stopPropagation(); }, true);
        });
        Array.from(el.children).forEach(unbindAll);
    }
    unbindAll(document);
    const css = document.createElement('style');
    css.innerHTML = '*, *::before, *::after { user-select: text !important; -webkit-user-select: text !important; pointer-events: auto !important; }';
    document.head.appendChild(css);
    alert('Right-click & selection re-enabled!');
})();`
  },
  {
    name: "Visual Inspector",
    label: "Inspect",
    description: "Hover over elements to see their font and color details.",
    code: `const box = document.createElement('div');
box.style.cssText = 'position:fixed;padding:10px;background:rgba(0,0,0,0.8);color:#fff;border-radius:5px;pointer-events:none;z-index:99999;font-size:12px;font-family:monospace;white-space:pre;';
document.body.appendChild(box);

document.addEventListener('mousemove', function(e) {
    const style = window.getComputedStyle(e.target);
    const font = style.fontFamily.split(',')[0];
    const size = style.fontSize;
    const color = style.color;
    box.textContent = \`Font: \${font} (\${size})\nColor: \${color}\nEl: \${e.target.tagName.toLowerCase()}\`;
    box.style.top = (e.clientY + 15) + 'px';
    box.style.left = (e.clientX + 15) + 'px';
});
document.addEventListener('mouseout', () => box.style.display = 'none');
document.addEventListener('mouseover', () => box.style.display = 'block');`
  },
  {
    name: "Show Alt Text",
    label: "Show Alt",
    description: "Overlay alt text on images to check accessibility.",
    code: `document.querySelectorAll('img').forEach(img => {
    const alt = img.alt || 'MISSING ALT';
    const div = document.createElement('div');
    div.textContent = alt;
    div.style.cssText = 'position:absolute;background:' + (img.alt ? 'rgba(0,0,0,0.7)' : 'red') + ';color:#fff;padding:2px 5px;font-size:10px;border-radius:3px;pointer-events:none;z-index:9999;';
    
    // Position helper
    const rect = img.getBoundingClientRect();
    div.style.top = (rect.top + window.scrollY) + 'px';
    div.style.left = (rect.left + window.scrollX) + 'px';
    document.body.appendChild(div);
});
alert('Alt text overlay added!');`
  },
  {
    name: "Page Speed Check",
    label: "Check Speed",
    description: "Show basic page performance timing stats.",
    code: `const p = window.performance.timing;
const loadTime = (p.loadEventEnd - p.navigationStart) / 1000;
const domTime = (p.domComplete - p.domLoading) / 1000;
alert(\`Page Load: \${loadTime.toFixed(2)}s\nDOM Process: \${domTime.toFixed(2)}s\nScripts: \${document.scripts.length}\nResources: \${performance.getEntries().length}\`);`
  },
  {
    name: "Remove Sticky Headers/Footers",
    label: "Kill Sticky",
    description: "Remove elements that stick to the screen (position: fixed).",
    code: `const elements = document.querySelectorAll('*');
let count = 0;
for (let i = 0; i < elements.length; i++) {
    const style = window.getComputedStyle(elements[i]);
    if (style.position === 'fixed' || style.position === 'sticky') {
        elements[i].style.display = 'none';
        count++;
    }
}
alert('Removed ' + count + ' sticky elements.');`
  },
  {
    name: "Insert Text by Class",
    label: "Insert Text",
    description: "Insert predefined text into elements with a specific class name.",
    code: `// Change these values as needed
const className = 'target-class';
const textToInsert = 'Your predefined text here';

const elements = document.querySelectorAll('.' + className);
if (elements.length === 0) {
    alert('No elements found with class: ' + className);
} else {
    elements.forEach(el => {
        el.textContent = textToInsert;
    });
    alert('Inserted text into ' + elements.length + ' element(s) with class: ' + className);
}`
  },
  {
    name: "Reveal Passwords",
    label: "Show Pass",
    description: "Reveal hidden passwords in password input fields.",
    code: `const passwords = document.querySelectorAll('input[type="password"]');
if (passwords.length === 0) {
    alert('No password fields found on this page.');
} else {
    passwords.forEach(p => {
        p.type = 'text';
    });
    alert('Revealed ' + passwords.length + ' password field(s).');
}`
  }
];
