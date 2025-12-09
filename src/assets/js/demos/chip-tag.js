// Playground logic for chip/tag demo
// Ensures DOM is ready before accessing elements

document.addEventListener('DOMContentLoaded', () => {
  // Helper to set or remove attribute based on value
  function setOrRemove(el, attr, value) {
    const v = value.trim();
    if (v === '') {
      el.removeAttribute(attr);
    } else {
      el.setAttribute(attr, v);
    }
  }

  // Chip controls
  const chipPreview = document.getElementById('chipPreview');
  const chipLabel = document.getElementById('chipLabel');
  const chipBadge = document.getElementById('chipBadge');
  const chipCounter = document.getElementById('chipCounter');
  const chipCounterError = document.getElementById('chipCounterError');

  if (chipPreview && chipLabel && chipBadge && chipCounter && chipCounterError) {
    // Set initial counter value from input
    setOrRemove(chipPreview, 'counter', chipCounter.value);
    chipLabel.addEventListener('input', (e) => {
      setOrRemove(chipPreview, 'label', e.target.value);
    });
    chipBadge.addEventListener('input', (e) => {
      setOrRemove(chipPreview, 'badge', e.target.value);
    });
    chipCounter.addEventListener('input', (e) => {
      const raw = e.target.value.trim();
      if (raw === '') {
        chipCounterError.style.display = 'none';
        chipPreview.removeAttribute('counter');
        return;
      }
      const num = Number(raw);
      if (!Number.isFinite(num)) {
        chipCounterError.style.display = 'inline';
        chipPreview.removeAttribute('counter');
      } else {
        chipCounterError.style.display = 'none';
        chipPreview.setAttribute('counter', String(num));
      }
    });
  }

  // Tag controls
  const tagPreview = document.getElementById('tagPreview');
  const tagLabel = document.getElementById('tagLabel');
  const tagBadge = document.getElementById('tagBadge');
  const tagCounter = document.getElementById('tagCounter');
  const tagCounterError = document.getElementById('tagCounterError');

  if (tagPreview && tagLabel && tagBadge && tagCounter && tagCounterError) {
    tagLabel.addEventListener('input', (e) => {
      setOrRemove(tagPreview, 'label', e.target.value);
    });
    tagBadge.addEventListener('input', (e) => {
      setOrRemove(tagPreview, 'badge', e.target.value);
    });
    tagCounter.addEventListener('input', (e) => {
      const raw = e.target.value.trim();
      if (raw === '') {
        tagCounterError.style.display = 'none';
        tagPreview.removeAttribute('counter');
        return;
      }
      const num = Number(raw);
      if (!Number.isFinite(num)) {
        tagCounterError.style.display = 'inline';
        tagPreview.removeAttribute('counter');
      } else {
        tagCounterError.style.display = 'none';
        tagPreview.setAttribute('counter', String(num));
      }
    });
  }
});
